import { ProductService } from "../../service/ecommerceService/ProductService.js";
import { BucketProductController } from "../bucketController.js";

class ProductController {
  static create = async (req, res) => {
    try {
      // Get Product data from Client to Create new Product
      const {
        name,
        key_code,
        brand,
        description,
        type,
        price,
        specs,
        image_url,
      } = req.body;

      const { message, code, result } = await ProductService.create({
        key_code,
        name,
        brand,
        description,
        type,
        price,
        specs,
        image_url,
      });

      // If status code equal 201, then insert Product into Bucket Product to Pagination
      if (code === 201) {
        const bucketId = 1;
        await BucketProductController.insert({
          productId: result._id,
          name,
          price,
          image_url,
          brand,
          bucketId,
        });
      }

      return res.status(code).json({ code, message, data: result });
    } catch (err) {
      console.log("EcommercerController::::Product::::Error::::", err);
      return res.status(500).json({ message: "Server Error!" });
    }
  };

  static get = async (req, res) => {
    try {
      const { productId } = req.params;

      // If missing productId, then return
      if (!productId)
        return res.status(400).json({ message: "Missing value!" });

      const { code, message, result } = await ProductService.get({
        productId,
      });

      return res.status(code).json({ code, message, data: result });
    } catch (err) {
      console.log("EcommercerController::::Product::::Error::::", err);
      return res.status(500).json({ message: "Server Error!" });
    }
  };

  static gets = async (req, res) => {
    // Get query pagination from URL
    BucketProductController.pagination(req, res);
  };

  static update = async (req, res) => {
    try {
      const { productId } = req.params;
      const { name, key_code, brand, description, type, price, specs } =
        req.body;

      const dateUpdate = {
        name,
        key_code,
        brand,
        description,
        type,
        price,
        specs,
      };

      if (!productId)
        return res.status(400).json({ message: "Missing value!" });

      const { code, message, result } = await ProductService.get({
        productId,
        dateUpdate,
      });

      return res.status(code).json({ code, message, data: result });
    } catch (err) {
      console.log("EcommercerController::::Product::::Error::::", err);
      return res.status(500).json({ message: "Server Error!" });
    }
  };

  static delete = async (req, res) => {
    try {
      const { productId } = req.params;
      if (!productId)
        return res.status(400).json({ message: "Missing value!" });

      const { code, message, result } = await ProductService.delete({
        productId,
      });

      return res.status(code).json({ code, message, data: result });
    } catch (err) {
      console.log("EcommercerController::::Product::::Error::::", err);
      return res.status(500).json({ message: "Server Error!" });
    }
  };
}

export { ProductController };
