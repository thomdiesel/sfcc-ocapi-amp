const express = require('express');
const request = require('request');

const CartModel = require('../models/Cart');
const ProductImagesModel = require('../models/ProductImages');
const Helper = require('../lib/view-model-helper');

const exposeTemplates = require('../lib/client-templates');

const router = express.Router();

/**
 * GET /
 * Home page.
 */
router.get('/', exposeTemplates(), (req, res) => {
  Helper.getViewModel(req, CartModel)
  .then((model) => {
    if (model.basket && model.basket.product_items && model.basket.product_items.length > 0) {
      req.basket = req.session.basket = model.basket;
      Helper.getViewModel(req, ProductImagesModel)
      .then((model) => {
        req.basket = req.session.basket = model.basket;
        Helper.renderView(res, model, 'common/cart');
      })
      .catch((err) => {
        Helper.renderError(res, err);
      });;
    } else {
      req.basket = req.session.basket = model.basket;
      Helper.renderView(res, model, 'common/cart');
    }
  })
  .catch((err) => {
    Helper.renderError(res, err);
  });
});

router.get('/createBasket/:id', exposeTemplates(), (req, res) => {
  if (!req.session.basket || !req.basket) {
    const createBasketUrl = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/baskets`;
    request.post({
      uri: createBasketUrl,
      headers: {
        'content-type': 'application/json',
        'authorization': req.session.bearerToken
      }
    }, function (err, response, body) {
      if (err) {
        res.flash('something went wrong');
      } else {
        req.basket = req.session.basket = JSON.parse(response.body);
        const redirectUrl = '/cart/addToCart/' + req.session.basket.basket_id + '/' + req.params.id;
        res.redirect(redirectUrl);
      }
    });
  } else {
    const redirectUrl = '/cart/addToCart/' + req.session.basket.basket_id + '/' + req.params.id;
    res.redirect(redirectUrl);
  }
});

router.get('/addToCart/:basket/:id', exposeTemplates(), (req, res) => {
  const productId = req.params.id;
  const basketId = req.params.basket;
  const addToCartUrl = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/baskets/${basketId}/items`;
  request.post({
    uri: addToCartUrl,
    body: JSON.stringify([{'product_id': productId, 'quantity': 1.00}]),
    headers: {
      'content-type': 'application/json',
      'authorization': req.session.bearerToken
    }
  }, function (err, response, body) {
    if (err) {
      res.flash('something went wrong');
    } else {
      console.log("Product add attempted");
      res.redirect(`/cart`);
    }
  });
});

router.get('/delete/:basket/:id', exposeTemplates(), (req, res) => {
  const productId = req.params.id;
  const basketId = req.params.basket;
  const deleteProductUrl = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/baskets/${basketId}/items/${productId}`;
  request.delete({
    uri: deleteProductUrl,
    headers: {
      'content-type': 'application/json',
      'authorization': req.session.bearerToken
    }
  }, function (err, response, body) {
    if (err) {
      res.flash('something went wrong');
    } else {
      console.log("Product delete attempted");
      res.redirect(`/cart`);
    }
  });
});

module.exports = router;
