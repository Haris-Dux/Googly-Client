import "./Home.css";

const data = [
  {
    id: 1,
    image:
      "https://cdn.shopify.com/s/files/1/0852/5099/8550/files/logoipsum2.png?v=1714170861",
  },
  {
    id: 2,
    image:
      "https://cdn.shopify.com/s/files/1/0852/5099/8550/files/logoipsum3.png?v=1714170861",
  },
  {
    id: 1,
    image:
      "https://cdn.shopify.com/s/files/1/0852/5099/8550/files/logoipsum2.png?v=1714170861",
  },
  {
    id: 2,
    image:
      "https://cdn.shopify.com/s/files/1/0852/5099/8550/files/logoipsum3.png?v=1714170861",
  },
  {
    id: 1,
    image:
      "https://cdn.shopify.com/s/files/1/0852/5099/8550/files/logoipsum2.png?v=1714170861",
  },
  {
    id: 2,
    image:
      "https://cdn.shopify.com/s/files/1/0852/5099/8550/files/logoipsum3.png?v=1714170861",
  },
  {
    id: 1,
    image:
      "https://cdn.shopify.com/s/files/1/0852/5099/8550/files/logoipsum2.png?v=1714170861",
  },
  {
    id: 2,
    image:
      "https://cdn.shopify.com/s/files/1/0852/5099/8550/files/logoipsum3.png?v=1714170861",
  },
  {
    id: 1,
    image:
      "https://cdn.shopify.com/s/files/1/0852/5099/8550/files/logoipsum2.png?v=1714170861",
  },
  {
    id: 2,
    image:
      "https://cdn.shopify.com/s/files/1/0852/5099/8550/files/logoipsum3.png?v=1714170861",
  },
];

const Brands = () => {
  return (
    <>
      <section className="w-full py-14 px-4 xl:px-0">
        <div className="max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto lg:py-0">
          {/* HEADER */}
          <div className="header text-center">
            <span
              style={{ letterSpacing: "4px" }}
              className="py-1 px-1.5 font-medium text-black bg-[#DEC344] text-[11px] lg:text-[13px]"
            >
             OUR BRANDS
            </span>
          </div>
          {/* GRID */}
          <div className="mt-10 grid place-items-center gap-8 text-gray-300 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {data.map((data, index) => (
              <div key={index} className="flex justify-center items-center">
                <img className="up" src={data.image} alt="brands_img" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Brands;
