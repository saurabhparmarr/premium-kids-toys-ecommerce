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
  async (userData, { rejectWithValue }) => {
    try {
      return await registerAPI(userData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);


export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      return await loginAPI(userData);
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
      return await getProfileAPI();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Profile fetch failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      return await logoutAPI();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);

export const getUsersCount = createAsyncThunk(
  "auth/getUsersCount",
  async (_, { rejectWithValue }) => {
    try {
      return await getUsersCountAPI();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error fetching users count"
      );
    }
  }
);


export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      return await updateProfileAPI(userData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Profile update failed"
      );
    }
  }
);