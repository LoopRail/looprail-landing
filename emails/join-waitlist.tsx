import {
  Html,
  Head,
  Img,
  Section,
  Text,
  Heading,
  Tailwind,
} from "@react-email/components";

interface JoinWaitlistEmailProps {
  firstName?: string;
}

const baseUrl =
  process.env.ENV?.toLowerCase() === "prod"
    ? `https://${process.env.PROD_URL}`
    : "http://localhost:3001";

const JoinWaitlistEmail = ({ firstName }: JoinWaitlistEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Welcome to LoopRail</title>
      </Head>

      <Tailwind>
        {/* Banner */}
        <Section className="w-full">
          <Img
            src={`${baseUrl}/banner.png`}
            alt="Looprail Banner"
            className="w-full block"
          />
        </Section>

        {/* Body */}
        <Section className="px-8 py-10 font-sans text-black leading-relaxed">
          {/* Greeting */}
          <Text className="mb-4 capitalize">
            Hi{firstName ? <strong> {firstName}</strong> : ''},
          </Text>

          {/* Welcome */}
          <Text className="mb-6">
            <strong>Welcome to the Looprail movement!</strong>
          </Text>

          <Text className="mb-6">
            You just made a smart move. By joining the waitlist, you have officially chosen to stop participating in the old system that silently taxes the African diaspora and tourists.
          </Text>

          <Text className="mb-6">
            The frustration is real: when you send money home or travel to the continent, you shouldn't lose nearly <strong>7.9%</strong> (the average remittance cost) of your hard-earned funds just to fees and bad rates. That money belongs in the local economy, not in a bank’s ledger.
          </Text>

          <Text className="mb-6">
            <strong>The New Way: Your Money. Your Rate. Your Africa.</strong>
          </Text>

          <Text className="mb-6">
            Looprail is a stablecoin-first payment rail designed to make your money feel local, instantly.
          </Text>

          <Text className="mb-6">
            As a waitlist member, you are now part of a select group that will get:
          </Text>

          <Text className="mb-2">
            <strong>Early Access:</strong> Be one of the very first to send and spend with Looprail when we launch the beta.
          </Text>
          <Text className="mb-2">
            <strong>Exclusive Perks:</strong> Receive special introductory fee reductions and rewards (only for our pioneer members).
          </Text>
          <Text className="mb-6">
            <strong>Insider Updates:</strong> Direct access to our roadmap and the story behind the technology.
          </Text>

          <Text className="mb-6">
            <strong>What Happens Next?</strong>
          </Text>

          <Text className="mb-6">
            We’re putting the final touches on our launch corridor (starting with Nigeria!), which is expected to open in the coming weeks/months.
          </Text>

          <Text className="mb-6">
            In the meantime, we will send occasional, non-spammy updates to keep you informed. For the fastest news and behind-the-scenes content, join the community where we announce everything first:
          </Text>

          <Text className="mb-6">
            <a href="https://x.com/LooprailHQ" className="text-blue-600">
              https://x.com/LooprailHQ
            </a>
          </Text>

          <Text className="mb-6">
            We’re excited to put the power back in your pocket. Thank you for being a pioneer of borderless finance.
          </Text>

          <Text className="mb-0">
            Warmly,<br />
            The Looprail Team
          </Text>
        </Section>

        {/* Footer */}
        <Section className="px-8 py-6 font-sans text-gray-700 text-sm border-t border-gray-200">
          <Text className="mb-2">
            Contact us anytime at{" "}
            <a href="mailto:support@looprail.xyz" className="text-blue-600">
              support@looprail.xyz
            </a>
            .
          </Text>

          <Text>
            <strong>A note from the LoopRail Team:</strong> Thank you for joining LoopRail! We’re thrilled to have you on board and look forward to helping you make your financial journey smarter and easier. Your feedback and questions are always welcome.
          </Text>

          <Text className="mt-4">— The LoopRail Team</Text>
        </Section>
      </Tailwind>
    </Html>
  );
};

JoinWaitlistEmail.PreviewProps = { firstName: "Alex" };

export default JoinWaitlistEmail;

