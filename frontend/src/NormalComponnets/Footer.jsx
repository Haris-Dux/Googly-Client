import { Link } from "react-router-dom";
import { FaPhone } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  const handleMoveToTop = () => {
    window.scroll(0, 0);
  };

  return (
    <>
      <footer className="w-full bg-[#F3F4F6] text-black">
        <div className="max-w-7xl mx-auto">
          {/* FOOTER UPPER PART  */}
          <div className="pt-20 pb-16 px-4 md:px-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-5">
            {/* LOGO & HEADING */}
            <div className="sm:col-span-2">
              <h1 className="max-w-lg flex items-center text-xl font-semibold tracking-tight text-black xl:text-2xl">
                <img className="w-auto h-16" src={"https://cdn.shopify.com/s/files/1/0649/1399/8024/files/25.3_KB_Size_Googly_Logo.png?v=1718027480"} alt="logo" />
              </h1>
              <p className="max-w-sm text-[1rem] mt-3">
                Welcome to Googly, where style meets vision! Explore our curated
                collection of trendy eyewear for men and women. Find the perfect
                frames that blend fashion and function effortlessly.
              </p>
            </div>

            {/* QUICK LINKS */}
            <div>
              <p className="text-xl font-semibold text-black">Quick Links</p>
              <div className="flex flex-col items-start mt-3 space-y-2">
                <Link
                  to="/"
                  onClick={handleMoveToTop}
                  className="text-black transition-colors duration-300 hover:underline hover:text-blue-500"
                >
                  Home
                </Link>
                <Link
                  to="/shop"
                  onClick={handleMoveToTop}
                  className="text-black transition-colors duration-300 hover:underline hover:text-blue-500"
                >
                  Shop
                </Link>
                <Link
                  to="/shop"
                  onClick={handleMoveToTop}
                  className="text-black transition-colors duration-300 hover:underline hover:text-blue-500"
                >
                  Men Glasses
                </Link>
                <Link
                  to="/shop"
                  onClick={handleMoveToTop}
                  className="text-black transition-colors duration-300 hover:underline hover:text-blue-500"
                >
                  Women Glasses
                </Link>
              </div>
            </div>

            {/* SHOP */}
            <div>
              <p className="text-xl font-semibold text-black">Useful Links</p>
              <div className="flex flex-col items-start mt-3 space-y-2">
                <Link
                  to="/about"
                  onClick={handleMoveToTop}
                  className="text-black transition-colors duration-300 hover:underline hover:text-blue-500"
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  onClick={handleMoveToTop}
                  className="text-black transition-colors duration-300 hover:underline hover:text-blue-500"
                >
                  Contact Us
                </Link>
                <Link
                  to="/privacy-policy"
                  onClick={handleMoveToTop}
                  className="text-black transition-colors duration-300 hover:underline hover:text-blue-500"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  onClick={handleMoveToTop}
                  className="text-black transition-colors duration-300 hover:underline hover:text-blue-500"
                >
                  Term & Condition
                </Link>
              </div>
            </div>

            {/* PRODUCT & CATEGORIES */}
            <div>
              <p className="text-xl font-semibold text-black">Contact Info</p>
              <div className="flex flex-col items-start mt-3 space-y-2">
                {/* PHONE NUMBER */}
                <a
                  href="tel:+92 310 5015888"
                  className="flex items-center gap-2"
                >
                  <FaPhone /> +92 310 5015888
                </a>
                <a
                      className="flex items-center justify-center gap-1.5 "
                      href="#"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5 shrink-0 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>

                      <a
                        href="mailto:support@googly-smart.com"
                        target="_blank"
                        className="sm:flex-1 text-black"
                      >
                        support@googly-smart.com
                      </a>
                    </a>


                {/* SOCIAL LINKS */}
                <div className="links pt-2 flex items-center justify-start gap-2.5">
                  <a
                    href="https://www.facebook.com/googlysmart.shop/"
                    target="_blank"
                    className=""
                  >
                    <FaFacebookF className="text-white bg-[#3c3b3b] h-7 w-7 p-1.5 rounded-full" />
                  </a>
                  <a
                    href="https://www.instagram.com/googlysmart.shop/"
                    target="_blank"
                    className=""
                  >
                    <FaInstagram className="text-white bg-[#3c3b3b] h-7 w-7 p-1.5 rounded-full" />
                  </a>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM PART  */}
        <div className="text-sm py-5 px-4 md:px-10 border-t bg-[#3c3b3b] text-center text-white">
          <p>Copyrights © 2024 All Rights Reserved by Googly</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
