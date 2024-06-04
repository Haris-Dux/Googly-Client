import { useNavigate } from "react-router-dom";
import "./Home.css";

const HomeBlogs = () => {
  const navigate = useNavigate();

  // HANDLE SHOP
  const handleBlog = (name) => {
    navigate(`/${name}`);
    window.scroll({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <>
      <section className="w-full pt-20 pb-10">
        <div className="px-4 xl:px-0  max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="header text-center">
            <span
              style={{ letterSpacing: "4px" }}
              className="py-1 px-1.5 font-medium text-black bg-[#DEC344] text-[11px] lg:text-[13px]"
            >
              BLOG
            </span>
            <h2 className="Noto mt-2 text-2xl font-semibold md:text-4xl lg:text-5xl md:leading-tight">
              Popular Blog & News
            </h2>
            <p className="mt-2.5 text-gray-800">
              Stay ahead with news and stories that are shaping the future of
              industries.
            </p>
          </div>

          <div className="data">
            {/* <div className="mt-12 flex justify-center items-center flex-wrap gap-3 sm:gap-5 lg:gap-5"> */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 gap-y-6 lg:gap-5">
              <article
                onClick={() => handleBlog("blog")}
                className="overflow-hidden bg-[#F5F5F5] border border-gray-200 rounded-lg shadow transition hover:shadow-lg cursor-pointer"
              >
                <img
                  alt=""
                  src="https://cdn.shopify.com/s/files/1/0852/5099/8550/files/blog1.jpg?v=1717007698"
                  className="h-56 w-full object-cover"
                />

                <div className="p-4 sm:p-6">
                  <h3 className="mb-1 text-lg font-semibold text-gray-900">
                    How Sunglasses Stores Balance Style And UV Protection
                  </h3>

                  <time
                    dateTime="2024-02-10"
                    className="block text-xs text-gray-500"
                  >
                    {" "}
                    10th Feb 2024{" "}
                  </time>
                </div>
              </article>

              <article
                onClick={() => handleBlog("blog2")}
                className="overflow-hidden bg-[#F5F5F5] border border-gray-200 rounded-lg shadow transition hover:shadow-lg cursor-pointer"
              >
                <img
                  alt=""
                  src="https://cdn.shopify.com/s/files/1/0852/5099/8550/files/blog2.jpg?v=1717008217"
                  className="h-56 w-full object-cover"
                />

                <div className="p-4 sm:p-6">
                  <h3 className="mb-1 text-lg font-semibold text-gray-900">
                    The Cultural Significance Of Sunglasses In Pakistan
                  </h3>

                  <time
                    dateTime="2022-10-10"
                    className="block text-xs text-gray-500"
                  >
                    {" "}
                    11th March 2024{" "}
                  </time>
                </div>
              </article>

              <article
                onClick={() => handleBlog("blog3")}
                className="overflow-hidden bg-[#F5F5F5] border border-gray-200 rounded-lg shadow transition hover:shadow-lg cursor-pointer"
              >
                <img
                  alt=""
                  src="https://cdn.shopify.com/s/files/1/0852/5099/8550/files/blog3.jpg?v=1717008216"
                  className="h-56 w-full object-cover"
                />

                <div className="p-4 sm:p-6">
                  <h3 className="mb-1 text-lg font-semibold text-gray-900">
                    Virtual Adventures: Online Sunglasses Stores Unveiled
                  </h3>

                  <time
                    dateTime="2022-10-10"
                    className="block text-xs text-gray-500"
                  >
                    {" "}
                    7th May 2024{" "}
                  </time>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeBlogs;
