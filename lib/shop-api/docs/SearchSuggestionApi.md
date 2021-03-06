# ShopApi.SearchSuggestionApi

All URIs are relative to *https://dev01-instore-dw.demandware.net/s/SiteGenesis/dw/shop/v17_3*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getSearchSuggestion**](SearchSuggestionApi.md#getSearchSuggestion) | **GET** /SearchSuggestion | 


<a name="getSearchSuggestion"></a>
# **getSearchSuggestion**
> SuggestionResult getSearchSuggestion(q, opts)



Provides keyword search functionality for products, categories, content, brands and custom suggestions.  Returns suggested products, suggested categories, suggested content, suggested brands and custom suggestions  for the given search phrase.

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

var apiInstance = new ShopApi.SearchSuggestionApi();

var q = "q_example"; // String | The query phrase to search for.

var opts = { 
  'count': 56, // Number | The maximum number of suggestions per request. Default value is 5. This affects all types of suggestions (category, product, content, brand, custom suggestions).
  'currency': "currency_example", // String | The currency mnemonic specified for price. This parameter is effective only for product suggestions.
  'locale': "locale_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getSearchSuggestion(q, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **q** | **String**| The query phrase to search for. | 
 **count** | **Number**| The maximum number of suggestions per request. Default value is 5. This affects all types of suggestions (category, product, content, brand, custom suggestions). | [optional] 
 **currency** | **String**| The currency mnemonic specified for price. This parameter is effective only for product suggestions. | [optional] 
 **locale** | **String**|  | [optional] 

### Return type

[**SuggestionResult**](SuggestionResult.md)

### Authorization

[customers_auth](../README.md#customers_auth), [client_id](../README.md#client_id)

### HTTP request headers

 - **Content-Type**: application/json, text/xml, application/xml
 - **Accept**: application/json, text/xml, application/xml

