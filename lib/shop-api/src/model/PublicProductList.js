/**
 * Shop API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 17.3
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ProductListEvent', 'model/ProductListRegistrant', 'model/ProductListShippingAddress', 'model/ProductSimpleLink', 'model/PublicProductListItem'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ProductListEvent'), require('./ProductListRegistrant'), require('./ProductListShippingAddress'), require('./ProductSimpleLink'), require('./PublicProductListItem'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.PublicProductList = factory(root.ShopApi.ApiClient, root.ShopApi.ProductListEvent, root.ShopApi.ProductListRegistrant, root.ShopApi.ProductListShippingAddress, root.ShopApi.ProductSimpleLink, root.ShopApi.PublicProductListItem);
  }
}(this, function(ApiClient, ProductListEvent, ProductListRegistrant, ProductListShippingAddress, ProductSimpleLink, PublicProductListItem) {
  'use strict';




  /**
   * The PublicProductList model module.
   * @module model/PublicProductList
   * @version 17.3
   */

  /**
   * Constructs a new <code>PublicProductList</code>.
   * @alias module:model/PublicProductList
   * @class
   */
  var exports = function() {
    var _this = this;














  };

  /**
   * Constructs a <code>PublicProductList</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PublicProductList} obj Optional instance to populate.
   * @return {module:model/PublicProductList} The populated <code>PublicProductList</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('co_registrant')) {
        obj['co_registrant'] = ProductListRegistrant.constructFromObject(data['co_registrant']);
      }
      if (data.hasOwnProperty('creation_date')) {
        obj['creation_date'] = ApiClient.convertToType(data['creation_date'], 'Date');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('event')) {
        obj['event'] = ProductListEvent.constructFromObject(data['event']);
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('items_link')) {
        obj['items_link'] = ProductSimpleLink.constructFromObject(data['items_link']);
      }
      if (data.hasOwnProperty('last_modified')) {
        obj['last_modified'] = ApiClient.convertToType(data['last_modified'], 'Date');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('product_list_items')) {
        obj['product_list_items'] = ApiClient.convertToType(data['product_list_items'], [PublicProductListItem]);
      }
      if (data.hasOwnProperty('product_list_shipping_address')) {
        obj['product_list_shipping_address'] = ProductListShippingAddress.constructFromObject(data['product_list_shipping_address']);
      }
      if (data.hasOwnProperty('public')) {
        obj['public'] = ApiClient.convertToType(data['public'], 'Boolean');
      }
      if (data.hasOwnProperty('registrant')) {
        obj['registrant'] = ProductListRegistrant.constructFromObject(data['registrant']);
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
    }
    return obj;
  }

  /**
   * The coRegistrant of this product list.
   * @member {module:model/ProductListRegistrant} co_registrant
   */
  exports.prototype['co_registrant'] = undefined;
  /**
   * Returns the value of attribute 'creationDate'.
   * @member {Date} creation_date
   */
  exports.prototype['creation_date'] = undefined;
  /**
   * The description of this product list.
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * The event of this product list.
   * @member {module:model/ProductListEvent} event
   */
  exports.prototype['event'] = undefined;
  /**
   * The id of this product list.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The resource link to the items of this product list.
   * @member {module:model/ProductSimpleLink} items_link
   */
  exports.prototype['items_link'] = undefined;
  /**
   * Returns the value of attribute 'lastModified'.
   * @member {Date} last_modified
   */
  exports.prototype['last_modified'] = undefined;
  /**
   * The name of this product list.
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * The product list items
   * @member {Array.<module:model/PublicProductListItem>} product_list_items
   */
  exports.prototype['product_list_items'] = undefined;
  /**
   * The abbreviated shipping address of this product list representing what anonymous user can see.
   * @member {module:model/ProductListShippingAddress} product_list_shipping_address
   */
  exports.prototype['product_list_shipping_address'] = undefined;
  /**
   * Indicates whether the owner made this product list available for access by other customers.
   * @member {Boolean} public
   */
  exports.prototype['public'] = undefined;
  /**
   * The registrant of this product list.
   * @member {module:model/ProductListRegistrant} registrant
   */
  exports.prototype['registrant'] = undefined;
  /**
   * The type of the product list.
   * @member {module:model/PublicProductList.TypeEnum} type
   */
  exports.prototype['type'] = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "wish_list"
     * @const
     */
    "wish_list": "wish_list",
    /**
     * value: "gift_registry"
     * @const
     */
    "gift_registry": "gift_registry",
    /**
     * value: "shopping_list"
     * @const
     */
    "shopping_list": "shopping_list",
    /**
     * value: "custom_1"
     * @const
     */
    "custom_1": "custom_1",
    /**
     * value: "custom_2"
     * @const
     */
    "custom_2": "custom_2",
    /**
     * value: "custom_3"
     * @const
     */
    "custom_3": "custom_3"  };


  return exports;
}));


