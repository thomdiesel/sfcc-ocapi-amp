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
    define(['ApiClient', 'model/PriceAdjustment'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./PriceAdjustment'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ShippingItem = factory(root.ShopApi.ApiClient, root.ShopApi.PriceAdjustment);
  }
}(this, function(ApiClient, PriceAdjustment) {
  'use strict';




  /**
   * The ShippingItem model module.
   * @module model/ShippingItem
   * @version 17.3
   */

  /**
   * Constructs a new <code>ShippingItem</code>.
   * Document representing a shipping item.
   * @alias module:model/ShippingItem
   * @class
   */
  var exports = function() {
    var _this = this;


















  };

  /**
   * Constructs a <code>ShippingItem</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ShippingItem} obj Optional instance to populate.
   * @return {module:model/ShippingItem} The populated <code>ShippingItem</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('adjusted_tax')) {
        obj['adjusted_tax'] = ApiClient.convertToType(data['adjusted_tax'], 'Number');
      }
      if (data.hasOwnProperty('base_price')) {
        obj['base_price'] = ApiClient.convertToType(data['base_price'], 'Number');
      }
      if (data.hasOwnProperty('c_eaEmployeeId')) {
        obj['c_eaEmployeeId'] = ApiClient.convertToType(data['c_eaEmployeeId'], 'String');
      }
      if (data.hasOwnProperty('c_eaManagerEmployeeId')) {
        obj['c_eaManagerEmployeeId'] = ApiClient.convertToType(data['c_eaManagerEmployeeId'], 'String');
      }
      if (data.hasOwnProperty('c_eaOverrideReasonCode')) {
        obj['c_eaOverrideReasonCode'] = ApiClient.convertToType(data['c_eaOverrideReasonCode'], 'String');
      }
      if (data.hasOwnProperty('c_eaPriceOverrideType')) {
        obj['c_eaPriceOverrideType'] = ApiClient.convertToType(data['c_eaPriceOverrideType'], 'String');
      }
      if (data.hasOwnProperty('c_eaPriceOverrideValue')) {
        obj['c_eaPriceOverrideValue'] = ApiClient.convertToType(data['c_eaPriceOverrideValue'], 'String');
      }
      if (data.hasOwnProperty('item_id')) {
        obj['item_id'] = ApiClient.convertToType(data['item_id'], 'String');
      }
      if (data.hasOwnProperty('item_text')) {
        obj['item_text'] = ApiClient.convertToType(data['item_text'], 'String');
      }
      if (data.hasOwnProperty('price')) {
        obj['price'] = ApiClient.convertToType(data['price'], 'Number');
      }
      if (data.hasOwnProperty('price_adjustments')) {
        obj['price_adjustments'] = ApiClient.convertToType(data['price_adjustments'], [PriceAdjustment]);
      }
      if (data.hasOwnProperty('price_after_item_discount')) {
        obj['price_after_item_discount'] = ApiClient.convertToType(data['price_after_item_discount'], 'Number');
      }
      if (data.hasOwnProperty('shipment_id')) {
        obj['shipment_id'] = ApiClient.convertToType(data['shipment_id'], 'String');
      }
      if (data.hasOwnProperty('tax')) {
        obj['tax'] = ApiClient.convertToType(data['tax'], 'Number');
      }
      if (data.hasOwnProperty('tax_basis')) {
        obj['tax_basis'] = ApiClient.convertToType(data['tax_basis'], 'Number');
      }
      if (data.hasOwnProperty('tax_class_id')) {
        obj['tax_class_id'] = ApiClient.convertToType(data['tax_class_id'], 'String');
      }
      if (data.hasOwnProperty('tax_rate')) {
        obj['tax_rate'] = ApiClient.convertToType(data['tax_rate'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The tax of the product item after adjustments applying.
   * @member {Number} adjusted_tax
   */
  exports.prototype['adjusted_tax'] = undefined;
  /**
   * The base price for the line item, which is the  price of the unit before applying adjustments, in the purchase  currency. The base price may be net or gross of tax depending  on the configured taxation policy.
   * @member {Number} base_price
   */
  exports.prototype['base_price'] = undefined;
  /**
   * @member {String} c_eaEmployeeId
   */
  exports.prototype['c_eaEmployeeId'] = undefined;
  /**
   * @member {String} c_eaManagerEmployeeId
   */
  exports.prototype['c_eaManagerEmployeeId'] = undefined;
  /**
   * @member {String} c_eaOverrideReasonCode
   */
  exports.prototype['c_eaOverrideReasonCode'] = undefined;
  /**
   * \"Amount\", \"Percent\", \"FixedPrice\"
   * @member {String} c_eaPriceOverrideType
   */
  exports.prototype['c_eaPriceOverrideType'] = undefined;
  /**
   * @member {String} c_eaPriceOverrideValue
   */
  exports.prototype['c_eaPriceOverrideValue'] = undefined;
  /**
   * The item identifier. Use this to identify an item when  updating the item quantity or creating a custom price adjustment for an  item.
   * @member {String} item_id
   */
  exports.prototype['item_id'] = undefined;
  /**
   * The text describing the item in more detail.
   * @member {String} item_text
   */
  exports.prototype['item_text'] = undefined;
  /**
   * The price of the line item before applying any adjustments. If the line item is based on net pricing  then the net price is returned. If the line item is based on gross  pricing then the gross price is returned.
   * @member {Number} price
   */
  exports.prototype['price'] = undefined;
  /**
   * Array of price adjustments. Can be empty.
   * @member {Array.<module:model/PriceAdjustment>} price_adjustments
   */
  exports.prototype['price_adjustments'] = undefined;
  /**
   * The price of the product line item after applying all product-level  adjustments. For net pricing the adjusted net price is returned. For gross pricing, the adjusted  gross price is returned.
   * @member {Number} price_after_item_discount
   */
  exports.prototype['price_after_item_discount'] = undefined;
  /**
   * The identifier of the shipment to which this item belongs.
   * @member {String} shipment_id
   */
  exports.prototype['shipment_id'] = undefined;
  /**
   * The tax of the product item before adjustments applying.
   * @member {Number} tax
   */
  exports.prototype['tax'] = undefined;
  /**
   * The price used to calculate the tax for this product item.
   * @member {Number} tax_basis
   */
  exports.prototype['tax_basis'] = undefined;
  /**
   * The tax class ID for the product item or null  if no tax class ID is associated with the product item.
   * @member {String} tax_class_id
   */
  exports.prototype['tax_class_id'] = undefined;
  /**
   * The tax rate, which is the decimal tax rate to be applied  to the product represented by this item.
   * @member {Number} tax_rate
   */
  exports.prototype['tax_rate'] = undefined;



  return exports;
}));


