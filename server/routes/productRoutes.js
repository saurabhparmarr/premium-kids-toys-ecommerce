const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductByIdentifier,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/categories", getCategories);

router.get("/:identifier", getProductByIdentifier);

router.get("/", getProducts);
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
