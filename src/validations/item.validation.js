const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createItem = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().integer(),
    qty: Joi.number().integer().required(),
    description: Joi.string(),
    category: Joi.string(),
    public: Joi.boolean(),
    owned: Joi.boolean(),
    details: Joi.object({
      maker: Joi.string(),
      model: Joi.string(),
      color: Joi.string(),
    }),
    urls: Joi.array().items(Joi.string()),
    lists: Joi.array().items(Joi.string()),
    photos: Joi.array().items(Joi.string()),
  }),
};

const getItems = {
  query: Joi.object().keys({
    name: Joi.string(),
    category: Joi.string(),
    public: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getItem = {
  params: Joi.object().keys({
    itemId: Joi.string().custom(objectId),
  }),
};

const updateItem = {
  params: Joi.object().keys({
    itemId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      price: Joi.number().integer(),
      qty: Joi.number().integer(),
      description: Joi.string(),
      public: Joi.boolean(),
      owned: Joi.boolean(),
      details: Joi.object({
        maker: Joi.string(),
        model: Joi.string(),
        color: Joi.string(),
      }),
      category: Joi.string(),
      urls: Joi.array().items(Joi.string()),
      lists: Joi.array().items(Joi.string()),
      photos: Joi.array().items(Joi.string()),
    })
    .min(1),
};

const deleteItem = {
  params: Joi.object().keys({
    itemId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
};
