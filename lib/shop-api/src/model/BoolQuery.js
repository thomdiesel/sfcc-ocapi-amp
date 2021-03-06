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
    define(['ApiClient', 'model/Query'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Query'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.BoolQuery = factory(root.ShopApi.ApiClient, root.ShopApi.Query);
  }
}(this, function(ApiClient, Query) {
  'use strict';




  /**
   * The BoolQuery model module.
   * @module model/BoolQuery
   * @version 17.3
   */

  /**
   * Constructs a new <code>BoolQuery</code>.
   * A boolean query allows to construct full logical expression trees consisting of other queries (usually term and text  queries). A boolean query basically has 3 sets of clauses that &#39;must&#39;, &#39;should&#39; and / or &#39;must not&#39; match.  If &#39;must&#39;,  &#39;must_not&#39;, or &#39;should&#39; appear in the same boolean query, they are combined logically using the AND operator.  
   * @alias module:model/BoolQuery
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>BoolQuery</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/BoolQuery} obj Optional instance to populate.
   * @return {module:model/BoolQuery} The populated <code>BoolQuery</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('must')) {
        obj['must'] = ApiClient.convertToType(data['must'], [Query]);
      }
      if (data.hasOwnProperty('must_not')) {
        obj['must_not'] = ApiClient.convertToType(data['must_not'], [Query]);
      }
      if (data.hasOwnProperty('should')) {
        obj['should'] = ApiClient.convertToType(data['should'], [Query]);
      }
    }
    return obj;
  }

  /**
   * List of queries, which must match.
   * @member {Array.<module:model/Query>} must
   */
  exports.prototype['must'] = undefined;
  /**
   * List of queries, which must not match.
   * @member {Array.<module:model/Query>} must_not
   */
  exports.prototype['must_not'] = undefined;
  /**
   * List of queries, which should match.
   * @member {Array.<module:model/Query>} should
   */
  exports.prototype['should'] = undefined;



  return exports;
}));


