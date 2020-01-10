const express = require('express');

const FolderModel = require('../models/Folder');
const Helper = require('../lib/view-model-helper');

const exposeTemplates = require('../lib/client-templates');

const router = express.Router();

/**
 * GET /
 * Home page.
 */
router.get('/:id', exposeTemplates(), (req, res) => {
  Helper.getViewModel(req, FolderModel)
  .then((model) => {
    Helper.renderView(res, model, 'common/folder');
  })
  .catch((err) => {
    Helper.renderError(res, err);
  });
});

module.exports = router;
