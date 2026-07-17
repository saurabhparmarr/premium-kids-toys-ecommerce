const Product = require("../models/Product");
const mongoose = require("mongoose");


const getProducts = async (req, res) => {
  try {
    const { keyword, category, minPrice, maxPrice, ageGroup } = req.query;
    let match = {};

    // 1. Keyword Filter (Name-based search)
    if (keyword) {
      match.name = { $regex: keyword, $options: "i" };
    }

    // 2. Category Filter
    if (category) {
      match.category = category;
    }

    // 3. Age Group Filter (Regex to handle flexible strings like "3-5" or "3-5 Years")
    if (ageGroup && ageGroup !== "All" && ageGroup !== "") {
      match.ageGroup = { $regex: new RegExp(`^${ageGroup}`, "i") };
    }

    // 4. Price Filtering Logic (Uses effective price: offerPrice if > 0, else base price)
    if (minPrice || maxPrice) {
      match.$expr = {
        $and: [
          minPrice ? { $gte: [{ $cond: [{ $gt: ["$offerPrice", 0] }, "$offerPrice", "$price"] }, Number(minPrice)] } : {},
          maxPrice ? { $lte: [{ $cond: [{ $gt: ["$offerPrice", 0] }, "$offerPrice", "$price"] }, Number(maxPrice)] } : {}
        ]
      };
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;

    // 5. Total Count for Pagination
    const countPipeline = [{ $match: match }, { $count: "total" }];
    const totalResult = await Product.aggregate(countPipeline);
    const totalProducts = totalResult.length > 0 ? totalResult[0].total : 0;

    // 6. Fetch paginated products sorted by newest first
    const products = await Product.aggregate([
      { $match: match },
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit }
    ]);

    res.json({
      products,
      page,
      pages: Math.ceil(totalProducts / limit),
      totalProducts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get a single product by ID
 */
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get all unique product categories
 */
const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Create a new product with auto-generated slug
 */
const createProduct = async (req, res) => {
  try {
    const { image, offerPrice, name, sku, ...rest } = req.body;

    // Generate slug from product name
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const productData = {
      ...rest,
      name,
      slug,
      images: image ? [image] : [],
      offerPrice: offerPrice || 0,
    };

    if (sku && sku.trim() !== "") {
      productData.sku = sku.trim();
    }

    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    // Handle MongoDB duplicate key error (11000)
    if (error.code === 11000) {
      return res.status(400).json({ message: "Product with this SKU or Name already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update existing product details
 */
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Update slug if product name changes
    if (req.body.name) {
      product.slug = req.body.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }

    product.name = req.body.name || product.name;
    // (Other fields would be updated here)
    
    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete a product by ID
 */
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Fetch product using either ID or URL Slug
 */
const getProductByIdentifier = async (req, res) => {
  try {
    const { identifier } = req.params;
    let product;

    // First try ID, if not found, try by Slug
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      product = await Product.findById(identifier);
    }

    if (!product) {
      product = await Product.findOne({ slug: identifier });
    }

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByIdentifier
};