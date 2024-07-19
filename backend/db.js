const mongoose = require("mongoose");

const db = mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => {
    console.log(`Database connected successfully.`);
  })
  .catch((err) => {
    console.log("Error occurred while database connection: ", err);
  });

module.exports = db;