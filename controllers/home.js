const express = require('express');

const HomeModel = require('../models/Home');
const LoginModel = require('../models/Login');
const OrderModel = require('../models/Order');
const MixedProductsModel = require('../models/MixedProducts');

const Base64 = require('base-64');

const Helper = require('../lib/view-model-helper');

const exposeTemplates = require('../lib/client-templates');

const router = express.Router();

const request = require('request');

/**
 * GET /
 * Home page.
 */
router.get('/', exposeTemplates(), (req, res) => {
  Helper.getViewModel(req, HomeModel)
  .then((model) => {
    Helper.renderView(res, model, 'common/home');
  })
  .catch((err) => {
    Helper.renderError(res, err);
  });
});

router.get('/login', (req, res) => {
  Helper.getViewModel(req, HomeModel)
  .then((model) => {
    Helper.renderView(res, model, 'common/login');
  })
  .catch((err) => {
    Helper.renderError(res, err);
  });
});

router.post('/login', (req, res) => {
  const username = req.body.loginEmail;
  const password = req.body.loginPassword;

  // try to log in
  const authUrl = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/customers/auth?client_id=${process.env.OCAPI_CLIENT_ID}`;
  const creds = Base64.encode(`${username}:${password}`);

  request.post({
      uri: authUrl,
      body: JSON.stringify({ type: 'credentials' }),
      headers: {
        'content-type':'application/json',
        'authorization':`Basic ${creds}`
      }
  }, function (err, response, body) {
    if (err) {
      req.session.user = null;
      req.session.bearerToken = null;
      res.flash('Unable to login');
      return res.redirect('/login');
    }

    const auth = JSON.parse(body);
    const bearerToken = response.headers.authorization;
    const customerUrl = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/customers/${auth.customer_id}?client_id=${process.env.OCAPI_CLIENT_ID}&expand=addresses,paymentinstruments`;

    request.get({
      uri: customerUrl,
      headers: {
        authorization: bearerToken,
        'content-type': 'application/json'
      }
    }, function (err, response, body) {
      if (err) {
        res.flash('Unable to retrieve customer information.');
        req.session.user = null;
        req.session.bearerToken = null;
        return res.redirect('/login');
      }

      const customer = JSON.parse(body);

      if (customer.fault) {
        req.session.user = null;
        req.session.bearerToken = null;
        return res.redirect('/login');
      }
      req.session.user = customer;
      req.session.bearerToken = bearerToken;

      console.log('-------------- registered user auth --------------');
      const basketsUrl = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/customers/${auth.customer_id}/baskets?client_id=${process.env.OCAPI_CLIENT_ID}`;

      request.get({
        uri: basketsUrl,
        headers: {
          authorization: bearerToken,
          'content-type': 'application/json'
        }
      }, function (err, response, body) {
        if (err) {
          res.flash('Unable to retrieve customer basket information.');
          req.session.basket = null;
          return res.redirect('/login');
        }

        const result = JSON.parse(body);

        if (result.total > 0) {
          console.log('-------------- registered user basket --------------');
          req.session.basket = result.baskets[0];
          console.dir(req.session.basket);
        } else {
          req.session.basket = null;
        }

        const returnTo = req.session.returnTo ? (''+req.session.returnTo) : '/account';

        console.log(`------------- redirecting to ${returnTo} --------------`);
        req.session.returnTo = null;

        res.redirect(returnTo);
      });
    });
  });
});

router.get('/register', (req, res) => {
  Helper.getViewModel(req, LoginModel)
  .then((model) => {
    Helper.renderView(res, model, 'common/login');
  })
  .catch((err) => {
    Helper.renderError(res, err);
  });
});

router.post('/register', (req, res) => {
  // try to log in
  res.flash('Register not implemented');
  res.redirect('/login');
});

router.get('/forgot', (req, res) => {
  Helper.getViewModel(req, LoginModel)
  .then((model) => {
    Helper.renderView(res, model, 'common/forgot');
  })
  .catch((err) => {
    Helper.renderError(res, err);
  });
});

router.post('/forgot', (req, res) => {
  // try to log in
  res.flash('Forgot Password not implemented');
  res.redirect('/login');
});

router.get('/logout', (req, res) => {
  req.session.user = null;
  req.session.bearerToken = null;

  // try to log out
  res.redirect('/');
});

router.get('/orders', (req, res) => {
  Helper.getViewModel(req, HomeModel)
  .then((model) => {
    Helper.renderView(res, model, 'common/login');
  })
  .catch((err) => {
    Helper.renderError(res, err);
  });
});

router.post('/orders', (req, res) => {
  // try to log out
  const orderToken = 'token123abc';
  res.redirect(`/order/${orderToken}`);
});

router.get('/order/:orderToken', (req, res) => {
  Helper.getViewModel(req, OrderModel)
  .then((model) => {
    Helper.renderView(res, model, 'common/order');
  })
  .catch((err) => {
    Helper.renderError(res, err);
  });
});

router.get('/mixedproducts', (req, res) => {
  Helper.getViewModel(req, MixedProductsModel)
  .then((model) => {
    Helper.renderView(res, model, 'common/mixedproducts');
  })
  .catch((err) => {
    Helper.renderError(res, err);
  });
});


module.exports = router;
