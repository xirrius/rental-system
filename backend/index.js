const express = require("express")
const dotenv = require('dotenv').config()
const cors = require('cors')
const db = require("./db")
const userRoute = require("./router/userRoute")
const productRoute = require("./router/productRoute")
const rentRoute = require("./router/rentRoutes")

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: true })); //form data

app.use(userRoute)
app.use(productRoute)
app.use(rentRoute)

app.get("*", (req, res) => {
  res.send(`Uh oh! Page not found.`);
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
