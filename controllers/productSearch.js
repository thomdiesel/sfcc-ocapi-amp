const express = require('express');

const ProductSearchModel = require('../models/ProductSearch');
const Helper = require('../lib/view-model-helper');

const exposeTemplates = require('../lib/client-templates');

const router = express.Router();

/**
 * GET /
 * Home page.
 */
router.get('/', exposeTemplates(), (req, res) => {
  Helper.getViewModel(req, ProductSearchModel)
  .then((model) => {
    Helper.renderView(res, model, 'common/productSearch');
  })
  .catch((err) => {
    Helper.renderError(res, err);
  });
});

module.exports = router;
