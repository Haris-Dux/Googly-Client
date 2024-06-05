import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdPhone } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import { MdLocationPin } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { TfiArrowCircleDown } from "react-icons/tfi";
import "./Contact.css";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "/api/contact/createContact",
        formdata
      );
      if (response.status === 201) {
        setFormdata({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        toast.success(response.data.msg);
        setLoading(false);
      }
    } catch {
      setLoading(false);
      toast.error("Request Failed");
    }
  };

  const ToDown = () => {
    window.scrollTo({
      top: 470,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section className="contactSectionbg relative">
        <div className="px-5 md:px-7 xl:px-0 max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto">
          <div className="pt-24 lg:pt-10 grid place grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 min-h-[65vh]">
            {/* LEFT SIDE */}
            <div className="flex items-end lg:items-center justify-center lg:justify-start">
              <div className="content text-center lg:text-start">
                <span
                  style={{ letterSpacing: "4px" }}
                  className="py-1 px-1.5 font-medium text-black bg-[#DEC344] text-[11px] lg:text-[13px]"
                >
                  CONTACT US
                </span>

                <h2 className="Noto mt-4 mb-6 text-4xl md:text-5xl font-medium text-white tracking-normal">
                  Contact Us
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
                Contact
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

      <section id="here" className="pt-0 sm:pt-0 bg-white px-0 sm:px-4">
        <div className="xl:max-w-6xl lg:max-w-5xl max-w-xl mx-auto min-h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full">
            {/* --------------- LEFT --------------- */}
            <div className="left px-4 sm:px-10 py-16 bg-[#161616] text-white">
              <div className="content text-center lg:text-start">
                <span
                  style={{ letterSpacing: "4px" }}
                  className="py-1 px-1.5 font-medium text-black bg-[#DEC344] text-[11px] lg:text-[13px]"
                >
                  CONTACT
                </span>

                <h2 className="Noto mt-4 mb-6 text-4xl md:text-5xl font-medium text-white tracking-normal">
                  Get In Touch
                </h2>

                <p className="text-gray-300 py-3">
                  Have questions or need assistance? Our team is here to help!
                  Reach out to us for any inquiries or support, and we'll get
                  back to you promptly.
                </p>

                <div className="mt-6 space-y-8 md:mt-6 flex flex-col justify-center items-center sm:block">
                  <p className="flex items-start">
                    <MdPhone className="text-white size-9 p-2" />
                    <a
                      href="tel:+92 310 5015888"
                      className="mt-1 mx-3 text-gray-300 tracking-wide"
                    >
                      +92 310 5015888
                    </a>
                  </p>

                  <p className="flex items-start">
                    <IoMail className="text-white size-9 p-2" />
                    <span className="mx-3 mt-1 text-gray-300 text-wrap">
                      support@googly-smart.com
                    </span>
                  </p>

                  <p className="flex items-start">
                    <MdLocationPin className="text-white size-9 p-2" />
                    <span className="mx-3 mt-1 text-gray-300 text-wrap">
                      2155 Briarwood Drive Camden, NJ 08102
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* --------------- RIGHT --------------- */}
            <div className="right bg-[#F5F5F5] border border-gray-400">
              <div className="w-full px-4 sm:px-10 py-10 mx-auto overflow-hidden rounded-lg shadow-2xl lg:max-w-xl">
                <h2 className="playfair mt-2 pb-2 text-4xl font-bold text-black">
                  Send A Message
                </h2>
                <p className="mt-2 text-black">
                  Have something to say? Drop us a message and we’ll get back to
                  you as soon as possible.
                </p>
                {/* FORM */}
                <form className="mt-6" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input
                      className="block w-full px-3 py-3 mt-2 text-gray-700 placeholder-gray-700 bg-[#F7F7F7] border border-gray-500 rounded-md focus:outline-none focus:shadow-md"
                      placeholder="Enter Full Name"
                      type="text"
                      value={formdata.name}
                      onChange={(e) =>
                        setFormdata({ ...formdata, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <input
                      className="block w-full px-3 py-3 mt-2 text-gray-700 placeholder-gray-700 bg-[#F7F7F7] border border-gray-500 rounded-md focus:outline-none focus:shadow-md"
                      placeholder="Enter Your Email Address"
                      type="email"
                      value={formdata.email}
                      onChange={(e) =>
                        setFormdata({ ...formdata, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <input
                      className="block w-full px-3 py-3 mt-2 text-gray-700 placeholder-gray-700 bg-[#F7F7F7] border border-gray-500 rounded-md focus:outline-none focus:shadow-md"
                      placeholder="Enter Your Phone Number"
                      type="number"
                      value={formdata.phone}
                      onChange={(e) =>
                        setFormdata({ ...formdata, phone: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="w-full mt-4">
                    <textarea
                      className="block w-full px-3 py-3 mt-2 text-gray-700 placeholder-gray-700 bg-[#F7F7F7] border border-gray-500 rounded-md focus:outline-none focus:shadow-md"
                      placeholder="Enter Your Message"
                      value={formdata.message}
                      onChange={(e) =>
                        setFormdata({ ...formdata, message: e.target.value })
                      }
                    />
                  </div>

                  <div className="mt-5 flex justify-start items-center">
                    {loading ? (
                      <button className="h-11 px-10 w-full sm:max-w-40 bg-[#252525] text-white">
                        <div
                          className="animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent text-white  rounded-full "
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="h-11 px-10 w-full sm:max-w-40 hover:bg-black bg-[#252525] text-white"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
