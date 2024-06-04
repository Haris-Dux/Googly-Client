import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import BestSeller from "../home/BestSeller";
import { addToCart } from "../../features/ActionsSlice";
import { useNavigate } from "react-router-dom";
import {
  createreviewsAsync,
  deletereviewsAsync,
  getallreviewsAsync,
  updatereviewsAsync,
} from "../../features/reviewsSlice";
import { FiEdit } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import Loader from "react-loaders";

// STAR RATING
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<FaStar key={i} size={18} className="mx-0.5 text-[#FFC209]" />);
  }
  return <div className="flex">{stars}</div>;
};

export const ProductOverviewTwo = ({ product, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productId = id;

  const [reviewId, setReviewId] = useState();

  const [mainImage, setMainImage] = useState(null);

  // Update mainImage when product changes
  useEffect(() => {
    if (product?.images?.primary?.downloadURL) {
      setMainImage(null); // Clear the image first
      setTimeout(() => {
        setMainImage(product.images.primary.downloadURL);
      }, 0); // Delay setting the new image to allow the clear state to take effect
    }
  }, [product]);

  // Handle image click to update the main image
  const handleImageClick = (url) => {
    setMainImage(url);
  };

  // Extract images from product object
  const { primary, ...otherImages } = product?.images || {};

  const user = useSelector((state) => state.auth.user);
  const userID = user?.user?.id;

  // FORMDATA
  const [formData, setFormData] = useState({
    review: "",
    rating: 1,
  });

  // UPDATE REVIEW DATA
  const [updateReviewData, setUpdateReviewData] = useState({
    review: "",
    rating: 1,
  });

  const openUpdateModal = (id) => {
    setReviewId(id);
    const review = allreviews.find((item) => item.id === id);
    if (review) {
      setUpdateReviewData({
        review: review.review,
        rating: review.rating,
      });
    }
    // setIsOpenUpdate(true);
  };

  const allreviews = useSelector((state) => state.reviews.allReviews);
  const loading = useSelector((state) => state.reviews.loading);

  // HANDLE ADD TO CART
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      navigate("/shop");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      toast.success("Item Added to Cart");
    }
  };

  const [selectedRating, setSelectedRating] = useState();

  const handleRatingChange = (starValue) => {
    setSelectedRating(starValue);
    setUpdateReviewData({
      ...updateReviewData,
      rating: starValue,
    });
  };

  // CALLING API TO GET ALL REVIEWS
  useEffect(() => {
    dispatch(getallreviewsAsync(id));
  }, []);

  const handleStarClick = (starValue) => {
    setFormData((prevData) => ({ ...prevData, rating: starValue }));
  };

  // HANDLE SUBMIT REVIEW
  const handleSubmitReview = () => {
    const productID = id;

    if (!formData.review || formData.rating === 0) {
      toast.error("Please leave a review to rate the product");
      return;
    }

    dispatch(createreviewsAsync({ productID, userID, ...formData })).then(
      (res) => {
        if (res.payload.message === "Review created successfully") {
          dispatch(getallreviewsAsync(id));
        }
      }
    );
    setFormData({ review: "", rating: 1 });
  };

  // HANDLE UPDATE REVIEW
  const handleUpdateReview = (review_Id, rating) => {
    const id = review_Id;

    if (selectedRating !== rating) {
      const updateReviewDataOptional = delete updateReviewDataOptional?.rating;
      const payload = { id, ...updateReviewData };
      payload.rating = selectedRating;
      dispatch(updatereviewsAsync(payload)).then(() => {
        dispatch(getallreviewsAsync(productId));
        // closeUpdateModal();
      });
    } else {
      dispatch(updatereviewsAsync({ id, ...updateReviewData })).then(() => {
        dispatch(getallreviewsAsync(productId));
        // closeUpdateModal();
      });
      setUpdateReviewData({ review: "", rating: 1 });
    }
  };

  // HANDLE REVIEW CHANGE
  const handleReviewChange = (e) => {
    setUpdateReviewData({
      ...updateReviewData,
      review: e.target.value,
    });
  };

  // HANDLE DELETE REVIEW
  const handleDeleteReview = (id) => {
    dispatch(deletereviewsAsync(id)).then((res) => {
      if (res.payload.message === "Review deleted successfully") {
        dispatch(getallreviewsAsync(productId));
      }
    });
  };

  return (
    <>
      <Dialog>
        <div className="pt-6 pb-10 w-full">
          <div className="px-4 xl:px-0 max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto">
            <div className="min-h-[70vh]">
              <div>
                <div className="py-10 xl:pt-16 xl:pb-6 grid items-start grid-cols-1 lg:grid-cols-2 gap-5 xl:gap-6">
                  {/* IMAGES */}
                  <div className="w-full sm:flex justify-center  gap-2">
                    {/* SIDE IMAGES */}
                    <div className="sm:space-y-3 w-[3.5rem] sm:w-[4.5rem] max-sm:flex sm:flex-col max-sm:mb-4 max-sm:gap-4">
                      {primary && (
                        <img
                          src={primary.downloadURL}
                          alt={primary.name}
                          className="w-full h-16 sm:h-20 object-cover cursor-pointer rounded-sm border border-gray-300"
                          onClick={() => handleImageClick(primary.downloadURL)}
                        />
                      )}
                      {Object.keys(otherImages).map((key) => (
                        <img
                          key={key}
                          src={otherImages[key].downloadURL}
                          alt={otherImages[key].name}
                          className="w-full h-16 sm:h-20 object-cover cursor-pointer rounded-sm border border-gray-300"
                          onClick={() =>
                            handleImageClick(otherImages[key].downloadURL)
                          }
                        />
                      ))}
                    </div>

                    {/* MAIN IMAGE */}
                    <div className="img_cont">
                      <img
                        src={mainImage}
                        alt="Product"
                        className="w-full h-full sm:h-[28rem] sm:w-[28rem] rounded object-cover border border-gray-300"
                      />
                    </div>
                  </div>

                  {/* CONTENT SIDE */}
                  <div className="px-0 sm:px-10 lg:px-0">
                    <div className="content_side pt-5">
                      <h2 className="text-4xl font-medium text-gray-800">
                        {product?.name}
                      </h2>

                      {/* PRICE SECTION */}
                      <div className="flex flex-wrap items-center gap-4 mt-4">
                        {product && product.price !== product?.sale_price ? (
                          <>
                            <p
                              className={`${
                                product?.sale_price && product?.sale_price > 0
                                  ? "text-gray-500 text-lg line-through"
                                  : "text-gray-500 text-lg"
                              }`}
                            >
                              Rs. {product?.price}
                            </p>
                            {product?.sale_price && product?.sale_price > 0 ? (
                              <p className="text-gray-800 text-2xl font-bold">
                                Rs. {product?.sale_price}
                              </p>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          <p className="text-gray-800 text-2xl font-bold">
                            Rs. {product?.price}
                          </p>
                        )}
                      </div>

                      {/* ABOUT */}
                      <div className="mt-4">
                        {/* <StarRating rating={product?.rating} /> */}

                        {product && (
                          <div className="flex items-center mt-4">
                            {product.averageRating === 0 ? (
                              "No Ratings"
                            ) : (
                              <StarRating rating={product.averageRating} />
                            )}
                            <span className="ml-2 text-sm text-gray-500">
                              ({product.averageRating})
                            </span>
                          </div>
                        )}

                        {/* DESCRIPTION */}
                        <div className="mt-4 pl-0 text-md text-gray-800">
                          <p>{product?.description}</p>
                        </div>
                      </div>

                      <div className="details_box py-6">
                        <div className="py-0.5 details flex justify-start items-center font-semibold">
                          <h3 className="name w-40">Product Code</h3>
                          <h3 className="name w-full">{product?.product_code}</h3>
                        </div>
                        <div className="py-0.5 details flex justify-start items-center font-semibold">
                          <h3 className="name w-40">Category</h3>
                          <h3 className="name w-full">
                           {product?.category}
                          </h3>
                        </div>
                      </div>

                      {/* CART BUTTON */}
                      <button
                        onClick={handleAddToCart}
                        className="w-full mt-4 flex items-center text-lg font-medium justify-center gap-2 px-4 py-3 hover:bg-black bg-[#252525] text-white"
                        type="button"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>

                {/* REVIEW SECTION */}
                <div className="mt-10 pb-5 max-w-5xl xl:max-w-6xl xxl:max-w-7xl mx-auto">
                  <div className="mt-8">
                    <>
                      {/* ALL REVIEWS  */}
                      <div className="mt-6 all_reviews">
                        <h2 className="text-2xl text-gray-800 font-semibold">
                          ALL REVIEWS
                        </h2>

                        {/* ALL REVIEWS MAPPED HERE */}
                        {loading ? (
                          <div className="flex justify-center mt-10">
                            <Loader type="ball-beat" active={true} />
                          </div>
                        ) : (
                          <>
                            {allreviews.map((data, index) => (
                              <div
                                key={index}
                                className="mt-3 px-6 py-3 lg:py-4 rounded-lg border border-gray-300 bg-[#f6f6f6] all_reviews hover:shadow-md transition-shadow duration-150"
                              >
                                <div className="flex justify-between flex-wrap items-center gap-2">
                                  <div className="left flex items-center gap-2">
                                    <h2 className="font-semibold">
                                      {data.name}
                                    </h2>{" "}
                                    <p className="w-24">
                                      <StarRating rating={data?.rating} />
                                    </p>
                                  </div>
                                  <div className="right">
                                    <p>
                                      {new Date(
                                        data?.createdAt
                                      ).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-1 flex justify-between flex-wrap items-center gap-2">
                                  <p className="my-1">{data?.review}</p>

                                  <div className="edit flex items-center  gap-3">
                                    {userID === data.userID ? (
                                      <>
                                        <DialogTrigger asChild>
                                          <Button className="bg-transparent hover:bg-transparent px-0">
                                            <FiEdit
                                              onClick={() =>
                                                openUpdateModal(data?.id)
                                              }
                                              size={20}
                                              className="text-gray-800"
                                            />
                                          </Button>
                                        </DialogTrigger>
                                        <IoTrashOutline
                                          onClick={() =>
                                            handleDeleteReview(data?.id)
                                          }
                                          className="cursor-pointer"
                                          size={20}
                                        />
                                      </>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                      </div>

                      {/* YOUR REVIEWS  */}
                      <div className="mt-10">
                        <p className="mb-1 ml-1 text-gray-700 font-medium">
                          Your Review *
                        </p>
                        <textarea
                          id="OrderNotes"
                          className="w-full resize-y border border-gray-800 rounded-xl align-top focus:ring-0 focus:outline-none focus:border-gray-800 sm:text-sm p-4"
                          rows={4}
                          placeholder="Write a review..."
                          value={formData.review}
                          onChange={(e) =>
                            setFormData((prevData) => ({
                              ...prevData,
                              review: e.target.value,
                            }))
                          }
                        ></textarea>

                        {/* Star rating section */}
                        <div className="mt-4 mb-2 flex items-center justify-start gap-1">
                          <p className="mr-1 text-gray-700 font-medium text-sm">
                            Give your rating:
                          </p>
                          {[1, 2, 3, 4, 5].map((starValue) => (
                            <FaStar
                              key={starValue}
                              style={{
                                color:
                                  starValue <= formData.rating
                                    ? "#FFC107"
                                    : "#D1D5DB",
                                cursor: "pointer",
                              }}
                              onClick={() => handleStarClick(starValue)}
                            />
                          ))}
                        </div>

                        <button
                          className="mt-1 text-white py-2 px-4 hover:bg-black bg-[#252525]"
                          onClick={handleSubmitReview}
                        >
                          Submit Review
                        </button>
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogContent className="sm:max-w-[625px] px-3 sm:px-5">
          <DialogHeader>
            <DialogTitle>Update Your Review</DialogTitle>
          </DialogHeader>
          <div className="">
            <div className="items-center">
              <Label htmlFor="name" className="text-right">
                Your Review:
              </Label>
              <textarea
                className="mt-3 border px-3 py-2.5 rounded-lg border-gray-500 focus:border-gray-800 w-full focus:outline-none"
                rows={3}
                placeholder="Type your message here."
                value={updateReviewData.review}
                onChange={handleReviewChange}
              ></textarea>

              <div className="mt-4 mb-2 flex items-center justify-start gap-1">
                <p className="mr-1 text-gray-700 font-medium text-sm">
                  Rating:
                </p>
                {[1, 2, 3, 4, 5].map((starValue) => (
                  <FaStar
                    key={starValue}
                    style={{
                      color:
                        starValue <= updateReviewData.rating
                          ? "#FFC107"
                          : "#D1D5DB",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRatingChange(starValue)}
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                onClick={() =>
                  handleUpdateReview(reviewId, updateReviewData.rating)
                }
                type="submit"
              >
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
