import CartService from '../../service/ecommerceService/CartService.js';

class CartController {
  static add = async (req, res) => {
    try {
      const { userId, productId, name, price, quantity, image_url } = req.body;
      // Check data received from client, if missing then return
      if (!userId || !productId || !price || !quantity || !image_url) {
        return res.status(400).json({ message: 'Missing value!' });
      }

      const { code, message, result } = await CartService.add({
        userId,
        productId,
        name,
        price: parseInt(price),
        quantity: parseInt(quantity),
        image_url,
      });

      return res.status(code).json({ message, data: result });
    } catch (err) {
      console.log('CartController::::Error:::', err);
      return res.status(500).json({ message: 'Error' });
    }
  };

  static delete = async (req, res) => {
    try {
      const { userId, productId } = req.body;
      // Check data received from client, if missing then return
      if (!userId || !productId) {
        return res.status(400).json({ message: 'Missing value!' });
      }

      const { code, message, result } = await CartService.delete({
        userId,
        productId,
      });

      return res.status(code).json({ message, data: result });
    } catch (err) {
      console.log('CartController::::Error:::', err);
      return res.status(500).json({ message: 'Error' });
    }
  };

  static create = async (req, res) => {
    try {
      const { userId } = req.params;
      await CartService.createNewCart({ userId });
      return res.status(200).json({ message: 'Create success!' });
    } catch (err) {
      console.log('CartController::::Error:::', err);
      return res.status(500).json({ message: 'Error' });
    }
  };
}

export default CartController;
