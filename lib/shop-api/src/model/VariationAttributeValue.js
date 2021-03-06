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
    root.ShopApi.VariationAttributeValue = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The VariationAttributeValue model module.
   * @module model/VariationAttributeValue
   * @version 17.3
   */

  /**
   * Constructs a new <code>VariationAttributeValue</code>.
   * @alias module:model/VariationAttributeValue
   * @class
   * @param value {String} 
   */
  var exports = function(value) {
    var _this = this;




    _this['value'] = value;
  };

  /**
   * Constructs a <code>VariationAttributeValue</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/VariationAttributeValue} obj Optional instance to populate.
   * @return {module:model/VariationAttributeValue} The populated <code>VariationAttributeValue</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('orderable')) {
        obj['orderable'] = ApiClient.convertToType(data['orderable'], 'Boolean');
      }
      if (data.hasOwnProperty('value')) {
        obj['value'] = ApiClient.convertToType(data['value'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * @member {Boolean} orderable
   */
  exports.prototype['orderable'] = undefined;
  /**
   * @member {String} value
   */
  exports.prototype['value'] = undefined;



  return exports;
}));


