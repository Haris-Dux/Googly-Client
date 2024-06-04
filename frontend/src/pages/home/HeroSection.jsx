import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { BsHandbag } from "react-icons/bs";
import "../../NormalComponnets/Header.css";
import "./Home.css";

const HeroSection = () => {
  const handleMoveTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section className="heroSectionbg min-h-[120vh] ">
        <div className="max-w-5xl xl:max-w-6xl xxl:max-w-7xl px-4 sm:px-16 lg:px-14 xl:px-0 pt-40 pb-0 lg:pt-24 lg:pb-0 mx-auto">
          <div className="items-center lg:flex lg:min-h-screen">
            <div className="w-full pt-0 sm:pt-0 lg:pt-0 lg:w-1/2 antialiased">
              <div className="lg:max-w-xl">
                <span
                  style={{ letterSpacing: "4px" }}
                  className="py-1 px-1.5 font-medium text-black bg-[#DEC344] text-[11px] lg:text-[13px]"
                >
                  GOOGLY
                </span>

                <h2 className="Noto max-w-sm mt-4 mb-6 text-5xl sm:text-7xl xl:text-8xl font-medium text-white tracking-normal">
                  Googly Eyeglasses Frames
                </h2>
                <p className="pr-12 sm:pr-0 mb-8 text-lg sm:text-xl sm:max-w-md text-white">
                  Elevate your look with quality designs that blend fashion and
                  function perfectly.
                </p>

                {/* BUTTON BAR */}
                <Link
                  to="/shop"
                  onClick={handleMoveTop}
                  className="text-white w-40 flex justify-center items-center gap-2 text-md font-medium bg-black text-center py-[0.85rem]"
                >
                  <span>Shop Now</span>
                  <IoIosArrowForward className="mt-0.5 font-bold" size={17} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
