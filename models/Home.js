const BaseModel = require('./BaseModel');

class HomeModel extends BaseModel {
  _stubbedData() {
    return {
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
          id: 'category_id'
        }],
        folders: [{
          id: 'folder_id'
        }],
        contents: [{
          id: 'content_id'
        }],
        basket: {
          id: 'basket_id'
        },
        customer: {
          id: 'customer_id'
        }
      }
    };
  }
}

module.exports = HomeModel;
