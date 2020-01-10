const express = require('express');

const ContentModel = require('../models/Content');
const Helper = require('../lib/view-model-helper');

const exposeTemplates = require('../lib/client-templates');

const router = express.Router();

/**
 * GET /
 * Home page.
 */
router.get('/:id', exposeTemplates(), (req, res) => {
  Helper.getViewModel(req, ContentModel)
  .then((model) => {
    Helper.renderView(res, model, 'common/content');
  })
  .catch((err) => {
    Helper.renderError(res, err);
  });
});

module.exports = router;
