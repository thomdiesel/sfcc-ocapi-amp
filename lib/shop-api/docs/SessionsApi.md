# ShopApi.SessionsApi

All URIs are relative to *https://dev01-instore-dw.demandware.net/s/SiteGenesis/dw/shop/v17_3*

Method | HTTP request | Description
------------- | ------------- | -------------
[**postSessions**](SessionsApi.md#postSessions) | **POST** /sessions | 


<a name="postSessions"></a>
# **postSessions**
> postSessions()



Exchanges a JWT token into a new session. If the given token is valid, creates a new session, which is associated  with the authenticated or anonymous customer. All Set-Cookie headers for handling the session are applied  on the response.    Please note that this resource always creates a new session with the consequence that you have no session basket  after you do that. Once you created a session from a JWT token you can use this session and stateless OCAPI calls  using the JWT in parallel. There is no additional need to call the bridging resources again.    When a session ID is sent in with the request, the specified session is ignored. Only the incoming JWT token is  used to create a new session.

### Example
```javascript
var ShopApi = require('shop_api');
var defaultClient = ShopApi.ApiClient.instance;

// Configure HTTP basic authorization: customers_auth
var customers_auth = defaultClient.authentications['customers_auth'];
customers_auth.username = 'YOUR USERNAME';
customers_auth.password = 'YOUR PASSWORD';

var apiInstance = new ShopApi.SessionsApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.postSessions(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

[customers_auth](../README.md#customers_auth)

### HTTP request headers

 - **Content-Type**: application/json, text/xml, application/xml
 - **Accept**: application/json, text/xml, application/xml

