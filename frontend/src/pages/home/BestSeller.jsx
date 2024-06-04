import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { getBestSellingProductsAsync } from "@/features/productSlice";

// STAR RATING
const StarRating = ({rating}) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<FaStar key={i} className="text-[#FFC209]" />);
  }
  return <div className="flex">{stars}</div>;
};

const BestSeller = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slidesToShow, setSlidesToShow] = useState(4);
  const products = useSelector((state) => state.products.BEstSellingProduct);
  const sliderRef = useRef(null);

  useEffect(() => {
    dispatch(getBestSellingProductsAsync())
  }, []);

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const settings = {
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setSlidesToShow(4); // Full Desktop view
      } else if (window.innerWidth >= 1024) {
        setSlidesToShow(3); // Desktop view
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(2); // Tablet view
      } else {
        setSlidesToShow(1); // Mobile view
      }
    };

    // Initial update
    handleResize();

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // HANDLE SHOP
  const handleShop = () => {
    navigate("/shop");
    window.scroll(0, 0);
  };

  // HANDLE ITEM CLICK
  const handleItemClick = (id) => {
    navigate(`/selectedItem/${id}`);
    window.scroll(0, 0);
  };

  return (
    <>
      <section className="w-full pt-20 pb-10">
        <div className="px-3 sm:px-5 xl:px-0 max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="header text-center">
            <span
              style={{ letterSpacing: "4px" }}
              className="py-1 px-1.5 font-medium text-black bg-[#DEC344] text-[11px] lg:text-[13px]"
            >
              BEST
            </span>
            <h2 className="Noto mt-2 text-2xl font-semibold md:text-4xl lg:text-5xl md:leading-tight">
              Best Seller
            </h2>
            <p className="mt-2.5 text-gray-800">
              Discover our top picks! Explore our best-selling eyewear that
              combines style, comfort, and quality.
            </p>
          </div>

          <div className="data">
            <div className="relative mt-8 sm:mt-12">
              <Slider ref={sliderRef} {...settings}>
                {products?.map((data, index) => (
                  <div
                    key={index}
                    onClick={() => handleItemClick(data?.id)}
                    className="mx-0 pb-7"
                  >
                    <div className="group max-w-[17rem] mx-auto overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-150 cursor-pointer border border-gray-200">
                      <img
                        className="object-cover w-full h-52 sm:h-56 transition duration-500 group-hover:scale-105"
                        src={data?.images?.primary?.downloadURL}
                        alt="products"
                      />

                      <div className="py-5 text-center">
                        <h3 className="mb-3 text-lg sm:text-xl font-semibold text-gray-800">
                          {data?.name}
                        </h3>

                        <div className="mb-3 flex items-center justify-center gap-0.5">
                          {data?.averageRating === 0 ? (
                            <FaStar className="text-white" />
                          ) : (
                            <StarRating rating={data?.averageRating} />
                          )}
                        </div>

                        {data?.sale_price > 0 ? (
                          <p className="mb-3 text-lg">
                            <span className="text-gray-400 line-through pr-1 font-semibold">
                              Rs.{data?.price}
                            </span>
                            <span className="text-red-500 font-semibold">
                              Rs.{data?.sale_price}
                            </span>
                          </p>
                        ) : (
                          <>
                            <p className="mb-3 text-lg">
                              <span className="text-gray-800 font-semibold">
                                Rs.{data?.price}
                              </span>
                            </p>
                          </>
                        )}

                        <button className="text-sm px-5 py-2 bg-black text-white font-semibold">
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>

              <div className="slider_button sm:hidden flex flex-row justify-center">
                {/* left arrow */}
                <button
                  onClick={previous}
                  className="mx-1.5 inline-block rounded-full border text-white bg-[#DEC344] hover:text-white border-[#DEC344] hover:bg-[#dec244db] p-2.5 focus:outline-none"
                >
                  <IoIosArrowBack size={22} />
                </button>

                {/* right arrow */}
                <button
                  onClick={next}
                  className="mx-1.5 inline-block rounded-full border text-white bg-[#DEC344] hover:text-white border-[#DEC344] hover:bg-[#dec244db] p-2.5 focus:outline-none"
                >
                  <IoIosArrowForward size={22} />
                </button>
              </div>

              <button
                onClick={previous}
                className="ml-8 xl:ml-0 absolute top-[40%] -left-4 mx-1.5 hidden sm:inline-block rounded-full border text-white bg-[#DEC344] hover:text-white border-[#DEC344] hover:bg-[#dec244db] p-2.5 focus:outline-none"
              >
                <IoIosArrowBack size={22} />
              </button>

              <button
                onClick={next}
                className="mr-8 xl:mr-0 absolute top-[40%] -right-4 mx-1.5 hidden sm:inline-block rounded-full border text-white bg-[#DEC344] hover:text-white border-[#DEC344] hover:bg-[#dec244db] p-2.5 focus:outline-none"
              >
                <IoIosArrowForward size={22} />
              </button>
            </div>
          </div>

          <div className="buttons mt-14 flex justify-center items-center">
            <button
              onClick={handleShop}
              className="px-6 py-3 text-md font-semibold flex justify-center items-center gap-1 border border-black hover:bg-black hover:text-white transition-colors duration-150"
            >
              <span>View All Products</span>{" "}
              <IoIosArrowForward className="mt-0.5" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default BestSeller;
