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
    // AMD.
    define(['expect.js', '../../src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require('../../src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.ShopApi);
  }
}(this, function(expect, ShopApi) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new ShopApi.SuggestionResult();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('SuggestionResult', function() {
    it('should create an instance of SuggestionResult', function() {
      // uncomment below and update the code to test SuggestionResult
      //var instane = new ShopApi.SuggestionResult();
      //expect(instance).to.be.a(ShopApi.SuggestionResult);
    });

    it('should have the property brandSuggestions (base name: "brand_suggestions")', function() {
      // uncomment below and update the code to test the property brandSuggestions
      //var instane = new ShopApi.SuggestionResult();
      //expect(instance).to.be();
    });

    it('should have the property categorySuggestions (base name: "category_suggestions")', function() {
      // uncomment below and update the code to test the property categorySuggestions
      //var instane = new ShopApi.SuggestionResult();
      //expect(instance).to.be();
    });

    it('should have the property contentSuggestions (base name: "content_suggestions")', function() {
      // uncomment below and update the code to test the property contentSuggestions
      //var instane = new ShopApi.SuggestionResult();
      //expect(instance).to.be();
    });

    it('should have the property customSuggestions (base name: "custom_suggestions")', function() {
      // uncomment below and update the code to test the property customSuggestions
      //var instane = new ShopApi.SuggestionResult();
      //expect(instance).to.be();
    });

    it('should have the property productSuggestions (base name: "product_suggestions")', function() {
      // uncomment below and update the code to test the property productSuggestions
      //var instane = new ShopApi.SuggestionResult();
      //expect(instance).to.be();
    });

    it('should have the property query (base name: "query")', function() {
      // uncomment below and update the code to test the property query
      //var instane = new ShopApi.SuggestionResult();
      //expect(instance).to.be();
    });

  });

}));