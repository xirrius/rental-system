const mongoose = require("mongoose");

const db = mongoose
  .connect("mongodb://127.0.0.1:27017/dbrental")
  .then((res) => {
    console.log(`Database connected successfully.`);
  })
  .catch((err) => {
    console.log("Error occurred while database connection: ", err);
  });

module.exports = db;