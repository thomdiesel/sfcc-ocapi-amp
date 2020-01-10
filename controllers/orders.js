const express = require('express');

const OrdersModel = require('../models/Orders');
const OrderModel = require('../models/Order');
const Helper = require('../lib/view-model-helper');

const exposeTemplates = require('../lib/client-templates');

const router = express.Router();

/**
 * GET /
 * Orders page.
 */
router.get('/', exposeTemplates(), (req, res) => {
  Helper.getViewModel(req, StoresModel)
  .then((model) => {
    Helper.renderView(res, model, 'common/orders');
  })
  .catch((err) => {
    Helper.renderError(res, err);
  });
});

router.post('/', (req, res) => {
  // Pull data from form to locate an Order
  // Exrtact orderToken . and redirect to there
  const orderToken = 'NwjjYfcz-ja3y6c1x6uwUz4J2XxDvqPgvUpfjKm0JOM';
  res.redirect(`/orders/${orderToken}`);
});

router.get('/:orderToken', exposeTemplates(), (req, res) => {
  Helper.getViewModel(req, OrderModel)
  .then((model) => {
    Helper.renderView(res, model, 'common/order');
  })
  .catch((err) => {
    Helper.renderError(res, err);
  });
});

module.exports = router;
