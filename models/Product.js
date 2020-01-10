const BaseModel = require('./BaseModel');
const rp = require('request-promise');

class ProductModel extends BaseModel {
  fetch() {

    const config = this.__config;
    const query = this.__config.query;
    var variationKey = '';
    var variationValue = '';
    var masterProduct = null;
    var variantProduct = null;

    Object.keys(query).forEach(function(key) {
      if(key.includes('dwvar')) {
        variationKey = key.split('_')[2];
        variationValue = query[key];
      }
    });

    var masterPromise = function(config) {
      return new Promise((resolve, reject) => {
        if (config.id === 'external-product') {
          const scaffoldprodUrl = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/products/${config.id}?client_id=${process.env.OCAPI_CLIENT_ID}&expand=images,variations,prices&all_images=true`;
          const extProdUrl = 'http://headless-external-service.herokuapp.com/externalProduct'
          Promise.all([
            rp.get({
              uri: scaffoldprodUrl,
              json: true
            }),
            rp.get({
              uri: extProdUrl,
              json: true
            })
          ])
          .then(([product, extProduct]) => {
            Object.keys(extProduct).forEach(function(key){
              product[key] = extProduct[key];
            });
            masterProduct = product;
            resolve({ product });
          })
          .catch((err) => {
            reject(err);
          });
        } else {
          const productUrl = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/products/${config.id}?client_id=${process.env.OCAPI_CLIENT_ID}&expand=images,variations,prices&all_images=true`;
          Promise.all([
            rp.get({
              uri: productUrl,
              json: true
            })
          ])
          .then(([product]) => {
            masterProduct = product;
            resolve({ product });
          })
          .catch((err) => {
            reject(err);
          });
        }
      });
    };

    var variantPromise = function () {
      return new Promise((resolve, reject) => {
        var variantId = null;
        masterProduct.variants.forEach(function(variant) {
          if(variant.variation_values[variationKey] === variationValue){
            variantId = variant.product_id;
          }
        });
        const variantUrl = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/products/${variantId}?client_id=${process.env.OCAPI_CLIENT_ID}&expand=images,variations,prices&all_images=true`;
        Promise.all([
          rp.get({
            uri: variantUrl,
            json: true
          })
        ])
        .then(([product]) => {
          variantProduct = product;
          resolve({ product });
        })
        .catch((err) => {
          reject(err);
        });
      });
    };

    var aPromise = function () {
      return new Promise((resolve, reject) => {
        if(variationKey && variationValue) {
          resolve({ product: variantProduct });
        } else {
          resolve({ product: masterProduct });
        }
      });
    };

    if(variationKey && variationValue) {
      return masterPromise(config).then(variantPromise).then(aPromise);
    } else {
      return masterPromise(config).then(aPromise);
    }
  };

  _stubbedData() {
    return {
      _v: '17.3',
      _type: 'product',
      id: '25493657',
      image_groups: [{
        _type: 'image_group',
        images: [{
          _type: 'image',
          alt: 'Long Sleeve Covered Placket Blouse, , large',
          link: 'https://dev01-instore-dw.demandware.net/on/demandware.static/-/Sites-apparel-catalog/default/dw87048451/images/large/PG.10207663.JJZ01XX.PZ.jpg',
          title: 'Long Sleeve Covered Placket Blouse, '
        }, {
          _type: 'image',
          alt: 'Long Sleeve Covered Placket Blouse, , large',
          link: 'https://dev01-instore-dw.demandware.net/on/demandware.static/-/Sites-apparel-catalog/default/dwd765d128/images/large/PG.10207663.JJZ01XX.BZ.jpg',
          title: 'Long Sleeve Covered Placket Blouse, '
        }],
        view_type: 'large'
      }, {
        _type: 'image_group',
        images: [{
          _type: 'image',
          alt: 'Long Sleeve Covered Placket Blouse, , medium',
          link: 'https://dev01-instore-dw.demandware.net/on/demandware.static/-/Sites-apparel-catalog/default/dw9978eb08/images/medium/PG.10207663.JJZ01XX.PZ.jpg',
          title: 'Long Sleeve Covered Placket Blouse, '
        }, {
          _type: 'image',
          alt: 'Long Sleeve Covered Placket Blouse, , medium',
          link: 'https://dev01-instore-dw.demandware.net/on/demandware.static/-/Sites-apparel-catalog/default/dw9cbf4e9c/images/medium/PG.10207663.JJZ01XX.BZ.jpg',
          title: 'Long Sleeve Covered Placket Blouse, '
        }],
        view_type: 'medium'
      }, {
        _type: 'image_group',
        images: [{
          _type: 'image',
          alt: 'Long Sleeve Covered Placket Blouse, , small',
          link: 'https://dev01-instore-dw.demandware.net/on/demandware.static/-/Sites-apparel-catalog/default/dw5f0919bc/images/small/PG.10207663.JJZ01XX.PZ.jpg',
          title: 'Long Sleeve Covered Placket Blouse, '
        }, {
          _type: 'image',
          alt: 'Long Sleeve Covered Placket Blouse, , small',
          link: 'https://dev01-instore-dw.demandware.net/on/demandware.static/-/Sites-apparel-catalog/default/dw83ab92df/images/small/PG.10207663.JJZ01XX.BZ.jpg',
          title: 'Long Sleeve Covered Placket Blouse, '
        }],
        view_type: 'small'
      }],
      long_description: 'We took this classic silhouette and updated this blouse with a ruffle for an elegant look.',
      master: {
        _type: 'master',
        link: 'https://dev01-instore-dw.demandware.net/s/SiteGenesis/dw/shop/v17_3/products/25493657?pretty_print=true&client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        master_id: '25493657'
      },
      min_order_quantity: 1,
      name: 'Long Sleeve Covered Placket Blouse',
      page_description: 'We took this classic silhouette and updated this blouse with a ruffle for an elegant look.',
      page_title: 'Long Sleeve Covered Placket Blouse',
      primary_category_id: 'womens-clothing-tops',
      short_description: 'We took this classic silhouette and updated this blouse with a ruffle for an elegant look.',
      step_quantity: 1,
      type: {
        _type: 'product_type',
        master: true
      },
      variants: [{
        _type: 'variant',
        link: 'https://dev01-instore-dw.demandware.net/s/SiteGenesis/dw/shop/v17_3/products/701642844419?pretty_print=true&client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        product_id: '701642844419',
        variation_values: {
          color: 'JJZ01XX',
          size: '004'
        }
      }, {
        _type: 'variant',
        link: 'https://dev01-instore-dw.demandware.net/s/SiteGenesis/dw/shop/v17_3/products/701642844396?pretty_print=true&client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        product_id: '701642844396',
        variation_values: {
          color: 'JJZ01XX',
          size: '014'
        }
      }, {
        _type: 'variant',
        link: 'https://dev01-instore-dw.demandware.net/s/SiteGenesis/dw/shop/v17_3/products/701642844426?pretty_print=true&client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        product_id: '701642844426',
        variation_values: {
          color: 'JJZ01XX',
          size: '006'
        }
      }, {
        _type: 'variant',
        link: 'https://dev01-instore-dw.demandware.net/s/SiteGenesis/dw/shop/v17_3/products/701642844402?pretty_print=true&client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        product_id: '701642844402',
        variation_values: {
          color: 'JJZ01XX',
          size: '016'
        }
      }, {
        _type: 'variant',
        link: 'https://dev01-instore-dw.demandware.net/s/SiteGenesis/dw/shop/v17_3/products/701642844372?pretty_print=true&client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        product_id: '701642844372',
        variation_values: {
          color: 'JJZ01XX',
          size: '010'
        }
      }, {
        _type: 'variant',
        link: 'https://dev01-instore-dw.demandware.net/s/SiteGenesis/dw/shop/v17_3/products/701642844389?pretty_print=true&client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        product_id: '701642844389',
        variation_values: {
          color: 'JJZ01XX',
          size: '012'
        }
      }, {
        _type: 'variant',
        link: 'https://dev01-instore-dw.demandware.net/s/SiteGenesis/dw/shop/v17_3/products/701642844433?pretty_print=true&client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        product_id: '701642844433',
        variation_values: {
          color: 'JJZ01XX',
          size: '008'
        }
      }],
      variation_attributes: [{
        _type: 'variation_attribute',
        id: 'color',
        name: 'Color',
        values: [{
          _type: 'variation_attribute_value',
          name: 'Multi',
          value: 'JJZ01XX'
        }]
      }, {
        _type: 'variation_attribute',
        id: 'size',
        name: 'Size',
        values: [{
          _type: 'variation_attribute_value',
          name: '4',
          value: '004'
        }, {
          _type: 'variation_attribute_value',
          name: '6',
          value: '006'
        }, {
          _type: 'variation_attribute_value',
          name: '8',
          value: '008'
        }, {
          _type: 'variation_attribute_value',
          name: '10',
          value: '010'
        }, {
          _type: 'variation_attribute_value',
          name: '12',
          value: '012'
        }, {
          _type: 'variation_attribute_value',
          name: '14',
          value: '014'
        }, {
          _type: 'variation_attribute_value',
          name: '16',
          value: '016'
        }]
      }],
      c__context: {
        config: this.__config,
        meta: {
          url: '/Some/SEO/URL',
          title: 'Some SEO Title',
          description: 'Some Meta Description',
          keywords: 'Some Keywords',
          image: 'http://path/to/image.jpg'
        },
        categories: [{
          id: 'content_id'
        }],
        contents: [{
          id: 'content_id'
        }]
      }
    };
  }
}

module.exports = ProductModel;
