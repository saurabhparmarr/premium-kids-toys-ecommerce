import api from "../../api/axios";

export const getProductByIdentifierAPI = async (identifier) => {
  const { data } = await api.get(`/products/${identifier}`);
  return data;
};

export const createProductAPI = async (productData) => {
  const response = await api.post("/products", productData);
  return response.data;
};

export const getProductsAPI = async (params) => {
  const response = await api.get("/products", { params });
  return response.data;
};

// Yahan sirf API call honi chahiye
export const updateProductAPI = async (id, productData, config) => {
  const response = await api.put(`/products/${id}`, productData, config);
  return response.data;
};

export const deleteProductAPI = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};