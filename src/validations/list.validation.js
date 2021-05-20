const Joi = require('joi');
const { objectId } = require('./custom.validation');

const listBody = {
  description: Joi.string(),
  public: Joi.boolean(),
};

const createList = {
  body: Joi.object().keys({ ...listBody, name: Joi.string().required() }),
};

const getLists = {
  query: Joi.object().keys({
    name: Joi.string(),
    public: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getList = {
  params: Joi.object().keys({
    listId: Joi.string().custom(objectId),
  }),
};

const updateList = {
  params: Joi.object().keys({
    listId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({ ...listBody, name: Joi.string() })
    .min(1),
};

const deleteList = {
  params: Joi.object().keys({
    listId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createList,
  getLists,
  getList,
  updateList,
  deleteList,
};
