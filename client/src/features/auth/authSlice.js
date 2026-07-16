import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, getProfile, logoutUser, getUsersCount, updateProfile } from "./authThunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    usersCount: 0,
    loading: false,        
    isInitializing: true,  
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
      // Login
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      // Register
      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Get Profile (Auth Check)
      .addCase(getProfile.pending, (state) => { state.isInitializing = true; })
      .addCase(getProfile.fulfilled, (state, action) => { state.isInitializing = false; state.user = action.payload; })
      .addCase(getProfile.rejected, (state) => { 
        state.isInitializing = false; 
        state.user = null; 
        state.error = null; // FIX: Error ko null kiya taaki UI par unwanted message na aaye
      })

      // Update Profile
      .addCase(updateProfile.pending, (state) => { state.loading = true; })
      .addCase(updateProfile.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(updateProfile.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

  
      .addCase(getUsersCount.fulfilled, (state, action) => { state.usersCount = action.payload.count; })
      
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.isInitializing = false;
        state.error = null;
      });
  },
});

export const { clearError, forceLogout } = authSlice.actions;
export default authSlice.reducer;