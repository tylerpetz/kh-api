const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const orderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    details: {
      orderType: {
        type: String,
        enum: ['In Stock', 'Group Buy', 'Third-Party'],
        default: 'In Stock',
      },
      website: {
        type: String,
      },
      username: {
        type: String,
      },
    },
    shipping: {
      type: Number,
      default: 0,
    },
    urls: [
      {
        type: String,
      },
    ],
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Item',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

/**
 * @typedef Order
 */
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
