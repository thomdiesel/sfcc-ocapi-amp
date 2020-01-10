# ShopApi.OrderSearchRequest

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**count** | **Number** | The number of returned documents. | [optional] 
**expand** | **[String]** | List of expansions to be applied to each search results. Expands are optional. | [optional] 
**query** | [**Query**](Query.md) | The query to apply | 
**select** | **String** | The field to be selected. | [optional] 
**sorts** | [**[Sort]**](Sort.md) | The list of sort clauses configured for the search request. Sort clauses are optional. | [optional] 
**start** | **Number** | The zero-based index of the first search hit to include in the result. | [optional] 


