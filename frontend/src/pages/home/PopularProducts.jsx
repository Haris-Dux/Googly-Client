import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPopularProductsAsync } from "@/features/productSlice";

// STAR RATING
const StarRating = ({rating}) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<FaStar key={i} className="text-[#FFC209]" />);
  }
  return <div className="flex">{stars}</div>;
};

const PopularProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const popularProducts = useSelector((state) => state.products.popularProducts);

  useEffect(() => {
    dispatch(getPopularProductsAsync());
  }, [])

  // HANDLE ITEM CLICK
  const handleItemClick = (id) => {
    navigate(`/selectedItem/${id}`);
    window.scroll(0, 0);
  };

  return (
    <>
      <section className="w-full bg-[#F5F5F5]">
        <div className="py-20 px-3 sm:px-5 xl:px-0 max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="header text-center">
            <span
              style={{ letterSpacing: "4px" }}
              className="py-1 px-1.5 font-medium text-black bg-[#DEC344] text-[11px] lg:text-[13px]"
            >
              POPULAR
            </span>
            <h2 className="Noto mt-2 text-2xl font-semibold md:text-4xl lg:text-5xl md:leading-tight">
              Popular Product
            </h2>
            <p className="mt-3 text-gray-600 dark:text-neutral-400">
              Explore our hottest picks! Discover the most sought-after eyewear
              styles loved by our customers.
            </p>
          </div>

          {/* DATA */}
          <div className="data">
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-x-4 lg:gap-y-7">
              {popularProducts?.map((data, index) => (
                <div
                  key={index}
                  onClick={() => handleItemClick(data?.id)}
                  className="group w-full max-w-full overflow-hidden bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-150  border border-gray-200"
                >
                  <img
                    className="object-cover w-full h-40 sm:h-56 transition duration-500 group-hover:scale-105"
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
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default PopularProducts;
