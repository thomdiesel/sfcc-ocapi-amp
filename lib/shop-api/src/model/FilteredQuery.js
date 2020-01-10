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
    define(['ApiClient', 'model/Filter', 'model/Query'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Filter'), require('./Query'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.FilteredQuery = factory(root.ShopApi.ApiClient, root.ShopApi.Filter, root.ShopApi.Query);
  }
}(this, function(ApiClient, Filter, Query) {
  'use strict';




  /**
   * The FilteredQuery model module.
   * @module model/FilteredQuery
   * @version 17.3
   */

  /**
   * Constructs a new <code>FilteredQuery</code>.
   * A filtered query allows to filter the result of a (possibly complex) query using a (possibly complex) filter.  
   * @alias module:model/FilteredQuery
   * @class
   * @param filter {module:model/Filter} The (possibly complex) filter object.
   * @param query {module:model/Query} The query object.
   */
  var exports = function(filter, query) {
    var _this = this;

    _this['filter'] = filter;
    _this['query'] = query;
  };

  /**
   * Constructs a <code>FilteredQuery</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/FilteredQuery} obj Optional instance to populate.
   * @return {module:model/FilteredQuery} The populated <code>FilteredQuery</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('filter')) {
        obj['filter'] = Filter.constructFromObject(data['filter']);
      }
      if (data.hasOwnProperty('query')) {
        obj['query'] = Query.constructFromObject(data['query']);
      }
    }
    return obj;
  }

  /**
   * The (possibly complex) filter object.
   * @member {module:model/Filter} filter
   */
  exports.prototype['filter'] = undefined;
  /**
   * The query object.
   * @member {module:model/Query} query
   */
  exports.prototype['query'] = undefined;



  return exports;
}));

