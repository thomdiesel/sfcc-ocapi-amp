// Initialize constants
const BaseModel = require('./BaseModel');
const rp = require('request-promise');

/**
 * @class MixedProducts
 * @description This model is used to show 2 internal products and 1 external product
 */
class MixedProducts extends BaseModel {

  fetch() {
    const internalProdUrl1 = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/product_search?q=25752218M&client_id=${process.env.OCAPI_CLIENT_ID}&expand=images,variations,prices`;
    const internalProdUrl2 = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/product_search?q=25752986M&client_id=${process.env.OCAPI_CLIENT_ID}&expand=images,variations,prices`;
    const externalProduct = {
      product_name: "An External Product",
      link: 'http://headless-external-service.herokuapp.com/externalProduct',
      image: {
        link: 'https://images.pexels.com/photos/1166643/pexels-photo-1166643.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
      },
      price: 50.00,
      product_id: 'external-product',
      variation_attributes: []
    }
    // Create a promise to handle the concurrent requests
    return new Promise((resolve, reject) => {
      Promise.all([
        rp.get({
          uri: internalProdUrl1,
          json: true
        }),
        rp.get({
          uri: internalProdUrl2,
          json: true
        })
      ])
      .then(([prod1, prod2]) => {
        let search = {
          hits: [externalProduct, prod1.hits[0], prod2.hits[0]]
        };
        resolve({ search });
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = MixedProducts;
