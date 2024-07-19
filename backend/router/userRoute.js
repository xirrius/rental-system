const express = require("express");
const User = require("../models/User");
const { generateToken, verifyToken } = require("../middleware");

const router = express.Router();

router.post("/user/register", async (req, res) => {
  console.log(req.body);
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ msg: `User registered successfully`, user: user });
  } catch (error) {
    console.log(`Error: `, error);
  }
});

router.post("/user/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user.password == password) {
      const token = generateToken(user);
      res
        .status(200)
        .send({ msg: `User logged in successfully.`, token, user });
    }
  } catch (error) {
    console.log(`Error: `, error);
  }
});

router.patch("/edit-profile", async (req, res) => {
  try {
    const token = req.header("Authorization");
    const user = verifyToken(token);
    if (user.email) {
      const { address, profile, contact, name } = req.body;
      const existingUser = await User.findOne({ email: user.email });
      if (existingUser) {
        existingUser.address = address;
        existingUser.profile = profile;
        existingUser.contact = contact;
        existingUser.name = name;
        await existingUser.save();
        res.status(200).send({ msg: "Profile Updated" });
      } else {
        res.status(404).send({ msg: `User not found.` });
      }
    }
  } catch (error) {
    res.status(500).send({ msg: error });
  }
});

router.get("/user-profile", async (req, res) => {
  try {
    const token = req.header("Authorization");
    const user = verifyToken(token);
    console.log(req.query);
    const { query } = req.query;
    if (user.email) {
      if (query !== "none") {
        const { name, profile, contact, address } = await User.findOne({
          email: query,
        });
        res.status(200).send({ data: { name, profile, address, contact } });
      } else {
        const { name, profile, contact, address } = await User.findOne({
          email: user.email,
        });
        res.status(200).send({ data: { name, profile, address, contact } });
      }
    }
  } catch (error) {
    res.status(401).send({ msg: `Error ${error}` });
  }
});

module.exports = router;
