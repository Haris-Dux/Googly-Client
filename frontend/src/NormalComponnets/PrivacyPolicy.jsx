import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Privacy Policy - Googly</title>
      </Helmet>

      <section className="bg-[#ebecf5]">
        <div className="max-w-5xl px-4 sm:px-6 py-28 mx-auto min-h-screen">
          <h2 className="poppin text-3xl lg:text-4xl font-bold tracking-wide">
            Privacy Policy - Googly
          </h2>

          <p className="mb-4 mt-3">
            At Googly, we are committed to safeguarding your privacy and
            ensuring that your personal information is protected. This Privacy
            Policy outlines how we collect, use, and protect your information
            when you use our services.
          </p>

          <h2 className="mt-6 text-2xl font-bold mb-2">
            What Information Do We Collect?
          </h2>
          <p className="mb-4">
            We collect information to provide and improve our services. This
            includes:
          </p>

          <ul className="list-disc list-inside mb-4">
            <li>
              Contact information: name, email address, and phone number for
              communication and support.
            </li>
            <li>
              Technical information: IP address, device type, and operating
              system for service improvement and troubleshooting.
            </li>
            <li>
              Usage data: pages visited and services used to understand and
              enhance user experience.
            </li>
          </ul>

          <h2 className="mt-6 text-2xl font-bold mb-2">
            How Do We Use Your Information?
          </h2>
          <p className="mb-4">We use the information collected to:</p>

          <ul className="list-disc list-inside mb-4">
            <li>Provide and manage our services.</li>
            <li>Process payments securely.</li>
            <li>Send updates, notifications, and marketing communications.</li>
            <li>Improve our services and user experience.</li>
            <li>Protect against fraud and abuse.</li>
          </ul>

          <h2 className="mt-6 text-2xl font-bold mb-2">
            Do We Share Your Information with Third Parties?
          </h2>
          <p className="mb-4">
            We do not share your personal information with third parties, except
            in the following situations:
          </p>

          <ul className="list-disc list-inside mb-4">
            <li>With your consent for specific purposes.</li>
            <li>
              To comply with legal obligations, such as court orders or legal
              processes.
            </li>
            <li>
              To protect our rights, users, and clients from fraud and abuse.
            </li>
          </ul>

          <h2 className="mt-6 text-2xl font-bold mb-2">
            How Do We Protect Your Information?
          </h2>
          <p className="mb-4">
            We implement reasonable security measures to protect your personal
            information from unauthorized access, use, or disclosure. However,
            please note that no method of transmission over the internet or
            electronic storage is completely secure.
          </p>

          <h2 className="mt-6 text-2xl font-bold mb-2">
            Changes to This Privacy Policy
          </h2>
          <p className="mb-4">
            We may update this Privacy Policy periodically. Any changes will be
            posted on this page, and we encourage you to review our Privacy
            Policy regularly to stay informed about how we protect your
            information.
          </p>

          <h2 className="mt-6 text-2xl font-bold mb-2">Contact Us</h2>
          <p className="mb-4">
            If you have any questions or concerns about this Privacy Policy,
            please contact us at{" "}
            <a href="mailto:info@googly-smart.com">info@googly-smart.com</a>
          </p>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
