import { BsEmojiSunglasses } from "react-icons/bs";
import { RiGlassesFill } from "react-icons/ri";
import { RiCustomerServiceFill } from "react-icons/ri";
import { GiBoxUnpacking } from "react-icons/gi";

const Features = () => {
  return (
    <>
      <section className="w-full bg-black">
        <div className="max-w-7xl mx-auto py-11">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 gap-y-7 lg:gap-5 sm:px-8 px-4 text-white">
            {/* BOX 1 */}
            <div className="box1 flex justify-center items-center flex-col">
              <BsEmojiSunglasses size={36} className="mb-2.5 text-yellow-400 transition-transform duration-300 hover:-translate-y-1 cursor-pointer" />
              <h3 className="mb-1 text-md font-medium">EXCLUSIVE DESIGNS</h3>
            </div>

            {/* BOX 2 */}
            <div className="box1 flex justify-center items-center flex-col">
              <RiGlassesFill size={36} className="mb-2.5 text-yellow-400 transition-transform duration-300 hover:-translate-y-1 cursor-pointer" />
              <h3 className="mb-1 text-md font-medium">
                HIGH-QUALITY MATERIALS
              </h3>
            </div>

            {/* BOX 3 */}
            <div className="box1 flex justify-center items-center flex-col">
              <GiBoxUnpacking size={36} className="mb-2.5 text-yellow-400 transition-transform duration-300 hover:-translate-y-1 cursor-pointer" />
              <h3 className="mb-1 text-md font-medium">SUSTAINABLE PRODUCTS</h3>
            </div>

            {/* BOX 4 */}
            <div className="box1 flex justify-center items-center flex-col">
              <RiCustomerServiceFill
                size={36}
                className="mb-2.5 text-yellow-400 transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
              />
              <h3 className="mb-1 text-md font-medium">24H CUSTOMER SERVICE</h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
