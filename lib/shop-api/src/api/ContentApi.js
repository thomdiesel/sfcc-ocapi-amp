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
    define(['ApiClient', 'model/Content', 'model/ContentResult'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/Content'), require('../model/ContentResult'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ContentApi = factory(root.ShopApi.ApiClient, root.ShopApi.Content, root.ShopApi.ContentResult);
  }
}(this, function(ApiClient, Content, ContentResult) {
  'use strict';

  /**
   * Content service.
   * @module api/ContentApi
   * @version 17.3
   */

  /**
   * Constructs a new ContentApi. 
   * @alias module:api/ContentApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getContentByID operation.
     * @callback module:api/ContentApi~getContentByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Content} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * To access a content asset, you construct a URL using the template shown below. This template requires you to  specify a content asset id. In response, the server returns a corresponding content asset document. Only content  assets, which are marked as online are returned. An assignment to a folder is not necessary.
     * @param {String} id The id of the requested content asset.
     * @param {Object} opts Optional parameters
     * @param {String} opts.locale 
     * @param {module:api/ContentApi~getContentByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Content}
     */
    this.getContentByID = function(id, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw new Error("Missing the required parameter 'id' when calling getContentByID");
      }


      var pathParams = {
        'id': id
      };
      var queryParams = {
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Content;

      return this.apiClient.callApi(
        '/content/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getContentByIDs operation.
     * @callback module:api/ContentApi~getContentByIDsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ContentResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Array.<String>} ids 
     * @param {Object} opts Optional parameters
     * @param {String} opts.locale 
     * @param {module:api/ContentApi~getContentByIDsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ContentResult}
     */
    this.getContentByIDs = function(ids, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'ids' is set
      if (ids == undefined || ids == null) {
        throw new Error("Missing the required parameter 'ids' when calling getContentByIDs");
      }


      var pathParams = {
        'ids': ids
      };
      var queryParams = {
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = ContentResult;

      return this.apiClient.callApi(
        '/content/({ids})', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
