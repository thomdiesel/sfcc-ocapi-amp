const BaseModel = require('./BaseModel');
const request = require('request');
const rp = require('request-promise');
const Base64 = require('base-64');

function jsonOut(obj) {
  console.log('---- JSON --->', JSON.stringify(obj, null, '  '));
}

class AddressBookModel extends BaseModel {
  // fetch() {
  //   const authUrl = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/customers/auth?client_id=${process.env.OCAPI_CLIENT_ID}`;
  //   let customerUrl = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/customers/REPLACE?client_id=${process.env.OCAPI_CLIENT_ID}&expand=addresses,paymentinstruments`;

  //   const creds = Base64.encode('pjpritch@icloud.com:pjPJ0255');
  //   console.log('url', authUrl);

  //   return new Promise((resolve, reject) => {
  //     request.post({
  //         uri: authUrl,
  //         body: JSON.stringify({ type: 'credentials' }),
  //         headers: {
  //           'content-type':'application/json',
  //           'authorization':`Basic ${creds}`
  //         }
  //     }, function (err, response, body){
  //       if (err) return reject(err);

  //       console.log('--------------- response');
  //       jsonOut(response);
  //       console.log('--------------- body');
  //       jsonOut(body);

  //       let json = JSON.parse(body);
  //       let bearerToken = response.headers.authorization;

  //       customerUrl = customerUrl.replace(/REPLACE/, json.customer_id);

  //       rp.get({
  //         uri: customerUrl,
  //         json: true,
  //         headers: {authorization: bearerToken}
  //       })
  //       .then(function (customer) {
  //         console.log('------------------- CUSTOMER');
  //         jsonOut(customer);
  //         jsonOut(customer.addresses);
  //         jsonOut(customer.paymentinstruments);
  //         customerUrl = customerUrl.replace('?', '/baskets?');

  //         return rp.get({
  //           uri: customerUrl,
  //           json: true,
  //           headers: {authorization: bearerToken}
  //         });
  //       })
  //       .then(function (baskets) {
  //         console.log('------------------- BASKETS');
  //         jsonOut(baskets);
  //         customerUrl = customerUrl.replace('/baskets?', '/orders?');

  //         return rp.get({
  //           uri: customerUrl,
  //           json: true,
  //           headers: {authorization: bearerToken}
  //         });
  //       })
  //       .then(function (orders){
  //         console.log('------------------- ORDERS');
  //         jsonOut(orders.data[0]);

  //         resolve({ account: orders });
  //       })
  //       .catch((err) => {
  //         console.dir(err);
  //         reject(err);
  //       });
  //     });
  //   });
  // }

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
      addresses: {
        count: 3,
        start: 0,
        total: 3,
        data: [
          {
            _type: 'customer_address',
            address1: '28 Quarry Ln',
            address_id: 'Home',
            city: 'Harvard',
            country_code: 'us',
            creation_date: '2017-04-07T20:54:19.000Z',
            first_name: 'Peter',
            full_name: 'Peter Pritchard',
            last_modified: '2017-04-07T20:54:19.000Z',
            last_name: 'Pritchard',
            phone: '508-423-0339',
            postal_code: '01451',
            preferred: true,
            state_code: 'MA'
          },
          {
            _type: 'customer_address',
            address1: '5 Wall St',
            address2: '5th Floor Engineering',
            address_id: 'Office',
            city: 'Burlington',
            country_code: 'us',
            creation_date: '2017-04-07T20:55:39.000Z',
            first_name: 'Peter',
            full_name: 'Peter Pritchard',
            last_modified: '2017-04-07T20:55:39.000Z',
            last_name: 'Pritchard',
            phone: '781-234-2345',
            postal_code: '01803',
            preferred: false,
            state_code: 'MA'
          },
          {
            _type: 'customer_address',
            address1: '123 Elk St',
            address_id: 'Summer Home',
            city: 'Anchorage',
            country_code: 'us',
            creation_date: '2017-04-08T05:27:37.000Z',
            first_name: 'John',
            full_name: 'John Smith',
            last_modified: '2017-04-08T05:27:37.000Z',
            last_name: 'Smith',
            phone: '313-394-3358',
            postal_code: '12345',
            preferred: false,
            state_code: 'AK'
          }
        ]
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

module.exports = AddressBookModel;
