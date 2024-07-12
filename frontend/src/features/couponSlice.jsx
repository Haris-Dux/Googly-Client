import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

// INITIAL STATE
const initialState = {
  Loading: false,
};

//API URL
const verifyCouponUrl = "/api/coupons/verifyCouponAtCheckout";

// Register Function
export const verifyCouponAsync = createAsyncThunk(
  "coupon/verifyCoupon",
  async (formData) => {
    try {
      const response = await axios.post(verifyCouponUrl, formData);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

const couponSlice = createSlice({
  name: "couponSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(verifyCouponAsync.pending, (state) => {
        state.Loading = true;
      })
      .addCase(verifyCouponAsync.fulfilled, (state) => {
        state.Loading = false;
      });
  },
});

export default couponSlice.reducer;
