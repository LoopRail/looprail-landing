import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import JoinWaitlistEmail from '@/emails/join-waitlist';
import { google } from 'googleapis'; // Import google from googleapis

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory rate limiting (as previously implemented)
interface RateLimitData {
  count: number;
  lastRequest: number;
  email?: string; // Store email temporarily
  firstName?: string; // Store firstName temporarily
}

const rateLimitMap = new Map<string, RateLimitData>();
const RATE_LIMIT_COUNT = 5;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds

// Function to add user data to Google Sheet
async function addToGoogleSheet(data: { email: string; firstName: string; }) {
  const { GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID } = process.env;

  if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
    console.error('Google Sheet environment variables are not set. Please provide GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_SHEET_ID.');
    return;
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Replace escaped newlines
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  // IMPORTANT: This assumes your Google Sheet has columns named "Email" and "First Name" in the first row.
  // The order of data in the values array should match your sheet's column order.
  const values = [
    [data.email, data.firstName],
  ];

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: 'Sheet1', // Assuming 'Sheet1' is your worksheet name. Adjust if different.
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
    console.log('Successfully added row to Google Sheet:', response.data);
  } catch (error) {
    console.error('Error adding row to Google Sheet:', error);
  }
}


export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const now = Date.now();

  const rateLimitData = rateLimitMap.get(ip);

  if (rateLimitData && now - rateLimitData.lastRequest < RATE_LIMIT_WINDOW) {
    if (rateLimitData.count >= RATE_LIMIT_COUNT) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    rateLimitMap.set(ip, {
      ...rateLimitData, // Keep existing email if any
      count: rateLimitData.count + 1,
      lastRequest: now,
    });
  } else {
    // Start new rate limit window
    rateLimitMap.set(ip, { count: 1, lastRequest: now });
  }

  // Naive cleanup to avoid memory leaks
  setTimeout(() => {
    const currentData = rateLimitMap.get(ip);
    if (currentData && currentData.lastRequest === now) {
      rateLimitMap.delete(ip);
    }
  }, RATE_LIMIT_WINDOW);


  const { email, firstName } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  // More robust email validation
  const emailRegex = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
  }

  // First name validation (only if provided)
  if (firstName) {
    const nameRegex = /^[a-zA-Z\s-']{2,50}$/;
    if (!nameRegex.test(firstName)) {
      return NextResponse.json({ error: 'Invalid first name. It must be 2-50 characters long and contain only letters, spaces, hyphens, or apostrophes.' }, { status: 400 });
    }
  }

  try {
    // --- TEMPORARY IN-MEMORY STORAGE ---
    // In a real application, you would store this email in a persistent database (e.g., PostgreSQL, MongoDB).
    // For now, we'll store it in our in-memory map for demonstration purposes.
    rateLimitMap.set(ip, { ...rateLimitMap.get(ip)!, email, firstName });
    console.log(`Stored email ${email} for IP ${ip} temporarily in memory.`);
    // ------------------------------------

    // Add data to Google Sheet without waiting for it to complete
    addToGoogleSheet({ email, firstName });

    // Send welcome email
    await resend.emails.send({
      from: 'Looprail <noreply@looprail.com>',
      to: email,
      subject: 'Welcome to the Looprail Waitlist!',
      react: JoinWaitlistEmail({ firstName }),
    });

    return NextResponse.json({ message: 'Successfully joined the waitlist!' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}


