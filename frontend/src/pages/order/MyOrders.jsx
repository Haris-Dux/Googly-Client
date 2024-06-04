import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { TfiArrowCircleDown } from "react-icons/tfi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallOrderAsync, updateOrderAsync } from "@/features/orderSlice";
import DeleteModal from "./DeleteModal";
import "./orderr.css";
import Loader from "react-loaders";

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const userID = user?.user?.id;

  const [isOpen, setIsOpen] = useState(false);
  const [orderId, setOrderId] = useState();

  const openModal = (id) => {
    setIsOpen(true);
    setOrderId(id);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const allOrder = useSelector((state) => state.orders.allOrders);
  const orderLoading = useSelector((state) => state.orders.loading);

  const selectedOrder = allOrder.find((data) => data?.id === orderId);

  useEffect(() => {
    if (userID) {
      const id = userID;
      dispatch(getallOrderAsync(id));
    }
  }, [userID, dispatch]);

  // HANDLE DELETE
  const handleDelete = (id) => {
    const formData = {
      id,
      orderProgress: "Cancelled",
    };
    dispatch(updateOrderAsync(formData)).then((res) => {
      const id = userID;
      if (res.payload.message === "Order Data Updated") {
        dispatch(getallOrderAsync(id));
        closeModal();
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500";
      case "Delivered":
        return "text-green-500";
      case "Dispatched":
        return "text-blue-500";
      case "Cancelled":
        return "text-red-500";
      default:
        return "text-gray-700";
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
      <section className="orderSectionbg relative">
        <div className="px-5 md:px-7 xl:px-0 max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto">
          <div className="pt-24 lg:pt-10 grid place grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 min-h-[65vh]">
            {/* LEFT SIDE */}
            <div className="flex items-end lg:items-center justify-center lg:justify-start">
              <div className="content text-center lg:text-start">
                <span
                  style={{ letterSpacing: "4px" }}
                  className="py-1 px-1.5 font-medium text-black bg-[#DEC344] text-[11px] lg:text-[13px]"
                >
                  TRACK ORDER
                </span>

                <h2 className="Noto mt-4 mb-6 text-4xl md:text-5xl font-medium text-white tracking-normal">
                  Track Order
                </h2>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-start lg:items-center justify-center lg:justify-end">
              <h2 className="mt-6 flex items-center gap-2 text-left font-normal text-white text-md md:text-lg">
                <Link
                  to="/"
                  className="flex items-center gap-1 hover:underline hover:underline-offset-4"
                >
                  <FaHome />
                  Home
                </Link>{" "}
                <IoIosArrowForward />
                Orders
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

      <section className="w-full  py-14 sm:py-12 px-5 sm:px-8 lg:px-10 xl:px-0 min-h-[90vh]">
        {orderLoading ? (
          <div className="flex justify-center items-center">
            <Loader type="ball-beat" active={true} />
          </div>
        ) : (
          <div className="max-w-5xl xl:max-w-6xl mx-auto">
            <h2 className="playfair text-3xl font-bold">Order Details</h2>
            {allOrder.map((data, index) => (
              <div
                key={index}
                className="mt-8 flex flex-col overflow-hidden rounded-xl border border-gray-800 md:flex-row"
              >
                {/* ORDER DETAILS */}
                <div className="w-full border-r border-gray-300 bg-gray-100 md:max-w-xs">
                  <div className="parent py-6 px-6 flex flex-col justify-between h-full gap-y-10">
                    {/* ORDER DETAILS */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2">
                      <div className="mb-4">
                        <div className="text-md sm:text-md font-semibold">
                          Order ID
                        </div>
                        <div className="text-md font-medium text-gray-700">
                          {data?.OrderID}
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="text-md sm:text-md font-semibold">
                          Date
                        </div>
                        <div className="text-md font-medium text-gray-700">
                          {new Date(data?.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="text-md sm:text-md font-semibold">
                          Shipping
                        </div>
                        <div className={`text-md font-medium`}>Rs. 280</div>
                      </div>

                      <div className="mb-4">
                        <div className="text-md sm:text-md font-semibold">
                          Total Amount
                        </div>
                        <div className="text-md font-medium text-gray-700">
                          Rs. {data?.totalAmount}
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="text-md sm:text-md font-semibold">
                          Order Status
                        </div>
                        <div
                          className={`text-md font-medium ${getStatusColor(
                            data?.orderProgress
                          )}`}
                        >
                          {data?.orderProgress}
                        </div>
                      </div>
                    </div>

                    {/* ORDER CANCEL BUTTON */}
                    <div className="button">
                      {data?.orderProgress &&
                        data?.orderProgress === "Pending" && (
                          <div>
                            <button
                              onClick={() => openModal(data?.id)}
                              className="mt-5 flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg"
                            >
                              <span>Cancel Order</span>
                            </button>
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                {/* ORDER ITEMS */}
                <div className="flex-1 bg-white">
                  <div className="py-6 px-3 sm:px-6">
                    <ul className="gap-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                      {data &&
                        data?.items.map((product) => (
                          <li
                            key={product.id}
                            className="flex px-3 flex-col justify-between space-x-5 py-7 md:flex-row border border-gray-400 rounded-xl bg-gray-100"
                          >
                            <div className="flex flex-1 items-stretch">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-20 w-20 rounded-lg bg-white border border-gray-200 object-contain"
                                  src={product?.images?.primary?.downloadURL}
                                  alt="order_img"
                                />
                              </div>

                              <div className="ml-5 flex flex-col justify-between">
                                <div className="flex-1">
                                  <p className="text-sm font-bold text-gray-900">
                                    {product.name}
                                  </p>
                                  <p className="mt-1.5 text-sm font-medium text-gray-500">
                                    {product.category}
                                  </p>
                                </div>

                                <p className="mt-4 text-sm font-medium text-gray-500">
                                  x {product.quantity}
                                </p>
                              </div>
                            </div>

                            <div className="ml-auto flex flex-col items-end justify-between">
                              <p className="text-right text-sm font-bold text-gray-900">
                                {product?.sale_price !== 0 ||
                                product?.sale_price > 0 ? (
                                  <>
                                    <p className="">Rs. {product.sale_price}</p>
                                  </>
                                ) : (
                                  <p className="">Rs. {product.price}</p>
                                )}
                              </p>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <DeleteModal
        isOpen={isOpen}
        closeModal={closeModal}
        selectedOrder={selectedOrder}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default MyOrders;
