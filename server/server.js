import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./helper/connectDB.js";
import corOptions from "./config/corOptions.js";

import authRouter from "./router/authRouter.js";
import userRouter from "./router/userRouter.js";
import productRouter from "./router/ecommerceRouter/productRouter.js";
import orderRouter from "./router/ecommerceRouter/orderRouter.js";
import inventoryRouter from "./router/ecommerceRouter/inventoryRouter.js";
import cartRouter from "./router/ecommerceRouter/cartRouter.js";
import discountRouter from "./router/discountRouter.js";
import hdPayRouter from "./router/hdPayRouter.js";

// CONNECT REDIS
import "./helper/connectRedis.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(corOptions));
app.use(cookieParser());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// ROUTER
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/inventory", inventoryRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/discount", discountRouter);
app.use("/api/v1/hdPay", hdPayRouter);

const PORT = process.env.PORT;

// CONNECT MONGODB
connectDB();

// CONNECT SERVER
app.listen(PORT, () => {
  console.log("App running on port http://localhost:8080/");
});
