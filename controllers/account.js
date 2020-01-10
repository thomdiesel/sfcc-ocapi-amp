const express = require('express');

const AccountModel = require('../models/Account');
const OrderHistoryModel = require('../models/OrderHistory');
const Helper = require('../lib/view-model-helper');

const exposeTemplates = require('../lib/client-templates');

const router = express.Router();

router.use((req, res, next) => {
  if (req.user && req.user.auth_type === 'registered') {
    console.log('allowing registered user access to account areas');
    next();
  } else {
    console.log('redirecting unauthorized access to login page, with returnTo set');
    req.session.returnTo = req.path;
    res.redirect('/login');
  }
});

/**
 * GET /
 * Account Overview page.
 */
router.get('/', exposeTemplates(), (req, res) => {
  Helper.getViewModel(req, OrderHistoryModel)
  .then((model) => {
    Helper.renderView(res, model, 'common/account');
  })
  .catch((err) => {
    Helper.renderError(res, err);
  });
});

/**
 * GET /
 * Account Profile page.
 */
router.get('/profile', exposeTemplates(), (req, res) => {
  Helper.getViewModel(req, AccountModel)
  .then((model) => {
    Helper.renderView(res, model, 'common/profile');
  })
  .catch((err) => {
    Helper.renderError(res, err);
  });
});

/**
 * GET /
 * Account Orders page.
 */
router.get('/orders', exposeTemplates(), (req, res) => {
  Helper.getViewModel(req, OrderHistoryModel)
  .then((model) => {
    Helper.renderView(res, model, 'common/orderHistory');
  })
  .catch((err) => {
    Helper.renderError(res, err);
  });
});
/**
 * GET /
 * Account Order page.
 */
router.get('/order/:orderToken', exposeTemplates(), (req, res) => {
  Helper.getViewModel(req, AccountModel)
  .then((model) => {
    Helper.renderView(res, model, 'common/accountOrder');
  })
  .catch((err) => {
    Helper.renderError(res, err);
  });
});

/**
 * GET /
 * Account Orders page.
 */
router.get('/address-book', exposeTemplates(), (req, res) => {
  Helper.getViewModel(req, AccountModel)
  .then((model) => {
    Helper.renderView(res, model, 'common/addressBook');
  })
  .catch((err) => {
    Helper.renderError(res, err);
  });
});

/**
 * GET /
 * Account Orders page.
 */
router.get('/wallet', exposeTemplates(), (req, res) => {
  Helper.getViewModel(req, AccountModel)
  .then((model) => {
    Helper.renderView(res, model, 'common/wallet');
  })
  .catch((err) => {
    Helper.renderError(res, err);
  });
});

/**
 * GET /
 * Home page.
 */
router.get('/wishlist', exposeTemplates(), (req, res) => {
  Helper.getViewModel(req, AccountModel)
  .then((model) => {
    Helper.renderView(res, model, 'common/wishlist');
  })
  .catch((err) => {
    Helper.renderError(res, err);
  });
});

/**
 * GET /
 * Home page.
 */
router.get('/gift-registry', exposeTemplates(), (req, res) => {
  Helper.getViewModel(req, AccountModel)
  .then((model) => {
    Helper.renderView(res, model, 'common/registry');
  })
  .catch((err) => {
    Helper.renderError(res, err);
  });
});

module.exports = router;
