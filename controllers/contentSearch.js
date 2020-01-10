const express = require('express');

const ContentSearchModel = require('../models/ContentSearch');
const Helper = require('../lib/view-model-helper');

const exposeTemplates = require('../lib/client-templates');

const router = express.Router();

/**
 * GET /
 * Home page.
 */
router.get('/', exposeTemplates(), (req, res) => {
  Helper.getViewModel(req, ContentSearchModel)
  .then((model) => {
    Helper.renderView(res, model, 'common/contentSearch');
  })
  .catch((err) => {
    Helper.renderError(res, err);
  });
});

module.exports = router;
