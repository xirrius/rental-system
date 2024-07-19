const express = require("express");
const Product = require("../models/Products");
const Rent = require("../models/Rent");
const { verifyToken } = require("../middleware");

const router = express.Router();

router.post("/rent", async (req, res) => {
  const token = req.header("Authorization");
  console.log("token", token);
  const user = verifyToken(token);
  if (user.email) {
    console.log(`Token verified`, user);
    try {
        // 30 days ahead
      const expireDate = new Date().getTime() + 30 * 24 * 3600 * 1000;
      const { productId,productName, pricePerDay } = req.body;
      const rentedProduct = new Rent({
        userId: user.email,
        productId,
        productName,
        totalPrice: pricePerDay * 30,
        expireDate,
      });
      await rentedProduct.save();

      await Product.updateOne({_id:productId}, {
        availability_status: "Unavailable"
      })
      res.status(201).send({ msg: `You have rented product for 1 month.` });
    } catch (err) {
      res.status(400).send({ msg: `Error ${err.message}` });
    }
  } else {
    res.status(401).send(`Token expired.`);
  }
});

router.get("/user-rent", async (req, res) => {
  const token = req.header("Authorization");
  console.log("token", token);
  const user = verifyToken(token);
  if (user.email) {
    console.log(`Token verified`, user);
    try {
      const rentedProducts = await Rent.find({ userId: user.email });
      res.status(200).send({ msg: `Products fetched.`, rentedProducts });
    } catch (err) {
      res.status(400).send({ msg: `Error ${err.message}` });
    }
  } else {
    res.status(401).send(`Token expired.`);
  }
});


module.exports = router;
