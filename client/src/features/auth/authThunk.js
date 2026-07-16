import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginAPI,
  registerAPI,
  getProfileAPI,
  logoutAPI,
  getUsersCountAPI, 
  updateProfileAPI,
} from "./authAPI";

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ userData, config }, { rejectWithValue }) => {
    try {
      return await registerAPI(userData, config);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ userData, config }, { rejectWithValue }) => {
    try {
      return await loginAPI(userData, config);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProfileAPI();
      return response; 
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue(null); 
      }
      return rejectWithValue(error.response?.data?.message || "Auth failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (config = {}, { rejectWithValue }) => {
    try {
      return await logoutAPI(config);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);

export const getUsersCount = createAsyncThunk(
  "auth/getUsersCount",
  async (config = {}, { rejectWithValue }) => {
    try {
      return await getUsersCountAPI(config);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error fetching users count"
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async ({ userData, config }, { rejectWithValue }) => {
    try {
      return await updateProfileAPI(userData, config);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Profile update failed"
      );
    }
  }
);