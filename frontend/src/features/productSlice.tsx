import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// API URLs
const getAllProductUrl = `http://localhost:6040/api/products/getProducts`;
const getProductById = `http://localhost:6040/api/products/getProductById`;
const getPoularProductUrl = "http://localhost:6040/api/products/getLatestPRoducts";
const getBEstSellingProductUrl = "http://localhost:6040/api/products/getBestSellingProducts";

// GET ALL PRODUCT ASYNC THUNK
export const getAllProductsAsync = createAsyncThunk(
  "Shop/getProduts",
  async (data: {
    category: string | undefined;
    page: number;
    search?: string;
  }) => {
    const searchQuery =
      data?.search !== undefined && data?.search !== null
        ? `&search=${data?.search}`
        : "";
    try {
      const response = await axios.post(
        `${getAllProductUrl}?category=${data.category}&page=${data.page}${searchQuery}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

// GET POPOLAR PRODUCTS ASYNC THUNK
export const getPopularProductsAsync = createAsyncThunk(
  "products/latest ",
  async () => {
    try {
      const response = await axios.post(getPoularProductUrl);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

// GET BEST SELLING PRODUCTS ASYNC THUNK
export const getBestSellingProductsAsync = createAsyncThunk(
  "products/bestSellingProducts ",
  async () => {
    try {
      const response = await axios.post(getBEstSellingProductUrl);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

// GET SINGLE PRODUCT ASYNC THUNK
export const getProductByIdAsync = createAsyncThunk(
  "products/singleProduct ",
  async (id) => {
    try {
      const response = await axios.post(getProductById, { id });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

const initialState = {
  loading: false,
  Productloading: false,
  singleProductloading: false,
  products: [],
  popularProducts: [],
  singleProduct: null,
  BEstSellingProduct: [],
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    // CLEAR PRODUCTS
    clearProducts: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder

      // GET ALL PRODUCTS ADD CASE
      .addCase(getAllProductsAsync.pending, (state) => {
        state.Productloading = true;
      })
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.Productloading = false;
        state.products = action.payload;
      })

      // GET SINGLE PRODUCTS
      .addCase(getProductByIdAsync.pending, (state) => {
        state.singleProductloading = true;
      })
      .addCase(getProductByIdAsync.fulfilled, (state, action) => {
        state.singleProductloading = false;
        state.singleProduct = action.payload;
      })

      // GET ALL LATEST PRODUCTS ADD CASE
      .addCase(getPopularProductsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPopularProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.popularProducts = action.payload;
      })

      // GET ALL BEST SELLING PRODUCTS ADD CASE
      .addCase(getBestSellingProductsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBestSellingProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.BEstSellingProduct = action.payload;
      });
  },
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;
