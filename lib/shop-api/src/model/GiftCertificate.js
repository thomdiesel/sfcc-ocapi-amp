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
    root.ShopApi.GiftCertificate = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The GiftCertificate model module.
   * @module model/GiftCertificate
   * @version 17.3
   */

  /**
   * Constructs a new <code>GiftCertificate</code>.
   * Document representing a gift certificate.
   * @alias module:model/GiftCertificate
   * @class
   */
  var exports = function() {
    var _this = this;












  };

  /**
   * Constructs a <code>GiftCertificate</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GiftCertificate} obj Optional instance to populate.
   * @return {module:model/GiftCertificate} The populated <code>GiftCertificate</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('amount')) {
        obj['amount'] = ApiClient.convertToType(data['amount'], 'Number');
      }
      if (data.hasOwnProperty('balance')) {
        obj['balance'] = ApiClient.convertToType(data['balance'], 'Number');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('enabled')) {
        obj['enabled'] = ApiClient.convertToType(data['enabled'], 'Boolean');
      }
      if (data.hasOwnProperty('masked_gift_certificate_code')) {
        obj['masked_gift_certificate_code'] = ApiClient.convertToType(data['masked_gift_certificate_code'], 'String');
      }
      if (data.hasOwnProperty('merchant_id')) {
        obj['merchant_id'] = ApiClient.convertToType(data['merchant_id'], 'String');
      }
      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
      if (data.hasOwnProperty('recipient_email')) {
        obj['recipient_email'] = ApiClient.convertToType(data['recipient_email'], 'String');
      }
      if (data.hasOwnProperty('recipient_name')) {
        obj['recipient_name'] = ApiClient.convertToType(data['recipient_name'], 'String');
      }
      if (data.hasOwnProperty('sender_name')) {
        obj['sender_name'] = ApiClient.convertToType(data['sender_name'], 'String');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = ApiClient.convertToType(data['status'], 'String');
      }
    }
    return obj;
  }

  /**
   * The gift certificate original amount.
   * @member {Number} amount
   */
  exports.prototype['amount'] = undefined;
  /**
   * The gift certificate balance.
   * @member {Number} balance
   */
  exports.prototype['balance'] = undefined;
  /**
   * The gift certificate description.
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * Is the gift certificate is enabled?
   * @member {Boolean} enabled
   */
  exports.prototype['enabled'] = undefined;
  /**
   * The masked gift certificate code.
   * @member {String} masked_gift_certificate_code
   */
  exports.prototype['masked_gift_certificate_code'] = undefined;
  /**
   * The merchant ID.
   * @member {String} merchant_id
   */
  exports.prototype['merchant_id'] = undefined;
  /**
   * The message.
   * @member {String} message
   */
  exports.prototype['message'] = undefined;
  /**
   * The recipient email.
   * @member {String} recipient_email
   */
  exports.prototype['recipient_email'] = undefined;
  /**
   * The recipient name.
   * @member {String} recipient_name
   */
  exports.prototype['recipient_name'] = undefined;
  /**
   * The sender name.
   * @member {String} sender_name
   */
  exports.prototype['sender_name'] = undefined;
  /**
   * The gift certificate status.
   * @member {module:model/GiftCertificate.StatusEnum} status
   */
  exports.prototype['status'] = undefined;


  /**
   * Allowed values for the <code>status</code> property.
   * @enum {String}
   * @readonly
   */
  exports.StatusEnum = {
    /**
     * value: "pending"
     * @const
     */
    "pending": "pending",
    /**
     * value: "issued"
     * @const
     */
    "issued": "issued",
    /**
     * value: "partially_redeemed"
     * @const
     */
    "partially_redeemed": "partially_redeemed",
    /**
     * value: "redeemed"
     * @const
     */
    "redeemed": "redeemed"  };


  return exports;
}));

