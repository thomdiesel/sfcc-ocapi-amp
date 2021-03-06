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
    define(['ApiClient', 'model/Site'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/Site'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.SiteApi = factory(root.ShopApi.ApiClient, root.ShopApi.Site);
  }
}(this, function(ApiClient, Site) {
  'use strict';

  /**
   * Site service.
   * @module api/SiteApi
   * @version 17.3
   */

  /**
   * Constructs a new SiteApi. 
   * @alias module:api/SiteApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getSite operation.
     * @callback module:api/SiteApi~getSiteCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Site} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Access site information, like site status and site content URLs.
     * @param {module:api/SiteApi~getSiteCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Site}
     */
    this.getSite = function(callback) {
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Site;

      return this.apiClient.callApi(
        '/site', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
