const Joi = require('joi');
const { objectId } = require('./custom.validation');

const orderBody = {
  description: Joi.string(),
  public: Joi.boolean(),
};

const createOrder = {
  body: Joi.object().keys({ ...orderBody, name: Joi.string().required() }),
};

const getOrders = {
  query: Joi.object().keys({
    name: Joi.string(),
    public: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

const updateOrder = {
  params: Joi.object().keys({
    orderId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({ ...orderBody, name: Joi.string() })
    .min(1),
};

const deleteOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
};
