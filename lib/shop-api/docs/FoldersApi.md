# ShopApi.FoldersApi

All URIs are relative to *https://dev01-instore-dw.demandware.net/s/SiteGenesis/dw/shop/v17_3*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getFoldersByID**](FoldersApi.md#getFoldersByID) | **GET** /folders/{id} | 
[**getFoldersByIDs**](FoldersApi.md#getFoldersByIDs) | **GET** /folders/({ids}) | 


<a name="getFoldersByID"></a>
# **getFoldersByID**
> ContentFolder getFoldersByID(id, opts)



To access a content folder, you construct a URL using the template shown below. This template requires you to  specify a content folder id and a subfolder level. In response, the server returns a corresponding content  folder document. Only content folder, which are marked as online are returned.

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

var apiInstance = new ShopApi.FoldersApi();

var id = "id_example"; // String | The id of the requested content folder.

var opts = { 
  'levels': 56, // Number | 
  'locale': "locale_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getFoldersByID(id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| The id of the requested content folder. | 
 **levels** | **Number**|  | [optional] 
 **locale** | **String**|  | [optional] 

### Return type

[**ContentFolder**](ContentFolder.md)

### Authorization

[customers_auth](../README.md#customers_auth), [client_id](../README.md#client_id)

### HTTP request headers

 - **Content-Type**: application/json, text/xml, application/xml
 - **Accept**: application/json, text/xml, application/xml

<a name="getFoldersByIDs"></a>
# **getFoldersByIDs**
> ContentFolderResult getFoldersByIDs(ids, opts)



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

var apiInstance = new ShopApi.FoldersApi();

var ids = ["ids_example"]; // [String] | 

var opts = { 
  'levels': 56, // Number | 
  'locale': "locale_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getFoldersByIDs(ids, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ids** | [**[String]**](String.md)|  | 
 **levels** | **Number**|  | [optional] 
 **locale** | **String**|  | [optional] 

### Return type

[**ContentFolderResult**](ContentFolderResult.md)

### Authorization

[customers_auth](../README.md#customers_auth), [client_id](../README.md#client_id)

### HTTP request headers

 - **Content-Type**: application/json, text/xml, application/xml
 - **Accept**: application/json, text/xml, application/xml

