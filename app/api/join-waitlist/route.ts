import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import JoinWaitlistEmail from '@/emails/join-waitlist';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: 'Looprail <noreply@looprail.com>',
      to: email,
      subject: 'Welcome to the Looprail Waitlist!',
      react: JoinWaitlistEmail({ email }),
    });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
