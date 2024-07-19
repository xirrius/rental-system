const mongoose = require('mongoose')

const rentSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "products",
        required:true
    },
    userId: {
        type: String,
        ref: "users",
        required:true
    },
    productName: {
        type: String,
    },
    totalPrice: {
        type: Number,
        min: 0,
        // required:true
    },
    expireDate : {
        type: Date,
    }
})

module.exports = mongoose.model("Rent", rentSchema)