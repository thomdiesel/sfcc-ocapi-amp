# ShopApi.StoresApi

All URIs are relative to *https://dev01-instore-dw.demandware.net/s/SiteGenesis/dw/shop/v17_3*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getStores**](StoresApi.md#getStores) | **GET** /stores | 
[**getStoresByID**](StoresApi.md#getStoresByID) | **GET** /stores/{id} | 
[**getStoresByIDs**](StoresApi.md#getStoresByIDs) | **GET** /stores/({ids}) | 


<a name="getStores"></a>
# **getStores**
> StoreResult getStores(opts)



This resource retrieves a list of stores, for the given site, that are within a configured distance of a location  on the earth. The stores and their distance from the specified location are returned as a result set of Store  objects. The distance is interpreted either in miles or kilometers depending on the \&quot;distance_unit\&quot; input  parameter.   The location can be specified by either directly providing a latitude/longitude coordinate pair or by providing a  country and a postal code:    If a postal code is passed, the resource looks in the system&#39;s geolocation mappings to find the coordinates  for this postal code. If no matching geolocation is found, the resource will return an empty list of stores.  If coordinates are passed, the values for country and postal code are ignored.  

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

var apiInstance = new ShopApi.StoresApi();

var opts = { 
  'latitude': 1.2, // Number | The geo coordinate latitude to search for stores                       (value range -90.00 .. 90.00).
  'longitude': 1.2, // Number | The geo coordinate longitude to search for stores                       (value range -180.00 .. 180.00).
  'countryCode': "countryCode_example", // String | The two letter ISO country code e.g. \"US\".
  'postalCode': "postalCode_example", // String | The postal code e.g. \"01801\".
  'distanceUnit': "distanceUnit_example", // String | The distance unit. Supported values are \"mi\" and \"km\"                       (for miles and kilometers respectively, default is \"km\").
  'maxDistance': 1.2, // Number | The area (radius) in distancUnit where stores will be                       searched for (default is half of the earth's perimeter).
  'start': 56, // Number | The result set index to return the first instance for. Default value is 0.
  'count': 56 // Number | The maximum number of instances per request. Default value is 25.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getStores(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **latitude** | **Number**| The geo coordinate latitude to search for stores                       (value range -90.00 .. 90.00). | [optional] 
 **longitude** | **Number**| The geo coordinate longitude to search for stores                       (value range -180.00 .. 180.00). | [optional] 
 **countryCode** | **String**| The two letter ISO country code e.g. \&quot;US\&quot;. | [optional] 
 **postalCode** | **String**| The postal code e.g. \&quot;01801\&quot;. | [optional] 
 **distanceUnit** | **String**| The distance unit. Supported values are \&quot;mi\&quot; and \&quot;km\&quot;                       (for miles and kilometers respectively, default is \&quot;km\&quot;). | [optional] 
 **maxDistance** | **Number**| The area (radius) in distancUnit where stores will be                       searched for (default is half of the earth&#39;s perimeter). | [optional] 
 **start** | **Number**| The result set index to return the first instance for. Default value is 0. | [optional] 
 **count** | **Number**| The maximum number of instances per request. Default value is 25. | [optional] 

### Return type

[**StoreResult**](StoreResult.md)

### Authorization

[customers_auth](../README.md#customers_auth), [client_id](../README.md#client_id)

### HTTP request headers

 - **Content-Type**: application/json, text/xml, application/xml
 - **Accept**: application/json, text/xml, application/xml

<a name="getStoresByID"></a>
# **getStoresByID**
> Store getStoresByID(id)



To access a store, you construct a URL using the template shown below. This template requires you to specify a  store id. In the response, the server returns a corresponding store document.

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

var apiInstance = new ShopApi.StoresApi();

var id = "id_example"; // String | The id of the requested store.


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getStoresByID(id, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| The id of the requested store. | 

### Return type

[**Store**](Store.md)

### Authorization

[customers_auth](../README.md#customers_auth), [client_id](../README.md#client_id)

### HTTP request headers

 - **Content-Type**: application/json, text/xml, application/xml
 - **Accept**: application/json, text/xml, application/xml

<a name="getStoresByIDs"></a>
# **getStoresByIDs**
> StoreResult getStoresByIDs(ids)



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

var apiInstance = new ShopApi.StoresApi();

var ids = ["ids_example"]; // [String] | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getStoresByIDs(ids, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ids** | [**[String]**](String.md)|  | 

### Return type

[**StoreResult**](StoreResult.md)

### Authorization

[customers_auth](../README.md#customers_auth), [client_id](../README.md#client_id)

### HTTP request headers

 - **Content-Type**: application/json, text/xml, application/xml
 - **Accept**: application/json, text/xml, application/xml

