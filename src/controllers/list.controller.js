const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { listService } = require('../services');

const createList = catchAsync(async (req, res) => {
  const list = await listService.createList({ user: req.user._id, ...req.body });
  res.status(httpStatus.CREATED).send(list);
});

const getLists = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await listService.queryLists({ user: req.user._id, ...filter }, options);
  res.send(result);
});

const getList = catchAsync(async (req, res) => {
  const list = await listService.getListById(req.params.listId);
  if (!list) {
    throw new ApiError(httpStatus.NOT_FOUND, 'List not found');
  }
  res.send(list);
});

const updateList = catchAsync(async (req, res) => {
  const list = await listService.updateListById(req.params.listId, { user: req.user._id, ...req.body });
  res.send(list);
});

const deleteList = catchAsync(async (req, res) => {
  await listService.deleteListById(req.params.listId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createList,
  getLists,
  getList,
  updateList,
  deleteList,
};
