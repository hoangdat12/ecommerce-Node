import _User from '../../model/User.js';
import { _Inventory, _Order } from '../../model/EcommerceModel.js';

import InventoryService from './InventoryService.js';

class OrderService {
  static order = async ({ userId, shipping, payment, products }) => {
    // Check User order is Exist or Not
    const userExist = await _User.findById({ _id: userId });
    if (!userExist)
      return {
        code: 400,
        message: 'Not found!',
      };
    // Check the information sent from the client
    if (!products || !shipping || !payment)
      return {
        code: 400,
        message: 'Missing value!',
      };
    // Check Product is Stocking in Inventory
    products.map((product) => {
      // Convert quantity and price from request to Number
      product.quantity = parseInt(product.quantity);
      product.price = parseInt(product.price);
      const isStocking = InventoryService.isStocking({
        productId: product._id,
        quantity: product.quantity,
      });
      if (!isStocking)
        return {
          code: 200,
          message: 'Sale out!',
        };
    });
    // Create new Order
    const newOrder = await _Order.create({
      userId,
      shipping,
      payment,
      products,
    });
    // Handle create Error
    if (!newOrder)
      return {
        code: 500,
        messsage: 'Error!',
      };
    // Decrement product in Inventory
    products.map((product) => {
      const inventory = InventoryService.decrementProduct({
        productId: product.productId,
        quantity: parseInt(product.quantity),
      });
      if (!inventory)
        return {
          code: 500,
          message: 'Error!',
        };
    });
    return {
      code: 201,
      message: 'Created',
      result: newOrder,
    };
  };

  static cancelOrder = async ({ userId, orderId }) => {
    // Check User order is Exist or Not
    const userExist = await _User.findById({ _id: userId });
    if (!userExist)
      return {
        code: 400,
        message: 'Not found!',
      };
    // Check Order is Exist or not
    const orderExist = await _Order.findById({ _id: orderId });
    if (!orderExist)
      return {
        code: 400,
        message: 'Not found!',
      };
    // Get Order
    const order = await _Order.findOne({ _id: orderId, userId });
    // If Order exist, then handle cancel Order
    await _Order.deleteOne({ _id: orderId, userId });
    // Increment product in Inventory
    order.products.map((product) => {
      InventoryService.incrementProduct({
        productId: product.productId,
        quantity: product.quantity,
      });
    });
    return {
      code: 200,
      message: 'Deleted',
    };
  };
}

export default OrderService;
