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
  process.env.ENV?.toLowerCase() === "test"
    ? `https://${process.env.VERCEL_URL}`
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
            src={`${baseUrl}/banner.svg`}
            alt="Looprail Banner"
            className="w-full block"
          />
        </Section>

        {/* Body */}
        <Section className="px-8 py-10 font-sans text-black leading-relaxed">
          {/* Main heading */}
          <Heading as="h1" className="text-[26px] font-bold mb-1">
            Welcome to LoopRail,
          </Heading>

          {/* Subheading */}
          <Heading as="h2" className="text-[20px] font-semibold mb-6">
            The smart & simple way to send, build and grow.
          </Heading>

          {/* Greeting */}
          <Text className="mb-4 capitalize">
            Hi{firstName ? <strong> {firstName}</strong> : ''},
          </Text>

          {/* Bold intro */}
          <Text className="mb-6">
            <strong>Welcome aboard,</strong> you’ve just taken a smart step
            towards financial empowerment across borders.
          </Text>

          <Text className="mb-6">
            Every dollar you spend helps build your credit and every transfer
            home strengthens your financial profile.
          </Text>

          <Text className="mb-6">
            At LoopRail, sending money or making payments shouldn’t be a burden.
            That’s why we crafted a secure, reliable, and transparent platform
            that delivers excellence every step of the way.
          </Text>

          {/* First Move Steps */}
          <Heading as="h3" className="text-[18px] font-bold mb-3">
            Here’s your first move:
          </Heading>

          <Text className="mb-2">1. Download and open the Looprail app.</Text>

          <Text className="mb-2">
            2. Complete your profile & KYC in under 5 minutes.
          </Text>

          <Text className="mb-6">
            3. Make your first transfer. Even a small one starts your credit
            journey.
          </Text>

          <Text className="mb-6">
            We’re excited to have you with us and we’re committed to helping you
            turn every financial move into real opportunity, credit, control,
            and global peace of mind.
          </Text>

          <Text className="mb-0">
            Need help getting started or stuck on a step? Just reply to this
            email. We’re here 24/7.
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
            <strong>A note from the LoopRail Team:</strong> Thank you for
            joining LoopRail! We’re thrilled to have you on board and look
            forward to helping you make your financial journey smarter and
            easier. Your feedback and questions are always welcome.
          </Text>

          <Text className="mt-4">— The LoopRail Team</Text>
        </Section>
      </Tailwind>
    </Html>
  );
};

JoinWaitlistEmail.PreviewProps = { firstName: "Alex" };

export default JoinWaitlistEmail;
