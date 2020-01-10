// Initialize constants
const BaseModel = require('./BaseModel');
const rp = require('request-promise');

/**
 * @class ProductImagesModel
 * @description This model to get images for products in a basket
 */
class ProductImagesModel extends BaseModel {
  fetch() {
    return new Promise((resolve, reject) => {
      let basket = this.__config.basket;
      let productIds = basket.product_items.map(function(productItem){
        return productItem.product_id;
      });
      const prodUrl = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/products/(${productIds.toString()})?client_id=${process.env.OCAPI_CLIENT_ID}&expand=images,variations,prices&all_images=true`;
      Promise.all([
        rp.get({
          uri: prodUrl,
          json: true
        })
      ])
      .then(([products]) => {
        var externalProduct = products.data.find((item) => {
          return item.id === 'external-product';
        });
        if (externalProduct) {
          let extProdUrl = 'http://headless-external-service.herokuapp.com/externalProduct';
          rp.get({
            uri: extProdUrl,
            json: true
          })
          .then((extProduct) => {
            Object.keys(extProduct).forEach(function(key){
              externalProduct[key] = extProduct[key];
            });
            basket.product_items.forEach(function(productItem) {
              products.data.forEach(function(returnedProd){
                if (productItem.product_id === returnedProd.id) {
                  productItem.variation_values = returnedProd.variation_values;
                  productItem.image_groups = returnedProd.image_groups;
                }
              })
            })
            resolve({ basket });
          })
        } else {
          basket.product_items.forEach(function(productItem) {
            products.data.forEach(function(returnedProd){
              if (productItem.product_id === returnedProd.id) {
                productItem.variation_values = returnedProd.variation_values;
                productItem.image_groups = returnedProd.image_groups;
              }
            })
          })
          resolve({ basket });
        }
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = ProductImagesModel;
