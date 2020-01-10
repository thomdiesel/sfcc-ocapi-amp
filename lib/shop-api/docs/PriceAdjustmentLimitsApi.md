# ShopApi.PriceAdjustmentLimitsApi

All URIs are relative to *https://dev01-instore-dw.demandware.net/s/SiteGenesis/dw/shop/v17_3*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getPriceAdjustmentLimits**](PriceAdjustmentLimitsApi.md#getPriceAdjustmentLimits) | **GET** /PriceAdjustmentLimits | 


<a name="getPriceAdjustmentLimits"></a>
# **getPriceAdjustmentLimits**
> PriceAdjustmentLimits getPriceAdjustmentLimits()



Returns a list of price adjustment limits for the authenticated user and the site defined in the URL.    At least one of the following functional permissions must be assigned to the user to be able to access it:  Adjust_Item_Price or Adjust_Shipping_Price or Adjust_Order_Price.  

### Example
```javascript
var ShopApi = require('shop_api');
var defaultClient = ShopApi.ApiClient.instance;

// Configure HTTP basic authorization: customers_auth
var customers_auth = defaultClient.authentications['customers_auth'];
customers_auth.username = 'YOUR USERNAME';
customers_auth.password = 'YOUR PASSWORD';

// Configure OAuth2 access token for authorization: oauth2_application
var oauth2_application = defaultClient.authentications['oauth2_application'];
oauth2_application.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new ShopApi.PriceAdjustmentLimitsApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getPriceAdjustmentLimits(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**PriceAdjustmentLimits**](PriceAdjustmentLimits.md)

### Authorization

[customers_auth](../README.md#customers_auth), [oauth2_application](../README.md#oauth2_application)

### HTTP request headers

 - **Content-Type**: application/json, text/xml, application/xml
 - **Accept**: application/json, text/xml, application/xml

