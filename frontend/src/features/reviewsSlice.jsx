import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// API URLs
const createReviewUrl = "http://localhost:6040/api/reviews/createReview";
const updateReviewUrl = "http://localhost:6040/api/reviews/updateReview";
const deleteReviewUrl = "http://localhost:6040/api/reviews/deleteReview";
const getAllReviewsByProductUrl =
  "http://localhost:6040/api/reviews/getAllReviewsByProduct";

// CREATE REVIEWS ASYNC THUNK
export const createreviewsAsync = createAsyncThunk(
  "reviews/create",
  async (formData) => {
    try {
      const response = await axios.post(createReviewUrl, formData);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

// GET ALL REVIEWS BY PRODUCT ASYNC THUNK
export const getallreviewsAsync = createAsyncThunk(
  "reviews/getall",
  async (id) => {
    try {
      const response = await axios.post(getAllReviewsByProductUrl, { id });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const updatereviewsAsync = createAsyncThunk(
  "reviews/update",
  async (formData) => {
    try {
      const response = await axios.post(updateReviewUrl, formData);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
      throw new Error(error);
    }
  }
);

// DELETE REVIEWS PRODUCT ASYNC THUNK
export const deletereviewsAsync = createAsyncThunk(
  "reviews/delete",
  async (id) => {
    try {
      const response = await axios.post(deleteReviewUrl, { id });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error submitting review:", error);
    }
  }
);

const initialState = {
  loading: false,
  allReviews: [],
};

const reviewsSlice = createSlice({
  name: "reviewsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET ALL REVIEWS ADD CASE
      .addCase(getallreviewsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getallreviewsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allReviews = action.payload;
      });
  },
});

export default reviewsSlice.reducer;
