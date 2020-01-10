const BaseModel = require('./BaseModel');
const request = require('request');
const rp = require('request-promise');
const Base64 = require('base-64');

function jsonOut(obj) {
  console.log('---- JSON --->', JSON.stringify(obj, null, '  ') );
}

class AccountModel extends BaseModel {
  fetch() {
    const authUrl = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/customers/auth?client_id=${process.env.OCAPI_CLIENT_ID}`;
    let customerUrl = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/customers/REPLACE?client_id=${process.env.OCAPI_CLIENT_ID}&expand=addresses,paymentinstruments`;

    const creds = Base64.encode('pjpritch@icloud.com:pjPJ0255');
    console.log('url', authUrl);

    return new Promise((resolve, reject) => {
      request.post({
          uri: authUrl,
          body: JSON.stringify({ type: 'credentials' }),
          headers: {
            'content-type':'application/json',
            'authorization':`Basic ${creds}`
          }
      }, function (err, response, body){
        if (err) return reject(err);

        console.log('--------------- response');
        jsonOut(response);
        console.log('--------------- body');
        jsonOut(body);

        let json = JSON.parse(body);
        let bearerToken = response.headers.authorization;

        customerUrl = customerUrl.replace(/REPLACE/, json.customer_id);

        rp.get({
          uri: customerUrl,
          json: true,
          headers: {authorization: bearerToken}
        })
        .then(function (customer) {
          console.log('------------------- CUSTOMER');
          jsonOut(customer);
          jsonOut(customer.addresses);
          jsonOut(customer.paymentinstruments);
          customerUrl = customerUrl.replace('?', '/baskets?');

          return rp.get({
            uri: customerUrl,
            json: true,
            headers: {authorization: bearerToken}
          });
        })
        .then(function (baskets) {
          console.log('------------------- BASKETS');
          jsonOut(baskets);
          customerUrl = customerUrl.replace('/baskets?', '/orders?');

          return rp.get({
            uri: customerUrl,
            json: true,
            headers: {authorization: bearerToken}
          });
        })
        .then(function (orders){
          console.log('------------------- ORDERS');
          jsonOut(orders.data[0]);

          resolve({ account: orders });
        })
        .catch((err) => {
          console.dir(err);
          reject(err);
        });
      });
    });
  }

  _stubbedData() {
    return {
      id: 'account_id',
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
