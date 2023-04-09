import { _Product } from '../../model/EcommerceModel.js';

class ProductService {
  static create = async ({
    key_code,
    name,
    brand,
    description,
    type,
    price,
    specs,
    image_url,
  }) => {
    const product = await _Product.create({
      code: key_code,
      name,
      brand,
      description,
      type,
      price,
      specs,
      image_url,
    });

    // Check if product create failure, then return code 500
    if (!product)
      return {
        code: 500,
        message: 'Server Error!',
      };

    return {
      code: 201,
      message: 'Created!',
      result: product,
    };
  };

  static get = async ({ productId }) => {
    const product = await _Product.findById({ _id: productId });
    if (!product)
      return {
        code: 500,
        message: 'Error!',
      };

    return {
      code: 200,
      message: 'Success!',
      result: product,
    };
  };

  static update = async ({ productId, dataUpdate }) => {
    const product = await _Product.findOneAndUpdate(
      { _id: productId },
      { dataUpdate },
      { new: true }
    );

    if (!product)
      return {
        code: 500,
        message: 'Error!',
      };

    return {
      code: 200,
      message: 'Updated!',
      result: product,
    };
  };

  static delete = async ({ productId }) => {
    await _Product.delete({ _id: productId });

    return {
      code: 200,
      message: 'Deleted!',
    };
  };
}

export { ProductService };
