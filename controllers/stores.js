const express = require('express');

const StoresModel = require('../models/Stores');
const Helper = require('../lib/view-model-helper');

const exposeTemplates = require('../lib/client-templates');

const router = express.Router();

/**
 * GET /
 * Stores page.
 */
router.get('/', exposeTemplates(), (req, res) => {
  Helper.getViewModel(req, StoresModel)
  .then((model) => {
    Helper.renderView(res, model, 'common/stores');
  })
  .catch((err) => {
    Helper.renderError(res, err);
  });
});

module.exports = router;
