import api from "../../api/axios";

export const getWishlistAPI = async () => {
  const { data } = await api.get("/wishlist");
  return data;
};

export const addToWishlistAPI = async (productId) => {
  const { data } = await api.post("/wishlist", {
    productId,
  });
  return data;
};

export const removeFromWishlistAPI = async (productId) => {
  const { data } = await api.delete(
    `/wishlist/${productId}`
  );
  return data;
};