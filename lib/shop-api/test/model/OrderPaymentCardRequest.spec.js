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
    instance = new ShopApi.OrderPaymentCardRequest();
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

  describe('OrderPaymentCardRequest', function() {
    it('should create an instance of OrderPaymentCardRequest', function() {
      // uncomment below and update the code to test OrderPaymentCardRequest
      //var instane = new ShopApi.OrderPaymentCardRequest();
      //expect(instance).to.be.a(ShopApi.OrderPaymentCardRequest);
    });

    it('should have the property cardType (base name: "card_type")', function() {
      // uncomment below and update the code to test the property cardType
      //var instane = new ShopApi.OrderPaymentCardRequest();
      //expect(instance).to.be();
    });

    it('should have the property creditCardToken (base name: "credit_card_token")', function() {
      // uncomment below and update the code to test the property creditCardToken
      //var instane = new ShopApi.OrderPaymentCardRequest();
      //expect(instance).to.be();
    });

    it('should have the property expirationMonth (base name: "expiration_month")', function() {
      // uncomment below and update the code to test the property expirationMonth
      //var instane = new ShopApi.OrderPaymentCardRequest();
      //expect(instance).to.be();
    });

    it('should have the property expirationYear (base name: "expiration_year")', function() {
      // uncomment below and update the code to test the property expirationYear
      //var instane = new ShopApi.OrderPaymentCardRequest();
      //expect(instance).to.be();
    });

    it('should have the property holder (base name: "holder")', function() {
      // uncomment below and update the code to test the property holder
      //var instane = new ShopApi.OrderPaymentCardRequest();
      //expect(instance).to.be();
    });

    it('should have the property issueNumber (base name: "issue_number")', function() {
      // uncomment below and update the code to test the property issueNumber
      //var instane = new ShopApi.OrderPaymentCardRequest();
      //expect(instance).to.be();
    });

    it('should have the property _number (base name: "number")', function() {
      // uncomment below and update the code to test the property _number
      //var instane = new ShopApi.OrderPaymentCardRequest();
      //expect(instance).to.be();
    });

    it('should have the property securityCode (base name: "security_code")', function() {
      // uncomment below and update the code to test the property securityCode
      //var instane = new ShopApi.OrderPaymentCardRequest();
      //expect(instance).to.be();
    });

    it('should have the property validFromMonth (base name: "valid_from_month")', function() {
      // uncomment below and update the code to test the property validFromMonth
      //var instane = new ShopApi.OrderPaymentCardRequest();
      //expect(instance).to.be();
    });

    it('should have the property validFromYear (base name: "valid_from_year")', function() {
      // uncomment below and update the code to test the property validFromYear
      //var instane = new ShopApi.OrderPaymentCardRequest();
      //expect(instance).to.be();
    });

  });

}));
