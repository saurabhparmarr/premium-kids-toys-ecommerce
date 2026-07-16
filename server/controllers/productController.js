const Product = require("../models/Product");

const mongoose = require("mongoose");
const getProducts = async (req, res) => {
  try {
    const { keyword, category, minPrice, maxPrice, ageGroup } = req.query;

    let match = {};

    // 1. Keyword Filter
    if (keyword) {
      match.name = { $regex: keyword, $options: "i" };
    }

    // 2. Category Filter
    if (category) {
      match.category = category;
    }

    // 3. Age Group Filter (Regex fix: match karega chahe "3-5" ho ya "3-5 Years")
    if (ageGroup && ageGroup !== "All" && ageGroup !== "") {
      match.ageGroup = { $regex: new RegExp(`^${ageGroup}`, "i") };
    }

    // 4. Price Filtering Logic (Effective Price par)
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

    // 5. Total Count
    const countPipeline = [{ $match: match }, { $count: "total" }];
    const totalResult = await Product.aggregate(countPipeline);
    const totalProducts = totalResult.length > 0 ? totalResult[0].total : 0;

    // 6. Products Fetching
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


const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createProduct = async (req, res) => {
  try {
    const { image, offerPrice, name, sku, ...rest } = req.body;

    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const productData = {
      ...rest,
      name,
      slug,
      images: image ? [image] : [],
      offerPrice: offerPrice || 0,
    };

    // Agar SKU input mein diya gaya hai tabhi save karo
    if (sku && sku.trim() !== "") {
      productData.sku = sku.trim();
    }

    const product = await Product.create(productData);

    res.status(201).json(product);
  } catch (error) {
    // Duplicate key error 11000 ko handle karo
    if (error.code === 11000) {
      return res.status(400).json({ message: "Product with this SKU or Name already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};



const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Slug update yahan karo
    if (req.body.name) {
      product.slug = req.body.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }

    product.name = req.body.name || product.name;
    // ... baki fields update karo
    
    // Ab yahan save karo, koi error nahi aayega kyunki koi hook nahi hai
    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


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


const getProductByIdentifier = async (req, res) => {
  try {
    const { identifier } = req.params;
    let product;

    // Check if the input is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      product = await Product.findById(identifier);
    }

    // If not found by ID, try searching by slug
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