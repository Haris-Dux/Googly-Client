import { useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearProducts, getAllProductsAsync } from "@/features/productSlice";


// STAR RATING
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<FaStar key={i} size={18} className="mx-0.5 text-[#FFC209]" />);
  }
  return <div className="flex">{stars}</div>;
};



const SearchModal = ({ isOpen, closeModal, isModalOpen }) => {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, closeModal]);

  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    if (searchQuery) {
      const timer = setTimeout(() => {
        dispatch(getAllProductsAsync({ category: "All", search: searchQuery }));
      }, 500);
      return () => clearTimeout(timer);
    } else {
      dispatch(clearProducts());
    }
  }, [dispatch, searchQuery])


  const handleSearch = (e) => {
    const query = e.target.value.trim();
    setSearchQuery(query)
  }


  return (
    <>
      {isModalOpen && (
        <div
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full min-h-screen bg-gray-800 bg-opacity-50"
        >
          <div className="relative inset-0 z-50 mt-28 flex justify-center items-start w-full h-full overflow-y-auto">
            <div
              ref={modalRef}
              className="relative bg-white/80 rounded-xl py-6 px-4 w-full max-w-5xl max-h-full overflow-y-auto"
            >
              <div className="px-2 content flex justify-between items-center text-black font-semibold text-xl antialiased">
                <h2>Search Glasses Here:</h2>
                <button
                  className="hover:bg-gray-200 p-2 rounded-xl"
                  onClick={closeModal}
                >
                  <IoCloseSharp size={24} />
                </button>
              </div>
              <div className="mt-3">
                <input
                  type="search"
                  id="default-search"
                  className="py-3 px-2.5 border border-gray-700 w-full rounded-xl placeholder:text-gray-800"
                  placeholder="Search here..."
                  defaultValue={searchQuery}
                  onChange={handleSearch}
                />
                <div className="px-1 mt-6 overflow-y-auto">

                  {searchQuery && (
                    products?.productData && products.productData.length > 0 ? (
                      products.productData.slice(0, 6).map((data, index) => (
                        <div
                          key={index}
                          className="grid place grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 px-5 py-2.5 bg-white hover:bg-gray-100 cursor-pointer text-md antialiased font-medium rounded-lg my-1.5"
                        >
                          {/* NAME */}
                          <div className="name min-w-xs">
                            <h2 className="">{data?.name}</h2>
                          </div>

                          {/* PRICE */}
                          <div className="price flex justify-center text-start min-w-[14rem] mx-auto">
                            {data?.sale_price > 0 ? (
                              <p className="text-lg flex justify-start text-start">
                                <span className="text-gray-400 line-through pr-1 font-semibold">
                                  Rs.{data?.price}
                                </span>
                                <span className="text-red-500 font-semibold">
                                  Rs.{data?.sale_price}
                                </span>
                              </p>
                            ) : (
                              <p className="text-lg text-start">
                                <span className="text-gray-800 font-semibold">
                                  Rs.{data?.price}
                                </span>
                              </p>
                            )}
                          </div>

                          {/* STARS */}
                          <div className="star flex justify-end items-center">
                            <p className="">
                              {data?.averageRating === 0 ? (
                                <FaStar className="text-white" />
                              ) : (
                                <StarRating rating={data?.averageRating} />
                              )}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500">
                        No matching products found
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default SearchModal;
