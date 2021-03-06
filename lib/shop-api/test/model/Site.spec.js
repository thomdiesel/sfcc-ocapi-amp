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
    instance = new ShopApi.Site();
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

  describe('Site', function() {
    it('should create an instance of Site', function() {
      // uncomment below and update the code to test Site
      //var instane = new ShopApi.Site();
      //expect(instance).to.be.a(ShopApi.Site);
    });

    it('should have the property allowedCurrencies (base name: "allowed_currencies")', function() {
      // uncomment below and update the code to test the property allowedCurrencies
      //var instane = new ShopApi.Site();
      //expect(instance).to.be();
    });

    it('should have the property allowedLocales (base name: "allowed_locales")', function() {
      // uncomment below and update the code to test the property allowedLocales
      //var instane = new ShopApi.Site();
      //expect(instance).to.be();
    });

    it('should have the property defaultCurrency (base name: "default_currency")', function() {
      // uncomment below and update the code to test the property defaultCurrency
      //var instane = new ShopApi.Site();
      //expect(instance).to.be();
    });

    it('should have the property defaultLocale (base name: "default_locale")', function() {
      // uncomment below and update the code to test the property defaultLocale
      //var instane = new ShopApi.Site();
      //expect(instance).to.be();
    });

    it('should have the property httpDisBaseUrl (base name: "http_dis_base_url")', function() {
      // uncomment below and update the code to test the property httpDisBaseUrl
      //var instane = new ShopApi.Site();
      //expect(instance).to.be();
    });

    it('should have the property httpHostname (base name: "http_hostname")', function() {
      // uncomment below and update the code to test the property httpHostname
      //var instane = new ShopApi.Site();
      //expect(instance).to.be();
    });

    it('should have the property httpLibraryContentUrl (base name: "http_library_content_url")', function() {
      // uncomment below and update the code to test the property httpLibraryContentUrl
      //var instane = new ShopApi.Site();
      //expect(instance).to.be();
    });

    it('should have the property httpSiteContentUrl (base name: "http_site_content_url")', function() {
      // uncomment below and update the code to test the property httpSiteContentUrl
      //var instane = new ShopApi.Site();
      //expect(instance).to.be();
    });

    it('should have the property httpsDisBaseUrl (base name: "https_dis_base_url")', function() {
      // uncomment below and update the code to test the property httpsDisBaseUrl
      //var instane = new ShopApi.Site();
      //expect(instance).to.be();
    });

    it('should have the property httpsHostname (base name: "https_hostname")', function() {
      // uncomment below and update the code to test the property httpsHostname
      //var instane = new ShopApi.Site();
      //expect(instance).to.be();
    });

    it('should have the property httpsLibraryContentUrl (base name: "https_library_content_url")', function() {
      // uncomment below and update the code to test the property httpsLibraryContentUrl
      //var instane = new ShopApi.Site();
      //expect(instance).to.be();
    });

    it('should have the property httpsSiteContentUrl (base name: "https_site_content_url")', function() {
      // uncomment below and update the code to test the property httpsSiteContentUrl
      //var instane = new ShopApi.Site();
      //expect(instance).to.be();
    });

    it('should have the property id (base name: "id")', function() {
      // uncomment below and update the code to test the property id
      //var instane = new ShopApi.Site();
      //expect(instance).to.be();
    });

    it('should have the property name (base name: "name")', function() {
      // uncomment below and update the code to test the property name
      //var instane = new ShopApi.Site();
      //expect(instance).to.be();
    });

    it('should have the property status (base name: "status")', function() {
      // uncomment below and update the code to test the property status
      //var instane = new ShopApi.Site();
      //expect(instance).to.be();
    });

    it('should have the property timezone (base name: "timezone")', function() {
      // uncomment below and update the code to test the property timezone
      //var instane = new ShopApi.Site();
      //expect(instance).to.be();
    });

    it('should have the property timezoneOffset (base name: "timezone_offset")', function() {
      // uncomment below and update the code to test the property timezoneOffset
      //var instane = new ShopApi.Site();
      //expect(instance).to.be();
    });

  });

}));
