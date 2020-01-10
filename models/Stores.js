const BaseCollection = require('./BaseCollection');
const rp = require('request-promise');

class StoresModel extends BaseCollection {
  fetch() {
    let storesUrl = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/stores?client_id=${process.env.OCAPI_CLIENT_ID}`;
    if (this.__config.query.latitude && this.__config.query.longitude) {
      storesUrl += `&latitude=${this.__config.query.latitude}&longitude=${this.__config.query.longitude}`;
    } else {
      storesUrl += `&postal_code=${this.__config.query.postal_code || '01460'}`;
      storesUrl += `&country_code=${this.__config.query.country_code || 'US'}`;
    }

    if (this.__config.query.max_distance) {
      storesUrl += `&max_distance=${this.__config.query.max_distance}`;
    }
    if (this.__config.query.distance_unit) {
      storesUrl += `&distance_unit=${this.__config.query.distance_unit}`;
    }

    return new Promise((resolve, reject) => {
      Promise.all([
        rp.get({
          uri: storesUrl,
          json: true
        })
      ])
      .then(([stores]) => {
        resolve({ stores });
      })
      .catch((err) => {
        reject(err);
      });
    });
  }

  _stubbedData() {
    return {
      _v: '17.3',
      _type: 'store_result',
      count: 12,
      data: [{
        _type: 'store',
        address1: '10 Presidential Way',
        city: 'Woburn',
        country_code: 'US',
        distance: 4.60,
        distance_unit: 'km',
        email: 'store@email.com',
        fax: '800-800-8000',
        id: 'store1',
        latitude: 42.527333,
        longitude: -71.137583,
        name: 'Demandware',
        pos_enabled: false,
        postal_code: '01801',
        state_code: 'MA',
        store_events: "Men's Denim Jeans $20 off!<br />\r\nAll Men's T-shirts are 2 for $40!<br />",
        store_hours: 'Mon - Sat: 10am - 9pm<br />\r\nSun: 12pm - 6pm',
        store_locator_enabled: true,
        c_countryCodeValue: 'US',
        c_inventoryListId: 'inventory_store_store1'
      }, {
        _type: 'store',
        address1: '1001 Cambridge St',
        city: 'Cambridge',
        country_code: 'US',
        distance: 13.88,
        distance_unit: 'km',
        email: 'store4@company.com',
        id: 'store4',
        latitude: 42.372979,
        longitude: -71.093461,
        name: 'Champaign Electronic Shop',
        phone: '+1-617-714-2640',
        pos_enabled: false,
        postal_code: '02141',
        state_code: 'MA',
        store_locator_enabled: true,
        c_countryCodeValue: 'US',
        c_inventoryListId: 'inventory_store_store4'
      }, {
        _type: 'store',
        address1: '333 Washington St',
        city: 'Boston',
        country_code: 'US',
        distance: 16.71,
        distance_unit: 'km',
        email: 'contact@downtowntvshop.com',
        id: 'store10',
        latitude: 42.356951,
        longitude: -71.059026,
        name: 'Downtown TV Shop',
        phone: '+1-617-695-1565',
        pos_enabled: false,
        postal_code: '02108',
        state_code: 'MA',
        store_hours: 'Mon - Sat: 10am - 9pm<br />\r\n            Sun: 12pm - 6pm',
        store_locator_enabled: true,
        c_countryCodeValue: 'US',
        c_inventoryListId: 'inventory_store_store10'
      }, {
        _type: 'store',
        address1: '584 Columbus Ave',
        city: 'Boston',
        country_code: 'US',
        distance: 17.61,
        distance_unit: 'km',
        id: 'store5',
        latitude: 42.340319,
        longitude: -71.081786,
        name: 'Short Electro',
        phone: '+1-617-888-7276',
        pos_enabled: false,
        postal_code: '02118',
        state_code: 'MA',
        store_hours: 'Mon - Sat: 10am - 9pm<br />\r\n            Sun: 12pm - 6pm',
        store_locator_enabled: true,
        c_countryCodeValue: 'US',
        c_inventoryListId: 'inventory_store_store5'
      }, {
        _type: 'store',
        address1: '150 Winthrop Ave',
        city: 'Lawrence',
        country_code: 'US',
        distance: 22.36,
        distance_unit: 'km',
        id: 'store6',
        latitude: 42.689555,
        longitude: -71.148783,
        name: 'Khale Street Electronics',
        phone: '+1-978-580-2704',
        pos_enabled: false,
        postal_code: '01843',
        state_code: 'MA',
        store_locator_enabled: true,
        c_countryCodeValue: 'US',
        c_inventoryListId: 'inventory_store_store6'
      }, {
        _type: 'store',
        address1: '363 Hancock St',
        city: 'North Quincy',
        country_code: 'US',
        distance: 26.10,
        distance_unit: 'km',
        email: 'store3@company.com',
        id: 'store3',
        latitude: 42.274512,
        longitude: -71.026921,
        name: 'Wire-Wire',
        phone: '+1-617-318-2860',
        pos_enabled: false,
        postal_code: '02171',
        state_code: 'MA',
        store_locator_enabled: true,
        c_countryCodeValue: 'US',
        c_inventoryListId: 'inventory_store_store3'
      }, {
        _type: 'store',
        address1: '239 Bridge St',
        city: 'Manchester',
        country_code: 'US',
        distance: 61.31,
        distance_unit: 'km',
        id: 'store8',
        latitude: 42.995557,
        longitude: -71.452555,
        name: 'Gardena Mart',
        phone: '+1-603-715-9773',
        pos_enabled: false,
        postal_code: '03104',
        state_code: 'NH',
        store_hours: 'Mon - Sat: 10am - 9pm<br />\r\n            Sun: 12pm - 6pm',
        store_locator_enabled: true,
        c_countryCodeValue: 'US',
        c_inventoryListId: 'inventory_store_store8'
      }, {
        _type: 'store',
        address1: '110 Smith St',
        city: 'Providence',
        country_code: 'US',
        distance: 76.07,
        distance_unit: 'km',
        email: 'store2@company.com',
        id: 'store2',
        latitude: 41.831708,
        longitude: -71.414993,
        name: 'Super Electronics',
        phone: '+1-401-312-6284',
        pos_enabled: false,
        postal_code: '02903',
        state_code: 'RI',
        store_locator_enabled: true,
        c_countryCodeValue: 'US',
        c_inventoryListId: 'inventory_store_store2'
      }, {
        _type: 'store',
        address1: '1487 Bay St',
        city: 'Springfield',
        country_code: 'US',
        distance: 120.06,
        distance_unit: 'km',
        id: 'store9',
        latitude: 42.130281,
        longitude: -72.534574,
        name: 'Springfield Media Store',
        phone: '+1-413-413-6916',
        pos_enabled: false,
        postal_code: '01109',
        state_code: 'MA',
        store_events: 'Here are some store events.',
        store_hours: 'Here are the store hours',
        store_locator_enabled: true,
        c_countryCodeValue: 'US',
        c_inventoryListId: 'inventory_store_store9'
      }, {
        _type: 'store',
        address1: '2 Canal Plz',
        city: 'Portland',
        country_code: 'US',
        distance: 149.12,
        distance_unit: 'km',
        id: 'store7',
        latitude: 43.656852,
        longitude: -70.255680,
        name: 'Electro Turbo',
        phone: '+1-207-599-5467',
        pos_enabled: false,
        postal_code: '04101',
        state_code: 'ME',
        store_locator_enabled: true,
        c_countryCodeValue: 'US',
        c_inventoryListId: 'inventory_store_store7'
      }, {
        _type: 'store',
        address1: '70 Wood Ave',
        city: 'Bridgeport',
        country_code: 'US',
        distance: 223.51,
        distance_unit: 'km',
        email: 'store1@company.com',
        id: 'store11',
        latitude: 41.177589,
        longitude: -73.202508,
        name: 'Electronics Super Store',
        phone: '+1-203-965-7014',
        pos_enabled: false,
        postal_code: '06605',
        state_code: 'CT',
        store_locator_enabled: true,
        c_countryCodeValue: 'US',
        c_inventoryListId: 'inventory_store_store11'
      }, {
        _type: 'store',
        address1: 'Leutragraben 2-4',
        city: 'Jena',
        country_code: 'DE',
        distance: 6041.19,
        distance_unit: 'km',
        id: 'german_store',
        latitude: 50.928804,
        longitude: 11.583270,
        name: 'Kaufen Kaufen',
        pos_enabled: false,
        postal_code: '07743',
        store_hours: 'Closed Sundays.',
        store_locator_enabled: true,
        c_countryCodeValue: 'DE',
        c_inventoryListId: 'inventory_store_german_store'
      }],
      start: 0,
      total: 12
    };
  }
}

module.exports = StoresModel;
