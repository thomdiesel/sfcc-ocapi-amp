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
    instance = new ShopApi.OrderAddress();
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

  describe('OrderAddress', function() {
    it('should create an instance of OrderAddress', function() {
      // uncomment below and update the code to test OrderAddress
      //var instane = new ShopApi.OrderAddress();
      //expect(instance).to.be.a(ShopApi.OrderAddress);
    });

    it('should have the property address1 (base name: "address1")', function() {
      // uncomment below and update the code to test the property address1
      //var instane = new ShopApi.OrderAddress();
      //expect(instance).to.be();
    });

    it('should have the property address2 (base name: "address2")', function() {
      // uncomment below and update the code to test the property address2
      //var instane = new ShopApi.OrderAddress();
      //expect(instance).to.be();
    });

    it('should have the property city (base name: "city")', function() {
      // uncomment below and update the code to test the property city
      //var instane = new ShopApi.OrderAddress();
      //expect(instance).to.be();
    });

    it('should have the property companyName (base name: "company_name")', function() {
      // uncomment below and update the code to test the property companyName
      //var instane = new ShopApi.OrderAddress();
      //expect(instance).to.be();
    });

    it('should have the property countryCode (base name: "country_code")', function() {
      // uncomment below and update the code to test the property countryCode
      //var instane = new ShopApi.OrderAddress();
      //expect(instance).to.be();
    });

    it('should have the property firstName (base name: "first_name")', function() {
      // uncomment below and update the code to test the property firstName
      //var instane = new ShopApi.OrderAddress();
      //expect(instance).to.be();
    });

    it('should have the property fullName (base name: "full_name")', function() {
      // uncomment below and update the code to test the property fullName
      //var instane = new ShopApi.OrderAddress();
      //expect(instance).to.be();
    });

    it('should have the property id (base name: "id")', function() {
      // uncomment below and update the code to test the property id
      //var instane = new ShopApi.OrderAddress();
      //expect(instance).to.be();
    });

    it('should have the property jobTitle (base name: "job_title")', function() {
      // uncomment below and update the code to test the property jobTitle
      //var instane = new ShopApi.OrderAddress();
      //expect(instance).to.be();
    });

    it('should have the property lastName (base name: "last_name")', function() {
      // uncomment below and update the code to test the property lastName
      //var instane = new ShopApi.OrderAddress();
      //expect(instance).to.be();
    });

    it('should have the property phone (base name: "phone")', function() {
      // uncomment below and update the code to test the property phone
      //var instane = new ShopApi.OrderAddress();
      //expect(instance).to.be();
    });

    it('should have the property postBox (base name: "post_box")', function() {
      // uncomment below and update the code to test the property postBox
      //var instane = new ShopApi.OrderAddress();
      //expect(instance).to.be();
    });

    it('should have the property postalCode (base name: "postal_code")', function() {
      // uncomment below and update the code to test the property postalCode
      //var instane = new ShopApi.OrderAddress();
      //expect(instance).to.be();
    });

    it('should have the property salutation (base name: "salutation")', function() {
      // uncomment below and update the code to test the property salutation
      //var instane = new ShopApi.OrderAddress();
      //expect(instance).to.be();
    });

    it('should have the property secondName (base name: "second_name")', function() {
      // uncomment below and update the code to test the property secondName
      //var instane = new ShopApi.OrderAddress();
      //expect(instance).to.be();
    });

    it('should have the property stateCode (base name: "state_code")', function() {
      // uncomment below and update the code to test the property stateCode
      //var instane = new ShopApi.OrderAddress();
      //expect(instance).to.be();
    });

    it('should have the property suffix (base name: "suffix")', function() {
      // uncomment below and update the code to test the property suffix
      //var instane = new ShopApi.OrderAddress();
      //expect(instance).to.be();
    });

    it('should have the property suite (base name: "suite")', function() {
      // uncomment below and update the code to test the property suite
      //var instane = new ShopApi.OrderAddress();
      //expect(instance).to.be();
    });

    it('should have the property title (base name: "title")', function() {
      // uncomment below and update the code to test the property title
      //var instane = new ShopApi.OrderAddress();
      //expect(instance).to.be();
    });

  });

}));
