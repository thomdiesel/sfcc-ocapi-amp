# ShopApi.OrderPaymentInstrument

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**amount** | **Number** | The payment transaction amount. | [optional] 
**authorizationStatus** | [**Status**](Status.md) | The authorization status of the payment transaction. | [optional] 
**bankRoutingNumber** | **String** | The bank routing number. | [optional] 
**cEaRequireSignature** | **Boolean** |  | [optional] 
**maskedGiftCertificateCode** | **String** | The masked gift certificate code. | [optional] 
**paymentBankAccount** | [**PaymentBankAccount**](PaymentBankAccount.md) | The payment bank account. | [optional] 
**paymentCard** | [**PaymentCard**](PaymentCard.md) | The payment card. | [optional] 
**paymentInstrumentId** | **String** | The payment instrument ID. | [optional] 
**paymentMethodId** | **String** | The payment method id. Optional if a customer payment instrument id is specified. | [optional] 


