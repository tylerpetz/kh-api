const Joi = require('joi');
const categories = require('../config/categories');
const { objectId } = require('./custom.validation');

const itemBody = {
  price: Joi.number().integer(),
  qty: Joi.number().integer().required(),
  description: Joi.string(),
  category: Joi.string()
    .required()
    .valid(...categories),
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
};

const createItem = {
  body: Joi.object().keys({ ...itemBody, name: Joi.string().required() }),
};

const getItems = {
  query: Joi.object().keys({
    name: Joi.string(),
    category: Joi.string(),
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
    .keys({ ...itemBody, name: Joi.string() })
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
