import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    code: String,
    name: {
      type: String,
      required: true,
    },
    brand: String,
    description: String,
    type: {
      type: Array,
      default: [],
    },
    image_url: String,
    price: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    release_date: Date,
    purchases: {
      type: Number,
      default: 0,
    },
    specs: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: 'Product',
  }
);

const cartSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'active',
  },
  modifyOn: {
    type: Date,
    default: Date.now(),
  },
  products: {
    type: Array,
    default: [],
  },
});

const inventorySchema = new Schema(
  {
    productId: String,
    quantity: Number,
    // reservation: Array,
  },
  {
    collection: 'Inventory',
    timestamps: true,
  }
);

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    shipping: String,
    payment: Number,
    products: Array,
  },
  {
    collection: 'Order',
    timestamps: true,
  }
);

const _Product = model('Product', productSchema);
const _Cart = model('Cart', cartSchema);
const _Inventory = model('Inventory', inventorySchema);
const _Order = model('Order', orderSchema);

export { _Product, _Cart, _Inventory, _Order };
