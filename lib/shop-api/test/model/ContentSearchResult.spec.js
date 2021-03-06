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
    instance = new ShopApi.ContentSearchResult();
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

  describe('ContentSearchResult', function() {
    it('should create an instance of ContentSearchResult', function() {
      // uncomment below and update the code to test ContentSearchResult
      //var instane = new ShopApi.ContentSearchResult();
      //expect(instance).to.be.a(ShopApi.ContentSearchResult);
    });

    it('should have the property count (base name: "count")', function() {
      // uncomment below and update the code to test the property count
      //var instane = new ShopApi.ContentSearchResult();
      //expect(instance).to.be();
    });

    it('should have the property data (base name: "data")', function() {
      // uncomment below and update the code to test the property data
      //var instane = new ShopApi.ContentSearchResult();
      //expect(instance).to.be();
    });

    it('should have the property hits (base name: "hits")', function() {
      // uncomment below and update the code to test the property hits
      //var instane = new ShopApi.ContentSearchResult();
      //expect(instance).to.be();
    });

    it('should have the property next (base name: "next")', function() {
      // uncomment below and update the code to test the property next
      //var instane = new ShopApi.ContentSearchResult();
      //expect(instance).to.be();
    });

    it('should have the property previous (base name: "previous")', function() {
      // uncomment below and update the code to test the property previous
      //var instane = new ShopApi.ContentSearchResult();
      //expect(instance).to.be();
    });

    it('should have the property query (base name: "query")', function() {
      // uncomment below and update the code to test the property query
      //var instane = new ShopApi.ContentSearchResult();
      //expect(instance).to.be();
    });

    it('should have the property refinements (base name: "refinements")', function() {
      // uncomment below and update the code to test the property refinements
      //var instane = new ShopApi.ContentSearchResult();
      //expect(instance).to.be();
    });

    it('should have the property selectedRefinements (base name: "selected_refinements")', function() {
      // uncomment below and update the code to test the property selectedRefinements
      //var instane = new ShopApi.ContentSearchResult();
      //expect(instance).to.be();
    });

    it('should have the property start (base name: "start")', function() {
      // uncomment below and update the code to test the property start
      //var instane = new ShopApi.ContentSearchResult();
      //expect(instance).to.be();
    });

    it('should have the property total (base name: "total")', function() {
      // uncomment below and update the code to test the property total
      //var instane = new ShopApi.ContentSearchResult();
      //expect(instance).to.be();
    });

  });

}));
