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
    instance = new ShopApi.Suggestion();
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

  describe('Suggestion', function() {
    it('should create an instance of Suggestion', function() {
      // uncomment below and update the code to test Suggestion
      //var instane = new ShopApi.Suggestion();
      //expect(instance).to.be.a(ShopApi.Suggestion);
    });

    it('should have the property brands (base name: "brands")', function() {
      // uncomment below and update the code to test the property brands
      //var instane = new ShopApi.Suggestion();
      //expect(instance).to.be();
    });

    it('should have the property categories (base name: "categories")', function() {
      // uncomment below and update the code to test the property categories
      //var instane = new ShopApi.Suggestion();
      //expect(instance).to.be();
    });

    it('should have the property content (base name: "content")', function() {
      // uncomment below and update the code to test the property content
      //var instane = new ShopApi.Suggestion();
      //expect(instance).to.be();
    });

    it('should have the property customSuggestions (base name: "custom_suggestions")', function() {
      // uncomment below and update the code to test the property customSuggestions
      //var instane = new ShopApi.Suggestion();
      //expect(instance).to.be();
    });

    it('should have the property products (base name: "products")', function() {
      // uncomment below and update the code to test the property products
      //var instane = new ShopApi.Suggestion();
      //expect(instance).to.be();
    });

    it('should have the property suggestedPhrases (base name: "suggested_phrases")', function() {
      // uncomment below and update the code to test the property suggestedPhrases
      //var instane = new ShopApi.Suggestion();
      //expect(instance).to.be();
    });

    it('should have the property suggestedTerms (base name: "suggested_terms")', function() {
      // uncomment below and update the code to test the property suggestedTerms
      //var instane = new ShopApi.Suggestion();
      //expect(instance).to.be();
    });

  });

}));
