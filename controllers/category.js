// Initialize required libraries
const express = require('express');

// Initialize local libraries
const CategoryModel = require('../models/Category');
const Helper = require('../lib/view-model-helper');
const exposeTemplates = require('../lib/client-templates');

// Initialize the router
const router = express.Router();

/**
 * GET /
 * Category landing page.  This page is used to render a category landing page
 * that may include the rendering of products for sub-categories.
 */
router.get('/:id', exposeTemplates(), (req, res) => {
  Helper.getViewModel(req, CategoryModel)
  .then((model) => {
    const templateName = model.category.parent_category_id === 'root' ? 'common/department' : 'common/category';
    Helper.renderView(res, model, templateName);
  })
  .catch((err) => {
    Helper.renderError(res, err);
  });
});

module.exports = router;
