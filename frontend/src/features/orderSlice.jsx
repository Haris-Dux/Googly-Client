import axios from "axios";
import toast from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// API URLs
const createOrderUrl = "/api/orders/createOrder";
const getAllOrderUrl = "/api/orders/getAllOrdersForUser";
const updateOrderUrl = "/api/orders/updateOrder";

// CREATE REVIEWS ASYNC THUNK
export const createOrderAsync = createAsyncThunk(
  "reviews/create",
  async (formData) => {
    try {
      const response = await axios.post(createOrderUrl, formData);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

// GET ALL REVIEWS BY PRODUCT ASYNC THUNK
export const getallOrderAsync = createAsyncThunk(
  "reviews/getall",
  async (id) => {
    try {
      const response = await axios.post(getAllOrderUrl, { id });
      return response.data;
    } catch (error) {
      throw new Error(error)
    }
  }
);

export const updateOrderAsync = createAsyncThunk(
  "reviews/update",
  async (formData) => {
    try {
      const response = await axios.post(updateOrderUrl, formData);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

const initialState = {
  loading: false,
  allOrders: [],
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET ALL REVIEWS ADD CASE
      .addCase(createOrderAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrderAsync.fulfilled, (state) => {
        state.loading = false;
      })


      // GET ALL REVIEWS ADD CASE
      .addCase(getallOrderAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getallOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrders = action.payload;
      });
  },
});

export default orderSlice.reducer;
