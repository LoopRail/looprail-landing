import {
  Html,
  Head,
  Img,
  Section,
  Text,
  Heading,
  Tailwind,
} from "@react-email/components";

interface TelegramInviteEmailProps {
  telegramLink?: string;
}

const baseUrl =
  process.env.ENV?.toLowerCase() === "prod"
    ? `https://${process.env.PROD_URL}`
    : "http://localhost:3001";

const TelegramInviteEmail = ({ telegramLink }: TelegramInviteEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>You're Invited to the Looprail Telegram Group</title>
      </Head>

      <Tailwind>

        {/* Body */}
        <Section className="px-8 py-10 font-sans text-black leading-relaxed">
          {/* Greeting */}
          <Heading className="mb-4 capitalize">
            You're Invited!
          </Heading>

          {/* Welcome */}
          <Text className="mb-6">
            Thank you for being one of the first to join the Looprail waitlist.
          </Text>

          <Text className="mb-6">
            We're building a strong community of pioneers who are ready to change the way money moves across Africa. As part of our inner circle, you get exclusive access to the team, behind-the-scenes updates, and a direct say in the future of Looprail.
          </Text>

          <Text className="mb-6">
            Join our exclusive Telegram group to connect with us and other members:
          </Text>

          <Text className="mb-6">
            <a href={telegramLink} className="text-blue-600">
              {telegramLink}
            </a>
          </Text>

          <Text className="mb-6">
            We can't wait to see you in there!
          </Text>

          <Text className="mb-0">
            Warmly,<br />
            The Looprail Team
          </Text>
        </Section>
      </Tailwind>
    </Html>
  );
};

TelegramInviteEmail.PreviewProps = { telegramLink: "https://t.me/looprail" };

export default TelegramInviteEmail;

