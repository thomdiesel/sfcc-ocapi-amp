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
    root.ShopApi.ProductPromotion = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ProductPromotion model module.
   * @module model/ProductPromotion
   * @version 17.3
   */

  /**
   * Constructs a new <code>ProductPromotion</code>.
   * Document representing a product promotion.
   * @alias module:model/ProductPromotion
   * @class
   */
  var exports = function() {
    var _this = this;





  };

  /**
   * Constructs a <code>ProductPromotion</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ProductPromotion} obj Optional instance to populate.
   * @return {module:model/ProductPromotion} The populated <code>ProductPromotion</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('callout_msg')) {
        obj['callout_msg'] = ApiClient.convertToType(data['callout_msg'], 'String');
      }
      if (data.hasOwnProperty('link')) {
        obj['link'] = ApiClient.convertToType(data['link'], 'String');
      }
      if (data.hasOwnProperty('promotion_id')) {
        obj['promotion_id'] = ApiClient.convertToType(data['promotion_id'], 'String');
      }
      if (data.hasOwnProperty('promotional_price')) {
        obj['promotional_price'] = ApiClient.convertToType(data['promotional_price'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The localized call-out message of the promotion.
   * @member {String} callout_msg
   */
  exports.prototype['callout_msg'] = undefined;
  /**
   * The URL addressing the promotion.
   * @member {String} link
   */
  exports.prototype['link'] = undefined;
  /**
   * The unique id of the promotion.
   * @member {String} promotion_id
   */
  exports.prototype['promotion_id'] = undefined;
  /**
   * The promotional price for this product.
   * @member {Number} promotional_price
   */
  exports.prototype['promotional_price'] = undefined;



  return exports;
}));


