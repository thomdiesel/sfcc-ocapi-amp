const BaseModel = require('./BaseModel');
const rp = require('request-promise');

class CartModel extends BaseModel {
  fetch() {
    const config = this.__config;
    var  basketId = null;
    if (config.basket && !config.basket.fault) {
      basketId = config.basket.basket_id;
    } else if (config.basket && config.basket.fault && config.basket.fault.arguments.basketIds) {
      basketId = config.basket.fault.arguments.basketIds;
    } else {
      basketId = null;
    }
    const bearerToken = config.bearer_token;
    let cartUrl = '';
    if (basketId) {
      cartUrl = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/baskets/${basketId}?client_id=${process.env.OCAPI_CLIENT_ID}`;
      return new Promise((resolve, reject) => {
        Promise.all([
          //retrieve basket here
          rp.get({
              uri: cartUrl,
              json: true,
              headers: {authorization: bearerToken}
          })
        ])
        .then(([basket]) => {
          // Resolve the request and render the template
          resolve({ basket });
        })
        .catch((err) => {
          // Did an error occur? Handle it
          reject(err);
        });
      });
    } else {
      cartUrl = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/baskets`;
      return new Promise((resolve, reject) => {
        Promise.all([
          //retrieve basket here
          rp.post({
              uri: cartUrl,
              json: true,
              headers: {authorization: bearerToken}
          })
        ])
        .then(([basket]) => {
          // Resolve the request and render the template
          resolve({ basket });
        })
        .catch((err) => {
          // Did an error occur? Handle it
          reject(err);
        });
      });
    }
  }

  _stubbedData() {
    return {
      basket: {
        "_type": "basket",
        "_resource_state": "e2d97506e3c0cfe3d9ba4ec1cd34196aff2442ec4b0438ff5dceee723bb45d59",
        "adjusted_merchandize_total_tax": 2.4,
        "adjusted_shipping_total_tax": 0.6,
        "agent_basket": false,
        "basket_id": "72fdeafa372513e7eedea6a05a",
        "creation_date": "2017-04-24T17:42:07.378Z",
        "currency": "USD",
        "customer_info": {
          "_type": "customer_info",
          "customer_id": "abEs07GXsAjeuuxPelo456VNCT",
          "customer_no": "00003001"
        },
        "last_modified": "2017-04-24T19:36:20.371Z",
        "merchandize_total_tax": 2.4,
        "notes": {
          "_type": "simple_link",
          "link": "https://dev01-instore-dw.demandware.net/s/SiteGenesis/dw/shop/v17_3/baskets/72fdeafa372513e7eedea6a05a/notes?expand=addresses%2Cpaymentinstruments&client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },
        "order_total": 62.98,
        "product_items": [
          {
            "_type": "product_item",
            "adjusted_tax": 1.2,
            "base_price": 24,
            "bonus_product_line_item": false,
            "item_id": "b6a4b8675ee477ea09d0a08226",
            "item_text": "3/4 Sleeve V-Neck Top",
            "price": 24,
            "price_after_item_discount": 24,
            "price_after_order_discount": 24,
            "product_id": "701642923459",
            "product_name": "3/4 Sleeve V-Neck Top",
            "quantity": 1,
            "shipment_id": "me",
            "tax": 1.2,
            "tax_basis": 24,
            "tax_class_id": "standard",
            "tax_rate": 0.05
          },
          {
            "_type": "product_item",
            "adjusted_tax": 1.2,
            "base_price": 24,
            "bonus_product_line_item": false,
            "item_id": "18f55fbfff3766cfa1ac276021",
            "item_text": "3/4 Sleeve V-Neck Top",
            "price": 24,
            "price_after_item_discount": 24,
            "price_after_order_discount": 24,
            "product_id": "701642923497",
            "product_name": "3/4 Sleeve V-Neck Top",
            "quantity": 1,
            "shipment_id": "5382db3f424bba1636c612143a",
            "tax": 1.2,
            "tax_basis": 24,
            "tax_class_id": "standard",
            "tax_rate": 0.05
          }
        ],
        "product_sub_total": 48,
        "product_total": 48,
        "shipments": [
          {
            "_type": "shipment",
            "adjusted_merchandize_total_tax": 1.2,
            "adjusted_shipping_total_tax": 0.3,
            "gift": false,
            "merchandize_total_tax": 1.2,
            "product_sub_total": 24,
            "product_total": 24,
            "shipment_id": "me",
            "shipment_total": 31.49,
            "shipping_status": "not_shipped",
            "shipping_total": 5.99,
            "shipping_total_tax": 0.3,
            "tax_total": 1.5
          },
          {
            "_type": "shipment",
            "adjusted_merchandize_total_tax": 1.2,
            "adjusted_shipping_total_tax": 0.3,
            "gift": false,
            "merchandize_total_tax": 1.2,
            "product_sub_total": 24,
            "product_total": 24,
            "shipment_id": "5382db3f424bba1636c612143a",
            "shipment_total": 31.49,
            "shipping_status": "not_shipped",
            "shipping_total": 5.99,
            "shipping_total_tax": 0.3,
            "tax_total": 1.5
          }
        ],
        "shipping_items": [
          {
            "_type": "shipping_item",
            "adjusted_tax": 0.3,
            "base_price": 5.99,
            "item_id": "01267a9e628626432fe589e91d",
            "item_text": "Shipping",
            "price": 5.99,
            "price_after_item_discount": 5.99,
            "shipment_id": "me",
            "tax": 0.3,
            "tax_basis": 5.99,
            "tax_class_id": "standard",
            "tax_rate": 0.05
          },
          {
            "_type": "shipping_item",
            "adjusted_tax": 0.3,
            "base_price": 5.99,
            "item_id": "b44abcfbec198eb853d51d5436",
            "item_text": "Shipping",
            "price": 5.99,
            "price_after_item_discount": 5.99,
            "shipment_id": "5382db3f424bba1636c612143a",
            "tax": 0.3,
            "tax_basis": 5.99,
            "tax_class_id": "standard",
            "tax_rate": 0.05
          }
        ],
        "shipping_total": 11.98,
        "shipping_total_tax": 0.6,
        "taxation": "net",
        "tax_total": 3
      }
    };
  }
}

module.exports = CartModel;
