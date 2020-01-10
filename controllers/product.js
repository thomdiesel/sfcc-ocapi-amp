const express = require('express');

const ProductModel = require('../models/Product');
const Helper = require('../lib/view-model-helper');

const exposeTemplates = require('../lib/client-templates');

const router = express.Router();

/**
 * GET /
 * Home page.
 */
router.get('/:id', exposeTemplates(), (req, res) => {
  Helper.getViewModel(req, ProductModel)
  .then((model) => {
    Helper.renderView(res, model, 'common/product');
  })
  .catch((err) => {
    Helper.renderError(res, err);
  });
});

module.exports = router;
