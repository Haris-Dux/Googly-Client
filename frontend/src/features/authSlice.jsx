import axios from "axios";
import toast from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// API URLs
const signupUrl = "http://localhost:6040/api/users/signup";
const loginUrl = "http://localhost:6040/api/users/login";
const updateUrl = "http://localhost:6040/api/users/updateUserInformation";
const logoutUrl = "http://localhost:6040/api/users/logout";
const userSessionUrl = "http://localhost:6040/api/users/persistUserSession";
const forgetPassUrl = "http://localhost:6040/api/users/sendResetPasswordOTP";
const verifyOtpPassUrl = "http://localhost:6040/api/users/verifyOtp";
const resetPassUrl = "http://localhost:6040/api/users/updatePassword";

// CREATE ASYNC THUNK
export const createuserAsync = createAsyncThunk(
  "user/create",
  async (formData) => {
    try {
      const response = await axios.post(signupUrl, formData);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

// LOGIN ASYNC THUNK
export const loginuserAsync = createAsyncThunk(
  "user/login",
  async (formData) => {
    try {
      const response = await axios.post(loginUrl, formData);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

// UPDATE ASYNC THUNK
export const updateuserAsync = createAsyncThunk(
  "user/update",
  async (formData) => {
    try {
      const response = await axios.post(updateUrl, formData);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

// LOGIN ASYNC THUNK
export const userSessionAsync = createAsyncThunk("user/session", async () => {
  try {
    const response = await axios.get(userSessionUrl);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
});

// Logout Function
export const logoutUserAsync = createAsyncThunk("user/logout", async () => {
  try {
    const response = await axios.delete(logoutUrl);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
});

// FORGET ASYNC THUNK
export const forgetuserAsync = createAsyncThunk(
  "user/forget",
  async (formData) => {
    try {
      const response = await axios.post(forgetPassUrl, formData);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

// VERIFY ASYNC THUNK
export const verifyOtpAsync = createAsyncThunk(
  "user/verify",
  async (formData) => {
    try {
      const response = await axios.post(verifyOtpPassUrl, formData);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

// RESET ASYNC THUNK
export const resetPassAsync = createAsyncThunk(
  "user/reset",
  async (resetPasswordData) => {
    const { id, resetPassword } = resetPasswordData;
    try {
      const response = await axios.post(resetPassUrl, {
        id,
        resetPassword,
      });
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  signupLoading: false,
  loginLoading: false,
  forgetLoading: false,
  forgetPasswordEmail: null,
  resetPassword: null,
  validateToken: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // SIGN UP ADD CASE
      .addCase(createuserAsync.pending, (state) => {
        state.signupLoading = true;
      })
      .addCase(createuserAsync.fulfilled, (state) => {
        state.signupLoading = false;
      })
      .addCase(createuserAsync.rejected, (state) => {
        state.signupLoading = false;
      })

      // LOGIN ADD CASE
      .addCase(loginuserAsync.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(loginuserAsync.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.user = action.payload;
      })
      .addCase(loginuserAsync.rejected, (state) => {
        state.loginLoading = false;
      })

      // Session ADD CASE
      .addCase(userSessionAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(userSessionAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      // FORGET PASSWORD ADD CASE
      .addCase(forgetuserAsync.pending, (state) => {
        state.forgetLoading = true;
      })
      .addCase(forgetuserAsync.fulfilled, (state) => {
        state.forgetLoading = false;
      })
      .addCase(forgetuserAsync.rejected, (state) => {
        state.forgetLoading = false;
      })

      // LOGOUT ADD CASE
      .addCase(logoutUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
