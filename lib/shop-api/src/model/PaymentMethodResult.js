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
    define(['ApiClient', 'model/PaymentMethod'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./PaymentMethod'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.PaymentMethodResult = factory(root.ShopApi.ApiClient, root.ShopApi.PaymentMethod);
  }
}(this, function(ApiClient, PaymentMethod) {
  'use strict';




  /**
   * The PaymentMethodResult model module.
   * @module model/PaymentMethodResult
   * @version 17.3
   */

  /**
   * Constructs a new <code>PaymentMethodResult</code>.
   * Result document of payment methods applicable for a basket.
   * @alias module:model/PaymentMethodResult
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>PaymentMethodResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PaymentMethodResult} obj Optional instance to populate.
   * @return {module:model/PaymentMethodResult} The populated <code>PaymentMethodResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('applicable_payment_methods')) {
        obj['applicable_payment_methods'] = ApiClient.convertToType(data['applicable_payment_methods'], [PaymentMethod]);
      }
    }
    return obj;
  }

  /**
   * The applicable payment methods.
   * @member {Array.<module:model/PaymentMethod>} applicable_payment_methods
   */
  exports.prototype['applicable_payment_methods'] = undefined;



  return exports;
}));


