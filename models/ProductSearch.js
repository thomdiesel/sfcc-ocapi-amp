const BaseCollection = require('./BaseCollection');
const rp = require('request-promise');

class ProductSearchModel extends BaseCollection {
  fetch() {
    let searchUrl = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/product_search?client_id=${process.env.OCAPI_CLIENT_ID}&expand=images,variations,prices&count=${this.__config.recordCount}`;
    let cgid = 'root';

    Object.keys(this.__config.query).forEach((key) => {
      const value = this.__config.query[key];
      if (key !== 'lang') {
        searchUrl += `&${key}=${value}`;
      }
      if (value.indexOf('cgid') > -1) {
        cgid = value.split('=')[1];
      }
    });

    const catUrl = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/categories/${cgid}?client_id=${process.env.OCAPI_CLIENT_ID}&levels=2`;

    return new Promise((resolve, reject) => {
      Promise.all([
        rp.get({
          uri: catUrl,
          json: true
        }),
        rp.get({
          uri: searchUrl,
          json: true
        })
      ])
      .then(([category, search]) => {
        resolve({ category, search });
      })
      .catch((err) => {
        reject(err);
      });
    });
  }

  _stubbedData() {
    return {};
  }
}

module.exports = ProductSearchModel;
