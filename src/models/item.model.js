const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    qty: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: [
        'Uncategorized',
        'Keyboard',
        'Keycap Set',
        'Case',
        'Switches',
        'Artisan Keycap',
        'Cable',
        'Deskmat',
        'Lube',
        'Springs',
        'Stabilizers',
        'Other',
      ],
      default: 'Uncategorized',
    },
    description: {
      type: String,
    },
    public: {
      type: Boolean,
      default: false,
    },
    owned: {
      type: Boolean,
      default: true,
    },
    photos: [
      {
        type: String,
      },
    ],
    urls: [
      {
        type: String,
      },
    ],
    details: {
      maker: {
        type: String,
      },
      model: {
        type: String,
      },
      color: {
        type: String,
      },
    },
    lists: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'List',
      },
    ],
    order: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Order',
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
itemSchema.plugin(toJSON);
itemSchema.plugin(paginate);

/**
 * @typedef Item
 */
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
