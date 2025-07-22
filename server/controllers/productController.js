const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  const { name, description, price, category, quantity, image } = req.body;

  // Basic validation
  if (!name || !description || !price || !category || !quantity) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Optional: Enforce only farmers can do this
    if (req.user.role !== "farmer") {
      return res.status(403).json({ message: "Access denied" });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      quantity,
      image,
      createdBy: req.user.id,
    });

    await newProduct.save();
    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (err) {
    console.error("Create product error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
