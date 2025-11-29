import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import JoinWaitlistEmail from "@/emails/join-waitlist";
import { google } from "googleapis";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const resend = new Resend(process.env.RESEND_API_KEY);

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "10 s"), // 5 requests per 10 seconds
  analytics: true,
  /**
   * Optional: A key prefix for the ratelimit. By default it's the current
   * directory name.
   */
  prefix: "@upstash/ratelimit",
});

const WAITLIST_EMAIL_KEY = "waitlist_emails";

// Function to add user data to Google Sheet
async function addToGoogleSheet(data: {
  email: string;
  firstName: string;
  ip: string;
  date: string;
  time: string;
}) {
  const { GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID } =
    process.env;

  if (
    !GOOGLE_SERVICE_ACCOUNT_EMAIL ||
    !GOOGLE_PRIVATE_KEY ||
    !GOOGLE_SHEET_ID
  ) {
    console.error(
      "Google Sheet environment variables are not set. Please provide GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_SHEET_ID.",
    );
    return;
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const values = [[data.email, data.firstName, data.ip, data.date, data.time]];

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: "Sheet1", // Assuming 'Sheet1' is your worksheet name. Adjust if different.
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });
    console.log("Successfully added row to Google Sheet:", response.data);
  } catch (error) {
    console.error("Error adding row to Google Sheet:", error);
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { email, firstName } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // More robust email validation
  const emailRegex =
    /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 },
    );
  }

  // First name validation (only if provided)
  if (firstName) {
    const nameRegex = /^[a-zA-Z\s-']{2,50}$/;
    if (!nameRegex.test(firstName)) {
      return NextResponse.json(
        {
          error:
            "Invalid first name. It must be 2-50 characters long and contain only letters, spaces, hyphens, or apostrophes.",
        },
        { status: 400 },
      );
    }
  }

  try {
    // Check if email already exists in the waitlist
    const emailExists = await redis.sismember(WAITLIST_EMAIL_KEY, email);
    if (emailExists) {
      console.log(`Email ${email} already in waitlist. Skipping.`);
      return NextResponse.json({ message: "You have already joined the waitlist!" });
    }

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    // Add to Google Sheet
    await addToGoogleSheet({ email, firstName, ip, date, time });

    // Add email to Redis waitlist
    await redis.sadd(WAITLIST_EMAIL_KEY, email);
    console.log(`Added email ${email} to Redis waitlist.`);

    // Send welcome email
    const { data, error: resendError } = await resend.emails.send({
      from: "Looprail <noreply@looprail.xyz>",
      to: email,
      subject: "Stop Losing 7.9% of Your Money. You’re Next.",
      react: JoinWaitlistEmail({ firstName }),
    });

    if (resendError) {
      console.error("Resend email sending failed:", resendError);
    } else {
      console.log("Resend email sent successfully:", data);
    }

    return NextResponse.json({ message: "Successfully joined the waitlist!" });
  } catch (error) {
    console.error("Unhandled error in POST /api/join-waitlist:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
