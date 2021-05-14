const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const listSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    public: {
      type: Boolean,
      default: false,
    },
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
listSchema.plugin(toJSON);
listSchema.plugin(paginate);

/**
 * @typedef List
 */
const List = mongoose.model('List', listSchema);

module.exports = List;
