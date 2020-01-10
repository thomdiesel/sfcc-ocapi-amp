# ShopApi.ProductListsApi

All URIs are relative to *https://dev01-instore-dw.demandware.net/s/SiteGenesis/dw/shop/v17_3*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getProductLists**](ProductListsApi.md#getProductLists) | **GET** /ProductLists | 
[**getProductListsByID**](ProductListsApi.md#getProductListsByID) | **GET** /ProductLists/{list_id} | 
[**getProductListsByIDItems**](ProductListsApi.md#getProductListsByIDItems) | **GET** /ProductLists/{list_id}/items | 
[**getProductListsByIDItemsByID**](ProductListsApi.md#getProductListsByIDItemsByID) | **GET** /ProductLists/{list_id}/items/{item_id} | 


<a name="getProductLists"></a>
# **getProductLists**
> PublicProductListResult getProductLists(opts)



productListResultWO  | /data[1]/link  Retrieves all public product lists as defined by the given search term (email, first name, last name).

### Example
```javascript
var ShopApi = require('shop_api');
var defaultClient = ShopApi.ApiClient.instance;

// Configure HTTP basic authorization: customers_auth
var customers_auth = defaultClient.authentications['customers_auth'];
customers_auth.username = 'YOUR USERNAME';
customers_auth.password = 'YOUR PASSWORD';

// Configure API key authorization: client_id
var client_id = defaultClient.authentications['client_id'];
client_id.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//client_id.apiKeyPrefix = 'Token';

var apiInstance = new ShopApi.ProductListsApi();

var opts = { 
  'email': "email_example", // String | The email address of the customer, the product lists belong to.
  'firstname': "firstname_example", // String | The first name of the customer, the product lists belong to.
  'lastname': "lastname_example" // String | The last name of the customer, the product lists belong to.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getProductLists(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **email** | **String**| The email address of the customer, the product lists belong to. | [optional] 
 **firstname** | **String**| The first name of the customer, the product lists belong to. | [optional] 
 **lastname** | **String**| The last name of the customer, the product lists belong to. | [optional] 

### Return type

[**PublicProductListResult**](PublicProductListResult.md)

### Authorization

[customers_auth](../README.md#customers_auth), [client_id](../README.md#client_id)

### HTTP request headers

 - **Content-Type**: application/json, text/xml, application/xml
 - **Accept**: application/json, text/xml, application/xml

<a name="getProductListsByID"></a>
# **getProductListsByID**
> PublicProductList getProductListsByID(listId, opts)



Retrieves a public product list by id.

### Example
```javascript
var ShopApi = require('shop_api');
var defaultClient = ShopApi.ApiClient.instance;

// Configure HTTP basic authorization: customers_auth
var customers_auth = defaultClient.authentications['customers_auth'];
customers_auth.username = 'YOUR USERNAME';
customers_auth.password = 'YOUR PASSWORD';

// Configure API key authorization: client_id
var client_id = defaultClient.authentications['client_id'];
client_id.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//client_id.apiKeyPrefix = 'Token';

var apiInstance = new ShopApi.ProductListsApi();

var listId = "listId_example"; // String | The id of the list.

var opts = { 
  'expand': ["expand_example"] // [String] | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getProductListsByID(listId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **listId** | **String**| The id of the list. | 
 **expand** | [**[String]**](String.md)|  | [optional] 

### Return type

[**PublicProductList**](PublicProductList.md)

### Authorization

[customers_auth](../README.md#customers_auth), [client_id](../README.md#client_id)

### HTTP request headers

 - **Content-Type**: application/json, text/xml, application/xml
 - **Accept**: application/json, text/xml, application/xml

<a name="getProductListsByIDItems"></a>
# **getProductListsByIDItems**
> PublicProductListItemResult getProductListsByIDItems(listId, opts)



Retrieves the items of a public product list.

### Example
```javascript
var ShopApi = require('shop_api');
var defaultClient = ShopApi.ApiClient.instance;

// Configure HTTP basic authorization: customers_auth
var customers_auth = defaultClient.authentications['customers_auth'];
customers_auth.username = 'YOUR USERNAME';
customers_auth.password = 'YOUR PASSWORD';

// Configure API key authorization: client_id
var client_id = defaultClient.authentications['client_id'];
client_id.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//client_id.apiKeyPrefix = 'Token';

var apiInstance = new ShopApi.ProductListsApi();

var listId = "listId_example"; // String | The id of the list.

var opts = { 
  'expand': ["expand_example"] // [String] | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getProductListsByIDItems(listId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **listId** | **String**| The id of the list. | 
 **expand** | [**[String]**](String.md)|  | [optional] 

### Return type

[**PublicProductListItemResult**](PublicProductListItemResult.md)

### Authorization

[customers_auth](../README.md#customers_auth), [client_id](../README.md#client_id)

### HTTP request headers

 - **Content-Type**: application/json, text/xml, application/xml
 - **Accept**: application/json, text/xml, application/xml

<a name="getProductListsByIDItemsByID"></a>
# **getProductListsByIDItemsByID**
> PublicProductListItem getProductListsByIDItemsByID(listId, itemId, opts)



Retrieves an item from a public product list.

### Example
```javascript
var ShopApi = require('shop_api');
var defaultClient = ShopApi.ApiClient.instance;

// Configure HTTP basic authorization: customers_auth
var customers_auth = defaultClient.authentications['customers_auth'];
customers_auth.username = 'YOUR USERNAME';
customers_auth.password = 'YOUR PASSWORD';

// Configure API key authorization: client_id
var client_id = defaultClient.authentications['client_id'];
client_id.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//client_id.apiKeyPrefix = 'Token';

var apiInstance = new ShopApi.ProductListsApi();

var listId = "listId_example"; // String | The id of the list.

var itemId = "itemId_example"; // String | The id of the item.

var opts = { 
  'expand': ["expand_example"] // [String] | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getProductListsByIDItemsByID(listId, itemId, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **listId** | **String**| The id of the list. | 
 **itemId** | **String**| The id of the item. | 
 **expand** | [**[String]**](String.md)|  | [optional] 

### Return type

[**PublicProductListItem**](PublicProductListItem.md)

### Authorization

[customers_auth](../README.md#customers_auth), [client_id](../README.md#client_id)

### HTTP request headers

 - **Content-Type**: application/json, text/xml, application/xml
 - **Accept**: application/json, text/xml, application/xml

