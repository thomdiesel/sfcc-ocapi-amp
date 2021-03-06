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
    define(['ApiClient', 'model/OrderSearchRequest', 'model/OrderSearchResult'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/OrderSearchRequest'), require('../model/OrderSearchResult'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.OrderSearchApi = factory(root.ShopApi.ApiClient, root.ShopApi.OrderSearchRequest, root.ShopApi.OrderSearchResult);
  }
}(this, function(ApiClient, OrderSearchRequest, OrderSearchResult) {
  'use strict';

  /**
   * OrderSearch service.
   * @module api/OrderSearchApi
   * @version 17.3
   */

  /**
   * Constructs a new OrderSearchApi. 
   * @alias module:api/OrderSearchApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the postOrderSearch operation.
     * @callback module:api/OrderSearchApi~postOrderSearchCallback
     * @param {String} error Error message, if any.
     * @param {module:model/OrderSearchResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Searches for orders.    The query attribute specifies a complex query that can be used to narrow down the search.    Note that search fields are mandatory now and no default ones are supported.    As the old order search version, the new one always uses Search Service too and the for that reason Order  Incremental Indexing should be enabled. Otherwise HTTP 500 response will occur.    The supported search fields are:    affiliate_partner_i_d  affiliate_partner_name  business_type  channel_type  confirmation_status (String)  created_by  creation_date  currency_code  customer_email  customer_name  customer_no  export_after  export_status (String)  external_order_no  external_order_status  last_modified  order_no  original_order_no  payment_status (String)  replaced_order_no  replacement_order_no  shipping_status (String)  status (String)  total_gross_price  total_net_price  order.has_holds  coupon_line_items.coupon_code  coupon_line_items.coupon_id  holds.type  invoices.status  order_items.status  payment_instruments.credit_card_type  payment_instruments.payment_method_id  product_items.product_id  return_cases.return_case_number  shipments.shipping_method_id  shipping_orders.shipping_order_number    The sort order of the retrieved orders could be specified by the \&quot;sorts\&quot; parameter. It is a list of objects  presenting field name and sort direction (\&quot;asc\&quot; or \&quot;desc\&quot;).    Custom attributes could be used as search fields and as sort fields too. A prefix \&quot;c_\&quot; has to be added to them.
     * @param {module:model/OrderSearchRequest} body 
     * @param {module:api/OrderSearchApi~postOrderSearchCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/OrderSearchResult}
     */
    this.postOrderSearch = function(body, callback) {
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling postOrderSearch");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = OrderSearchResult;

      return this.apiClient.callApi(
        '/OrderSearch', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
