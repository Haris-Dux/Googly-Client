import { IoIosArrowForward } from "react-icons/io";
import "./Shop.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PopularProducts from "../home/PopularProducts";
import { FaHome } from "react-icons/fa";
import { TfiArrowCircleDown } from "react-icons/tfi";
import { FaStar } from "react-icons/fa";
import { getAllProductsAsync } from "../../features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// STAR RATING
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<FaStar key={i} className="text-[#FFC209]" />);
  }
  return <div className="flex">{stars}</div>;
};

const Shop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allproducts = useSelector((state) => state.products.products || []);
  const loading = useSelector((state) => state.products.Productloading);
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const category = searchParams.get("category") || "All";

  useEffect(() => {
    dispatch(getAllProductsAsync({ category, page }));
  }, [dispatch, page, category]);

  const ToDown = () => {
    window.scrollTo({
      top: 470,
      behavior: "smooth",
    });
  };

  const renderPaginationLinks = () => {
    const totalPages = allproducts?.totalPages;
    const paginationLinks = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationLinks.push(
        <li key={i} onClick={ToDown}>
          <Link
            to={`/shop?category=${category}&page=${i}`}
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 ${
              i === page ? "bg-[#ccb343] text-white" : "hover:bg-gray-100"
            }`}
            onClick={() => dispatch(getAllProductsAsync({ category, page: i }))}
          >
            {i}
          </Link>
        </li>
      );
    }
    return paginationLinks;
  };

  // HANDLE ITEM CLICK
  const handleItemClick = (id) => {
    navigate(`/selectedItem/${id}`);
    window.scroll(0, 0);
  };

  return (
    <>
      <section className="shopSectionbg relative">
        <div className="px-5 md:px-7 xl:px-0 max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto">
          <div className="pt-24 lg:pt-10 grid place grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 min-h-[65vh]">
            {/* LEFT SIDE */}
            <div className="flex items-end lg:items-center justify-center lg:justify-start">
              <div className="content text-center lg:text-start">
                <span
                  style={{ letterSpacing: "4px" }}
                  className="py-1 px-1.5 font-medium text-black bg-[#DEC344] text-[11px] lg:text-[13px]"
                >
                  SHOP
                </span>

                <h2 className="Noto mt-4 mb-6 text-4xl md:text-5xl font-medium text-white tracking-normal">
                  Shop
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
                Shop
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

      <section id="here" className="w-full pt-16 pb-10">
        <div className="px-3 sm:px-5 xl:px-0  max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="header text-center">
            <span
              style={{ letterSpacing: "4px" }}
              className="py-1 px-1.5 font-medium text-black bg-[#DEC344] text-[11px] lg:text-[13px]"
            >
              GLASSES
            </span>
            <h2 className="Noto mt-2 text-2xl font-semibold md:text-5xl md:leading-tight">
              All Products
            </h2>
            <p className="mt-2.5 text-gray-600">
              Explore our entire collection of stylish and innovative eyewear.
              Find the perfect pair to match your unique style.
            </p>
          </div>

          <div className="data">
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-x-4 lg:gap-y-7">
              {!loading ? (
                <>
                  {allproducts?.productData?.map((data, index) => (
                    <div
                      key={index}
                      onClick={() => handleItemClick(data?.id)}
                      className="group w-full max-w-full overflow-hidden bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-150  border border-gray-200"
                    >
                      <img
                        className="object-cover w-full h-40 sm:h-56 transition duration-500 group-hover:scale-105"
                        src={data?.images?.primary?.downloadURL}
                        alt={data?.name}
                      />

                      <div className="py-5 text-center overflow-hidden">
                        <h3 className="mb-3 text-lg sm:text-xl font-semibold text-gray-800">
                          {data.name}
                        </h3>

                        <div className="mb-3 flex items-center justify-center gap-0.5">
                          {data?.averageRating === 0 ? (
                            <FaStar className="text-white" />
                          ) : (
                            <StarRating rating={data?.averageRating} />
                          )}
                        </div>

                        {data.sale_price > 0 ? (
                          <p className="mb-3 text-lg">
                            <span className="text-gray-400 line-through pr-1 font-semibold">
                              Rs.{data.price}
                            </span>
                            <span className="text-red-500 font-semibold">
                              Rs.{data.sale_price}
                            </span>
                          </p>
                        ) : (
                          <>
                            <p className="mb-3 text-lg">
                              <span className="text-gray-800 font-semibold">
                                Rs.{data.price}
                              </span>
                            </p>
                          </>
                        )}

                        <button
                          onClick={() => handleItemClick(data?.id)}
                          className="text-sm px-5 py-2 bg-black text-white font-semibold"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {[0, 1, 2, 3, 4, 5].map((_data, index) => (
                    <div key={index}>
                      <div className="group mb-5 relative rounded-lg w-full bg-white border border-gray-300 cursor-pointer animate-pulse">
                        <div className="bg-gray-300 h-56 w-full"></div>

                        <div className="py-5 text-center">
                          <div className="bg-gray-300 h-5 w-3/4 mx-auto mb-2 rounded-lg"></div>
                          <div className="flex items-center justify-center gap-1 mb-2">
                            <div className="bg-gray-300 h-4 w-4 rounded-full"></div>
                            <div className="bg-gray-300 h-4 w-4 rounded-full"></div>
                            <div className="bg-gray-300 h-4 w-4 rounded-full"></div>
                            <div className="bg-gray-300 h-4 w-4 rounded-full"></div>
                            <div className="bg-gray-300 h-4 w-4 rounded-full"></div>
                          </div>
                          <div className="bg-gray-300 h-4 w-1/2 mx-auto mb-2 rounded-lg"></div>
                          <div className="bg-gray-300 h-5 w-1/3 mx-auto mb-2 rounded-lg"></div>
                          <div className="bg-gray-300 h-4 w-1/4 mx-auto mb-3 rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <nav aria-label="Page navigation example">
              <ul className="flex items-center -space-x-px h-8 py-10 text-sm">
                <li>
                  {allproducts?.page > 1 ? (
                    <Link
                      onClick={ToDown}
                      to={`/shop?category=${category}&page=${page - 1}`}
                      className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="w-2.5 h-2.5 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 1 1 5l4 4"
                        />
                      </svg>
                    </Link>
                  ) : (
                    <button
                      className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg cursor-not-allowed"
                      disabled
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="w-2.5 h-2.5 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 1 1 5l4 4"
                        />
                      </svg>
                    </button>
                  )}
                </li>
                {renderPaginationLinks()}
                <li>
                  {allproducts?.totalPages !== page ? (
                    <Link
                      onClick={ToDown}
                      to={`/shop?category=${category}&page=${page + 1}`}
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="w-2.5 h-2.5 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                    </Link>
                  ) : (
                    <button
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg cursor-not-allowed"
                      disabled
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="w-2.5 h-2.5 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                    </button>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <PopularProducts />
    </>
  );
};

export default Shop;
