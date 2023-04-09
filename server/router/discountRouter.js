import { Router } from "express";
import DiscountOptions from "../controller/discountController/Discount.js";

const router = Router();

router.post("/apply", async (req, res) => {
  let { discountCode, originalPrice } = req.body;
  discountCode = discountCode.trim();
  const price = await DiscountOptions.applyDiscount(
    discountCode,
    originalPrice
  );
  console.log(price);
  if (price === false) {
    return res.status(400).json({ message: "Discount is not Exist!" });
  } else if (price === originalPrice) {
    return res.status(200).json({ message: "Discount is not efffect!" });
  } else {
    return res
      .status(200)
      .json({ message: "Success", discount: originalPrice - price });
  }
});

export default router;
