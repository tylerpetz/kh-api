const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const listRoute = require('./list.route');
const orderRoute = require('./order.route');
const itemRoute = require('./item.route');
const photoRoute = require('./photo.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/lists',
    route: listRoute,
  },
  {
    path: '/orders',
    route: orderRoute,
  },
  {
    path: '/items',
    route: itemRoute,
  },
  {
    path: '/photos',
    route: photoRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
