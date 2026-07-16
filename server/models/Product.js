const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, lowercase: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  offerPrice: { type: Number, default: 0, min: 0 },
  category: { type: String, required: true, trim: true },
  ageGroup: { type: String, required: true, enum: ["0-2 Years", "3-5 Years", "6-8 Years", "9-12 Years"] },
  images: [{ type: String }],
  stock: { type: Number, required: true, default: 0, min: 0 },
  sku: { type: String, unique: true, trim: true,sparse: true },
  brand: { type: String, trim: true },
  ratings: { type: Number, default: 0, min: 0, max: 5 },
  numReviews: { type: Number, default: 0, min: 0 },
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });



module.exports = mongoose.model("Product", productSchema);