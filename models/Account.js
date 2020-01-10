const BaseModel = require('./BaseModel');
const request = require('request');
const rp = require('request-promise');
const Base64 = require('base-64');

class AccountModel extends BaseModel {
  fetch() {
    // We already have wallet & address book in session
    return Promise.resolve({});
  }

  _stubbedData() {
    return {
      customer: {
        _v: '17.3',
        _type: 'customer',
        _resource_state: 'a73c1b9f3fd8f9984dcab40360592853b8e53968c16404c00d2300ad013a0d95',
        auth_type: 'registered',
        creation_date: '2017-04-07T20:53:13.000Z',
        customer_id: 'abEs07GXsAjeuuxPelo456VNCT',
        customer_no: '00003001',
        email: 'pjpritch@icloud.com',
        enabled: true,
        first_name: 'Peter',
        last_login_time: '2017-04-25T00:36:17.543Z',
        last_modified: '2017-04-25T00:36:17.543Z',
        last_name: 'Pritchard',
        last_visit_time: '2017-04-25T00:36:17.543Z',
        login: 'pjpritch@icloud.com',
        phone_home: '5084230339',
        previous_login_time: '2017-04-25T00:36:17.543Z',
        previous_visit_time: '2017-04-25T00:36:17.543Z'
      },
      c__context: {
        config: this.__config,
        meta: {
          url: '/Some/SEO/URL',
          title: 'Some SEO Title',
          description: 'Some Meta Description',
          keywords: 'Some Keywords',
          image: 'http://path/to/image.jpg'
        },
        addresses: [{
          id: 'address_id'
        }],
        payment_instruments: [{
          id: 'payment_instrument_id'
        }],
        orders: [{
          id: 'order_id'
        }],
        product_lists: {
          id: 'wishlist_id'
        }
      }
    };
  }
}

module.exports = AccountModel;
