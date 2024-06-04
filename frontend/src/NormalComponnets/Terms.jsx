import { Helmet } from "react-helmet";

const Terms = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Terms & Conditions - Googly</title>
      </Helmet>

      <section className="bg-[#ebecf5]">
        <div className="max-w-5xl px-4 sm:px-6 py-28 mx-auto min-h-screen">
          <h2 className="poppin text-3xl lg:text-4xl font-bold tracking-wide">
            Term & Condition - Googly
          </h2>

          <div>
            <p className="mb-4 mt-3">
              Welcome to Googly. By accessing and using our website, you agree
              to comply with and be bound by the following terms and conditions.
              Please read them carefully.
            </p>
            <h2 className="mt-6 text-2xl font-bold mb-2">General Terms</h2>
            <p className="mb-4">
              By accessing our site, you agree to these terms and conditions. If
              you do not agree, please do not use our site. We reserve the right
              to modify these terms at any time, and it is your responsibility
              to check for updates.
            </p>
            <h2 className="mt-6 text-2xl font-bold mb-2">Use of Our Site</h2>
            <p className="mb-4">
              You may use our site for lawful purposes only. You must not use
              our site in any way that breaches any applicable local, national,
              or international law or regulation.
            </p>
            <h2 className="mt-6 text-2xl font-bold mb-2">
              Intellectual Property
            </h2>
            <p className="mb-4">
              All content on our site, including text, graphics, logos, images,
              and software, is the property of Googly or its content suppliers
              and is protected by international copyright laws. Unauthorized use
              of this content is prohibited.
            </p>
            <h2 className="mt-6 text-2xl font-bold mb-2">
              Product Information
            </h2>
            <p className="mb-4">
              We strive to ensure that all product information on our site is
              accurate. However, we do not warrant that product descriptions or
              other content is accurate, complete, reliable, current, or
              error-free.
            </p>
            <h2 className="mt-6 text-2xl font-bold mb-2">
              Limitation of Liability
            </h2>
            <p className="mb-4">
              To the fullest extent permitted by law, Googly shall not be liable
              for any damages of any kind arising from the use of our site or
              from any information, content, materials, products, or services
              included on or otherwise made available to you through our site.
            </p>
            <h2 className="mt-6 text-2xl font-bold mb-2">Governing Law</h2>
            <p className="mb-4">
              These terms and conditions are governed by and construed in
              accordance with the laws of the jurisdiction in which Googly
              operates. You agree to submit to the exclusive jurisdiction of the
              courts in that jurisdiction.
            </p>
            <h2 className="mt-6 text-2xl font-bold mb-2">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these terms and conditions, please
              contact us at{" "}
              <a href="mailto:info@googly-smart.com">info@googly-smart.com</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Terms;
