import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import JoinWaitlistEmail from '@/emails/join-waitlist';

const resend = new Resend(process.env.RESEND_API_KEY);

// Function to add user data to Zoho Sheet
async function addToZohoSheet(data: { email: string; firstName: string; }) {
  const { ZOHO_OAUTH_TOKEN, ZOHO_SPREADSHEET_ID, ZOHO_WORKSHEET_NAME } = process.env;

  if (!ZOHO_OAUTH_TOKEN || !ZOHO_SPREADSHEET_ID || !ZOHO_WORKSHEET_NAME) {
    console.error('Zoho Sheet environment variables are not set. Please provide ZOHO_OAUTH_TOKEN, ZOHO_SPREADSHEET_ID, and ZOHO_WORKSHEET_NAME.');
    // We can choose to not throw an error to avoid interrupting the user-facing flow.
    // The error is logged to the server for the admin to see.
    return;
  }

  // Note: The API endpoint URL might differ based on your Zoho data center.
  // This one is for the US data center. Please check Zoho's documentation if you use another one.
  const url = `https://sheet.zoho.com/api/v2/${ZOHO_SPREADSHEET_ID}/worksheets/${ZOHO_WORKSHEET_NAME}/rows`;

  // IMPORTANT: This assumes your Zoho Sheet has columns named "Email" and "First Name".
  // If your column names are different, you must update them here.
  const payload = {
    rows: [
      {
        "Email": data.email,
        "First Name": data.firstName,
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${ZOHO_OAUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to add row to Zoho Sheet:', errorData);
    } else {
      console.log('Successfully added row to Zoho Sheet.');
    }
  } catch (error) {
    console.error('Error adding row to Zoho Sheet:', error);
  }
}


export async function POST(req: NextRequest) {
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
    // Add data to Zoho Sheet without waiting for it to complete
    addToZohoSheet({ email, firstName });

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
