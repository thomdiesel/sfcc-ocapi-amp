const BaseModel = require('./BaseModel');

class FolderModel extends BaseModel {
  _stubbedData() {
    return {
      _v: '17.3',
      _type: 'content_folder',
      folders: [{
        _type: 'content_folder',
        id: 'contact-us',
        name: 'Contact Us',
        parent_folder_id: 'customer-service'
      }, {
        _type: 'content_folder',
        id: 'privacy-security',
        name: 'Privacy & Security',
        parent_folder_id: 'customer-service'
      }, {
        _type: 'content_folder',
        id: 'ordering',
        name: 'Ordering',
        parent_folder_id: 'customer-service'
      }, {
        _type: 'content_folder',
        id: 'shippinginfo',
        name: 'Shipping',
        parent_folder_id: 'customer-service'
      }, {
        _type: 'content_folder',
        id: 'returns',
        name: 'Returns',
        parent_folder_id: 'customer-service'
      }, {
        _type: 'content_folder',
        id: 'my-account-information',
        name: 'My Account',
        parent_folder_id: 'customer-service'
      }, {
        _type: 'content_folder',
        id: 'terms',
        name: 'Terms & Conditions',
        parent_folder_id: 'customer-service'
      }],
      id: 'customer-service',
      name: 'Customer Service',
      parent_folder_id: 'root',
      c__context: {
        config: this.__config,
        meta: {
          url: '/Some/SEO/URL',
          title: 'Some SEO Title',
          description: 'Some Meta Description',
          keywords: 'Some Keywords',
          image: 'http://path/to/image.jpg'
        },
        contents: [{
          id: 'content_id'
        }]
      }
    };
  }
}

module.exports = FolderModel;
