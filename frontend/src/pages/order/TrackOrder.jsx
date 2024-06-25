import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { trackOrderAsync } from "../../features/orderSlice";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { TfiArrowCircleDown } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { getallOrderAsync, updateOrderAsync } from "@/features/orderSlice";
import DeleteModal from "./DeleteModal";
import "./orderr.css";
import Loader from "react-loaders";

const TrackOrder = () => {
  const [OrderID, setOrderID] = useState("");
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

  const data = useSelector((state) => state.orders.trackOrder?.order);

  const { deleteLoading } = useSelector((state) => state.orders);
  const orderLoading = useSelector((state) => state.orders.loading);

  const [deleteStatus, setDeleteStatus] = useState("");

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
        setDeleteStatus("Cancelled");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(trackOrderAsync({ OrderID }));
  };

  return (
    <>
      <section className="orderSectionbg relative">
        <div className="px-5 md:px-7 xl:px-0 max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto">
          <div className="pt-24 lg:pt-10 grid place grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 min-h-[70vh]">
            <div className="flex items-end lg:items-center justify-center lg:justify-start">
              <div className="content text-center lg:text-start">
                <div className="mt-8 blur_bg border px-4 py-8 sm:p-4 rounded-2xl">
                  <div className="flex-1 flex flex-col items-center justify-center gap-4 p-4 md:gap-10 md:p-6">
                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                      <div className="mb-2 space-y-2">
                        <h1 className="text-3xl font-bold text-gray-50">
                          Track your order
                        </h1>
                        <p className="text-sm leading-none text-gray-50">
                          Enter your order number to track your package
                        </p>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter your order number"
                        value={OrderID}
                        onChange={(e) => setOrderID(e.target.value)}
                        className="px-4 py-3 bg-white text-[#333] w-full text-md border rounded-md border-gray-500 focus:border-gray-800 outline-none placeholder:text-gray-500 transition-shadow duration-200 focus:shadow-xl"
                        required
                      />
                      <button
                        type="submit"
                        className="w-full h-11 items-center font-semibold mx-auto bg-[#DEC344] hover:bg-[#e3cc65] text-black flex justify-center tracking-wide"
                      >
                        Track Order
                      </button>
                    </form>
                  </div>
                </div>
              </div>
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

      {data ? (
        <section className="w-full  py-14 sm:py-12 px-5 sm:px-8 lg:px-10 xl:px-0 min-h-[60vh]">
          {orderLoading ? (
            <div className="flex justify-center items-center">
              <Loader type="ball-beat" active={true} />
            </div>
          ) : (
            <>
              <div className="max-w-5xl xl:max-w-6xl mx-auto">
                <>
                  <h2 className="text-3xl font-bold uppercase">
                    Order Details
                  </h2>

                  <div className="mt-8 flex flex-col overflow-hidden rounded-xl border border-gray-800 md:flex-row">
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
                              {deleteStatus ? (
                                <p className="text-red-500">{deleteStatus}</p>
                              ) : (
                                <>{data?.orderProgress}</>
                              )}
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
                                      src={
                                        product?.images?.primary?.downloadURL
                                      }
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
                                        <p className="">
                                          Rs. {product.sale_price}
                                        </p>
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
                </>
              </div>
            </>
          )}
        </section>
      ) : null}

      <DeleteModal
        isOpen={isOpen}
        closeModal={closeModal}
        selectedOrder={data}
        handleDelete={handleDelete}
        deleteLoading={deleteLoading}
      />
    </>
  );
};

export default TrackOrder;
