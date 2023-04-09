import { _Inventory } from '../../model/EcommerceModel.js';

class InventoryService {
  static add = async ({ productId, quantity }) => {
    const isExist = await _Inventory.findOne({ productId });
    if (isExist)
      return {
        code: 400,
        message: 'Existed!',
      };
    const inventory = await _Inventory.create({ productId, quantity });
    if (!inventory)
      return {
        code: 500,
        message: 'Server Error!',
      };
    return {
      code: 200,
      message: 'Created!',
      result: inventory,
    };
  };

  static delete = async ({ productId }) => {
    await _Inventory.deleteOne({ productId });
    return {
      code: 200,
      message: 'Deleted!',
    };
  };

  static incrementProduct = async ({ productId, quantity }) => {
    const inventory = await _Inventory.findOneAndUpdate(
      { productId },
      { $inc: { quantity: +quantity } }
    );
    if (!inventory) {
      return false;
    }
    return true;
  };

  static decrementProduct = async ({ productId, quantity }) => {
    const inventory = await _Inventory.findOneAndUpdate(
      { productId },
      { $inc: { quantity: -quantity } },
      { new: true }
    );
    if (!inventory) return false;
    return true;
  };

  static isStocking = async ({ productId }) => {
    const check = await _Inventory.findOne({ productId, quantity: { $gt: 0 } });

    if (check) return true;
    else return false;
  };

  static getQuantity = async ({ productId }) => {
    const inventory = await _Inventory.findOne({ productId });
    return inventory.quantity;
  };
}

export default InventoryService;
