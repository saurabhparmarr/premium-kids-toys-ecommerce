import api from "../../api/axios"; // Tumhara base axios instance

// Fixed: Har jagah 'api' use karo, 'axios' nahi
export const getProductByIdentifierAPI = async (identifier) => {
  const { data } = await api.get(`/products/${identifier}`);
  return data;
};

// Baaki sab functions tumhare sahi hain
export const createProductAPI = async (productData) => {
  const response = await api.post("/products", productData);
  return response.data;
};

export const getProductsAPI = async (params) => {
  const response = await api.get("/products", { params });
  return response.data;
};

export const updateProductAPI = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProductAPI = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};