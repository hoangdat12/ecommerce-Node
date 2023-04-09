import { Schema, model } from 'mongoose';

const bucketProductSchema = new Schema(
  {
    bucketId: String,
    count: { type: Number, required: true },
    products: {
      type: Array,
      default: [],
    },
  },
  {
    collection: 'BucketProduct',
    timestamps: true,
  }
);

const _BucketProduct = model('BucketProduct', bucketProductSchema);

export { _BucketProduct };
