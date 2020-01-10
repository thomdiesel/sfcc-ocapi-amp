// Initialize constants
const BaseModel = require('./BaseModel');
const rp = require('request-promise');

/**
 * @class CategoryModel
 * @description This model is used to manage all category requests; these requests should include
 * details for the current category being viewed -- and the product search results for the same
 * category.
 */
class CategoryModel extends BaseModel {

  fetch() {

    // Initialize the category and product search urls
    const catUrl = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/categories/${this.__config.id}?client_id=${process.env.OCAPI_CLIENT_ID}&levels=2`;
    const searchUrl = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/product_search?q=&refine=cgid=${this.__config.id}&client_id=${process.env.OCAPI_CLIENT_ID}&count=${this.__config.recordCount}&expand=images,variations,prices`;

    // Create a promise to handle the concurrent requests
    return new Promise((resolve, reject) => {
      Promise.all([

        // Retrieve the category request
        rp.get({
            uri: catUrl,
            json: true
        }),

        // Retrieve the product search request
        rp.get({
          uri: searchUrl,
          json: true
        })

      ])
      .then(([category, search]) => {

        // Resolve the request and render the template
        resolve({ category, search });

      })
      .catch((err) => {

        // Did an error occur? Handle it
        reject(err);

      });

    });

  }

  // Default the stub-data
  _stubbedData() {};

}

module.exports = CategoryModel;
