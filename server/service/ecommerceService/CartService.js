import e from 'express';
import { _Cart } from '../../model/EcommerceModel.js';
import _User from '../../model/User.js';

import userService from '../../service/userService.js';

class CartService {
  static add = async ({
    userId,
    productId,
    name,
    price,
    quantity,
    image_url,
  }) => {
    // Check user is Exist or not
    await userService.isUserExist({ userId });
    let cart;
    // If product is Exist, then increment quantity in Cart
    const isExistInCart = await this.isExistInCart({ userId, productId });
    console.log(isExistInCart);
    if (isExistInCart) {
      cart = await _Cart.updateOne(
        {
          userId,
          products: {
            $elemMatch: {
              productId: productId,
            },
          },
        },
        {
          $inc: {
            'products.$.quantity': +quantity,
          },
        },
        {
          upsert: true,
          new: true,
        }
      );
    }
    // Else if product is not Exist, then add in Cart
    else {
      cart = await _Cart.findOneAndUpdate(
        {
          userId,
        },
        {
          $push: {
            products: {
              productId,
              name,
              price,
              quantity,
              image_url,
            },
          },
        },
        {
          new: true,
        }
      );
    }
    if (!cart)
      return {
        code: 500,
        message: 'Error',
      };
    else
      return {
        code: 200,
        message: 'Success',
        result: cart,
      };
  };

  static delete = async ({ userId, productId }) => {
    // Check User exist or not
    await userService.isUserExist({ userId });
    // Check product exist or not
    const isExist = this.isExistInCart({ userId, productId });

    if (isExist) {
      await _Cart.findOneAndUpdate(
        {
          userId,
        },
        {
          $pull: {
            products: {
              productId: productId,
            },
          },
        }
      );
      return {
        code: 200,
        message: 'Deleted!',
      };
    } else {
      return {
        code: 400,
        message: 'Not found!',
      };
    }
  };

  static isExistInCart = async ({ userId, productId }) => {
    const isExist = await _Cart.findOne({
      userId,
      products: { $elemMatch: { productId: productId } },
    });
    return isExist;
  };

  static createNewCart = async ({ userId }) => {
    await _Cart.create({ userId });
  };
}

export default CartService;
