import api from "../../api/axios";


export const registerAPI = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};


export const loginAPI = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};


export const getProfileAPI = async () => {
  const response = await api.get("/auth/profile", {
    skipErrorToast: true,
    skipAuthRedirect: true,
  });
  return response.data;
};


export const logoutAPI = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

// Example check agar tum axios use kar rahe ho to:
export const getUsersCountAPI = async () => {
  const response = await api.get("/auth/count"); // Apne backend ka sahi route url dena yahan
  return response.data;
};

export const updateProfileAPI = async (userData) => {
  const response = await api.put("/auth/profile", userData);
  return response.data;
};
