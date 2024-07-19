const express = require("express");
const Product = require("../models/Products");
const { verifyToken } = require("../middleware");

const router = express.Router();

router.get("/product", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send({ msg: `Products fetched.`, products });
  } catch (err) {
    console.log(err);
    res.send("Error: ", err);
  }
});

router.get("/user-product", async (req, res) => {
  const token = req.header("Authorization");
  console.log("token", token);
  const user = verifyToken(token);
  const { query } = req.query;
  if (user.email) {
    try {
      if (query !== "none") {
        const products = await Product.find({ ownerId: query });
        res.status(200).send({ msg: `Products fetched.`, products });
      } else {
        const products = await Product.find({ ownerId: user.email });
        res.status(200).send({ msg: `Products fetched.`, products });
      }
    } catch (err) {
      res.status(400).send({ msg: `Error ${err.message}` });
    }
  } else {
    res.status(401).send(`Token expired.`);
  }
});

router.post("/product/add-item", async (req, res) => {
  const token = req.header("Authorization");
  console.log("token", token);
  const user = verifyToken(token);
  if (user.email) {
    console.log(`Token verified`, user);
    try {
      const product = new Product({ ownerId: user.email, ...req.body });
      await product.save();
      res.status(201).send({ msg: "Product added successfully.", product });
    } catch (err) {
      res.status(500).send({ msg: err.message });
    }
  } else {
    res.status(401).send(`Token expired.`);
  }
});

router.get("/search-product", async (req, res) => {
  const query = req.query;
  const data = await Product.findOne({ name: { $regex: query.query } });
  console.log(data);
  res.status(200).send({ msg: "Data found", data });
});

module.exports = router;
