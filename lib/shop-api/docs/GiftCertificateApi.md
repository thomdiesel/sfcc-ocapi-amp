# ShopApi.Gift_certificateApi

All URIs are relative to *https://dev01-instore-dw.demandware.net/s/SiteGenesis/dw/shop/v17_3*

Method | HTTP request | Description
------------- | ------------- | -------------
[**postGiftCertificate**](Gift_certificateApi.md#postGiftCertificate) | **POST** /gift_certificate | 


<a name="postGiftCertificate"></a>
# **postGiftCertificate**
> GiftCertificate postGiftCertificate(opts)



Action to retrieve an existing gift certificate.

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

var apiInstance = new ShopApi.Gift_certificateApi();

var opts = { 
  'body': new ShopApi.GiftCertificateRequest() // GiftCertificateRequest | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.postGiftCertificate(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**GiftCertificateRequest**](GiftCertificateRequest.md)|  | [optional] 

### Return type

[**GiftCertificate**](GiftCertificate.md)

### Authorization

[customers_auth](../README.md#customers_auth), [oauth2_application](../README.md#oauth2_application)

### HTTP request headers

 - **Content-Type**: application/json, text/xml, application/xml
 - **Accept**: application/json, text/xml, application/xml

