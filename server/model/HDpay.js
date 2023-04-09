import { Schema, model } from "mongoose";

const HDpaySchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    coin: {
      type: Number,
      default: 0,
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const _HDpay = model("Hdpay", HDpaySchema);

export default _HDpay;
