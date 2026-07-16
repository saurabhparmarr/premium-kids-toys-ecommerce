import api from "../../api/axios";

// Har function mein 'config' ka default value {} rakha hai
export const registerAPI = async (userData, config = {}) => {
  const response = await api.post("/auth/register", userData, config);
  return response.data;
};

export const loginAPI = async (userData, config = {}) => {
  const response = await api.post("/auth/login", userData, config);
  return response.data;
};

export const getProfileAPI = async (config = { skipErrorToast: true, skipAuthRedirect: true }) => {
  const response = await api.get("/auth/profile", config);
  return response.data;
};

export const logoutAPI = async (config = {}) => {
  const response = await api.post("/auth/logout", {}, config);
  return response.data;
};

export const getUsersCountAPI = async (config = {}) => {
  const response = await api.get("/auth/count", config);
  return response.data;
};

export const updateProfileAPI = async (userData, config = {}) => {
  const response = await api.put("/auth/profile", userData, config);
  return response.data;
};