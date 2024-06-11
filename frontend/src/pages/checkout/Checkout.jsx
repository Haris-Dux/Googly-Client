import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateuserAsync, userSessionAsync } from "../../features/authSlice";
import { createOrderAsync, getallOrderAsync } from "../../features/orderSlice";
import { Helmet } from "react-helmet";
import { clearCart } from "../../features/ActionsSlice";
import { verifyCouponAsync } from "../../features/couponSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loaders";

const Checkout = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const [coupon, setCoupon] = useState("");

  const { loading } = useSelector((state) => state.orders);

  const user = useSelector((state) => state.auth.user);
  const userID = user?.user?.id;

  const [formData, setFormData] = useState({
    phone: user?.user?.phone || 0,
    address: user?.user?.address || "",
    postal_code : user?.user?.postal_code || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const [showCouponInput, setShowCouponInput] = useState(false);

  const handleCouponButtonClick = () => {
    setShowCouponInput(!showCouponInput);
  };

  const { cart, totalPrice } = useSelector((state) => state.action);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [cart, navigate, user]);

  const handleMoveTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [couponSuccessData, setCouponSuccessData] = useState({
    code: "",
    discount: 0,
    discountAmount: 0,
    couponDiscountSuccess: false,
  });

  const couponData = {
    code: coupon,
    discount: couponSuccessData?.discountAmount,
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = userID;
    dispatch(updateuserAsync({ id, ...formData })).then((res) => {
      dispatch(userSessionAsync());

      if (res.payload.message === "Update Successfull") {
        const { phone, address , postal_code} = formData;
        const items = cart;
        const totalAmount = couponSuccessData
          ? totalPrice  - couponSuccessData?.discountAmount
          : totalPrice ;

        const requestData = {
          name: user?.user?.name,
          phone,
          address,
          postal_code,
          items,
          userID,
          totalAmount,
          ...(couponSuccessData.code !== "" && { couponUsed: couponData }),
        };

        dispatch(createOrderAsync(requestData)).then((res) => {
          if (res.payload.message === "Order PLaced Succcessfully") {
            dispatch(clearCart());
            dispatch(getallOrderAsync(id));
            navigate(`/order-success`);
            handleMoveTop();
          }
          setFormData({
            phone: "",
            address: "",
            postal_code:""
          });
        });
      }
    });
  };

  const categories = cart.map((item) => item.category);

  const handleVerifyCoupon = () => {
    const formData = {
      code: coupon,
      userId: userID,
      category: categories,
    };
    dispatch(verifyCouponAsync(formData)).then((res) => {
      if (res.payload.couponDiscountSuccess) {
        setCouponSuccessData(res.payload);
      }
    });
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Checkout - Googly</title>
      </Helmet>
      <section
        className={`pt-24 md:pt-32 ${
          cart.length >= 3 ? "xl:pt-24" : "xl:pt-10"
        } px-4 xl:px-0 bg-[#F5F5F5]`}
      >
        <div className="pt-20 max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto min-h-screen flex items-start">
          <div className="grid lg:grid-cols-2 gap-8 w-full">
            {/* FORM SIDE */}
            <div className="">
              <h2 className="Noto text-3xl font-bold text-[#333]">Checkout</h2>
              <p className="text-[#333] text-base mt-5 max-w-sm">
                Complete your purchase quickly and securely with our Cash on
                Delivery (COD).
              </p>

              <form ref={formRef} onSubmit={handleSubmit} className="mt-5 ">
                <div className="mb-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <input
                    name="phone"
                    type="number"
                    placeholder="Enter Phone Number"
                    value={formData?.phone}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-gray-100 text-[#333] w-full text-md border rounded-md border-gray-500 focus:border-gray-800 outline-none placeholder:text-gray-500 transition-shadow duration-200 focus:shadow-xl"
                  />
                  <input
                   name="postal_code"
                    type="number"
                    value={formData.postal_code}
                    onChange={handleInputChange}
                    placeholder="Enter Postal Code"
                    required
                    className="px-4 py-3 bg-gray-100 text-[#333] w-full text-md border rounded-md border-gray-500 focus:border-gray-800 outline-none placeholder:text-gray-500 transition-shadow duration-200 focus:shadow-xl"
                  />
                </div>

                <textarea
                  rows={4}
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter Shipping Address"
                  className="px-4 py-3 bg-gray-100 text-[#333] w-full text-md border rounded-md border-gray-500 focus:border-gray-800 outline-none placeholder:text-gray-500 transition-shadow duration-200 focus:shadow-xl"
                  required
                ></textarea>

                <div className="buttons">
                  {loading ? (
                    <button
                      disabled="loading"
                      type="button"
                      className="mt-5 w-full py-3 text-md"
                    >                   
                     <Loader type="ball-beat" active={true} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="mt-5 w-full py-3 text-md text-white hover:bg-black bg-[#252525]"
                    >
                      Order Now
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* AMOUNT DETAILS */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg px-5 py-10 md:px-8">
              <div className="flow-root">
                <ul className="-my-7 divide-y divide-gray-200">
                  {cart.map((product) => (
                    <li
                      key={product.id}
                      className="flex items-stretch justify-between space-x-5 py-7"
                    >
                      <div className="flex flex-1 items-stretch">
                        <div className="flex-shrink-0">
                          <img
                            className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-contain"
                            src={product?.images?.primary?.downloadURL}
                            alt={product?.name}
                          />
                        </div>
                        <div className="ml-5 flex flex-col justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-bold">{product?.name}</p>
                            <p className="mt-1.5 text-sm font-medium text-gray-500">
                              {product?.category}
                            </p>
                          </div>
                          <p className="mt-3 text-sm font-medium ">
                            x {product?.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="ml-auto flex flex-col items-end justify-between">
                        <p className="text-right text-sm font-bold text-gray-900">
                          {product?.sale_price !== 0 ||  product?.sale_price > 0 ? (
                            <>
                              <p className="">
                                Rs. {product.sale_price * product.quantity}
                              </p>
                            </>
                          ) : (
                            <p className="">
                              Rs. {product.price * product.quantity}
                            </p>
                          )}
                        </p>
                        <button
                          type="button"
                          className="-m-2 inline-flex rounded p-2 text-gray-400 transition-all duration-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                        >
                          <span className="sr-only">Remove</span>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <hr className="mt-6 border-gray-200" />
              <>
                <div className="mt-6">
                  <div className="button_coupn flex justify-end">
                    <button
                      onClick={handleCouponButtonClick}
                      className="mb-4 text-gray-700 font-medium underline underline-offset-2"
                    >
                      Have a coupon ?
                    </button>
                  </div>
                  {showCouponInput && (
                    <div className="sm:flex items-center sm:space-x-2.5 md:flex-col md:space-x-0 lg:flex-row lg:space-x-2.5">
                      <div className="flex-grow">
                        <input
                          className="flex w-[90%] rounded-md border border-gray-500 placeholder:text-gray-600 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="text"
                          placeholder="Enter coupon code"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                        />
                      </div>
                      <div className="mt-4 sm:mt-0 md:mt-4 lg:mt-0">
                        <button
                          onClick={handleVerifyCoupon}
                          type="button"
                          className="bg-gray-700 text-white px-6 py-2 rounded-md"
                        >
                          Verify
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>

              <ul className="mt-6 space-y-5">
                <li className="flex items-center justify-between text-gray-600">
                  <p className="text-md font-medium">Subtotal</p>
                  <p className="text-md font-medium">Rs. {totalPrice}</p>
                </li>
                {couponSuccessData?.couponDiscountSuccess ? (
                  <li className="flex items-center justify-between text-gray-600">
                    <p className="text-md font-medium">Coupon Discount</p>
                    <p className="text-md font-medium">
                      Rs. {couponSuccessData?.discountAmount}
                    </p>
                  </li>
                ) : (
                  ""
                )}
                <li className="flex items-center justify-between border-t border-gray-500 pt-2 text-gray-900">
                  <p className="text-md font-medium ">Total</p>
                  <p className="text-md font-bold ">
                    Rs.{" "}
                    {couponSuccessData
                      ? totalPrice +
                        couponSuccessData?.discountAmount
                      : totalPrice }
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
