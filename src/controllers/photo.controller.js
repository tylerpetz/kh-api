const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { photoService } = require('../services');

const uploadPhoto = catchAsync(async (req, res) => {
  const photo = await photoService.uploadFile({ user: req.user._id, ...req.body });
  res.status(httpStatus.CREATED).send(photo);
});

module.exports = {
  uploadPhoto,
};
