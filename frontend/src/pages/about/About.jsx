import { IoIosArrowForward } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TfiArrowCircleDown } from "react-icons/tfi";
import "./about.css";

const About = () => {
  const ToDown = () => {
    window.scrollTo({
      top: 470,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section className="aboutSectionbg relative">
        <div className="px-5 md:px-7 xl:px-0 max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto">
          <div className="pt-24 lg:pt-10 grid place grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 min-h-[65vh]">
            {/* LEFT SIDE */}
            <div className="flex items-end lg:items-center justify-center lg:justify-start">
              <div className="content text-center lg:text-start">
                <span
                  style={{ letterSpacing: "4px" }}
                  className="py-1 px-1.5 font-medium text-black bg-[#DEC344] text-[11px] lg:text-[13px]"
                >
                  ABOUT
                </span>

                <h2 className="Noto mt-4 mb-6 text-4xl md:text-5xl font-medium text-white tracking-normal">
                  About
                </h2>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="-mt-10 lg:mt-0 flex items-start lg:items-center justify-center lg:justify-end">
              <h2 className="mt-6 flex items-center gap-2 text-left font-normal text-white text-md md:text-lg">
                <Link
                  to="/"
                  className="flex items-center gap-1 hover:underline hover:underline-offset-4"
                >
                  <FaHome />
                  Home
                </Link>{" "}
                <IoIosArrowForward />
                About
              </h2>
            </div>
          </div>
        </div>
        <div className="arrow absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={ToDown}>
            <TfiArrowCircleDown
              size={30}
              className="text-gray-50 font-semibold cursor-pointer"
            />
          </button>
        </div>
      </section>

      <section id="here" className="py-3 lg:py-16 px-4 sm:px-4 xl:px-0">
        <div className="max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto">
          {/* FIRST CARD */}
          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
            {/* LEFT SIDE */}
            <div className="left_img group overflow-hidden">
              <img
                className="transition duration-500 group-hover:scale-105 w-full"
                src="https://cdn.shopify.com/s/files/1/0852/5099/8550/files/2543.jpg?v=1717101293"
                alt=""
              />
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center">
              <div className="ml-2 lg:ml-10">
                <span
                  style={{ letterSpacing: "4px" }}
                  className="py-1 px-1.5 font-medium text-black bg-[#DEC344] text-[11px] lg:text-[13px]"
                >
                  EYEWEAR
                </span>
                <h2 className="mt-3 Noto mb-1.5 sm:mb-3 text-2xl md:text-3xl font-semibold">
                  Innovative Urban Eyewear
                </h2>
                <p className="mb-7 sm:mb-7 lg:mb-7 text-md max-w-full">
                  Experience the pinnacle of fashion with Googly's eyewear,
                  inspired by the vibrant and dynamic spirit of New York City.
                  Our frames are meticulously crafted to reflect the energy and
                  sophistication of urban life, offering you the perfect blend
                  of style and functionality.
                </p>

                <p className="mb-7 sm:mb-7 lg:mb-7 text-md max-w-full">
                  Each piece in our collection showcases exceptional attention
                  to detail and superior craftsmanship. We combine cutting-edge
                  design with timeless elegance, ensuring our eyewear not only
                  enhances your vision but also elevates your personal style.
                  Discover eyewear that captures the essence of modern urban
                  living with Googly.
                </p>
              </div>
            </div>
          </div>

          {/* SECOND CARD */}
          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
            {/* LEFT SIDE */}
            <div className="flex items-center">
              <div className="ml-2 sm:ml-0 mr-0 lg:mr-10">
                <span
                  style={{ letterSpacing: "4px" }}
                  className="py-1 px-1.5 font-medium text-black bg-[#DEC344] text-[11px] lg:text-[13px]"
                >
                  MISSION
                </span>
                <h2 className="mt-3 Noto mb-1.5 sm:mb-3 text-2xl md:text-3xl font-semibold">
                  Our Mission
                </h2>
                <p className="mb-7 sm:mb-7 lg:mb-7 text-md max-w-full">
                  At Googly, our mission is to revolutionize eyewear by
                  combining exceptional design, superior quality, and unmatched
                  comfort. We are dedicated to crafting eyewear that not only
                  enhances your vision but also elevates your personal style.
                  Our commitment to innovation and excellence drives us to
                  continuously improve and set new standards in the industry.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="left_img group overflow-hidden">
              <img
                className="transition duration-500 object-fill group-hover:scale-105 w-full"
                src="https://cdn.shopify.com/s/files/1/0852/5099/8550/files/118966.jpg?v=1717101726"
                alt=""
              />
            </div>
          </div>

          {/* THIRD CARD */}
          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
            {/* LEFT SIDE */}
            <div className="left_img group overflow-hidden">
              <img
                className="transition duration-500 group-hover:scale-105 w-full"
                src="https://cdn.shopify.com/s/files/1/0852/5099/8550/files/design-sect-pn1nv6oznl5nueqhyuiyembh9zgfumb1p6pl4obwc4.jpg?v=1716422494"
                alt=""
              />
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center">
              <div className="ml-2 lg:ml-10">
                <span
                  style={{ letterSpacing: "4px" }}
                  className="py-1 px-1.5 font-medium text-black bg-[#DEC344] text-[11px] lg:text-[13px]"
                >
                  VISION
                </span>
                <h2 className="mt-3 Noto mb-1.5 sm:mb-3 text-2xl md:text-3xl font-semibold">
                  Our Vision
                </h2>
                <p className="mb-7 sm:mb-7 lg:mb-7 text-md max-w-full">
                  At Googly, our vision is to redefine the eyewear industry
                  through innovation and creativity. We aspire to be the leading
                  brand in eyewear fashion, offering unique and stylish designs
                  that cater to diverse tastes and preferences. Our goal is to
                  blend cutting-edge technology with contemporary aesthetics,
                  ensuring that our products not only improve vision but also
                  make a bold fashion statement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
