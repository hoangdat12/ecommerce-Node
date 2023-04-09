import { _BucketProduct } from "../model/BucketProductModel.js";
import client from "../helper/connectRedis.js";

class BucketProductController {
  static insert = async ({
    productId,
    name,
    price,
    image_url,
    brand,
    bucketId,
  }) => {
    try {
      // Convert productId to String
      productId = productId.toString();

      // Create _bucketId with regular expiration
      const _bucketId = new RegExp(`^${bucketId}_`);

      // Insert Product in Bucket with atom database
      return await _BucketProduct.findOneAndUpdate(
        {
          bucketId: _bucketId,
          // Each bucket contains 20 products
          count: { $lt: 20 },
        },
        {
          // Push product
          $push: {
            products: {
              name,
              price,
              image_url,
              brand,
            },
          },
          // Increment quantity Product in Bucket
          $inc: { count: 1 },
          // Add ...
          $setOnInsert: {
            bucketId: `${bucketId}_${new Date().getTime()}`,
          },
        },
        {
          // If not Exist, then create new document
          upsert: true,
          // Return new value
          new: true,
        }
      );
    } catch (err) {
      console.log("bucketProductController::::Error::::", err);
      return res.status(500).json({ message: "Server Error!" });
    }
  };

  static pagination = (req, res) => {
    // Get query
    const bucketId = req.query.bucketId;
    const page = parseInt(req.query.page || 1);
    try {
      const _bucketId = new RegExp(`^${bucketId}_`);
      // Get data from redis
      // If have dat: => client request -> redis -> YES -> return data Client
      // Else: => client request -> redis -> NO -> get data database -> return data Client -> set cache.
      client.get(_bucketId.toString(), async (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Error!" });
        }
        // If have data
        if (data) {
          return res
            .status(200)
            .json({ message: "Success!", data: JSON.parse(data) });
        } else {
          // Get data from database
          const products = await _BucketProduct
            .find({
              bucketId: _bucketId,
            })
            .sort({ _id: 1 })
            .skip(page - 1);
          // If products is not exist, then return Error server
          if (!products) return res.status(500).json({ message: "Error!" });
          else {
            // Return data client
            res.status(200).json({ message: "Success!", data: products });
            // Set catch
            const random = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
            client.set(
              _bucketId.toString(),
              JSON.stringify(products),
              "EX",
              600 + random
            );
          }
        }
      });
    } catch (err) {
      console.log("bucketProductController::::Error::::", err);
      return res.status(500).json({ message: "Server Error!" });
    }
  };
}

export { BucketProductController };
