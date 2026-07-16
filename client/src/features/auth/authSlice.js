import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, getProfile, logoutUser, getUsersCount , updateProfile } from "./authThunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    usersCount: 0,
    loading: false,        // Sirf login/register click spinner ke liye
    isInitializing: true,  // Pure app session setup refresh control ke liye
    error: null,
  },
  reducers: {
    clearError: (state) => { state.error = null; },
    forceLogout: (state) => {
      state.user = null;
      state.loading = false;
      state.isInitializing = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(getProfile.pending, (state) => { state.isInitializing = true; })
      .addCase(getProfile.fulfilled, (state, action) => { state.isInitializing = false; state.user = action.payload; })
      .addCase(getProfile.rejected, (state) => { state.isInitializing = false; state.user = null; })

      .addCase(updateProfile.pending, (state) => {
  state.loading = true;
})

.addCase(updateProfile.fulfilled, (state, action) => {
  state.loading = false;
  state.user = action.payload;
})

.addCase(updateProfile.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

      .addCase(getUsersCount.fulfilled, (state, action) => { state.usersCount = action.payload.count; })
      
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.isInitializing = false;
      });
  },
});

export const { clearError, forceLogout } = authSlice.actions;
export default authSlice.reducer;