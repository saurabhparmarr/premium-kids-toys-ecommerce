const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductByIdentifier, // Bas ise rakho
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");

// 1. Categories pehle hona chahiye taaki wo "/:identifier" ke saath clash na kare
router.get("/categories", getCategories);

// 2. Sirf ek hi route rakho jo ID aur Slug dono handle kare
router.get("/:identifier", getProductByIdentifier);

// 3. Baki routes
router.get("/", getProducts);
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;