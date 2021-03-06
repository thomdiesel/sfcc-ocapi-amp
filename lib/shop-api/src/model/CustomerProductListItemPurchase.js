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
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.CustomerProductListItemPurchase = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The CustomerProductListItemPurchase model module.
   * @module model/CustomerProductListItemPurchase
   * @version 17.3
   */

  /**
   * Constructs a new <code>CustomerProductListItemPurchase</code>.
   * Document representing a customer product list item purchase.
   * @alias module:model/CustomerProductListItemPurchase
   * @class
   */
  var exports = function() {
    var _this = this;






  };

  /**
   * Constructs a <code>CustomerProductListItemPurchase</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CustomerProductListItemPurchase} obj Optional instance to populate.
   * @return {module:model/CustomerProductListItemPurchase} The populated <code>CustomerProductListItemPurchase</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('order_no')) {
        obj['order_no'] = ApiClient.convertToType(data['order_no'], 'String');
      }
      if (data.hasOwnProperty('product_list_item_id')) {
        obj['product_list_item_id'] = ApiClient.convertToType(data['product_list_item_id'], 'String');
      }
      if (data.hasOwnProperty('purchaser_name')) {
        obj['purchaser_name'] = ApiClient.convertToType(data['purchaser_name'], 'String');
      }
      if (data.hasOwnProperty('quantity')) {
        obj['quantity'] = ApiClient.convertToType(data['quantity'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The id of this purchase.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The order number of this purchase.
   * @member {String} order_no
   */
  exports.prototype['order_no'] = undefined;
  /**
   * The id of the product list item this purchase relates to.
   * @member {String} product_list_item_id
   */
  exports.prototype['product_list_item_id'] = undefined;
  /**
   * The name of the purchaser.
   * @member {String} purchaser_name
   */
  exports.prototype['purchaser_name'] = undefined;
  /**
   * The quantity of this product list item purchased.
   * @member {Number} quantity
   */
  exports.prototype['quantity'] = undefined;



  return exports;
}));


