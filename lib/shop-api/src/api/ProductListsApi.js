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
    define(['ApiClient', 'model/PublicProductList', 'model/PublicProductListItem', 'model/PublicProductListItemResult', 'model/PublicProductListResult'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/PublicProductList'), require('../model/PublicProductListItem'), require('../model/PublicProductListItemResult'), require('../model/PublicProductListResult'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ProductListsApi = factory(root.ShopApi.ApiClient, root.ShopApi.PublicProductList, root.ShopApi.PublicProductListItem, root.ShopApi.PublicProductListItemResult, root.ShopApi.PublicProductListResult);
  }
}(this, function(ApiClient, PublicProductList, PublicProductListItem, PublicProductListItemResult, PublicProductListResult) {
  'use strict';

  /**
   * ProductLists service.
   * @module api/ProductListsApi
   * @version 17.3
   */

  /**
   * Constructs a new ProductListsApi. 
   * @alias module:api/ProductListsApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getProductLists operation.
     * @callback module:api/ProductListsApi~getProductListsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PublicProductListResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * productListResultWO  | /data[1]/link  Retrieves all public product lists as defined by the given search term (email, first name, last name).
     * @param {Object} opts Optional parameters
     * @param {String} opts.email The email address of the customer, the product lists belong to.
     * @param {String} opts.firstname The first name of the customer, the product lists belong to.
     * @param {String} opts.lastname The last name of the customer, the product lists belong to.
     * @param {module:api/ProductListsApi~getProductListsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PublicProductListResult}
     */
    this.getProductLists = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'email': opts['email'],
        'firstname': opts['firstname'],
        'lastname': opts['lastname']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = PublicProductListResult;

      return this.apiClient.callApi(
        '/ProductLists', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getProductListsByID operation.
     * @callback module:api/ProductListsApi~getProductListsByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PublicProductList} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieves a public product list by id.
     * @param {String} listId The id of the list.
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.expand 
     * @param {module:api/ProductListsApi~getProductListsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PublicProductList}
     */
    this.getProductListsByID = function(listId, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'listId' is set
      if (listId == undefined || listId == null) {
        throw new Error("Missing the required parameter 'listId' when calling getProductListsByID");
      }


      var pathParams = {
        'list_id': listId
      };
      var queryParams = {
        'expand': this.apiClient.buildCollectionParam(opts['expand'], 'csv')
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = PublicProductList;

      return this.apiClient.callApi(
        '/ProductLists/{list_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getProductListsByIDItems operation.
     * @callback module:api/ProductListsApi~getProductListsByIDItemsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PublicProductListItemResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieves the items of a public product list.
     * @param {String} listId The id of the list.
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.expand 
     * @param {module:api/ProductListsApi~getProductListsByIDItemsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PublicProductListItemResult}
     */
    this.getProductListsByIDItems = function(listId, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'listId' is set
      if (listId == undefined || listId == null) {
        throw new Error("Missing the required parameter 'listId' when calling getProductListsByIDItems");
      }


      var pathParams = {
        'list_id': listId
      };
      var queryParams = {
        'expand': this.apiClient.buildCollectionParam(opts['expand'], 'csv')
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = PublicProductListItemResult;

      return this.apiClient.callApi(
        '/ProductLists/{list_id}/items', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getProductListsByIDItemsByID operation.
     * @callback module:api/ProductListsApi~getProductListsByIDItemsByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PublicProductListItem} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieves an item from a public product list.
     * @param {String} listId The id of the list.
     * @param {String} itemId The id of the item.
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.expand 
     * @param {module:api/ProductListsApi~getProductListsByIDItemsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PublicProductListItem}
     */
    this.getProductListsByIDItemsByID = function(listId, itemId, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'listId' is set
      if (listId == undefined || listId == null) {
        throw new Error("Missing the required parameter 'listId' when calling getProductListsByIDItemsByID");
      }

      // verify the required parameter 'itemId' is set
      if (itemId == undefined || itemId == null) {
        throw new Error("Missing the required parameter 'itemId' when calling getProductListsByIDItemsByID");
      }


      var pathParams = {
        'list_id': listId,
        'item_id': itemId
      };
      var queryParams = {
        'expand': this.apiClient.buildCollectionParam(opts['expand'], 'csv')
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = PublicProductListItem;

      return this.apiClient.callApi(
        '/ProductLists/{list_id}/items/{item_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
