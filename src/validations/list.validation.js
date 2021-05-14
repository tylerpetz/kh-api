const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createList = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    public: Joi.boolean(),
  }),
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
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      public: Joi.boolean(),
    })
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
