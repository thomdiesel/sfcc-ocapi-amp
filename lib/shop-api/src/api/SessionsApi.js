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
    root.ShopApi.SessionsApi = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * Sessions service.
   * @module api/SessionsApi
   * @version 17.3
   */

  /**
   * Constructs a new SessionsApi. 
   * @alias module:api/SessionsApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the postSessions operation.
     * @callback module:api/SessionsApi~postSessionsCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Exchanges a JWT token into a new session. If the given token is valid, creates a new session, which is associated  with the authenticated or anonymous customer. All Set-Cookie headers for handling the session are applied  on the response.    Please note that this resource always creates a new session with the consequence that you have no session basket  after you do that. Once you created a session from a JWT token you can use this session and stateless OCAPI calls  using the JWT in parallel. There is no additional need to call the bridging resources again.    When a session ID is sent in with the request, the specified session is ignored. Only the incoming JWT token is  used to create a new session.
     * @param {module:api/SessionsApi~postSessionsCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.postSessions = function(callback) {
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = null;

      return this.apiClient.callApi(
        '/sessions', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));