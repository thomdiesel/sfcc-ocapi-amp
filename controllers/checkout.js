const express = require('express');

const CheckoutModel = require('../models/Checkout');
const Helper = require('../lib/view-model-helper');

const exposeTemplates = require('../lib/client-templates');

const router = express.Router();

/**
 * GET /
 * Home page.
 */
router.get('/', exposeTemplates(), (req, res) => {
  Helper.getViewModel(req, CheckoutModel)
  .then((model) => {
    Helper.renderView(res, model, 'common/checkout');
  })
  .catch((err) => {
    Helper.renderError(res, err);
  });
});

module.exports = router;
