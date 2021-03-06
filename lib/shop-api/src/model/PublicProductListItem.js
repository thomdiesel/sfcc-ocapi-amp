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
    define(['ApiClient', 'model/Product', 'model/ProductSimpleLink'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Product'), require('./ProductSimpleLink'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.PublicProductListItem = factory(root.ShopApi.ApiClient, root.ShopApi.Product, root.ShopApi.ProductSimpleLink);
  }
}(this, function(ApiClient, Product, ProductSimpleLink) {
  'use strict';




  /**
   * The PublicProductListItem model module.
   * @module model/PublicProductListItem
   * @version 17.3
   */

  /**
   * Constructs a new <code>PublicProductListItem</code>.
   * Document representing a product list item.
   * @alias module:model/PublicProductListItem
   * @class
   */
  var exports = function() {
    var _this = this;






  };

  /**
   * Constructs a <code>PublicProductListItem</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PublicProductListItem} obj Optional instance to populate.
   * @return {module:model/PublicProductListItem} The populated <code>PublicProductListItem</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('priority')) {
        obj['priority'] = ApiClient.convertToType(data['priority'], 'Number');
      }
      if (data.hasOwnProperty('product')) {
        obj['product'] = Product.constructFromObject(data['product']);
      }
      if (data.hasOwnProperty('product_details_link')) {
        obj['product_details_link'] = ProductSimpleLink.constructFromObject(data['product_details_link']);
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
    }
    return obj;
  }

  /**
   * The id of this product list item.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The priority of the item.
   * @member {Number} priority
   */
  exports.prototype['priority'] = undefined;
  /**
   * The product item
   * @member {module:model/Product} product
   */
  exports.prototype['product'] = undefined;
  /**
   * A link to the product.
   * @member {module:model/ProductSimpleLink} product_details_link
   */
  exports.prototype['product_details_link'] = undefined;
  /**
   * The type of the item.
   * @member {module:model/PublicProductListItem.TypeEnum} type
   */
  exports.prototype['type'] = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "product"
     * @const
     */
    "product": "product",
    /**
     * value: "gift_certificate"
     * @const
     */
    "gift_certificate": "gift_certificate"  };


  return exports;
}));


