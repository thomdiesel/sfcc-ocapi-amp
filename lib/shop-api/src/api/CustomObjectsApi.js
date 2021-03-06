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
    define(['ApiClient', 'model/CustomObject'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/CustomObject'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.CustomObjectsApi = factory(root.ShopApi.ApiClient, root.ShopApi.CustomObject);
  }
}(this, function(ApiClient, CustomObject) {
  'use strict';

  /**
   * CustomObjects service.
   * @module api/CustomObjectsApi
   * @version 17.3
   */

  /**
   * Constructs a new CustomObjectsApi. 
   * @alias module:api/CustomObjectsApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getCustomObjectsByIDByID operation.
     * @callback module:api/CustomObjectsApi~getCustomObjectsByIDByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CustomObject} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Reads a custom object with a given object type ID and a value for the  key attribute of the object which represents its unique identifier.
     * @param {String} objectType the ID of the object type
     * @param {String} key the key attribute value of the custom object
     * @param {module:api/CustomObjectsApi~getCustomObjectsByIDByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CustomObject}
     */
    this.getCustomObjectsByIDByID = function(objectType, key, callback) {
      var postBody = null;

      // verify the required parameter 'objectType' is set
      if (objectType == undefined || objectType == null) {
        throw new Error("Missing the required parameter 'objectType' when calling getCustomObjectsByIDByID");
      }

      // verify the required parameter 'key' is set
      if (key == undefined || key == null) {
        throw new Error("Missing the required parameter 'key' when calling getCustomObjectsByIDByID");
      }


      var pathParams = {
        'object_type': objectType,
        'key': key
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
      var returnType = CustomObject;

      return this.apiClient.callApi(
        '/CustomObjects/{object_type}/{key}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
