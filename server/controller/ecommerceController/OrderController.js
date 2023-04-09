import { _Order } from "../../model/EcommerceModel.js";
import OrderService from "../../service/ecommerceService/OrderService.js";
import DiscountOptions from "../discountController/discount.js";
import ShippingFactory from "../shippingController/Shipping.js";

class OrderController {
  static order = async (req, res) => {
    try {
      const { userId, shipping, payment, products } = req.body;
      if (!userId || !shipping || !payment || !products) {
        return res.status(400).json({ message: "Missing value!" });
      }
      if (products.length === 0) {
        return res.status(400).json({ message: "Missing value!" });
      }
      const { code, message, result } = await OrderService.order({
        userId,
        shipping,
        payment,
        products,
      });
      return res.status(code).json({ message, data: result });
    } catch (err) {
      console.log("OrderController:::Error:::", err);
      return res.status(500).json({ message: "Server Error!" });
    }
  };

  static cancelOrder = async (req, res) => {
    try {
      const { userId, orderId } = req.body;

      if (!userId || !orderId) {
        return res.status(400).json({ message: "Missing value!" });
      }

      const { code, message, result } = await OrderService.cancelOrder({
        userId,
        orderId,
      });
      return res.status(code).json({ message, data: result });
    } catch (err) {
      console.log("OrderController:::Error:::", err);
      return res.status(500).json({ message: "Server Error!" });
    }
  };

  static confirmOrder = async (req, res) => {
    try {
      const { orderId, discount, shippingMethod } = req.body;
      const order = await _Order.findById({ _id: orderId });
      // If Order is not Exist return
      if (!order) {
        return res.status(500).json({ message: "Error" });
      }
      // Get origianl Price
      let originalPrice = 0;
      let weight = 0;
      order.products.map((product) => {
        originalPrice += product.price * product.quantity;
        weight += product.weight * product.quantity;
      });
      let price = originalPrice;
      // Get price after using discount code
      if (discount) {
        price = await DiscountOptions.applyDiscount(discount, originalPrice);
      }
      const orderShipping = {
        weight,
        address: "hue",
      };
      // Calculator shipping
      const priceShipping =
        ShippingFactory.createShipping(shippingMethod).calculateShippingCost(
          orderShipping
        );
      // Total price order
      const totalPrice = price + priceShipping;
      return res
        .status(200)
        .json({ totalPrice, originalPrice, price, priceShipping });
    } catch (err) {
      console.log("OrderController:::Error:::", err);
      return res.status(500).json({ message: "Server Error!" });
    }
  };
}

export default OrderController;
