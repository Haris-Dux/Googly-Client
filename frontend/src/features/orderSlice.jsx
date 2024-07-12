import axios from "axios";
import toast from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// API URLs
const createOrderUrl = "/api/orders/createOrder";
const createGuestOrderUrl =
  "/api/orders/createOrderAsGuest";
const getAllOrderUrl = "/api/orders/getAllOrdersForUser";
const updateOrderUrl = "/api/orders/updateOrder";
const trackOrderUrl = "/api/orders/trackOrder";

// TRACK ORDER ASYNC THUNK
export const trackOrderAsync = createAsyncThunk(
  "track/order",
  async (orderId) => {
    try {
      const response = await axios.post(trackOrderUrl, orderId);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

// CREATE ORDER ASYNC THUNK
export const createOrderAsync = createAsyncThunk(
  "orders/create",
  async (formData) => {
    try {
      const response = await axios.post(createOrderUrl, formData);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

// CREATE GUEST ORDER ASYNC THUNK
export const createGuestOrderAsync = createAsyncThunk(
  "guestOrders/create",
  async (formData) => {
    try {
      const response = await axios.post(createGuestOrderUrl, formData);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

// GET ALL ORDER BY PRODUCT ASYNC THUNK
export const getallOrderAsync = createAsyncThunk(
  "orders/getAll",
  async (id) => {
    try {
      const response = await axios.post(getAllOrderUrl, { id });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const updateOrderAsync = createAsyncThunk(
  "orders/update",
  async (formData) => {
    try {
      const response = await axios.post(updateOrderUrl, formData);
      if (response.data.message === "Order Data Updated") {
        toast.success("Order Cancelled");
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

const initialState = {
  loading: false,
  guestLoading: false,
  deleteLoading: false,
  allOrders: [],
  trackOrder: [],
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // CREATE ORDER ADD CASE
      .addCase(createOrderAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrderAsync.fulfilled, (state) => {
        state.loading = false;
      })

      // CREATE GUEST ORDER ADD CASE
      .addCase(createGuestOrderAsync.pending, (state) => {
        state.guestLoading = true;
      })
      .addCase(createGuestOrderAsync.fulfilled, (state) => {
        state.guestLoading = false;
      })

      // UPDATE ORDER
      .addCase(updateOrderAsync.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(updateOrderAsync.fulfilled, (state) => {
        state.deleteLoading = false;
      })

      // GET ALL ORDER ADD CASE
      .addCase(getallOrderAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getallOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrders = action.payload;
      })

      // TRACK ORDER ADD CASE
      .addCase(trackOrderAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(trackOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.trackOrder = action.payload;
      });
  },
});

export default orderSlice.reducer;
