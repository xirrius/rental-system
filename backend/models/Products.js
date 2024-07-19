const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  ownerId: {
    type: String,
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "users",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price_per_day: {
    type: Number,
    required: true,
  },
  availability_status: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  // specifications: {
  //   type: JSON,
  //   required: true,
  // },
});

module.exports = mongoose.model("Product", productSchema);
