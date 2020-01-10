const BaseModel = require('./BaseModel');
const request = require('request');
const rp = require('request-promise');
const Base64 = require('base-64');

function jsonOut(obj) {
  console.log('---- JSON --->', JSON.stringify(obj, null, '  ') );
}

class OrderModel extends BaseModel {
  // fetch() {
  //   const authUrl = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/customers/auth?client_id=${process.env.OCAPI_CLIENT_ID}`;
  //   let customerUrl = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/customers/REPLACE/orders?client_id=${process.env.OCAPI_CLIENT_ID}`;

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
      order: {
        _type: 'order',
        _resource_state: '2a60247e7f821c0009b96e19cb76ffb18257199699584e8872b4477dc6676030',
        adjusted_merchandize_total_tax: 4.2,
        adjusted_shipping_total_tax: 0.8,
        billing_address: {
          _type: 'order_address',
          address1: '123 Elk St',
          city: 'Boxboro',
          country_code: 'us',
          first_name: 'John',
          full_name: 'John Smith',
          id: '218245c9cdbc42c51fa381e096',
          last_name: 'Smith',
          phone: '508-423-0339',
          postal_code: '01719',
          state_code: 'AZ'
        },
        confirmation_status: 'confirmed',
        created_by: 'Customer',
        creation_date: '2017-04-20T19:44:56.000Z',
        currency: 'USD',
        customer_info: {
          _type: 'customer_info',
          customer_id: 'abEs07GXsAjeuuxPelo456VNCT',
          customer_name: 'Peter Pritchard',
          customer_no: '00003001',
          email: 'pjpritch@me.com'
        },
        customer_name: 'Peter Pritchard',
        export_status: 'ready',
        last_modified: '2017-04-20T19:44:56.000Z',
        merchandize_total_tax: 4.2,
        notes: {
          _type: 'simple_link',
          link: 'https://dev01-instore-dw.demandware.net/s/SiteGenesis/dw/shop/v17_3/orders/00002204/notes?expand=addresses%2Cpaymentinstruments&client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        },
        order_no: '00002204',
        order_token: 'NwjjYfcz-ja3y6c1x6uwUz4J2XxDvqPgvUpfjKm0JOM',
        order_total: 104.97,
        payment_instruments: [
          {
            _type: 'order_payment_instrument',
            amount: 104.97,
            payment_card: {
              _type: 'payment_card',
              card_type: 'Visa',
              credit_card_expired: false,
              expiration_month: 2,
              expiration_year: 2018,
              holder: 'John Smith',
              masked_number: '************1111',
              number_last_digits: '1111'
            },
            payment_instrument_id: '488a3b35c43d2987d2eede388a',
            payment_method_id: 'CREDIT_CARD'
          }
        ],
        payment_status: 'not_paid',
        product_items: [
          {
            _type: 'product_item',
            adjusted_tax: 2.5,
            base_price: 49.99,
            bonus_product_line_item: false,
            item_id: '4eb027cf1c8a77d92b67d7bf30',
            item_text: 'No-Iron Textured Dress Shirt',
            price: 49.99,
            price_after_item_discount: 49.99,
            price_after_order_discount: 49.99,
            product_id: '708141677227',
            product_name: 'No-Iron Textured Dress Shirt',
            quantity: 1,
            shipment_id: 'c1dc9d5963c9c8adb3bb0b5e59',
            tax: 2.5,
            tax_basis: 49.99,
            tax_class_id: 'standard',
            tax_rate: 0.05
          },
          {
            _type: 'product_item',
            adjusted_tax: 1.7,
            base_price: 34,
            bonus_product_line_item: false,
            item_id: 'f6918a7cf9b641c4b921e2f01f',
            item_text: 'Worn Gold Stretch Bracelet',
            price: 34,
            price_after_item_discount: 34,
            price_after_order_discount: 34,
            product_id: '013742335392',
            product_name: 'Worn Gold Stretch Bracelet',
            quantity: 1,
            shipment_id: 'me',
            tax: 1.7,
            tax_basis: 34,
            tax_class_id: 'standard',
            tax_rate: 0.05
          }
        ],
        product_sub_total: 83.99,
        product_total: 83.99,
        shipments: [
          {
            _type: 'shipment',
            adjusted_merchandize_total_tax: 1.7,
            adjusted_shipping_total_tax: 0.5,
            gift: false,
            merchandize_total_tax: 1.7,
            product_sub_total: 34,
            product_total: 34,
            shipment_id: 'me',
            shipment_no: '00008006',
            shipment_total: 46.19,
            shipping_address: {
              _type: 'order_address',
              address1: '28 Quarry Ln',
              city: 'Harvard',
              country_code: 'us',
              first_name: 'Peter',
              full_name: 'Peter Pritchard',
              id: '01f5c3e59d5f60f8939e02949e',
              last_name: 'Pritchard',
              phone: '508-423-0339',
              postal_code: '01451',
              state_code: 'MA'
            },
            shipping_method: {
              _type: 'shipping_method',
              description: 'Order received in 2 business days',
              id: '002',
              name: '2-Day Express',
              shipping_promotions: [
                {
                  _type: 'shipping_promotion',
                  callout_msg: 'Spend $100 and get 25% off shipping',
                  link: 'https://dev01-instore-dw.demandware.net/s/SiteGenesis/dw/shop/v17_3/promotions/7b670e18c0a0a3ad261cd5d937?expand=addresses%2Cpaymentinstruments&client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  promotion_id: 'mobile-first-shipping-no-coupon-promotion-1',
                  promotion_name: 'Shipping Level Test'
                }
              ],
              c_estimatedArrivalTime: '2 Business Days'
            },
            shipping_status: 'not_shipped',
            shipping_total: 9.99,
            shipping_total_tax: 0.5,
            tax_total: 2.2
          },
          {
            _type: 'shipment',
            adjusted_merchandize_total_tax: 2.5,
            adjusted_shipping_total_tax: 0.3,
            gift: false,
            merchandize_total_tax: 2.5,
            product_sub_total: 49.99,
            product_total: 49.99,
            shipment_id: 'c1dc9d5963c9c8adb3bb0b5e59',
            shipment_no: '00008007',
            shipment_total: 58.78,
            shipping_address: {
              _type: 'order_address',
              address1: '5 Wall St',
              address2: '5th Floor Engineering',
              city: 'Burlington',
              country_code: 'us',
              first_name: 'Peter',
              full_name: 'Peter Pritchard',
              id: '345fe6e1fdf3e8dacc13357e46',
              last_name: 'Pritchard',
              phone: '781-234-2345',
              postal_code: '01803',
              state_code: 'MA'
            },
            shipping_method: {
              _type: 'shipping_method',
              description: 'Order received within 7-10 business days',
              id: '001',
              name: 'Ground',
              c_estimatedArrivalTime: '7-10 Business Days'
            },
            shipping_status: 'not_shipped',
            shipping_total: 5.99,
            shipping_total_tax: 0.3,
            tax_total: 2.8
          }
        ],
        shipping_items: [
          {
            _type: 'shipping_item',
            adjusted_tax: 0.5,
            base_price: 9.99,
            item_id: '65406657f3a21c9261ee808064',
            item_text: 'Shipping',
            price: 9.99,
            price_after_item_discount: 9.99,
            shipment_id: 'me',
            tax: 0.5,
            tax_basis: 9.99,
            tax_class_id: 'standard',
            tax_rate: 0.05
          },
          {
            _type: 'shipping_item',
            adjusted_tax: 0.3,
            base_price: 5.99,
            item_id: '170c0a3fb34e29ebf14b231a3c',
            item_text: 'Shipping',
            price: 5.99,
            price_after_item_discount: 5.99,
            shipment_id: 'c1dc9d5963c9c8adb3bb0b5e59',
            tax: 0.3,
            tax_basis: 5.99,
            tax_class_id: 'standard',
            tax_rate: 0.05
          }
        ],
        shipping_status: 'not_shipped',
        shipping_total: 15.98,
        shipping_total_tax: 0.8,
        site_id: 'SiteGenesis',
        status: 'new',
        taxation: 'net',
        tax_total: 5
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

module.exports = OrderModel;
