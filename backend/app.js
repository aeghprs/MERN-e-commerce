const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(express.json());
const cors = require("cors");
app.use(cors());
const cookieParser = require('cookie-parser')
app.use(cookieParser());

app.use(morgan(':method :url :status  :response-time ms'));
app.use(express.urlencoded({ extended: true }));

const productRouter = require("./routes/productRoutes");
app.use("/product", productRouter);

const userRouter = require("./routes/userRoutes");
app.use("/user", userRouter);


const orderRouter = require("./routes/OrderRoutes");
app.use("/order", orderRouter);


const paymentRouter = require("./routes/PaymentRoutes");
app.use("/payment", paymentRouter);


module.exports = app;