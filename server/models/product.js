const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  images: [String],
  reviews: [
    {
      rating: Number,
      comment: String,
      reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    }
  ],
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  inStock: Boolean
});
module.exports = mongoose.model("Product", productSchema);
