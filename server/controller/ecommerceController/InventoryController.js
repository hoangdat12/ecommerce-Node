import InventoryService from '../../service/ecommerceService/InventoryService.js';

class InventoryController {
  static add = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      if (!productId || !quantity) {
        return res.status(400).json({ message: 'Missing value!' });
      }

      const { code, message, result } = await InventoryService.add({
        productId,
        quantity,
      });
      return res.status(code).json({ message, data: result });
    } catch (err) {
      console.log('InventoryController::::Error::::', err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  };

  static delete = async (req, res) => {
    try {
      const { productId } = req.body;
      if (!productId) {
        return res.status(400).json({ message: 'Missing value!' });
      }

      const { code, message, result } = await InventoryService.delete({
        productId,
      });

      return res.status(code).json({ message, data: result });
    } catch (err) {
      console.log('InventoryController::::Error::::', err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  };

  static increment = async (req, res) => {
    try {
      const { productId, quantity } = req.body;

      if (!productId || !quantity) {
        return res.status(400).json({ message: 'Missing value!' });
      }

      const inventory = await InventoryService.incrementProduct({
        productId,
        quantity,
      });

      if (!inventory) {
        return res.status(500).json({ message: 'Error' });
      }
      return res.status(200).json({ message: 'Success!' });
    } catch (err) {
      console.log('InventoryController::::Error::::', err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  };

  static getQuantity = async (req, res) => {
    try {
      const { productId } = req.body;
      if (!productId) {
        return res.status(400).json({ message: 'Missing value!' });
      }
      const quantity = await InventoryService.getQuantity({ productId });
      return res.status(200).json({ quantity: quantity });
    } catch (err) {
      console.log('InventoryController::::Error::::', err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  };
}

export default InventoryController;
