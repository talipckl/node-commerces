const mongoose = require("mongoose");

const orderSchmea = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, required: true },
    address:{type: Object,required: true},
    status: { type: String, default:"pending"}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchmea);
