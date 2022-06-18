const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const app = express();
const cors =require("cors");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const productRouter=require("./routes/product");
const cartRouter=require("./routes/cart");
const orderRouter=require("./routes/order");
app.use(express.json());
env.config();
app.use(cors())
//  Databased connect
mongoose
  .connect("mongodb://localhost:27017/NODE_COMMERCE", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("databsed connect");
  })
  .catch((err) => {
    console.log("disconnected" + err);
  });

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);

app.listen(5000, () => {
  console.log(`backend server is running port 5000 `);
});
