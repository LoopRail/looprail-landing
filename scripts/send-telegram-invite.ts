import dotenv from "dotenv";

import { program } from "commander";
import { Resend } from "resend";
import TelegramInviteEmail from "../emails/telegram-invite";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

dotenv.config();


const resend = new Resend(process.env.RESEND_API_KEY!);

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(2, "60 s"), // 2 requests per 60 seconds
  analytics: true,
  prefix: "send_invite_ratelimit",
});

const WAITLIST_EMAIL_KEY = "waitlist_emails";

async function getWaitlistUsers(): Promise<string[]> {
  try {
    const emails = await redis.smembers(WAITLIST_EMAIL_KEY);
    return emails;
  } catch (error) {
    console.error("Error fetching emails from Redis:", error);
    return [];
  }
}

program
  .requiredOption("-t, --telegram-link <link>", "Telegram group link")
  .option("-e, --test-email <email>", "Send a test email to a specific address")
  .action(async (options) => {
    const { telegramLink, testEmail } = options;

    try {
      if (testEmail) {
        // Send a single test email
        const { data, error: resendError } = await resend.emails.send({
          from: "Looprail <noreply@looprail.xyz>",
          to: [testEmail],
          subject: "Test: You're Invited to the Looprail Telegram Group",
          react: TelegramInviteEmail({ telegramLink }),
        });
        console.log(data, resendError)
        console.log(`Test invitation sent to ${testEmail}`);
        return;
      }

      const emails = await getWaitlistUsers();

      if (emails.length === 0) {
        console.log("No users found in the waitlist.");
        return;
      }

      console.log(
        `Found ${emails.length} users. Starting to send invitations...`,
      );

      for (const email of emails) {
        const { success } = await ratelimit.limit("send_invite");

        if (!success) {
          console.log("Rate limit exceeded. Waiting 2 seconds...");
          await new Promise((res) => setTimeout(res, 1000 * 2)); 
        }


        try {
          const { data, error: resendError } = await resend.emails.send({
            from: "Looprail <noreply@looprail.xyz>",
            to: [email],
            subject: "You're Invited to the Looprail Telegram Group",
            react: TelegramInviteEmail({ telegramLink }),
          });
          console.log(data, resendError)
          console.log(`✓ Invitation sent to ${email}`);
        } catch (emailError) {
          console.error(`✗ Failed to send to ${email}:`, emailError);
        }
      }

      console.log("Finished sending invitations.");
    } catch (error) {
      console.error("Error sending invitations:", error);
      process.exit(1);
    }
  });

program.parse(process.argv);
