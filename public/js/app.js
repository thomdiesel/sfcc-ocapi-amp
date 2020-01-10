$(function(){
  new Workspace();
  Backbone.history.start({pushState: true});
});;var Workspace = Backbone.Router.extend({
  routes: {
    "something": "help"
  },
  help: function() {
    console.log('help is here!');
  }
});;/* globals window */

if ((!this.module || !this.module._exports || !this._exports) && this.window) {
  _exports = this.window.AppHelpers = {};
} else {
  _exports = exports;
}

(function (_exports){
  var VIEW_TYPES = {
    swatch: 'swatch',
    small: 'small',
    medium: 'medium',
    large: 'large'
  };

  var SWATCH_ATTRIBUTE_ID = 'color';

  function getRoot(args) {
    var context = args[args.length-1];
    return context.data.root;
  }

  function getProductImageGroup(product, viewType, variationValue) {
    var imageGroup;
    var matchGroup;
    var variationAttribute;
    var value;
    var i, ii, j, jj, k, kk;

    for (i=0, ii=product.image_groups.length; i<ii; i++) {
      imageGroup = product.image_groups[i];
      if (imageGroup.view_type === viewType) {
        if (!variationValue && !imageGroup.variation_attributes) {
          matchGroup = imageGroup;
          break;
        } else if (variationValue && imageGroup.variation_attributes) {
          // Loop through variation_attributes & values to match up
          for (j=0, jj=imageGroup.variation_attributes.length; j<jj; j++) {
            variationAttribute = imageGroup.variation_attributes[j];
            if (variationAttribute.id === SWATCH_ATTRIBUTE_ID) {
              for (k=0, kk=variationAttribute.values.length; k<kk; k++) {
                value = variationAttribute.values[k];
                if (value.value === variationValue) {
                  matchGroup = imageGroup;
                  break;
                }
              }
            }
          }
          if (matchGroup) break;
        }
        if (matchGroup) break;
      }
    }

    return matchGroup;
  }

  function getProductImageUrl(product, viewType, variationValue, index) {
    var safeIndex = arguments.length > 4 ? index : 0;
    var safeVariationValue = arguments.length > 3 ? variationValue : null;
    var matchGroup = getProductImageGroup(product, viewType, safeVariationValue);
    var imageUrl;

    if (matchGroup) {
      imageUrl = matchGroup.images[index].link;
    }

    return imageUrl;
  }

  _exports.toJSON = function (obj) {
    return JSON.stringify(obj);
  };
  _exports.containerClass = function () {
    return getRoot(arguments).app.containerClass;
  };
  _exports.loginUrl = function () {
    return '/login?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.logoutUrl = function () {
    return '/logout?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.registerUrl = function () {
    return '/register?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.forgotUrl = function () {
    return '/forgot?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.cartUrl = function () {
    return '/cart?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.categoryUrl = function (categoryId) {
    return '/category/' + categoryId + '?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.checkoutUrl = function () {
    return '/checkout?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.contentUrl = function (contentId) {
    return '/content/' + contentId + '?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.folderUrl = function (folderId) {
    return '/folder/' + folderId + '?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.homeUrl = function () {
    return '/?lang=' + getRoot(arguments).app.site.default_locale;
  };

  // Product Helpers
  _exports.productUrl = function (productId) {
    return '/product/' + productId + '?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.staticImageUrl = function(imageName) {
    return '//' + getRoot(arguments).app.site.http_hostname + '/on/demandware.static/Sites-' + getRoot(arguments).app.site.id + '-Site/-/default/dw03ab80fc/images/' + imageName;
  };
  _exports.swatchImageUrl = function (product, variationValue, index) {
    // Look through image_groups to find appropriate
    return getProductImageUrl(product, VIEW_TYPES.swatch, variationValue, index || 0);
  };
  _exports.largeImageUrl = function (product, variationValue, index) {
    // Look through image_groups to find appropriate
    return getProductImageUrl(product, VIEW_TYPES.large, variationValue, index || 0);
  };
  _exports.mediumImageUrl = function (product, variationValue, index) {
    // Look through image_groups to find appropriate
    return getProductImageUrl(product, VIEW_TYPES.medium, variationValue, index || 0);
  };
  _exports.smallImageUrl = function (product, variationValue, index) {
    // Look through image_groups to find appropriate
    return getProductImageUrl(product, VIEW_TYPES.small, variationValue, index || 0);
  };
  _exports.swatchImages = function (product, variationValue) {
    // Look through image_groups to find appropriate
    var imageGroup = getProductImageGroup(product, VIEW_TYPES.swatch, variationValue);

    return imageGroup ? imageGroup.images : [];
  };
  _exports.largeImages = function (product, variationValue) {
    // Look through image_groups to find appropriate
    var imageGroup =  getProductImageUrl(product, VIEW_TYPES.large, variationValue);

    return imageGroup ? imageGroup.images : [];
  };
  _exports.mediumImages = function (product, variationValue) {
    // Look through image_groups to find appropriate
    var imageGroup =  getProductImageUrl(product, VIEW_TYPES.medium, variationValue);

    return imageGroup ? imageGroup.images : [];
  };
  _exports.smallImages = function (product, variationValue) {
    // Look through image_groups to find appropriate
    var imageGroup =  getProductImageUrl(product, VIEW_TYPES.small, variationValue);

    return imageGroup ? imageGroup.images : [];
  };

  _exports.productBreadcrumb = function (categoryId, ctx) {
    var product = getRoot(arguments).product;
    var cats = getRoot(arguments).app.allCategories;
    var catPath = [];
    var safeCategoryId;
    var safeCtx;
    var parentId;

    if (arguments.length > 1) {
      safeCategoryId = categoryId;
      safeCtx = ctx;
    } else {
      safeCategoryId = product.primary_category_id;
      safeCtx = categoryId;
    }

    var cat = cats[safeCategoryId];
    while (cat) {
      catPath.push(cat);
      parentId = cat.parent_category_id;
      cat = cats[parentId];
    }
    catPath = catPath.reverse();
    catPath.shift();

    // Loop through categories on @root.categories and traverse until you find the right
    var outString = '<ol class="breadcrumb">';
    catPath.forEach(function (aCat) {
      outString += '<li class="breadcrumb-item">';
      outString += '<a href="' + _exports.categoryUrl(aCat.id, safeCtx) + '">';
      outString += aCat.name;
      outString += '</a>';
      outString += '</li>';
    });
    outString += '</ol>';

    return outString;
  };
  _exports.categoryBreadcrumb = function (ctx) {
    var category = getRoot(arguments).category;
    var cats = getRoot(arguments).app.allCategories;
    var catPath = [];
    var parentId;

    var cat = category;
    while (cat) {
      catPath.push(cat);
      parentId = cat.parent_category_id;
      cat = cats[parentId];
    }
    catPath = catPath.reverse();
    catPath.shift();

    // Loop through categories on @root.categories and traverse until you find the right
    var outString = '<ol class="breadcrumb">';

    catPath.forEach(function (aCat) {
      outString += '<li class="breadcrumb-item">';
      if (aCat.id !== category.id) outString += '<a href="' + _exports.categoryUrl(aCat.id, ctx) + '">';
      outString += aCat.name;
      if (aCat.id !== category.id) outString += '</a>';
      outString += '</li>';
    });
    outString += '</ol>';

    return outString;
  };

  // Product Search Helpers

  _exports.productSearchUrl = function (params) {
    var baseUrl = '/productSearch?lang=' + getRoot(arguments).app.site.default_locale;
    var safeParams = params || {};
    var queryString = '';
    Object.keys(safeParams).forEach(function (k) {
      queryString += '&' + k + '=' + safeParams[k];
    });
    return baseUrl + queryString;
  };

  _exports.clearAllRefinementValuesUrl = function () {
    // look up current url w/ new refinement value
    var baseUrl = '/productSearch?lang=' + getRoot(arguments).app.site.default_locale;

    const search = getRoot(arguments).search;
    const q = search.query;
    const sort = search.selected_sorting_option || search.sorting_options[0].id;

    baseUrl += '&q=' + q + '&sort=' + sort + '&refine=cgid=root';

    return baseUrl;
  };

  _exports.toggleRefinementValueUrl = function (refinement, value) {
    // look up current url w/ new refinement value
    var baseUrl = '/productSearch';

    const search = getRoot(arguments).search;
    const q = search.query;
    const sort = search.selected_sorting_option || search.sorting_options[0].id;

    baseUrl += '?q=' + q;

    // Make a clone so as not to overwrite the productSearch itself
    const refinements = Object.assign({}, search.selected_refinements);
    const existingValue = refinements[refinement.attribute_id];

    if (refinement.attribute_id === 'cgid' || refinement.attribute_id === 'price') {
      if (existingValue === value) {
        refinements[refinement.attribute_id] = undefined;
      } else {
        refinements[refinement.attribute_id] = value;
      }
    } else if (existingValue) {
      const parts = existingValue.split('|');
      const index = parts.indexOf(value);
      if (index > -1) {
        parts.splice(index, 1);
      } else {
        parts.push(value);
      }
      if (parts.length > 0) {
        refinements[refinement.attribute_id] = parts.join('|');
      } else {
        refinements[refinement.attribute_id] = undefined;
      }
    } else {
      refinements[refinement.attribute_id] = value;
    }

    var i = 1;
    Object.keys(refinements).forEach(function (key) {
      const val = refinements[key];

      if (val) {
        baseUrl += '&refine_' + i + '=' + key + '=' + val;
        i++;
      }
    });

    baseUrl += '&sort=' + sort + '&lang=' + getRoot(arguments).app.site.default_locale;

    return baseUrl;
  };

  _exports.productSearchSortingUrl = function (sort) {
    // look up current url w/ new sorting option
    var baseUrl = '/productSearch';

    const search = getRoot(arguments).search;
    const q = search.query;

    baseUrl += '?q=' + q;

    const refinements = search.selected_refinements || {};

    var i = 1;
    Object.keys(refinements).forEach(function (key) {
      const val = refinements[key];

      if (val) {
        baseUrl += '&refine_' + i + '=' + key + '=' + val;
        i++;
      }
    });

    baseUrl += '&sort=' + sort + '&lang=' + getRoot(arguments).app.site.default_locale;

    return baseUrl;
  };

  _exports.isSortedBy = function (value, yesValue, noValue) {
    const search = getRoot(arguments).search;
    const selectedOption = search.selected_sorting_option || search.sorting_options[0].id;
    var safeNoValue = noValue;

    if (arguments.length === 3) {
      safeNoValue = '';
    }

    return (selectedOption === value) ? yesValue : safeNoValue;
  };

  _exports.isRefinedByAttributeValue = function (refinement, value, yesValue, noValue) {
    const search = getRoot(arguments).search;
    const refinements = search.selected_refinements || {};
    const values = refinements[refinement.attribute_id];
    var safeNoValue = noValue;
    var isRefined = false;

    // There is always a hidden last parameter ... 4 means only 3 were given
    if (arguments.length === 4) {
      safeNoValue = '';
    }

    if (values) {
      const parts = values.split('|');
      if (parts.indexOf(value) > -1) {
        isRefined = true;
      }
    }

    return isRefined ? yesValue : safeNoValue;
  };

  _exports.storesUrl = function () {
    return '/stores?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.accountUrl = function () {
    return '/account?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.profileUrl = function () {
    return '/account/profile?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.orderHistoryUrl = function () {
    return '/account/orders?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.accountOrderUrl = function (orderToken) {
    return '/account/order/' + orderToken + '?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.addressBookUrl = function () {
    return '/account/address-book?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.walletUrl = function () {
    return '/account/wallet?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.accountWishlistUrl = function () {
    return '/account/wishlist?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.accountRegistryUrl = function () {
    return '/account/gift-registry?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.ordersUrl = function () {
    return '/orders?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.orderUrl = function (orderToken) {
    return '/order/' + orderToken + '?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.wishlistSearchUrl = function () {
    return '/wishlists?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.wishlistUrl = function (wishlistToken) {
    return '/wishlist/' + wishlistToken + '?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.registrySearchUrl = function () {
    return '/gift-registries?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.registryUrl = function (registryToken) {
    return '/gift-registry/' + registryToken + '?lang=' + getRoot(arguments).app.site.default_locale;
  };

  _exports.contentSearchUrl = function (params) {
    var baseUrl = '/contentSearch?lang=' + getRoot(arguments).app.site.default_locale;
    const safeParams = params || {};
    var queryString = '';
    Object.keys(safeParams).forEach(function (k) {
      queryString += '' + k + '=' + safeParams[k];
    });
    if (queryString.length > 0) {
      baseUrl += '?' + queryString.join('&');
    }
    return baseUrl;
  };

  _exports.staticLibraryUrl = function (path) {
    return getRoot(arguments).app.site.http_library_content_url + path;
  };
  _exports.staticSharedLibraryUrl = function(path) {
    return '//' + getRoot(arguments).app.site.http_hostname + '/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dw9056bf0f' + path;
  };
  _exports.staticSiteUrl = function (path) {
    return getRoot(arguments).app.site.http_library_content_url + path;
  };
  _exports.staticCatalogUrl = function (path) {
    return '//' + getRoot(arguments).app.site.http_hostname + '/on/demandware.static/-/Sites-apparel-catalog/default/dw9056bf0f' + path;
  };

  _exports.paymentType = function (method) {
    var payType;
    switch(method) {
      case 'CREDIT_CARD':
        payType = 'Credit Card';
        break;
      default:
        payType = 'Alt Payment';
    }
    return payType;
  };

  _exports.registerHelpers = function (hbs) {
    Object.keys(_exports).forEach(function (key) {
      if (key !== 'registerHelpers') {
        hbs.registerHelper(key, _exports[key]);
      }
    });
  };
})(_exports);
;/**
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
    // AMD. Register as an anonymous module.
    define(['superagent'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('superagent'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ApiClient = factory(root.superagent);
  }
}(this, function(superagent) {
  'use strict';

  /**
   * @module ApiClient
   * @version 17.3
   */

  /**
   * Manages low level client-server communications, parameter marshalling, etc. There should not be any need for an
   * application to use this class directly - the *Api and model classes provide the public API for the service. The
   * contents of this file should be regarded as internal but are documented for completeness.
   * @alias module:ApiClient
   * @class
   */
  var exports = function() {
    /**
     * The base URL against which to resolve every API call's (relative) path.
     * @type {String}
     * @default https://--sandbox-environment--/s/--siteid--/dw/shop/v17_3
     */
    this.basePath = 'https://' + superagent.root.site.http_hostname + '/s/' + superagent.root.site.id + '/dw/shop/v17_3'.replace(/\/+$/, '');

    /**
     * The authentication methods to be included for all API calls.
     * @type {Array.<String>}
     */
    this.authentications = {
      'client_id': {type: 'apiKey', 'in': 'header', name: 'x-dw-client-id'},
      'customers_auth': {type: 'basic'},
      'oauth2_application': {type: 'oauth2'}
    };
    /**
     * The default HTTP headers to be included for all API calls.
     * @type {Array.<String>}
     * @default {}
     */
    this.defaultHeaders = {};

    /**
     * The default HTTP timeout for all API calls.
     * @type {Number}
     * @default 60000
     */
    this.timeout = 60000;

    /**
     * If set to false an additional timestamp parameter is added to all API GET calls to
     * prevent browser caching
     * @type {Boolean}
     * @default true
     */
    this.cache = true;
  };

  /**
   * Returns a string representation for an actual parameter.
   * @param param The actual parameter.
   * @returns {String} The string representation of <code>param</code>.
   */
  exports.prototype.paramToString = function(param) {
    if (param == undefined || param == null) {
      return '';
    }
    if (param instanceof Date) {
      return param.toJSON();
    }
    return param.toString();
  };

  /**
   * Builds full URL by appending the given path to the base URL and replacing path parameter place-holders with parameter values.
   * NOTE: query parameters are not handled here.
   * @param {String} path The path to append to the base URL.
   * @param {Object} pathParams The parameter values to append.
   * @returns {String} The encoded path with parameter values substituted.
   */
  exports.prototype.buildUrl = function(path, pathParams) {
    if (!path.match(/^\//)) {
      path = '/' + path;
    }
    var url = this.basePath + path;
    var _this = this;
    url = url.replace(/\{([\w-]+)\}/g, function(fullMatch, key) {
      var value;
      if (pathParams.hasOwnProperty(key)) {
        value = _this.paramToString(pathParams[key]);
      } else {
        value = fullMatch;
      }
      return encodeURIComponent(value);
    });
    return url;
  };

  /**
   * Checks whether the given content type represents JSON.<br>
   * JSON content type examples:<br>
   * <ul>
   * <li>application/json</li>
   * <li>application/json; charset=UTF8</li>
   * <li>APPLICATION/JSON</li>
   * </ul>
   * @param {String} contentType The MIME content type to check.
   * @returns {Boolean} <code>true</code> if <code>contentType</code> represents JSON, otherwise <code>false</code>.
   */
  exports.prototype.isJsonMime = function(contentType) {
    return Boolean(contentType != null && contentType.match(/^application\/json(;.*)?$/i));
  };

  /**
   * Chooses a content type from the given array, with JSON preferred; i.e. return JSON if included, otherwise return the first.
   * @param {Array.<String>} contentTypes
   * @returns {String} The chosen content type, preferring JSON.
   */
  exports.prototype.jsonPreferredMime = function(contentTypes) {
    for (var i = 0; i < contentTypes.length; i++) {
      if (this.isJsonMime(contentTypes[i])) {
        return contentTypes[i];
      }
    }
    return contentTypes[0];
  };

  /**
   * Checks whether the given parameter value represents file-like content.
   * @param param The parameter to check.
   * @returns {Boolean} <code>true</code> if <code>param</code> represents a file.
   */
  exports.prototype.isFileParam = function(param) {
    // fs.ReadStream in Node.js (but not in runtime like browserify)
    if (typeof window === 'undefined' &&
        typeof require === 'function' &&
        require('fs') &&
        param instanceof require('fs').ReadStream) {
      return true;
    }
    // Buffer in Node.js
    if (typeof Buffer === 'function' && param instanceof Buffer) {
      return true;
    }
    // Blob in browser
    if (typeof Blob === 'function' && param instanceof Blob) {
      return true;
    }
    // File in browser (it seems File object is also instance of Blob, but keep this for safe)
    if (typeof File === 'function' && param instanceof File) {
      return true;
    }
    return false;
  };

  /**
   * Normalizes parameter values:
   * <ul>
   * <li>remove nils</li>
   * <li>keep files and arrays</li>
   * <li>format to string with `paramToString` for other cases</li>
   * </ul>
   * @param {Object.<String, Object>} params The parameters as object properties.
   * @returns {Object.<String, Object>} normalized parameters.
   */
  exports.prototype.normalizeParams = function(params) {
    var newParams = {};
    for (var key in params) {
      if (params.hasOwnProperty(key) && params[key] != undefined && params[key] != null) {
        var value = params[key];
        if (this.isFileParam(value) || Array.isArray(value)) {
          newParams[key] = value;
        } else {
          newParams[key] = this.paramToString(value);
        }
      }
    }
    return newParams;
  };

  /**
   * Enumeration of collection format separator strategies.
   * @enum {String}
   * @readonly
   */
  exports.CollectionFormatEnum = {
    /**
     * Comma-separated values. Value: <code>csv</code>
     * @const
     */
    CSV: ',',
    /**
     * Space-separated values. Value: <code>ssv</code>
     * @const
     */
    SSV: ' ',
    /**
     * Tab-separated values. Value: <code>tsv</code>
     * @const
     */
    TSV: '\t',
    /**
     * Pipe(|)-separated values. Value: <code>pipes</code>
     * @const
     */
    PIPES: '|',
    /**
     * Native array. Value: <code>multi</code>
     * @const
     */
    MULTI: 'multi'
  };

  /**
   * Builds a string representation of an array-type actual parameter, according to the given collection format.
   * @param {Array} param An array parameter.
   * @param {module:ApiClient.CollectionFormatEnum} collectionFormat The array element separator strategy.
   * @returns {String|Array} A string representation of the supplied collection, using the specified delimiter. Returns
   * <code>param</code> as is if <code>collectionFormat</code> is <code>multi</code>.
   */
  exports.prototype.buildCollectionParam = function buildCollectionParam(param, collectionFormat) {
    if (param == null) {
      return null;
    }
    switch (collectionFormat) {
      case 'csv':
        return param.map(this.paramToString).join(',');
      case 'ssv':
        return param.map(this.paramToString).join(' ');
      case 'tsv':
        return param.map(this.paramToString).join('\t');
      case 'pipes':
        return param.map(this.paramToString).join('|');
      case 'multi':
        // return the array directly as SuperAgent will handle it as expected
        return param.map(this.paramToString);
      default:
        throw new Error('Unknown collection format: ' + collectionFormat);
    }
  };

  /**
   * Applies authentication headers to the request.
   * @param {Object} request The request object created by a <code>superagent()</code> call.
   * @param {Array.<String>} authNames An array of authentication method names.
   */
  exports.prototype.applyAuthToRequest = function(request, authNames) {
    var _this = this;
    authNames.forEach(function(authName) {
      var auth = _this.authentications[authName];
      switch (auth.type) {
        case 'basic':
          if (auth.username || auth.password) {
            request.auth(auth.username || '', auth.password || '');
          }
          break;
        case 'apiKey':
          if (auth.apiKey) {
            var data = {};
            if (auth.apiKeyPrefix) {
              data[auth.name] = auth.apiKeyPrefix + ' ' + auth.apiKey;
            } else {
              data[auth.name] = auth.apiKey;
            }
            if (auth['in'] === 'header') {
              request.set(data);
            } else {
              request.query(data);
            }
          }
          break;
        case 'oauth2':
          if (auth.accessToken) {
            request.set({'Authorization': 'Bearer ' + auth.accessToken});
          }
          break;
        default:
          throw new Error('Unknown authentication type: ' + auth.type);
      }
    });
  };

  /**
   * Deserializes an HTTP response body into a value of the specified type.
   * @param {Object} response A SuperAgent response object.
   * @param {(String|Array.<String>|Object.<String, Object>|Function)} returnType The type to return. Pass a string for simple types
   * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
   * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
   * all properties on <code>data<code> will be converted to this type.
   * @returns A value of the specified type.
   */
  exports.prototype.deserialize = function deserialize(response, returnType) {
    if (response == null || returnType == null || response.status == 204) {
      return null;
    }
    // Rely on SuperAgent for parsing response body.
    // See http://visionmedia.github.io/superagent/#parsing-response-bodies
    var data = response.body;
    if (data == null || (typeof data === 'object' && typeof data.length === 'undefined' && !Object.keys(data).length)) {
      // SuperAgent does not always produce a body; use the unparsed response as a fallback
      data = response.text;
    }
    return exports.convertToType(data, returnType);
  };

  /**
   * Callback function to receive the result of the operation.
   * @callback module:ApiClient~callApiCallback
   * @param {String} error Error message, if any.
   * @param data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Invokes the REST service using the supplied settings and parameters.
   * @param {String} path The base URL to invoke.
   * @param {String} httpMethod The HTTP method to use.
   * @param {Object.<String, String>} pathParams A map of path parameters and their values.
   * @param {Object.<String, Object>} queryParams A map of query parameters and their values.
   * @param {Object.<String, Object>} headerParams A map of header parameters and their values.
   * @param {Object.<String, Object>} formParams A map of form parameters and their values.
   * @param {Object} bodyParam The value to pass as the request body.
   * @param {Array.<String>} authNames An array of authentication type names.
   * @param {Array.<String>} contentTypes An array of request MIME types.
   * @param {Array.<String>} accepts An array of acceptable response MIME types.
   * @param {(String|Array|ObjectFunction)} returnType The required type to return; can be a string for simple types or the
   * constructor for a complex type.
   * @param {module:ApiClient~callApiCallback} callback The callback function.
   * @returns {Object} The SuperAgent request object.
   */
  exports.prototype.callApi = function callApi(path, httpMethod, pathParams,
      queryParams, headerParams, formParams, bodyParam, authNames, contentTypes, accepts,
      returnType, callback) {

    var _this = this;
    var url = this.buildUrl(path, pathParams);
    var request = superagent(httpMethod, url);

    // apply authentications
    this.applyAuthToRequest(request, authNames);

    // set query parameters
    if (httpMethod.toUpperCase() === 'GET' && this.cache === false) {
        queryParams['_'] = new Date().getTime();
    }
    request.query(this.normalizeParams(queryParams));

    // set header parameters
    request.set(this.defaultHeaders).set(this.normalizeParams(headerParams));

    // set request timeout
    request.timeout(this.timeout);

    var contentType = this.jsonPreferredMime(contentTypes);
    if (contentType) {
      // Issue with superagent and multipart/form-data (https://github.com/visionmedia/superagent/issues/746)
      if(contentType != 'multipart/form-data') {
        request.type(contentType);
      }
    } else if (!request.header['Content-Type']) {
      request.type('application/json');
    }

    if (contentType === 'application/x-www-form-urlencoded') {
      request.send(this.normalizeParams(formParams));
    } else if (contentType == 'multipart/form-data') {
      var _formParams = this.normalizeParams(formParams);
      for (var key in _formParams) {
        if (_formParams.hasOwnProperty(key)) {
          if (this.isFileParam(_formParams[key])) {
            // file field
            request.attach(key, _formParams[key]);
          } else {
            request.field(key, _formParams[key]);
          }
        }
      }
    } else if (bodyParam) {
      request.send(bodyParam);
    }

    var accept = this.jsonPreferredMime(accepts);
    if (accept) {
      request.accept(accept);
    }


    request.end(function(error, response) {
      if (callback) {
        var data = null;
        if (!error) {
          try {
            data = _this.deserialize(response, returnType);
          } catch (err) {
            error = err;
          }
        }
        callback(error, data, response);
      }
    });

    return request;
  };

  /**
   * Parses an ISO-8601 string representation of a date value.
   * @param {String} str The date value as a string.
   * @returns {Date} The parsed date object.
   */
  exports.parseDate = function(str) {
    return new Date(str.replace(/T/i, ' '));
  };

  /**
   * Converts a value to the specified type.
   * @param {(String|Object)} data The data to convert, as a string or object.
   * @param {(String|Array.<String>|Object.<String, Object>|Function)} type The type to return. Pass a string for simple types
   * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
   * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
   * all properties on <code>data<code> will be converted to this type.
   * @returns An instance of the specified type.
   */
  exports.convertToType = function(data, type) {
    switch (type) {
      case 'Boolean':
        return Boolean(data);
      case 'Integer':
        return parseInt(data, 10);
      case 'Number':
        return parseFloat(data);
      case 'String':
        return String(data);
      case 'Date':
        return this.parseDate(String(data));
      default:
        if (type === Object) {
          // generic object, return directly
          return data;
        } else if (typeof type === 'function') {
          // for model type like: User
          return type.constructFromObject(data);
        } else if (Array.isArray(type)) {
          // for array type like: ['String']
          var itemType = type[0];
          return data.map(function(item) {
            return exports.convertToType(item, itemType);
          });
        } else if (typeof type === 'object') {
          // for plain object type like: {'String': 'Integer'}
          var keyType, valueType;
          for (var k in type) {
            if (type.hasOwnProperty(k)) {
              keyType = k;
              valueType = type[k];
              break;
            }
          }
          var result = {};
          for (var k in data) {
            if (data.hasOwnProperty(k)) {
              var key = exports.convertToType(k, keyType);
              var value = exports.convertToType(data[k], valueType);
              result[key] = value;
            }
          }
          return result;
        } else {
          // for unknown type, return the data directly
          return data;
        }
    }
  };

  /**
   * Constructs a new map or array model from REST data.
   * @param data {Object|Array} The REST data.
   * @param obj {Object|Array} The target object or array.
   */
  exports.constructFromObject = function(data, obj, itemType) {
    if (Array.isArray(data)) {
      for (var i = 0; i < data.length; i++) {
        if (data.hasOwnProperty(i))
          obj[i] = exports.convertToType(data[i], itemType);
      }
    } else {
      for (var k in data) {
        if (data.hasOwnProperty(k))
          obj[k] = exports.convertToType(data[k], itemType);
      }
    }
  };

  /**
   * The default API client implementation.
   * @type {module:ApiClient}
   */
  exports.instance = new exports();

  return exports;
}));
;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Basket', 'model/BasketPaymentInstrumentRequest', 'model/CouponItem', 'model/CustomerInfo', 'model/GiftCertificateItem', 'model/Note', 'model/NotesResult', 'model/OrderAddress', 'model/PaymentMethodResult', 'model/PriceAdjustmentRequest', 'model/ProductItem', 'model/Shipment', 'model/ShippingMethod', 'model/ShippingMethodResult'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/Basket'), require('../model/BasketPaymentInstrumentRequest'), require('../model/CouponItem'), require('../model/CustomerInfo'), require('../model/GiftCertificateItem'), require('../model/Note'), require('../model/NotesResult'), require('../model/OrderAddress'), require('../model/PaymentMethodResult'), require('../model/PriceAdjustmentRequest'), require('../model/ProductItem'), require('../model/Shipment'), require('../model/ShippingMethod'), require('../model/ShippingMethodResult'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.BasketsApi = factory(root.ShopApi.ApiClient, root.ShopApi.Basket, root.ShopApi.BasketPaymentInstrumentRequest, root.ShopApi.CouponItem, root.ShopApi.CustomerInfo, root.ShopApi.GiftCertificateItem, root.ShopApi.Note, root.ShopApi.NotesResult, root.ShopApi.OrderAddress, root.ShopApi.PaymentMethodResult, root.ShopApi.PriceAdjustmentRequest, root.ShopApi.ProductItem, root.ShopApi.Shipment, root.ShopApi.ShippingMethod, root.ShopApi.ShippingMethodResult);
  }
}(this, function(ApiClient, Basket, BasketPaymentInstrumentRequest, CouponItem, CustomerInfo, GiftCertificateItem, Note, NotesResult, OrderAddress, PaymentMethodResult, PriceAdjustmentRequest, ProductItem, Shipment, ShippingMethod, ShippingMethodResult) {
  'use strict';

  /**
   * Baskets service.
   * @module api/BasketsApi
   * @version 17.3
   */

  /**
   * Constructs a new BasketsApi. 
   * @alias module:api/BasketsApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the deleteBasketsByID operation.
     * @callback module:api/BasketsApi~deleteBasketsByIDCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Removes a basket.
     * @param {String} basketId the id of the basket to be retrieved
     * @param {module:api/BasketsApi~deleteBasketsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.deleteBasketsByID = function(basketId, callback) {
      var postBody = null;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling deleteBasketsByID");
      }


      var pathParams = {
        'basket_id': basketId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = null;

      return this.apiClient.callApi(
        '/baskets/{basket_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteBasketsByIDCouponsByID operation.
     * @callback module:api/BasketsApi~deleteBasketsByIDCouponsByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Basket} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Removes a coupon from the basket.
     * @param {String} basketId the id of the basket to be modified
     * @param {String} couponItemId the id of the coupon item to be removed
     * @param {module:api/BasketsApi~deleteBasketsByIDCouponsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Basket}
     */
    this.deleteBasketsByIDCouponsByID = function(basketId, couponItemId, callback) {
      var postBody = null;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling deleteBasketsByIDCouponsByID");
      }

      // verify the required parameter 'couponItemId' is set
      if (couponItemId == undefined || couponItemId == null) {
        throw new Error("Missing the required parameter 'couponItemId' when calling deleteBasketsByIDCouponsByID");
      }


      var pathParams = {
        'basket_id': basketId,
        'coupon_item_id': couponItemId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Basket;

      return this.apiClient.callApi(
        '/baskets/{basket_id}/coupons/{coupon_item_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteBasketsByIDGiftCertificateItemsByID operation.
     * @callback module:api/BasketsApi~deleteBasketsByIDGiftCertificateItemsByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Basket} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Deletes a gift certificate item from an existing basket.
     * @param {String} basketId the id of the basket to be modified
     * @param {String} GiftCertificateItemId the id of the gift certificate item to be removed
     * @param {module:api/BasketsApi~deleteBasketsByIDGiftCertificateItemsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Basket}
     */
    this.deleteBasketsByIDGiftCertificateItemsByID = function(basketId, GiftCertificateItemId, callback) {
      var postBody = null;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling deleteBasketsByIDGiftCertificateItemsByID");
      }

      // verify the required parameter 'GiftCertificateItemId' is set
      if (GiftCertificateItemId == undefined || GiftCertificateItemId == null) {
        throw new Error("Missing the required parameter 'GiftCertificateItemId' when calling deleteBasketsByIDGiftCertificateItemsByID");
      }


      var pathParams = {
        'basket_id': basketId,
        'gift_certificate_item_id': GiftCertificateItemId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Basket;

      return this.apiClient.callApi(
        '/baskets/{basket_id}/gift_certificate_items/{gift_certificate_item_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteBasketsByIDItemsByID operation.
     * @callback module:api/BasketsApi~deleteBasketsByIDItemsByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Basket} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Removes a product item from the basket.
     * @param {String} basketId the id of the basket to be modified
     * @param {String} itemId the id of the product item to be removed
     * @param {module:api/BasketsApi~deleteBasketsByIDItemsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Basket}
     */
    this.deleteBasketsByIDItemsByID = function(basketId, itemId, callback) {
      var postBody = null;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling deleteBasketsByIDItemsByID");
      }

      // verify the required parameter 'itemId' is set
      if (itemId == undefined || itemId == null) {
        throw new Error("Missing the required parameter 'itemId' when calling deleteBasketsByIDItemsByID");
      }


      var pathParams = {
        'basket_id': basketId,
        'item_id': itemId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Basket;

      return this.apiClient.callApi(
        '/baskets/{basket_id}/items/{item_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteBasketsByIDNotesByID operation.
     * @callback module:api/BasketsApi~deleteBasketsByIDNotesByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Basket} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Removes a basket note.
     * @param {String} basketId the id of the basket to be modified
     * @param {String} noteId the id of the note to be removed
     * @param {module:api/BasketsApi~deleteBasketsByIDNotesByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Basket}
     */
    this.deleteBasketsByIDNotesByID = function(basketId, noteId, callback) {
      var postBody = null;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling deleteBasketsByIDNotesByID");
      }

      // verify the required parameter 'noteId' is set
      if (noteId == undefined || noteId == null) {
        throw new Error("Missing the required parameter 'noteId' when calling deleteBasketsByIDNotesByID");
      }


      var pathParams = {
        'basket_id': basketId,
        'note_id': noteId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Basket;

      return this.apiClient.callApi(
        '/baskets/{basket_id}/notes/{note_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteBasketsByIDPaymentInstrumentsByID operation.
     * @callback module:api/BasketsApi~deleteBasketsByIDPaymentInstrumentsByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Basket} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Removes a payment instrument of a basket.
     * @param {String} basketId the basket id
     * @param {String} paymentInstrumentId the id of the payment instrument to be removed
     * @param {module:api/BasketsApi~deleteBasketsByIDPaymentInstrumentsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Basket}
     */
    this.deleteBasketsByIDPaymentInstrumentsByID = function(basketId, paymentInstrumentId, callback) {
      var postBody = null;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling deleteBasketsByIDPaymentInstrumentsByID");
      }

      // verify the required parameter 'paymentInstrumentId' is set
      if (paymentInstrumentId == undefined || paymentInstrumentId == null) {
        throw new Error("Missing the required parameter 'paymentInstrumentId' when calling deleteBasketsByIDPaymentInstrumentsByID");
      }


      var pathParams = {
        'basket_id': basketId,
        'payment_instrument_id': paymentInstrumentId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Basket;

      return this.apiClient.callApi(
        '/baskets/{basket_id}/payment_instruments/{payment_instrument_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteBasketsByIDPriceAdjustmentsByID operation.
     * @callback module:api/BasketsApi~deleteBasketsByIDPriceAdjustmentsByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Basket} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Removes a custom manual price adjustment from the basket.
     * @param {String} basketId the id of the basket to be modified
     * @param {String} priceAdjustmentId the uuid of the adjustment to be removed
     * @param {module:api/BasketsApi~deleteBasketsByIDPriceAdjustmentsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Basket}
     */
    this.deleteBasketsByIDPriceAdjustmentsByID = function(basketId, priceAdjustmentId, callback) {
      var postBody = null;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling deleteBasketsByIDPriceAdjustmentsByID");
      }

      // verify the required parameter 'priceAdjustmentId' is set
      if (priceAdjustmentId == undefined || priceAdjustmentId == null) {
        throw new Error("Missing the required parameter 'priceAdjustmentId' when calling deleteBasketsByIDPriceAdjustmentsByID");
      }


      var pathParams = {
        'basket_id': basketId,
        'price_adjustment_id': priceAdjustmentId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Basket;

      return this.apiClient.callApi(
        '/baskets/{basket_id}/price_adjustments/{price_adjustment_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteBasketsByIDShipmentsByID operation.
     * @callback module:api/BasketsApi~deleteBasketsByIDShipmentsByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Basket} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Removes a specified shipment and all associated product, gift certificate,  shipping and price adjustment line items from a basket.  It is not permissible to remove the default shipment.
     * @param {String} basketId the id of the basket to be modified
     * @param {String} shipmentId the id of the shipment to be deleted
     * @param {module:api/BasketsApi~deleteBasketsByIDShipmentsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Basket}
     */
    this.deleteBasketsByIDShipmentsByID = function(basketId, shipmentId, callback) {
      var postBody = null;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling deleteBasketsByIDShipmentsByID");
      }

      // verify the required parameter 'shipmentId' is set
      if (shipmentId == undefined || shipmentId == null) {
        throw new Error("Missing the required parameter 'shipmentId' when calling deleteBasketsByIDShipmentsByID");
      }


      var pathParams = {
        'basket_id': basketId,
        'shipment_id': shipmentId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Basket;

      return this.apiClient.callApi(
        '/baskets/{basket_id}/shipments/{shipment_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getBasketsByID operation.
     * @callback module:api/BasketsApi~getBasketsByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Basket} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Gets a basket.
     * @param {String} basketId the id of the basket to be retrieved
     * @param {module:api/BasketsApi~getBasketsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Basket}
     */
    this.getBasketsByID = function(basketId, callback) {
      var postBody = null;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling getBasketsByID");
      }


      var pathParams = {
        'basket_id': basketId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Basket;

      return this.apiClient.callApi(
        '/baskets/{basket_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getBasketsByIDNotes operation.
     * @callback module:api/BasketsApi~getBasketsByIDNotesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/NotesResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieves notes for a basket.
     * @param {String} basketId The id of the basket for which you want to retrieve the notes.
     * @param {module:api/BasketsApi~getBasketsByIDNotesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/NotesResult}
     */
    this.getBasketsByIDNotes = function(basketId, callback) {
      var postBody = null;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling getBasketsByIDNotes");
      }


      var pathParams = {
        'basket_id': basketId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = NotesResult;

      return this.apiClient.callApi(
        '/baskets/{basket_id}/notes', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getBasketsByIDPaymentMethods operation.
     * @callback module:api/BasketsApi~getBasketsByIDPaymentMethodsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PaymentMethodResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Gets applicable payment methods for an existing basket considering the open payment amount only.
     * @param {String} basketId the basket id
     * @param {module:api/BasketsApi~getBasketsByIDPaymentMethodsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PaymentMethodResult}
     */
    this.getBasketsByIDPaymentMethods = function(basketId, callback) {
      var postBody = null;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling getBasketsByIDPaymentMethods");
      }


      var pathParams = {
        'basket_id': basketId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = PaymentMethodResult;

      return this.apiClient.callApi(
        '/baskets/{basket_id}/payment_methods', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getBasketsByIDShipmentsByIDShippingMethods operation.
     * @callback module:api/BasketsApi~getBasketsByIDShipmentsByIDShippingMethodsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ShippingMethodResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Gets the applicable shipping methods for a certain shipment of a  basket.
     * @param {String} basketId the id of the basket
     * @param {String} shipmentId the id of the shipment
     * @param {module:api/BasketsApi~getBasketsByIDShipmentsByIDShippingMethodsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ShippingMethodResult}
     */
    this.getBasketsByIDShipmentsByIDShippingMethods = function(basketId, shipmentId, callback) {
      var postBody = null;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling getBasketsByIDShipmentsByIDShippingMethods");
      }

      // verify the required parameter 'shipmentId' is set
      if (shipmentId == undefined || shipmentId == null) {
        throw new Error("Missing the required parameter 'shipmentId' when calling getBasketsByIDShipmentsByIDShippingMethods");
      }


      var pathParams = {
        'basket_id': basketId,
        'shipment_id': shipmentId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = ShippingMethodResult;

      return this.apiClient.callApi(
        '/baskets/{basket_id}/shipments/{shipment_id}/shipping_methods', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the patchBasketsByID operation.
     * @callback module:api/BasketsApi~patchBasketsByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Basket} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Updates a basket. Only the currency of the basket, source code, and the custom  properties of the basket and of the shipping items will be considered.
     * @param {String} basketId the id of the basket to be modified
     * @param {module:model/Basket} body 
     * @param {module:api/BasketsApi~patchBasketsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Basket}
     */
    this.patchBasketsByID = function(basketId, body, callback) {
      var postBody = body;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling patchBasketsByID");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling patchBasketsByID");
      }


      var pathParams = {
        'basket_id': basketId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Basket;

      return this.apiClient.callApi(
        '/baskets/{basket_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the patchBasketsByIDGiftCertificateItemsByID operation.
     * @callback module:api/BasketsApi~patchBasketsByIDGiftCertificateItemsByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Basket} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Updates a gift certificate item of an existing basket.
     * @param {String} basketId the id of the basket to be modified
     * @param {String} GiftCertificateItemId the id of the gift certificate item to be updated
     * @param {module:model/GiftCertificateItem} body 
     * @param {module:api/BasketsApi~patchBasketsByIDGiftCertificateItemsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Basket}
     */
    this.patchBasketsByIDGiftCertificateItemsByID = function(basketId, GiftCertificateItemId, body, callback) {
      var postBody = body;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling patchBasketsByIDGiftCertificateItemsByID");
      }

      // verify the required parameter 'GiftCertificateItemId' is set
      if (GiftCertificateItemId == undefined || GiftCertificateItemId == null) {
        throw new Error("Missing the required parameter 'GiftCertificateItemId' when calling patchBasketsByIDGiftCertificateItemsByID");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling patchBasketsByIDGiftCertificateItemsByID");
      }


      var pathParams = {
        'basket_id': basketId,
        'gift_certificate_item_id': GiftCertificateItemId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Basket;

      return this.apiClient.callApi(
        '/baskets/{basket_id}/gift_certificate_items/{gift_certificate_item_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the patchBasketsByIDItemsByID operation.
     * @callback module:api/BasketsApi~patchBasketsByIDItemsByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Basket} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Updates an item in a basket.  The  following values in the request body are considered by the server:    product_id: a valid product id. The purpose of this  value is to exchange a variation of a variation product.  shipment_id: a valid shipment id. The purpose of  this value is to move a product item to another shipment.  quantity: a number between 0 and 999. The purpose of  this value is to change quantity of the product item. If quantity is 0,  the product item is removed.  option_items/option_value_id: a valid option value  id. The purpose of this value is to exchange an option value for an  option item of an option product.   This is only possible if the product item is an option product. To change  option values a collection of option items to be changed need to be  provided in property option_items. Those  option_items need to contain option_id  and option_value_id. The provided values must be valid  for the option product that this product item represents. Otherwise  InvalidProductOptionItemException or  InvalidProductOptionValueItemException will be thrown.  custom properties c_&lt;CUSTOM_NAME&gt;: a  value corresponding to the type defined for custom attribute  &lt;CUSTOM_NAME&gt; of ProductLineItem. The purpose of this value is to  add or change the value of a custom attribute defined for  ProductLineItem.  
     * @param {String} basketId the id of the basket to be modified
     * @param {String} itemId the it of the item to be updated
     * @param {module:model/ProductItem} body 
     * @param {module:api/BasketsApi~patchBasketsByIDItemsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Basket}
     */
    this.patchBasketsByIDItemsByID = function(basketId, itemId, body, callback) {
      var postBody = body;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling patchBasketsByIDItemsByID");
      }

      // verify the required parameter 'itemId' is set
      if (itemId == undefined || itemId == null) {
        throw new Error("Missing the required parameter 'itemId' when calling patchBasketsByIDItemsByID");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling patchBasketsByIDItemsByID");
      }


      var pathParams = {
        'basket_id': basketId,
        'item_id': itemId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Basket;

      return this.apiClient.callApi(
        '/baskets/{basket_id}/items/{item_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the patchBasketsByIDPaymentInstrumentsByID operation.
     * @callback module:api/BasketsApi~patchBasketsByIDPaymentInstrumentsByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Basket} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Updates a payment instrument of a basket.    Payment instruments are usually authorized after order creation, for example in a custom hook. The default  payment authorization process executes an authorization when a payment instrument is added to an order or  updated. See POST /orders/{order_no}/payment_instruments and PATCH  /orders/{order_no}/payment_instruments/{payment_instrument_id}  
     * @param {String} basketId the basket id
     * @param {String} paymentInstrumentId the id of the payment instrument to be updated
     * @param {module:model/BasketPaymentInstrumentRequest} body 
     * @param {module:api/BasketsApi~patchBasketsByIDPaymentInstrumentsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Basket}
     */
    this.patchBasketsByIDPaymentInstrumentsByID = function(basketId, paymentInstrumentId, body, callback) {
      var postBody = body;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling patchBasketsByIDPaymentInstrumentsByID");
      }

      // verify the required parameter 'paymentInstrumentId' is set
      if (paymentInstrumentId == undefined || paymentInstrumentId == null) {
        throw new Error("Missing the required parameter 'paymentInstrumentId' when calling patchBasketsByIDPaymentInstrumentsByID");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling patchBasketsByIDPaymentInstrumentsByID");
      }


      var pathParams = {
        'basket_id': basketId,
        'payment_instrument_id': paymentInstrumentId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Basket;

      return this.apiClient.callApi(
        '/baskets/{basket_id}/payment_instruments/{payment_instrument_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the patchBasketsByIDShipmentsByID operation.
     * @callback module:api/BasketsApi~patchBasketsByIDShipmentsByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Basket} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Updates a shipment for a basket.    The shipment is initialized with values provided in the body  document and can be updated with further data API calls. Considered from  the body are the following properties if specified    the id  the shipping address  the shipping method  gift boolean flag  gift message  custom properties  
     * @param {String} basketId the id of the basket to be modified
     * @param {String} shipmentId 
     * @param {module:model/Shipment} body 
     * @param {module:api/BasketsApi~patchBasketsByIDShipmentsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Basket}
     */
    this.patchBasketsByIDShipmentsByID = function(basketId, shipmentId, body, callback) {
      var postBody = body;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling patchBasketsByIDShipmentsByID");
      }

      // verify the required parameter 'shipmentId' is set
      if (shipmentId == undefined || shipmentId == null) {
        throw new Error("Missing the required parameter 'shipmentId' when calling patchBasketsByIDShipmentsByID");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling patchBasketsByIDShipmentsByID");
      }


      var pathParams = {
        'basket_id': basketId,
        'shipment_id': shipmentId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Basket;

      return this.apiClient.callApi(
        '/baskets/{basket_id}/shipments/{shipment_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postBaskets operation.
     * @callback module:api/BasketsApi~postBasketsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Basket} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Creates a new basket. The created basket is initialized with default values. Data provided in the body document  will be populated into the created basket. It can be updated with further Shop API calls.   Considered values from the request body are:    customer information: PUT /baskets/{basket_id}/customer  billing address: PUT /baskets/{basket_id}/billing_address  shipments including shipping address and shipping method: POST /baskets/{basket_id}/shipments  product items: POST /baskets/{basket_id}/items  coupon items: POST /baskets/{basket_id}/coupons  gift certificate items: POST /baskets/{basket_id}/gift_certificates  payment method and card type: POST /baskets/{basket_id}/payment_instruments  custom properties: PATCH /baskets/{basket_id}    Related resource means with which resource you can specify the same data after the basket creation.   Identify the basket using the basket_id property, which  should be integrated into the path of an update request, for example a POST to  /baskets/{basket_id}/items.  The resource supports JWT or  OAuth tokens for authentication:    A customer must provide a JWT, which specifies exactly one customer (it may be a guest or a registered  customer). In this case the resource creates a basket for this customer.  An agent must provide an OAuth token. The agent can use this resource to create a basket for a new created  guest customer, and can later update the customer if desired.     The number of baskets which can be created per customer is limited. When a  basket is created it is said to be open. It remains open until either an order is created from it  using a POST to resource /orders or it is deleted using a DELETE to resource  /baskets/{basket_id}. The number of open baskets allowed depends on the authentication  method used:    When using JWT each customer can have just one open basket  When using OAuth each customer can have up to 4 open baskets (this is a quota setting which can be  updated by support)  
     * @param {Object} opts Optional parameters
     * @param {module:model/Basket} opts.body 
     * @param {module:api/BasketsApi~postBasketsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Basket}
     */
    this.postBaskets = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];


      var pathParams = {
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Basket;

      return this.apiClient.callApi(
        '/baskets', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postBasketsByIDCoupons operation.
     * @callback module:api/BasketsApi~postBasketsByIDCouponsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Basket} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Adds a coupon to an existing basket.
     * @param {String} basketId The id of the basket to be modified.
     * @param {module:model/CouponItem} body 
     * @param {module:api/BasketsApi~postBasketsByIDCouponsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Basket}
     */
    this.postBasketsByIDCoupons = function(basketId, body, callback) {
      var postBody = body;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling postBasketsByIDCoupons");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling postBasketsByIDCoupons");
      }


      var pathParams = {
        'basket_id': basketId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Basket;

      return this.apiClient.callApi(
        '/baskets/{basket_id}/coupons', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postBasketsByIDGiftCertificateItems operation.
     * @callback module:api/BasketsApi~postBasketsByIDGiftCertificateItemsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Basket} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Adds a gift certificate item to an existing basket.
     * @param {String} basketId the id of the basket to be modified
     * @param {module:model/GiftCertificateItem} body 
     * @param {module:api/BasketsApi~postBasketsByIDGiftCertificateItemsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Basket}
     */
    this.postBasketsByIDGiftCertificateItems = function(basketId, body, callback) {
      var postBody = body;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling postBasketsByIDGiftCertificateItems");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling postBasketsByIDGiftCertificateItems");
      }


      var pathParams = {
        'basket_id': basketId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Basket;

      return this.apiClient.callApi(
        '/baskets/{basket_id}/gift_certificate_items', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postBasketsByIDItems operation.
     * @callback module:api/BasketsApi~postBasketsByIDItemsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Basket} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Adds new items to a basket.  The added items are associated with the  specified shipment. If no shipment id is specified, the added items are associated with the default shipment.   Considered values from the request body, for each item are:    product_id: a valid product id. This is the id of the product to be added to the basket. If the  product is already in the basket, the API either increments the quantity of the existing product line item or  creates a new product line item, based on the site preference &#39;Add Product Behavior&#39;. For option products and  product bundles containing variation masters, the API creates a new product line item regardless of the site  preference.  shipment_id: a valid shipment id (optional). This is the id of the shipment in which the product item  is created.  quantity: a number between 0.01 and 999. This is the quantity of the product to order.  inventory_id: a valid inventory id (optional). This is the id of the inventory from which the item is  allocated.  bonus_discount_line_item_id: a valid bonus discount line item id (optional). This is the id of the  bonus discount line item for which the added product is a selected bonus product.  option_items/option_value_id: a valid option value id. This is an option value for an option item of  an option product.  This is only possible if the product item is an option  product. To set option values, you must specify a collection of option items in the option_items  property. These option items must contain option_id and option_value_id. Also,  the values you specify must be valid for the option product that this product item represents. Otherwise, the  server throws an InvalidProductOptionItemException or an  InvalidProductOptionValueItemException.  custom properties in the form c_&lt;CUSTOM_NAME&gt;: the custom property must correspond to a custom  attribute (&lt;CUSTOM_NAME&gt;) defined for ProductLineItem. The value of this property must be valid for the  type of custom attribute defined for ProductLineItem.  
     * @param {String} basketId The id of the basket to be modified.
     * @param {module:model/ProductItem} body 
     * @param {module:api/BasketsApi~postBasketsByIDItemsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Basket}
     */
    this.postBasketsByIDItems = function(basketId, body, callback) {
      var postBody = body;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling postBasketsByIDItems");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling postBasketsByIDItems");
      }


      var pathParams = {
        'basket_id': basketId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Basket;

      return this.apiClient.callApi(
        '/baskets/{basket_id}/items', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postBasketsByIDNotes operation.
     * @callback module:api/BasketsApi~postBasketsByIDNotesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Basket} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Adds a note to an existing basket.
     * @param {String} basketId The id of the basket to be modified.
     * @param {module:model/Note} body 
     * @param {module:api/BasketsApi~postBasketsByIDNotesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Basket}
     */
    this.postBasketsByIDNotes = function(basketId, body, callback) {
      var postBody = body;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling postBasketsByIDNotes");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling postBasketsByIDNotes");
      }


      var pathParams = {
        'basket_id': basketId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Basket;

      return this.apiClient.callApi(
        '/baskets/{basket_id}/notes', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postBasketsByIDPaymentInstruments operation.
     * @callback module:api/BasketsApi~postBasketsByIDPaymentInstrumentsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Basket} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Adds a payment instrument to a basket.    Payment instruments are usually authorized after order creation, for example in a custom hook. The default  payment authorization process executes an authorization when a payment instrument is added to an order or  updated. See POST /orders/{order_no}/payment_instruments and PATCH  /orders/{order_no}/payment_instruments/{payment_instrument_id}.  NOTE: If CREDIT_CARD is selected as the payment_method_id, it is mandatory to provide the property card_type.  
     * @param {String} basketId the basket id
     * @param {module:model/BasketPaymentInstrumentRequest} body 
     * @param {module:api/BasketsApi~postBasketsByIDPaymentInstrumentsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Basket}
     */
    this.postBasketsByIDPaymentInstruments = function(basketId, body, callback) {
      var postBody = body;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling postBasketsByIDPaymentInstruments");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling postBasketsByIDPaymentInstruments");
      }


      var pathParams = {
        'basket_id': basketId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Basket;

      return this.apiClient.callApi(
        '/baskets/{basket_id}/payment_instruments', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postBasketsByIDPriceAdjustments operation.
     * @callback module:api/BasketsApi~postBasketsByIDPriceAdjustmentsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Basket} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Adds a custom manual price adjustment to the basket.
     * @param {String} basketId the id of the basket to be modified
     * @param {module:model/PriceAdjustmentRequest} body 
     * @param {module:api/BasketsApi~postBasketsByIDPriceAdjustmentsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Basket}
     */
    this.postBasketsByIDPriceAdjustments = function(basketId, body, callback) {
      var postBody = body;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling postBasketsByIDPriceAdjustments");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling postBasketsByIDPriceAdjustments");
      }


      var pathParams = {
        'basket_id': basketId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Basket;

      return this.apiClient.callApi(
        '/baskets/{basket_id}/price_adjustments', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postBasketsByIDShipments operation.
     * @callback module:api/BasketsApi~postBasketsByIDShipmentsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Basket} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Creates a new shipment for a basket.    The created shipment is initialized with values provided in the body  document and can be updated with further data API calls. Considered from  the body are the following properties if specified:    the id  the shipping address  the shipping method  gift boolean flag  gift message  custom properties  
     * @param {String} basketId the id of the basket to be modified
     * @param {module:model/Shipment} body 
     * @param {module:api/BasketsApi~postBasketsByIDShipmentsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Basket}
     */
    this.postBasketsByIDShipments = function(basketId, body, callback) {
      var postBody = body;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling postBasketsByIDShipments");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling postBasketsByIDShipments");
      }


      var pathParams = {
        'basket_id': basketId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Basket;

      return this.apiClient.callApi(
        '/baskets/{basket_id}/shipments', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the putBasketsByIDBillingAddress operation.
     * @callback module:api/BasketsApi~putBasketsByIDBillingAddressCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Basket} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Sets the billing address of a basket.
     * @param {String} basketId The id of the basket to be modified.
     * @param {Object} opts Optional parameters
     * @param {Boolean} opts.useAsShipping 
     * @param {String} opts.customerAddressId 
     * @param {module:model/OrderAddress} opts.body 
     * @param {module:api/BasketsApi~putBasketsByIDBillingAddressCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Basket}
     */
    this.putBasketsByIDBillingAddress = function(basketId, opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling putBasketsByIDBillingAddress");
      }


      var pathParams = {
        'basket_id': basketId
      };
      var queryParams = {
        'use_as_shipping': opts['useAsShipping'],
        'customer_address_id': opts['customerAddressId']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Basket;

      return this.apiClient.callApi(
        '/baskets/{basket_id}/billing_address', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the putBasketsByIDCustomer operation.
     * @callback module:api/BasketsApi~putBasketsByIDCustomerCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Basket} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Sets customer information for an existing basket.
     * @param {String} basketId the id of the basket to be modified
     * @param {module:model/CustomerInfo} body 
     * @param {module:api/BasketsApi~putBasketsByIDCustomerCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Basket}
     */
    this.putBasketsByIDCustomer = function(basketId, body, callback) {
      var postBody = body;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling putBasketsByIDCustomer");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling putBasketsByIDCustomer");
      }


      var pathParams = {
        'basket_id': basketId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Basket;

      return this.apiClient.callApi(
        '/baskets/{basket_id}/customer', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the putBasketsByIDShipmentsByIDShippingAddress operation.
     * @callback module:api/BasketsApi~putBasketsByIDShipmentsByIDShippingAddressCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Basket} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Sets a shipping address of a specific shipment of a basket.
     * @param {String} basketId The id of the basket to be modified.
     * @param {String} shipmentId The id of the shipment to be modified.
     * @param {module:model/OrderAddress} body 
     * @param {Object} opts Optional parameters
     * @param {Boolean} opts.useAsBilling 
     * @param {String} opts.customerAddressId 
     * @param {module:api/BasketsApi~putBasketsByIDShipmentsByIDShippingAddressCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Basket}
     */
    this.putBasketsByIDShipmentsByIDShippingAddress = function(basketId, shipmentId, body, opts, callback) {
      opts = opts || {};
      var postBody = body;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling putBasketsByIDShipmentsByIDShippingAddress");
      }

      // verify the required parameter 'shipmentId' is set
      if (shipmentId == undefined || shipmentId == null) {
        throw new Error("Missing the required parameter 'shipmentId' when calling putBasketsByIDShipmentsByIDShippingAddress");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling putBasketsByIDShipmentsByIDShippingAddress");
      }


      var pathParams = {
        'basket_id': basketId,
        'shipment_id': shipmentId
      };
      var queryParams = {
        'use_as_billing': opts['useAsBilling'],
        'customer_address_id': opts['customerAddressId']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Basket;

      return this.apiClient.callApi(
        '/baskets/{basket_id}/shipments/{shipment_id}/shipping_address', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the putBasketsByIDShipmentsByIDShippingMethod operation.
     * @callback module:api/BasketsApi~putBasketsByIDShipmentsByIDShippingMethodCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Basket} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Sets a shipping method to a specific shipment of a basket.
     * @param {String} basketId the id of the basket to be modified
     * @param {String} shipmentId the id of the shipment to be modified
     * @param {module:model/ShippingMethod} body 
     * @param {module:api/BasketsApi~putBasketsByIDShipmentsByIDShippingMethodCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Basket}
     */
    this.putBasketsByIDShipmentsByIDShippingMethod = function(basketId, shipmentId, body, callback) {
      var postBody = body;

      // verify the required parameter 'basketId' is set
      if (basketId == undefined || basketId == null) {
        throw new Error("Missing the required parameter 'basketId' when calling putBasketsByIDShipmentsByIDShippingMethod");
      }

      // verify the required parameter 'shipmentId' is set
      if (shipmentId == undefined || shipmentId == null) {
        throw new Error("Missing the required parameter 'shipmentId' when calling putBasketsByIDShipmentsByIDShippingMethod");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling putBasketsByIDShipmentsByIDShippingMethod");
      }


      var pathParams = {
        'basket_id': basketId,
        'shipment_id': shipmentId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Basket;

      return this.apiClient.callApi(
        '/baskets/{basket_id}/shipments/{shipment_id}/shipping_method', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Category', 'model/CategoryResult'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/Category'), require('../model/CategoryResult'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.CategoriesApi = factory(root.ShopApi.ApiClient, root.ShopApi.Category, root.ShopApi.CategoryResult);
  }
}(this, function(ApiClient, Category, CategoryResult) {
  'use strict';

  /**
   * Categories service.
   * @module api/CategoriesApi
   * @version 17.3
   */

  /**
   * Constructs a new CategoriesApi. 
   * @alias module:api/CategoriesApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getCategoriesByID operation.
     * @callback module:api/CategoriesApi~getCategoriesByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Category} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * When you use the URL template below, the server returns a category identified by its id; by default, the server  also returns the first level of subcategories, but you can specify another level by setting the levels  parameter. The server only returns online categories.
     * @param {String} id The id of the requested category.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.levels 
     * @param {String} opts.locale 
     * @param {module:api/CategoriesApi~getCategoriesByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Category}
     */
    this.getCategoriesByID = function(id, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw new Error("Missing the required parameter 'id' when calling getCategoriesByID");
      }


      var pathParams = {
        'id': id
      };
      var queryParams = {
        'levels': opts['levels'],
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };
      Object.keys(opts).forEach(function (optKey) {
        if (optKey.indexOf('c_') === 0) {
          queryParams[optKey] = opts[optKey];
        }
      });

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Category;

      return this.apiClient.callApi(
        '/categories/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getCategoriesByIDs operation.
     * @callback module:api/CategoriesApi~getCategoriesByIDsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CategoryResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Array.<String>} ids 
     * @param {Object} opts Optional parameters
     * @param {Number} opts.levels 
     * @param {String} opts.locale 
     * @param {module:api/CategoriesApi~getCategoriesByIDsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CategoryResult}
     */
    this.getCategoriesByIDs = function(ids, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'ids' is set
      if (ids == undefined || ids == null) {
        throw new Error("Missing the required parameter 'ids' when calling getCategoriesByIDs");
      }


      var pathParams = {
        'ids': ids
      };
      var queryParams = {
        'levels': opts['levels'],
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = CategoryResult;

      return this.apiClient.callApi(
        '/categories/({ids})', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Content', 'model/ContentResult'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/Content'), require('../model/ContentResult'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ContentApi = factory(root.ShopApi.ApiClient, root.ShopApi.Content, root.ShopApi.ContentResult);
  }
}(this, function(ApiClient, Content, ContentResult) {
  'use strict';

  /**
   * Content service.
   * @module api/ContentApi
   * @version 17.3
   */

  /**
   * Constructs a new ContentApi. 
   * @alias module:api/ContentApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getContentByID operation.
     * @callback module:api/ContentApi~getContentByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Content} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * To access a content asset, you construct a URL using the template shown below. This template requires you to  specify a content asset id. In response, the server returns a corresponding content asset document. Only content  assets, which are marked as online are returned. An assignment to a folder is not necessary.
     * @param {String} id The id of the requested content asset.
     * @param {Object} opts Optional parameters
     * @param {String} opts.locale 
     * @param {module:api/ContentApi~getContentByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Content}
     */
    this.getContentByID = function(id, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw new Error("Missing the required parameter 'id' when calling getContentByID");
      }


      var pathParams = {
        'id': id
      };
      var queryParams = {
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Content;

      return this.apiClient.callApi(
        '/content/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getContentByIDs operation.
     * @callback module:api/ContentApi~getContentByIDsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ContentResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Array.<String>} ids 
     * @param {Object} opts Optional parameters
     * @param {String} opts.locale 
     * @param {module:api/ContentApi~getContentByIDsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ContentResult}
     */
    this.getContentByIDs = function(ids, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'ids' is set
      if (ids == undefined || ids == null) {
        throw new Error("Missing the required parameter 'ids' when calling getContentByIDs");
      }


      var pathParams = {
        'ids': ids
      };
      var queryParams = {
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = ContentResult;

      return this.apiClient.callApi(
        '/content/({ids})', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ContentSearchResult'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/ContentSearchResult'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ContentSearchApi = factory(root.ShopApi.ApiClient, root.ShopApi.ContentSearchResult);
  }
}(this, function(ApiClient, ContentSearchResult) {
  'use strict';

  /**
   * ContentSearch service.
   * @module api/ContentSearchApi
   * @version 17.3
   */

  /**
   * Constructs a new ContentSearchApi. 
   * @alias module:api/ContentSearchApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getContentSearch operation.
     * @callback module:api/ContentSearchApi~getContentSearchCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ContentSearchResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Provides keyword and refinement search functionality for content assets. The search result contains only content  that is online and assigned to a folder.
     * @param {Object} opts Optional parameters
     * @param {String} opts.q The query phrase to search for.
     * @param {Array.<String>} opts.refine Parameter that represents a refinement attribute/value(s) pair. Refinement attribute id and                      value(s) are separated by &#39;&#x3D;&#39;. Multiple values are supported by a sub-set of refinement attributes and                      can be provided by separating them using a pipe (URL                      encoded &#x3D; \&quot;|\&quot;). Value ranges can be specified like this: refine&#x3D;foo&#x3D;(100..500) Multiple refine                      parameters can be provided by adding an underscore in combination with an integer counter right behind                      the parameter name and a counter range 1..9. I.e. refine_1&#x3D;c_refinementType&#x3D;type1|type2|type3. The                      following system refinement attribute ids are supported:                                            fdid: Allows to refine per single content folder id. Multiple folder ids are not supported.                      
     * @param {Array.<String>} opts.sort Parameter that represents a sorting attribute/value(s) pair. Sorting attribute id and value are                      separated by &#39;&#x3D;&#39;. The value describes the sort direction. Possible values are &#39;asc&#39; and &#39;desc&#39;, for                      ascending or descending sort direction. I.e. sort&#x3D;c_myAttribute&#x3D;desc. Precondition: You have to select                      your sorting attributes in Business Manager &gt; YourSite &gt; Search Indexes &gt; Content Index &gt; Sorting                      Attributes.
     * @param {Number} opts.start The result set index to return the first instance for. Default value is 0.
     * @param {Number} opts.count The maximum number of instances per request. Default value is 25.
     * @param {String} opts.locale The locale context.
     * @param {module:api/ContentSearchApi~getContentSearchCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ContentSearchResult}
     */
    this.getContentSearch = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'q': opts['q'],
        'refine': this.apiClient.buildCollectionParam(opts['refine'], 'csv'),
        'sort': this.apiClient.buildCollectionParam(opts['sort'], 'csv'),
        'start': opts['start'],
        'count': opts['count'],
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = ContentSearchResult;

      return this.apiClient.callApi(
        '/ContentSearch', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/CustomObject'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/CustomObject'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.CustomObjectsApi = factory(root.ShopApi.ApiClient, root.ShopApi.CustomObject);
  }
}(this, function(ApiClient, CustomObject) {
  'use strict';

  /**
   * CustomObjects service.
   * @module api/CustomObjectsApi
   * @version 17.3
   */

  /**
   * Constructs a new CustomObjectsApi. 
   * @alias module:api/CustomObjectsApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getCustomObjectsByIDByID operation.
     * @callback module:api/CustomObjectsApi~getCustomObjectsByIDByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CustomObject} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Reads a custom object with a given object type ID and a value for the  key attribute of the object which represents its unique identifier.
     * @param {String} objectType the ID of the object type
     * @param {String} key the key attribute value of the custom object
     * @param {module:api/CustomObjectsApi~getCustomObjectsByIDByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CustomObject}
     */
    this.getCustomObjectsByIDByID = function(objectType, key, callback) {
      var postBody = null;

      // verify the required parameter 'objectType' is set
      if (objectType == undefined || objectType == null) {
        throw new Error("Missing the required parameter 'objectType' when calling getCustomObjectsByIDByID");
      }

      // verify the required parameter 'key' is set
      if (key == undefined || key == null) {
        throw new Error("Missing the required parameter 'key' when calling getCustomObjectsByIDByID");
      }


      var pathParams = {
        'object_type': objectType,
        'key': key
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = CustomObject;

      return this.apiClient.callApi(
        '/CustomObjects/{object_type}/{key}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/AuthRequest', 'model/BasketsResult', 'model/Customer', 'model/CustomerAddress', 'model/CustomerAddressResult', 'model/CustomerOrderResult', 'model/CustomerPaymentInstrument', 'model/CustomerPaymentInstrumentRequest', 'model/CustomerPaymentInstrumentResult', 'model/CustomerProductList', 'model/CustomerProductListItem', 'model/CustomerProductListItemPurchase', 'model/CustomerProductListItemPurchaseResult', 'model/CustomerProductListItemResult', 'model/CustomerProductListResult', 'model/CustomerRegistration', 'model/PasswordChangeRequest', 'model/PasswordReset'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/AuthRequest'), require('../model/BasketsResult'), require('../model/Customer'), require('../model/CustomerAddress'), require('../model/CustomerAddressResult'), require('../model/CustomerOrderResult'), require('../model/CustomerPaymentInstrument'), require('../model/CustomerPaymentInstrumentRequest'), require('../model/CustomerPaymentInstrumentResult'), require('../model/CustomerProductList'), require('../model/CustomerProductListItem'), require('../model/CustomerProductListItemPurchase'), require('../model/CustomerProductListItemPurchaseResult'), require('../model/CustomerProductListItemResult'), require('../model/CustomerProductListResult'), require('../model/CustomerRegistration'), require('../model/PasswordChangeRequest'), require('../model/PasswordReset'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.CustomersApi = factory(root.ShopApi.ApiClient, root.ShopApi.AuthRequest, root.ShopApi.BasketsResult, root.ShopApi.Customer, root.ShopApi.CustomerAddress, root.ShopApi.CustomerAddressResult, root.ShopApi.CustomerOrderResult, root.ShopApi.CustomerPaymentInstrument, root.ShopApi.CustomerPaymentInstrumentRequest, root.ShopApi.CustomerPaymentInstrumentResult, root.ShopApi.CustomerProductList, root.ShopApi.CustomerProductListItem, root.ShopApi.CustomerProductListItemPurchase, root.ShopApi.CustomerProductListItemPurchaseResult, root.ShopApi.CustomerProductListItemResult, root.ShopApi.CustomerProductListResult, root.ShopApi.CustomerRegistration, root.ShopApi.PasswordChangeRequest, root.ShopApi.PasswordReset);
  }
}(this, function(ApiClient, AuthRequest, BasketsResult, Customer, CustomerAddress, CustomerAddressResult, CustomerOrderResult, CustomerPaymentInstrument, CustomerPaymentInstrumentRequest, CustomerPaymentInstrumentResult, CustomerProductList, CustomerProductListItem, CustomerProductListItemPurchase, CustomerProductListItemPurchaseResult, CustomerProductListItemResult, CustomerProductListResult, CustomerRegistration, PasswordChangeRequest, PasswordReset) {
  'use strict';

  /**
   * Customers service.
   * @module api/CustomersApi
   * @version 17.3
   */

  /**
   * Constructs a new CustomersApi. 
   * @alias module:api/CustomersApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the deleteCustomersAuth operation.
     * @callback module:api/CustomersApi~deleteCustomersAuthCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Invalidates the JWT provided in the header.
     * @param {Object} opts Optional parameters
     * @param {String} opts.authorization the JWT token
     * @param {module:api/CustomersApi~deleteCustomersAuthCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.deleteCustomersAuth = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
      };
      var headerParams = {
        'Authorization': opts['authorization']
      };
      var formParams = {
      };

      var authNames = ['customers_auth'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = null;

      return this.apiClient.callApi(
        '/customers/auth', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteCustomersByIDAddressesByID operation.
     * @callback module:api/CustomersApi~deleteCustomersByIDAddressesByIDCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Deletes a customer&#39;s address by address name.
     * @param {String} customerId the id of the customer to delete the address for
     * @param {String} addressName the name of the address to delete
     * @param {module:api/CustomersApi~deleteCustomersByIDAddressesByIDCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.deleteCustomersByIDAddressesByID = function(customerId, addressName, callback) {
      var postBody = null;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling deleteCustomersByIDAddressesByID");
      }

      // verify the required parameter 'addressName' is set
      if (addressName == undefined || addressName == null) {
        throw new Error("Missing the required parameter 'addressName' when calling deleteCustomersByIDAddressesByID");
      }


      var pathParams = {
        'customer_id': customerId,
        'address_name': addressName
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = null;

      return this.apiClient.callApi(
        '/customers/{customer_id}/addresses/{address_name}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteCustomersByIDPaymentInstrumentsByID operation.
     * @callback module:api/CustomersApi~deleteCustomersByIDPaymentInstrumentsByIDCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Deletes a customer&#39;s payment instrument.
     * @param {String} customerId the id of the customer to delete the payment instrument for
     * @param {String} paymentInstrumentId the id of the payment instrument to be deleted
     * @param {module:api/CustomersApi~deleteCustomersByIDPaymentInstrumentsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.deleteCustomersByIDPaymentInstrumentsByID = function(customerId, paymentInstrumentId, callback) {
      var postBody = null;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling deleteCustomersByIDPaymentInstrumentsByID");
      }

      // verify the required parameter 'paymentInstrumentId' is set
      if (paymentInstrumentId == undefined || paymentInstrumentId == null) {
        throw new Error("Missing the required parameter 'paymentInstrumentId' when calling deleteCustomersByIDPaymentInstrumentsByID");
      }


      var pathParams = {
        'customer_id': customerId,
        'payment_instrument_id': paymentInstrumentId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = null;

      return this.apiClient.callApi(
        '/customers/{customer_id}/payment_instruments/{payment_instrument_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteCustomersByIDProductListsByID operation.
     * @callback module:api/CustomersApi~deleteCustomersByIDProductListsByIDCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Deletes a customer product list.
     * @param {String} customerId The customer id.
     * @param {String} listId The product list id.
     * @param {module:api/CustomersApi~deleteCustomersByIDProductListsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.deleteCustomersByIDProductListsByID = function(customerId, listId, callback) {
      var postBody = null;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling deleteCustomersByIDProductListsByID");
      }

      // verify the required parameter 'listId' is set
      if (listId == undefined || listId == null) {
        throw new Error("Missing the required parameter 'listId' when calling deleteCustomersByIDProductListsByID");
      }


      var pathParams = {
        'customer_id': customerId,
        'list_id': listId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = null;

      return this.apiClient.callApi(
        '/customers/{customer_id}/ProductLists/{list_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteCustomersByIDProductListsByIDItemsByID operation.
     * @callback module:api/CustomersApi~deleteCustomersByIDProductListsByIDItemsByIDCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Removes an item from a customer product list.
     * @param {String} customerId The id of the owner of the product list
     * @param {String} listId The id of the product list.
     * @param {String} itemId The id of the product list item to delete.
     * @param {module:api/CustomersApi~deleteCustomersByIDProductListsByIDItemsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.deleteCustomersByIDProductListsByIDItemsByID = function(customerId, listId, itemId, callback) {
      var postBody = null;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling deleteCustomersByIDProductListsByIDItemsByID");
      }

      // verify the required parameter 'listId' is set
      if (listId == undefined || listId == null) {
        throw new Error("Missing the required parameter 'listId' when calling deleteCustomersByIDProductListsByIDItemsByID");
      }

      // verify the required parameter 'itemId' is set
      if (itemId == undefined || itemId == null) {
        throw new Error("Missing the required parameter 'itemId' when calling deleteCustomersByIDProductListsByIDItemsByID");
      }


      var pathParams = {
        'customer_id': customerId,
        'list_id': listId,
        'item_id': itemId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = null;

      return this.apiClient.callApi(
        '/customers/{customer_id}/ProductLists/{list_id}/items/{item_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getCustomersByID operation.
     * @callback module:api/CustomersApi~getCustomersByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Customer} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Gets a customer.
     * @param {String} customerId The customer id
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.expand 
     * @param {module:api/CustomersApi~getCustomersByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Customer}
     */
    this.getCustomersByID = function(customerId, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling getCustomersByID");
      }


      var pathParams = {
        'customer_id': customerId
      };
      var queryParams = {
        'expand': this.apiClient.buildCollectionParam(opts['expand'], 'csv')
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Customer;

      return this.apiClient.callApi(
        '/customers/{customer_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getCustomersByIDAddresses operation.
     * @callback module:api/CustomersApi~getCustomersByIDAddressesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CustomerAddressResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Returns a sorted pageable list of all customer addresses in the address book. The default page size is 10  customer addresses. The addresses are sorted so that the preferred address is always sorted first. The remaining  addresses are sorted alphabetically by ID.    When the customer cannot be found CustomerNotFoundException  is thrown in a case of an agent but an empty result list is returned in a case of JWT.
     * @param {String} customerId The customer uuid
     * @param {Object} opts Optional parameters
     * @param {Number} opts.start 
     * @param {Number} opts.count 
     * @param {module:api/CustomersApi~getCustomersByIDAddressesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CustomerAddressResult}
     */
    this.getCustomersByIDAddresses = function(customerId, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling getCustomersByIDAddresses");
      }


      var pathParams = {
        'customer_id': customerId
      };
      var queryParams = {
        'start': opts['start'],
        'count': opts['count']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = CustomerAddressResult;

      return this.apiClient.callApi(
        '/customers/{customer_id}/addresses', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getCustomersByIDAddressesByID operation.
     * @callback module:api/CustomersApi~getCustomersByIDAddressesByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CustomerAddress} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieves a customer&#39;s address by address name.
     * @param {String} customerId the id of the customer to retrieve the address for
     * @param {String} addressName the name of the address to retrieve
     * @param {module:api/CustomersApi~getCustomersByIDAddressesByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CustomerAddress}
     */
    this.getCustomersByIDAddressesByID = function(customerId, addressName, callback) {
      var postBody = null;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling getCustomersByIDAddressesByID");
      }

      // verify the required parameter 'addressName' is set
      if (addressName == undefined || addressName == null) {
        throw new Error("Missing the required parameter 'addressName' when calling getCustomersByIDAddressesByID");
      }


      var pathParams = {
        'customer_id': customerId,
        'address_name': addressName
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = CustomerAddress;

      return this.apiClient.callApi(
        '/customers/{customer_id}/addresses/{address_name}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getCustomersByIDBaskets operation.
     * @callback module:api/CustomersApi~getCustomersByIDBasketsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/BasketsResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Gets the baskets of a customer.
     * @param {String} customerId the id of the customer to retrieve the baskets for
     * @param {module:api/CustomersApi~getCustomersByIDBasketsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/BasketsResult}
     */
    this.getCustomersByIDBaskets = function(customerId, callback) {
      var postBody = null;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling getCustomersByIDBaskets");
      }


      var pathParams = {
        'customer_id': customerId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = BasketsResult;

      return this.apiClient.callApi(
        '/customers/{customer_id}/baskets', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getCustomersByIDOrders operation.
     * @callback module:api/CustomersApi~getCustomersByIDOrdersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CustomerOrderResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Returns a pageable list of all customer&#39;s orders. The default page size is 10.
     * @param {String} customerId the customer uuid
     * @param {Object} opts Optional parameters
     * @param {Number} opts.start 
     * @param {Number} opts.count 
     * @param {Boolean} opts.crossSites 
     * @param {String} opts.from 
     * @param {String} opts.until 
     * @param {String} opts.status 
     * @param {module:api/CustomersApi~getCustomersByIDOrdersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CustomerOrderResult}
     */
    this.getCustomersByIDOrders = function(customerId, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling getCustomersByIDOrders");
      }


      var pathParams = {
        'customer_id': customerId
      };
      var queryParams = {
        'start': opts['start'],
        'count': opts['count'],
        'cross-sites': opts['crossSites'],
        'from': opts['from'],
        'until': opts['until'],
        'status': opts['status']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = CustomerOrderResult;

      return this.apiClient.callApi(
        '/customers/{customer_id}/orders', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getCustomersByIDPaymentInstruments operation.
     * @callback module:api/CustomersApi~getCustomersByIDPaymentInstrumentsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CustomerPaymentInstrumentResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Gets customer payment instruments for an customer.  Can be limited to a specific payment  method by providing query parameter payment_method_id.    When the customer cannot be found CustomerNotFoundException  is thrown in a case of an agent but an empty result list is returned in a case of JWT.
     * @param {String} customerId the id of the customer to retrieve the payment instruments for
     * @param {Object} opts Optional parameters
     * @param {String} opts.paymentMethodId 
     * @param {module:api/CustomersApi~getCustomersByIDPaymentInstrumentsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CustomerPaymentInstrumentResult}
     */
    this.getCustomersByIDPaymentInstruments = function(customerId, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling getCustomersByIDPaymentInstruments");
      }


      var pathParams = {
        'customer_id': customerId
      };
      var queryParams = {
        'payment_method_id': opts['paymentMethodId']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = CustomerPaymentInstrumentResult;

      return this.apiClient.callApi(
        '/customers/{customer_id}/payment_instruments', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getCustomersByIDPaymentInstrumentsByID operation.
     * @callback module:api/CustomersApi~getCustomersByIDPaymentInstrumentsByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CustomerPaymentInstrument} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieves a customer&#39;s payment instrument by its id.
     * @param {String} customerId the id of the customer to retrieve the payment instrument for
     * @param {String} paymentInstrumentId the id of the payment instrument to be retrievedCustomer
     * @param {module:api/CustomersApi~getCustomersByIDPaymentInstrumentsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CustomerPaymentInstrument}
     */
    this.getCustomersByIDPaymentInstrumentsByID = function(customerId, paymentInstrumentId, callback) {
      var postBody = null;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling getCustomersByIDPaymentInstrumentsByID");
      }

      // verify the required parameter 'paymentInstrumentId' is set
      if (paymentInstrumentId == undefined || paymentInstrumentId == null) {
        throw new Error("Missing the required parameter 'paymentInstrumentId' when calling getCustomersByIDPaymentInstrumentsByID");
      }


      var pathParams = {
        'customer_id': customerId,
        'payment_instrument_id': paymentInstrumentId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = CustomerPaymentInstrument;

      return this.apiClient.callApi(
        '/customers/{customer_id}/payment_instruments/{payment_instrument_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getCustomersByIDProductLists operation.
     * @callback module:api/CustomersApi~getCustomersByIDProductListsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CustomerProductListResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Returns all customer product lists.
     * @param {String} customerId The customer id.
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.expand 
     * @param {module:api/CustomersApi~getCustomersByIDProductListsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CustomerProductListResult}
     */
    this.getCustomersByIDProductLists = function(customerId, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling getCustomersByIDProductLists");
      }


      var pathParams = {
        'customer_id': customerId
      };
      var queryParams = {
        'expand': this.apiClient.buildCollectionParam(opts['expand'], 'csv')
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = CustomerProductListResult;

      return this.apiClient.callApi(
        '/customers/{customer_id}/ProductLists', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getCustomersByIDProductListsByID operation.
     * @callback module:api/CustomersApi~getCustomersByIDProductListsByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CustomerProductList} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Returns a customer product list of the given customer.
     * @param {String} customerId The customer id.
     * @param {String} listId The product list id.
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.expand 
     * @param {module:api/CustomersApi~getCustomersByIDProductListsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CustomerProductList}
     */
    this.getCustomersByIDProductListsByID = function(customerId, listId, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling getCustomersByIDProductListsByID");
      }

      // verify the required parameter 'listId' is set
      if (listId == undefined || listId == null) {
        throw new Error("Missing the required parameter 'listId' when calling getCustomersByIDProductListsByID");
      }


      var pathParams = {
        'customer_id': customerId,
        'list_id': listId
      };
      var queryParams = {
        'expand': this.apiClient.buildCollectionParam(opts['expand'], 'csv')
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = CustomerProductList;

      return this.apiClient.callApi(
        '/customers/{customer_id}/ProductLists/{list_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getCustomersByIDProductListsByIDItems operation.
     * @callback module:api/CustomersApi~getCustomersByIDProductListsByIDItemsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CustomerProductListItemResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Returns a pageable list of all items of a customer&#39;s product list. The default page size is 10.
     * @param {String} customerId The id of the customer to retrieve the product list items for.
     * @param {String} listId The id of the product list.
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.expand 
     * @param {Number} opts.start 
     * @param {Number} opts.count 
     * @param {module:api/CustomersApi~getCustomersByIDProductListsByIDItemsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CustomerProductListItemResult}
     */
    this.getCustomersByIDProductListsByIDItems = function(customerId, listId, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling getCustomersByIDProductListsByIDItems");
      }

      // verify the required parameter 'listId' is set
      if (listId == undefined || listId == null) {
        throw new Error("Missing the required parameter 'listId' when calling getCustomersByIDProductListsByIDItems");
      }


      var pathParams = {
        'customer_id': customerId,
        'list_id': listId
      };
      var queryParams = {
        'expand': this.apiClient.buildCollectionParam(opts['expand'], 'csv'),
        'start': opts['start'],
        'count': opts['count']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = CustomerProductListItemResult;

      return this.apiClient.callApi(
        '/customers/{customer_id}/ProductLists/{list_id}/items', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getCustomersByIDProductListsByIDItemsByID operation.
     * @callback module:api/CustomersApi~getCustomersByIDProductListsByIDItemsByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CustomerProductListItem} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Returns an item of a customer product list.
     * @param {String} customerId The id of the customer to retrieve the product list items for.
     * @param {String} listId The id of the product list.
     * @param {String} itemId The id of the product list item to retrieve.
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.expand 
     * @param {module:api/CustomersApi~getCustomersByIDProductListsByIDItemsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CustomerProductListItem}
     */
    this.getCustomersByIDProductListsByIDItemsByID = function(customerId, listId, itemId, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling getCustomersByIDProductListsByIDItemsByID");
      }

      // verify the required parameter 'listId' is set
      if (listId == undefined || listId == null) {
        throw new Error("Missing the required parameter 'listId' when calling getCustomersByIDProductListsByIDItemsByID");
      }

      // verify the required parameter 'itemId' is set
      if (itemId == undefined || itemId == null) {
        throw new Error("Missing the required parameter 'itemId' when calling getCustomersByIDProductListsByIDItemsByID");
      }


      var pathParams = {
        'customer_id': customerId,
        'list_id': listId,
        'item_id': itemId
      };
      var queryParams = {
        'expand': this.apiClient.buildCollectionParam(opts['expand'], 'csv')
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = CustomerProductListItem;

      return this.apiClient.callApi(
        '/customers/{customer_id}/ProductLists/{list_id}/items/{item_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getCustomersByIDProductListsByIDItemsByIDPurchases operation.
     * @callback module:api/CustomersApi~getCustomersByIDProductListsByIDItemsByIDPurchasesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CustomerProductListItemPurchaseResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Returns a list of all purchases of an item from a customer&#39;s product list.
     * @param {String} customerId The id of the customer to retrieve the product list item purchases for.
     * @param {String} listId The id of the product list.
     * @param {String} itemId The id of the product list item to retrieve from.
     * @param {module:api/CustomersApi~getCustomersByIDProductListsByIDItemsByIDPurchasesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CustomerProductListItemPurchaseResult}
     */
    this.getCustomersByIDProductListsByIDItemsByIDPurchases = function(customerId, listId, itemId, callback) {
      var postBody = null;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling getCustomersByIDProductListsByIDItemsByIDPurchases");
      }

      // verify the required parameter 'listId' is set
      if (listId == undefined || listId == null) {
        throw new Error("Missing the required parameter 'listId' when calling getCustomersByIDProductListsByIDItemsByIDPurchases");
      }

      // verify the required parameter 'itemId' is set
      if (itemId == undefined || itemId == null) {
        throw new Error("Missing the required parameter 'itemId' when calling getCustomersByIDProductListsByIDItemsByIDPurchases");
      }


      var pathParams = {
        'customer_id': customerId,
        'list_id': listId,
        'item_id': itemId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = CustomerProductListItemPurchaseResult;

      return this.apiClient.callApi(
        '/customers/{customer_id}/ProductLists/{list_id}/items/{item_id}/purchases', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getCustomersByIDProductListsByIDItemsByIDPurchasesByID operation.
     * @callback module:api/CustomersApi~getCustomersByIDProductListsByIDItemsByIDPurchasesByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CustomerProductListItemPurchase} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Returns a purchase of an item from a customer&#39;s product list.
     * @param {String} customerId The id of the customer to retrieve the product list items for.
     * @param {String} listId The id of the product list.
     * @param {String} itemId The id of the product list item to retrieve.
     * @param {String} purchaseId The id of the product list item purchase to retrieve.
     * @param {module:api/CustomersApi~getCustomersByIDProductListsByIDItemsByIDPurchasesByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CustomerProductListItemPurchase}
     */
    this.getCustomersByIDProductListsByIDItemsByIDPurchasesByID = function(customerId, listId, itemId, purchaseId, callback) {
      var postBody = null;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling getCustomersByIDProductListsByIDItemsByIDPurchasesByID");
      }

      // verify the required parameter 'listId' is set
      if (listId == undefined || listId == null) {
        throw new Error("Missing the required parameter 'listId' when calling getCustomersByIDProductListsByIDItemsByIDPurchasesByID");
      }

      // verify the required parameter 'itemId' is set
      if (itemId == undefined || itemId == null) {
        throw new Error("Missing the required parameter 'itemId' when calling getCustomersByIDProductListsByIDItemsByIDPurchasesByID");
      }

      // verify the required parameter 'purchaseId' is set
      if (purchaseId == undefined || purchaseId == null) {
        throw new Error("Missing the required parameter 'purchaseId' when calling getCustomersByIDProductListsByIDItemsByIDPurchasesByID");
      }


      var pathParams = {
        'customer_id': customerId,
        'list_id': listId,
        'item_id': itemId,
        'purchase_id': purchaseId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = CustomerProductListItemPurchase;

      return this.apiClient.callApi(
        '/customers/{customer_id}/ProductLists/{list_id}/items/{item_id}/purchases/{purchase_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the patchCustomersByID operation.
     * @callback module:api/CustomersApi~patchCustomersByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Customer} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Updates a customer.
     * @param {String} customerId the customer id
     * @param {module:model/Customer} body 
     * @param {module:api/CustomersApi~patchCustomersByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Customer}
     */
    this.patchCustomersByID = function(customerId, body, callback) {
      var postBody = body;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling patchCustomersByID");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling patchCustomersByID");
      }


      var pathParams = {
        'customer_id': customerId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Customer;

      return this.apiClient.callApi(
        '/customers/{customer_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the patchCustomersByIDAddressesByID operation.
     * @callback module:api/CustomersApi~patchCustomersByIDAddressesByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CustomerAddress} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Updates a customer&#39;s address by address name.
     * @param {String} customerId the id of the customer to update the address for
     * @param {String} addressName the name of the address to update
     * @param {module:model/CustomerAddress} body 
     * @param {module:api/CustomersApi~patchCustomersByIDAddressesByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CustomerAddress}
     */
    this.patchCustomersByIDAddressesByID = function(customerId, addressName, body, callback) {
      var postBody = body;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling patchCustomersByIDAddressesByID");
      }

      // verify the required parameter 'addressName' is set
      if (addressName == undefined || addressName == null) {
        throw new Error("Missing the required parameter 'addressName' when calling patchCustomersByIDAddressesByID");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling patchCustomersByIDAddressesByID");
      }


      var pathParams = {
        'customer_id': customerId,
        'address_name': addressName
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = CustomerAddress;

      return this.apiClient.callApi(
        '/customers/{customer_id}/addresses/{address_name}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the patchCustomersByIDProductListsByID operation.
     * @callback module:api/CustomersApi~patchCustomersByIDProductListsByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CustomerProductList} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Changes a product list. Changeable properties are the name, description and if the list is public.
     * @param {module:model/CustomerProductList} body 
     * @param {String} customerId The customer id.
     * @param {String} listId The product list id.
     * @param {module:api/CustomersApi~patchCustomersByIDProductListsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CustomerProductList}
     */
    this.patchCustomersByIDProductListsByID = function(body, customerId, listId, callback) {
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling patchCustomersByIDProductListsByID");
      }

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling patchCustomersByIDProductListsByID");
      }

      // verify the required parameter 'listId' is set
      if (listId == undefined || listId == null) {
        throw new Error("Missing the required parameter 'listId' when calling patchCustomersByIDProductListsByID");
      }


      var pathParams = {
        'customer_id': customerId,
        'list_id': listId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = CustomerProductList;

      return this.apiClient.callApi(
        '/customers/{customer_id}/ProductLists/{list_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the patchCustomersByIDProductListsByIDItemsByID operation.
     * @callback module:api/CustomersApi~patchCustomersByIDProductListsByIDItemsByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CustomerProductListItem} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Updates an item of a customer&#39;s product list.  Considered values from the request body are:    priority: This is the priority of the customer&#39;s product list item.  public: This is the flag whether the customer&#39;s product list item is public.  quantity: used for product item type only. This is the quantity of  the customer&#39;s product list item.  custom properties in the form c_&lt;CUSTOM_NAME&gt;: the custom property  must correspond to a custom attribute (&lt;CUSTOM_NAME&gt;) defined for ProductListItem.  The value of this property must be valid for the type of custom attribute defined for ProductListItem.  
     * @param {String} customerId The id of the owner of the product list.
     * @param {String} listId The id of the product list.
     * @param {String} itemId The id of the product list item to update.
     * @param {module:model/CustomerProductListItem} body 
     * @param {module:api/CustomersApi~patchCustomersByIDProductListsByIDItemsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CustomerProductListItem}
     */
    this.patchCustomersByIDProductListsByIDItemsByID = function(customerId, listId, itemId, body, callback) {
      var postBody = body;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling patchCustomersByIDProductListsByIDItemsByID");
      }

      // verify the required parameter 'listId' is set
      if (listId == undefined || listId == null) {
        throw new Error("Missing the required parameter 'listId' when calling patchCustomersByIDProductListsByIDItemsByID");
      }

      // verify the required parameter 'itemId' is set
      if (itemId == undefined || itemId == null) {
        throw new Error("Missing the required parameter 'itemId' when calling patchCustomersByIDProductListsByIDItemsByID");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling patchCustomersByIDProductListsByIDItemsByID");
      }


      var pathParams = {
        'customer_id': customerId,
        'list_id': listId,
        'item_id': itemId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = CustomerProductListItem;

      return this.apiClient.callApi(
        '/customers/{customer_id}/ProductLists/{list_id}/items/{item_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the patchCustomersByIDProductListsByIDItemsByIDPurchasesByID operation.
     * @callback module:api/CustomersApi~patchCustomersByIDProductListsByIDItemsByIDPurchasesByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CustomerProductListItemPurchase} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Updates a purchase of an item from a customer&#39;s product list.  Considered values from the request body are:    custom properties in the form c_&lt;CUSTOM_NAME&gt;: the custom property  must correspond to a custom attribute (&lt;CUSTOM_NAME&gt;) defined for ProductListItemPurchase.  The value of this property must be valid for the type of custom attribute defined for ProductListItemPurchase.  
     * @param {String} customerId The id of the customer to retrieve the product list item purchases for.
     * @param {String} listId The id of the product list.
     * @param {String} itemId The id of the product list item to retrieve.
     * @param {String} purchaseId The id of the product list item purchase to retrieve.
     * @param {module:model/CustomerProductListItemPurchase} body 
     * @param {module:api/CustomersApi~patchCustomersByIDProductListsByIDItemsByIDPurchasesByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CustomerProductListItemPurchase}
     */
    this.patchCustomersByIDProductListsByIDItemsByIDPurchasesByID = function(customerId, listId, itemId, purchaseId, body, callback) {
      var postBody = body;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling patchCustomersByIDProductListsByIDItemsByIDPurchasesByID");
      }

      // verify the required parameter 'listId' is set
      if (listId == undefined || listId == null) {
        throw new Error("Missing the required parameter 'listId' when calling patchCustomersByIDProductListsByIDItemsByIDPurchasesByID");
      }

      // verify the required parameter 'itemId' is set
      if (itemId == undefined || itemId == null) {
        throw new Error("Missing the required parameter 'itemId' when calling patchCustomersByIDProductListsByIDItemsByIDPurchasesByID");
      }

      // verify the required parameter 'purchaseId' is set
      if (purchaseId == undefined || purchaseId == null) {
        throw new Error("Missing the required parameter 'purchaseId' when calling patchCustomersByIDProductListsByIDItemsByIDPurchasesByID");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling patchCustomersByIDProductListsByIDItemsByIDPurchasesByID");
      }


      var pathParams = {
        'customer_id': customerId,
        'list_id': listId,
        'item_id': itemId,
        'purchase_id': purchaseId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = CustomerProductListItemPurchase;

      return this.apiClient.callApi(
        '/customers/{customer_id}/ProductLists/{list_id}/items/{item_id}/purchases/{purchase_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postCustomers operation.
     * @callback module:api/CustomersApi~postCustomersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Customer} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Registers a customer.  The mandatory data are the credentials and profile last name and email.  When using OAuth the password in the request must not be set, otherwise an InvalidPasswordException will be thrown.  When using JWT the password is required.
     * @param {module:model/CustomerRegistration} body 
     * @param {module:api/CustomersApi~postCustomersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Customer}
     */
    this.postCustomers = function(body, callback) {
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling postCustomers");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Customer;

      return this.apiClient.callApi(
        '/customers', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postCustomersAuth operation.
     * @callback module:api/CustomersApi~postCustomersAuthCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Customer} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Obtains a new JWT (JSON Web Token) for a guest or registered  customer. Tokens are returned as a HTTP Authorization:Bearer response  header entry. These kinds of request are supported, as specified by the  type:    Type guest - creates a new guest (non-authenticated) customer  and returns a token for the customer.  Type credentials - authenticates credentials passed in the  HTTP Authorization:Basic request header, returning a token for a  successfully authenticated customer otherwise results in an  AuthenticationFailedException.  Type session - authenticates the customer (anonymous or registered)  on base of dwsid and dwsecuretoken cookies. It returns a token for a  successfully authenticated customer, otherwise results in an  AuthenticationFailedException.  Type refresh - examines the token passed in the HTTP  Authorization:Bearer request header and when valid returns a new token  with an updated expiry time.     For a request of type credentials:    Updates profile attributes for the customer (for example,  \&quot;last-visited\&quot;).  Handles the maximum number of failed login attempts.    For a request of type session:    Does not touch profile attributes for the registered customer (for example,  \&quot;last-visited\&quot;), since this is not a real login.  Returns different tokens for multiple requests with the same session id. Means, there should be  only one call per session.      About JWT The token contains 3 sections:    the header section (specifies token type and algorithm used)  the payload section (contains customer information, client id,  issue and expiration time)  finally the signature section records the token signature.    A token is created and returned to the client whenever a registered  customer logs in (type \&quot;credentials\&quot;) or a guest customer requests it (type  \&quot;guest\&quot;). The token is returned in the response header as   Authorization: Bearer --token--    The client has to include the token in the request header as   Authorization: Bearer --token--   in any follow up request. The server declines any follow up requests  without a token or which cannot be verified based on the token signature  or expiration time. A token nearing its expiration time should be  exchanged for a new one (type \&quot;refresh\&quot;).    See \&quot;API Usage &gt; JWT\&quot; for more details on using JWT as an authentication  mechanism.
     * @param {module:model/AuthRequest} body 
     * @param {Object} opts Optional parameters
     * @param {String} opts.authorization              Authorization:Basic for type credentials             Authorization:Bearer for type refresh             
     * @param {module:api/CustomersApi~postCustomersAuthCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Customer}
     */
    this.postCustomersAuth = function(body, opts, callback) {
      opts = opts || {};
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling postCustomersAuth");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var headerParams = {
        'Authorization': opts['authorization']
      };
      var formParams = {
      };

      var authNames = ['client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Customer;

      return this.apiClient.callApi(
        '/customers/auth', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postCustomersByIDAddresses operation.
     * @callback module:api/CustomersApi~postCustomersByIDAddressesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CustomerAddress} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Creates a new address with the given name for the given customer.
     * @param {String} customerId the id of the customer to create the address for
     * @param {module:model/CustomerAddress} body 
     * @param {module:api/CustomersApi~postCustomersByIDAddressesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CustomerAddress}
     */
    this.postCustomersByIDAddresses = function(customerId, body, callback) {
      var postBody = body;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling postCustomersByIDAddresses");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling postCustomersByIDAddresses");
      }


      var pathParams = {
        'customer_id': customerId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = CustomerAddress;

      return this.apiClient.callApi(
        '/customers/{customer_id}/addresses', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postCustomersByIDAuth operation.
     * @callback module:api/CustomersApi~postCustomersByIDAuthCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Customer} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Obtains a new agent on behalf token for a registered customer. Token is returned as a HTTP Authorization:Bearer  response header entry.    A token is created and returned to the client whenever an agent with Create_Order_On_Behalf_Of permission calls  the resource for a registered customer.  The token is returned in the response header as Authorization: Bearer --token--.   The client has to include the token in the request header as Authorization: Bearer --token--  in any follow up request, the agent will do on behalf of the customer.    About the order on behalf token    The token contains 3 sections:    the header section (specifies token type and algorithm used)  the payload section (contains customer information, client id, issue and expiration time)  finally the signature section records the token signature.    A token nearing its expiration time should be exchanged for a new one by calling this resource once more.
     * @param {String} customerId specifies the customer to act on behalf of
     * @param {module:api/CustomersApi~postCustomersByIDAuthCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Customer}
     */
    this.postCustomersByIDAuth = function(customerId, callback) {
      var postBody = null;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling postCustomersByIDAuth");
      }


      var pathParams = {
        'customer_id': customerId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Customer;

      return this.apiClient.callApi(
        '/customers/{customer_id}/auth', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postCustomersByIDPasswordReset operation.
     * @callback module:api/CustomersApi~postCustomersByIDPasswordResetCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Starts a password reset process. A password reset token is generated and passed together with the customer  resolved by the id provided as path parameter to a afterPOST hook. The hook  dw.ocapi.shop.customer.password_reset.afterPOST can utilize the provided reset token, for example to send a reset email.
     * @param {String} customerId the id of the customer
     * @param {module:api/CustomersApi~postCustomersByIDPasswordResetCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.postCustomersByIDPasswordReset = function(customerId, callback) {
      var postBody = null;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling postCustomersByIDPasswordReset");
      }


      var pathParams = {
        'customer_id': customerId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = null;

      return this.apiClient.callApi(
        '/customers/{customer_id}/password_reset', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postCustomersByIDPaymentInstruments operation.
     * @callback module:api/CustomersApi~postCustomersByIDPaymentInstrumentsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CustomerPaymentInstrument} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Adds a payment instrument to a customer information.
     * @param {String} customerId the id of the customer
     * @param {module:model/CustomerPaymentInstrumentRequest} body 
     * @param {module:api/CustomersApi~postCustomersByIDPaymentInstrumentsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CustomerPaymentInstrument}
     */
    this.postCustomersByIDPaymentInstruments = function(customerId, body, callback) {
      var postBody = body;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling postCustomersByIDPaymentInstruments");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling postCustomersByIDPaymentInstruments");
      }


      var pathParams = {
        'customer_id': customerId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = CustomerPaymentInstrument;

      return this.apiClient.callApi(
        '/customers/{customer_id}/payment_instruments', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postCustomersByIDProductLists operation.
     * @callback module:api/CustomersApi~postCustomersByIDProductListsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CustomerProductList} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Creates a customer product list.
     * @param {module:model/CustomerProductList} body 
     * @param {String} customerId The customer id.
     * @param {module:api/CustomersApi~postCustomersByIDProductListsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CustomerProductList}
     */
    this.postCustomersByIDProductLists = function(body, customerId, callback) {
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling postCustomersByIDProductLists");
      }

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling postCustomersByIDProductLists");
      }


      var pathParams = {
        'customer_id': customerId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = CustomerProductList;

      return this.apiClient.callApi(
        '/customers/{customer_id}/ProductLists', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postCustomersByIDProductListsByIDItems operation.
     * @callback module:api/CustomersApi~postCustomersByIDProductListsByIDItemsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CustomerProductListItem} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Adds an item to the customer&#39;s product list. Considered values from the request body are:    type: a valid type, mandatory. This is the type of the item to be added to the customer&#39;s product  list.  priority: This is the priority of the item to be added to the customer&#39;s product list.  public: This is the flag whether the item to be added to the customer&#39;s product list is public.  product_id: a valid product id, used for product item type only. This is the id (sku)  of the product related to the item to be added to the customer&#39;s product list. It is mandatory for  product item type and it must be a valid product id, otherwise  ProductListProductIdMissingException or ProductListProductNotFoundException  will be thrown.  quantity: used for product item type only. This is the quantity of the item to be  added to the customer&#39;s product list.  custom properties in the form c_&lt;CUSTOM_NAME&gt;: the custom property must correspond to a custom  attribute (&lt;CUSTOM_NAME&gt;) defined for ProductListItem. The value of this property must be valid for the  type of custom attribute defined for ProductListItem.  
     * @param {String} customerId The id of the customer - owner of the product list.
     * @param {String} listId The id of the product list
     * @param {module:model/CustomerProductListItem} body 
     * @param {module:api/CustomersApi~postCustomersByIDProductListsByIDItemsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CustomerProductListItem}
     */
    this.postCustomersByIDProductListsByIDItems = function(customerId, listId, body, callback) {
      var postBody = body;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling postCustomersByIDProductListsByIDItems");
      }

      // verify the required parameter 'listId' is set
      if (listId == undefined || listId == null) {
        throw new Error("Missing the required parameter 'listId' when calling postCustomersByIDProductListsByIDItems");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling postCustomersByIDProductListsByIDItems");
      }


      var pathParams = {
        'customer_id': customerId,
        'list_id': listId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = CustomerProductListItem;

      return this.apiClient.callApi(
        '/customers/{customer_id}/ProductLists/{list_id}/items', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postCustomersByIDProductListsByIDItemsByIDPurchases operation.
     * @callback module:api/CustomersApi~postCustomersByIDProductListsByIDItemsByIDPurchasesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CustomerProductListItemPurchase} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Adds a purchase to an item in the customer&#39;s product list. Considered values from the request body are:    purchaser_name: name of the purchaser, mandatory. This is the full name of the purchaser of this product  list item.  quantity: amount purchased, mandatory. This is the quantity of the items purchased from  the product list.  custom properties in the form c_&lt;CUSTOM_NAME&gt;: the custom property must correspond to a custom  attribute (&lt;CUSTOM_NAME&gt;) defined for ProductListItemPurchase. The value of this property must be valid for the  type of custom attribute defined for ProductListItemPurchase.  
     * @param {String} customerId The id of the customer - owner of the product list.
     * @param {String} listId The id of the product list.
     * @param {String} itemId The id of the product list item where to add the purchase.
     * @param {module:model/CustomerProductListItemPurchase} body 
     * @param {module:api/CustomersApi~postCustomersByIDProductListsByIDItemsByIDPurchasesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CustomerProductListItemPurchase}
     */
    this.postCustomersByIDProductListsByIDItemsByIDPurchases = function(customerId, listId, itemId, body, callback) {
      var postBody = body;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling postCustomersByIDProductListsByIDItemsByIDPurchases");
      }

      // verify the required parameter 'listId' is set
      if (listId == undefined || listId == null) {
        throw new Error("Missing the required parameter 'listId' when calling postCustomersByIDProductListsByIDItemsByIDPurchases");
      }

      // verify the required parameter 'itemId' is set
      if (itemId == undefined || itemId == null) {
        throw new Error("Missing the required parameter 'itemId' when calling postCustomersByIDProductListsByIDItemsByIDPurchases");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling postCustomersByIDProductListsByIDItemsByIDPurchases");
      }


      var pathParams = {
        'customer_id': customerId,
        'list_id': listId,
        'item_id': itemId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = CustomerProductListItemPurchase;

      return this.apiClient.callApi(
        '/customers/{customer_id}/ProductLists/{list_id}/items/{item_id}/purchases', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postCustomersPasswordReset operation.
     * @callback module:api/CustomersApi~postCustomersPasswordResetCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Starts a password reset process. A password reset token is generated and  together with the resolved customer is passed to a afterPOST  hook. The customer resolution is based on the password reset request  type. Currently the resolution can be done by email or login. In case of  an email the password reset hook is only executed if one and only one  customer has been identified for that email. In the case that more than  one customers have been identified for the provided email the resource  does nothing.
     * @param {module:model/PasswordReset} body 
     * @param {module:api/CustomersApi~postCustomersPasswordResetCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.postCustomersPasswordReset = function(body, callback) {
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling postCustomersPasswordReset");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = null;

      return this.apiClient.callApi(
        '/customers/password_reset', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the putCustomersByIDPassword operation.
     * @callback module:api/CustomersApi~putCustomersByIDPasswordCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Updates the customer&#39;s password.
     * @param {String} customerId the customer id
     * @param {module:model/PasswordChangeRequest} body 
     * @param {module:api/CustomersApi~putCustomersByIDPasswordCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.putCustomersByIDPassword = function(customerId, body, callback) {
      var postBody = body;

      // verify the required parameter 'customerId' is set
      if (customerId == undefined || customerId == null) {
        throw new Error("Missing the required parameter 'customerId' when calling putCustomersByIDPassword");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling putCustomersByIDPassword");
      }


      var pathParams = {
        'customer_id': customerId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = null;

      return this.apiClient.callApi(
        '/customers/{customer_id}/password', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ContentFolder', 'model/ContentFolderResult'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/ContentFolder'), require('../model/ContentFolderResult'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.FoldersApi = factory(root.ShopApi.ApiClient, root.ShopApi.ContentFolder, root.ShopApi.ContentFolderResult);
  }
}(this, function(ApiClient, ContentFolder, ContentFolderResult) {
  'use strict';

  /**
   * Folders service.
   * @module api/FoldersApi
   * @version 17.3
   */

  /**
   * Constructs a new FoldersApi. 
   * @alias module:api/FoldersApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getFoldersByID operation.
     * @callback module:api/FoldersApi~getFoldersByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ContentFolder} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * To access a content folder, you construct a URL using the template shown below. This template requires you to  specify a content folder id and a subfolder level. In response, the server returns a corresponding content  folder document. Only content folder, which are marked as online are returned.
     * @param {String} id The id of the requested content folder.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.levels 
     * @param {String} opts.locale 
     * @param {module:api/FoldersApi~getFoldersByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ContentFolder}
     */
    this.getFoldersByID = function(id, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw new Error("Missing the required parameter 'id' when calling getFoldersByID");
      }


      var pathParams = {
        'id': id
      };
      var queryParams = {
        'levels': opts['levels'],
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = ContentFolder;

      return this.apiClient.callApi(
        '/folders/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getFoldersByIDs operation.
     * @callback module:api/FoldersApi~getFoldersByIDsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ContentFolderResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Array.<String>} ids 
     * @param {Object} opts Optional parameters
     * @param {Number} opts.levels 
     * @param {String} opts.locale 
     * @param {module:api/FoldersApi~getFoldersByIDsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ContentFolderResult}
     */
    this.getFoldersByIDs = function(ids, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'ids' is set
      if (ids == undefined || ids == null) {
        throw new Error("Missing the required parameter 'ids' when calling getFoldersByIDs");
      }


      var pathParams = {
        'ids': ids
      };
      var queryParams = {
        'levels': opts['levels'],
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = ContentFolderResult;

      return this.apiClient.callApi(
        '/folders/({ids})', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/GiftCertificate', 'model/GiftCertificateRequest'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/GiftCertificate'), require('../model/GiftCertificateRequest'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.Gift_certificateApi = factory(root.ShopApi.ApiClient, root.ShopApi.GiftCertificate, root.ShopApi.GiftCertificateRequest);
  }
}(this, function(ApiClient, GiftCertificate, GiftCertificateRequest) {
  'use strict';

  /**
   * Gift_certificate service.
   * @module api/Gift_certificateApi
   * @version 17.3
   */

  /**
   * Constructs a new Gift_certificateApi. 
   * @alias module:api/Gift_certificateApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the postGiftCertificate operation.
     * @callback module:api/Gift_certificateApi~postGiftCertificateCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GiftCertificate} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Action to retrieve an existing gift certificate.
     * @param {Object} opts Optional parameters
     * @param {module:model/GiftCertificateRequest} opts.body 
     * @param {module:api/Gift_certificateApi~postGiftCertificateCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GiftCertificate}
     */
    this.postGiftCertificate = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];


      var pathParams = {
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = GiftCertificate;

      return this.apiClient.callApi(
        '/gift_certificate', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/OrderSearchRequest', 'model/OrderSearchResult'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/OrderSearchRequest'), require('../model/OrderSearchResult'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.OrderSearchApi = factory(root.ShopApi.ApiClient, root.ShopApi.OrderSearchRequest, root.ShopApi.OrderSearchResult);
  }
}(this, function(ApiClient, OrderSearchRequest, OrderSearchResult) {
  'use strict';

  /**
   * OrderSearch service.
   * @module api/OrderSearchApi
   * @version 17.3
   */

  /**
   * Constructs a new OrderSearchApi. 
   * @alias module:api/OrderSearchApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the postOrderSearch operation.
     * @callback module:api/OrderSearchApi~postOrderSearchCallback
     * @param {String} error Error message, if any.
     * @param {module:model/OrderSearchResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Searches for orders.    The query attribute specifies a complex query that can be used to narrow down the search.    Note that search fields are mandatory now and no default ones are supported.    As the old order search version, the new one always uses Search Service too and the for that reason Order  Incremental Indexing should be enabled. Otherwise HTTP 500 response will occur.    The supported search fields are:    affiliate_partner_i_d  affiliate_partner_name  business_type  channel_type  confirmation_status (String)  created_by  creation_date  currency_code  customer_email  customer_name  customer_no  export_after  export_status (String)  external_order_no  external_order_status  last_modified  order_no  original_order_no  payment_status (String)  replaced_order_no  replacement_order_no  shipping_status (String)  status (String)  total_gross_price  total_net_price  order.has_holds  coupon_line_items.coupon_code  coupon_line_items.coupon_id  holds.type  invoices.status  order_items.status  payment_instruments.credit_card_type  payment_instruments.payment_method_id  product_items.product_id  return_cases.return_case_number  shipments.shipping_method_id  shipping_orders.shipping_order_number    The sort order of the retrieved orders could be specified by the \&quot;sorts\&quot; parameter. It is a list of objects  presenting field name and sort direction (\&quot;asc\&quot; or \&quot;desc\&quot;).    Custom attributes could be used as search fields and as sort fields too. A prefix \&quot;c_\&quot; has to be added to them.
     * @param {module:model/OrderSearchRequest} body 
     * @param {module:api/OrderSearchApi~postOrderSearchCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/OrderSearchResult}
     */
    this.postOrderSearch = function(body, callback) {
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling postOrderSearch");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = OrderSearchResult;

      return this.apiClient.callApi(
        '/OrderSearch', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Basket', 'model/Note', 'model/NotesResult', 'model/Order', 'model/OrderPaymentInstrumentRequest', 'model/PaymentMethodResult'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/Basket'), require('../model/Note'), require('../model/NotesResult'), require('../model/Order'), require('../model/OrderPaymentInstrumentRequest'), require('../model/PaymentMethodResult'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.OrdersApi = factory(root.ShopApi.ApiClient, root.ShopApi.Basket, root.ShopApi.Note, root.ShopApi.NotesResult, root.ShopApi.Order, root.ShopApi.OrderPaymentInstrumentRequest, root.ShopApi.PaymentMethodResult);
  }
}(this, function(ApiClient, Basket, Note, NotesResult, Order, OrderPaymentInstrumentRequest, PaymentMethodResult) {
  'use strict';

  /**
   * Orders service.
   * @module api/OrdersApi
   * @version 17.3
   */

  /**
   * Constructs a new OrdersApi. 
   * @alias module:api/OrdersApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the deleteOrdersByIDNotesByID operation.
     * @callback module:api/OrdersApi~deleteOrdersByIDNotesByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Order} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Removes an order note.
     * @param {String} orderNo the id of the order to be modified
     * @param {String} noteId the id of the note to be removed
     * @param {module:api/OrdersApi~deleteOrdersByIDNotesByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Order}
     */
    this.deleteOrdersByIDNotesByID = function(orderNo, noteId, callback) {
      var postBody = null;

      // verify the required parameter 'orderNo' is set
      if (orderNo == undefined || orderNo == null) {
        throw new Error("Missing the required parameter 'orderNo' when calling deleteOrdersByIDNotesByID");
      }

      // verify the required parameter 'noteId' is set
      if (noteId == undefined || noteId == null) {
        throw new Error("Missing the required parameter 'noteId' when calling deleteOrdersByIDNotesByID");
      }


      var pathParams = {
        'order_no': orderNo,
        'note_id': noteId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Order;

      return this.apiClient.callApi(
        '/orders/{order_no}/notes/{note_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteOrdersByIDPaymentInstrumentsByID operation.
     * @callback module:api/OrdersApi~deleteOrdersByIDPaymentInstrumentsByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Order} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Removes a payment instrument of an order.
     * @param {String} orderNo the order number
     * @param {String} paymentInstrumentId the id of the payment instrument to be updated
     * @param {module:api/OrdersApi~deleteOrdersByIDPaymentInstrumentsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Order}
     */
    this.deleteOrdersByIDPaymentInstrumentsByID = function(orderNo, paymentInstrumentId, callback) {
      var postBody = null;

      // verify the required parameter 'orderNo' is set
      if (orderNo == undefined || orderNo == null) {
        throw new Error("Missing the required parameter 'orderNo' when calling deleteOrdersByIDPaymentInstrumentsByID");
      }

      // verify the required parameter 'paymentInstrumentId' is set
      if (paymentInstrumentId == undefined || paymentInstrumentId == null) {
        throw new Error("Missing the required parameter 'paymentInstrumentId' when calling deleteOrdersByIDPaymentInstrumentsByID");
      }


      var pathParams = {
        'order_no': orderNo,
        'payment_instrument_id': paymentInstrumentId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Order;

      return this.apiClient.callApi(
        '/orders/{order_no}/payment_instruments/{payment_instrument_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getOrdersByID operation.
     * @callback module:api/OrdersApi~getOrdersByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Order} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Gets information for an order.
     * @param {String} orderNo the order number
     * @param {module:api/OrdersApi~getOrdersByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Order}
     */
    this.getOrdersByID = function(orderNo, callback) {
      var postBody = null;

      // verify the required parameter 'orderNo' is set
      if (orderNo == undefined || orderNo == null) {
        throw new Error("Missing the required parameter 'orderNo' when calling getOrdersByID");
      }


      var pathParams = {
        'order_no': orderNo
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Order;

      return this.apiClient.callApi(
        '/orders/{order_no}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getOrdersByIDNotes operation.
     * @callback module:api/OrdersApi~getOrdersByIDNotesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/NotesResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieves notes for an order.
     * @param {String} orderNo The id of the order from which you want to retrieve notes.
     * @param {module:api/OrdersApi~getOrdersByIDNotesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/NotesResult}
     */
    this.getOrdersByIDNotes = function(orderNo, callback) {
      var postBody = null;

      // verify the required parameter 'orderNo' is set
      if (orderNo == undefined || orderNo == null) {
        throw new Error("Missing the required parameter 'orderNo' when calling getOrdersByIDNotes");
      }


      var pathParams = {
        'order_no': orderNo
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = NotesResult;

      return this.apiClient.callApi(
        '/orders/{order_no}/notes', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getOrdersByIDPaymentMethods operation.
     * @callback module:api/OrdersApi~getOrdersByIDPaymentMethodsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PaymentMethodResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Gets the applicable payment methods for an existing order considering the open payment amount only.
     * @param {String} orderNo the order number
     * @param {module:api/OrdersApi~getOrdersByIDPaymentMethodsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PaymentMethodResult}
     */
    this.getOrdersByIDPaymentMethods = function(orderNo, callback) {
      var postBody = null;

      // verify the required parameter 'orderNo' is set
      if (orderNo == undefined || orderNo == null) {
        throw new Error("Missing the required parameter 'orderNo' when calling getOrdersByIDPaymentMethods");
      }


      var pathParams = {
        'order_no': orderNo
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = PaymentMethodResult;

      return this.apiClient.callApi(
        '/orders/{order_no}/payment_methods', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the patchOrdersByID operation.
     * @callback module:api/OrdersApi~patchOrdersByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Order} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update an order.   Considered fields for update are status (same status transitions are possible as for dw.order.Order.setStatus(int  status) plus CREATED to FAILED) and custom properties. During the call the correct channel type will be assured to be set for the order  in a successful call. Without agent context the channel type will be storefront otherwise callcenter.
     * @param {String} orderNo the order number
     * @param {module:model/Order} body 
     * @param {module:api/OrdersApi~patchOrdersByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Order}
     */
    this.patchOrdersByID = function(orderNo, body, callback) {
      var postBody = body;

      // verify the required parameter 'orderNo' is set
      if (orderNo == undefined || orderNo == null) {
        throw new Error("Missing the required parameter 'orderNo' when calling patchOrdersByID");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling patchOrdersByID");
      }


      var pathParams = {
        'order_no': orderNo
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Order;

      return this.apiClient.callApi(
        '/orders/{order_no}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the patchOrdersByIDPaymentInstrumentsByID operation.
     * @callback module:api/OrdersApi~patchOrdersByIDPaymentInstrumentsByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Order} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Updates a payment instrument of an order and passes the order and updated payment instrument to the correct  payment authorizeCreditcard or authorize hook.   Details:    The payment instrument is updated with the provided details. The payment method must be applicable for the  order see GET /baskets/{basket_id}/payment_methods, if the payment method is &#39;CREDIT_CARD&#39; a  payment_card must be specified in the request.      Order authorization:      To authorize the order one of two possible customization hooks is called and an  dw.order.OrderPaymentInstrument is passed as an input argument.      Which hook is called?      If the request includes a payment_card or the dw.order.OrderPaymentInstrument  contains a creditCardType the customization hook dw.order.payment.authorizeCreditCard is called.  See dw.order.hooks.PaymentHooks.authorizeCreditCard(order : Order, paymentDetails : OrderPaymentInstrument, cvn : String) : Status.  Otherwise dw.order.payment.authorize is called.  See dw.order.hooks.PaymentHooks.authorize(order : Order, paymentDetails : OrderPaymentInstrument) : Status.      What is the dw.order.OrderPaymentInstrument input argument passed to the hook?      If the request contains a customer_payment_instrument_id the  dw.order.OrderPaymentInstrument is copied from the customer payment instrument (An exception is thrown  if none was found).  Otherwise the data from the request document is passed (payment_card or  payment_bank_account etc. information).      Note: the amount and the security_code (cvn) contained in the  payment_card data will be propagated if available to  dw.order.payment.authorizeCreditCard even if the dw.order.OrderPaymentInstrument is  resolved from a customer payment instrument.      Customization hook dw.ocapi.shop.order.afterPatchPaymentInstrument is called. The default  implementation places the order if the order status is CREATED and the authorization amount equals or exceeds the  order total. Placing the order (equivalent to calling dw.order.OrderMgr.placeOrder(order : Order)  in the scripting API) results in the order being changed to status NEW and prepared for export.  
     * @param {String} orderNo the order number
     * @param {String} paymentInstrumentId the id of the payment instrument to be updated
     * @param {module:model/OrderPaymentInstrumentRequest} body 
     * @param {module:api/OrdersApi~patchOrdersByIDPaymentInstrumentsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Order}
     */
    this.patchOrdersByIDPaymentInstrumentsByID = function(orderNo, paymentInstrumentId, body, callback) {
      var postBody = body;

      // verify the required parameter 'orderNo' is set
      if (orderNo == undefined || orderNo == null) {
        throw new Error("Missing the required parameter 'orderNo' when calling patchOrdersByIDPaymentInstrumentsByID");
      }

      // verify the required parameter 'paymentInstrumentId' is set
      if (paymentInstrumentId == undefined || paymentInstrumentId == null) {
        throw new Error("Missing the required parameter 'paymentInstrumentId' when calling patchOrdersByIDPaymentInstrumentsByID");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling patchOrdersByIDPaymentInstrumentsByID");
      }


      var pathParams = {
        'order_no': orderNo,
        'payment_instrument_id': paymentInstrumentId
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Order;

      return this.apiClient.callApi(
        '/orders/{order_no}/payment_instruments/{payment_instrument_id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postOrders operation.
     * @callback module:api/OrdersApi~postOrdersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Order} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Submits an order based on a prepared basket.  Note: If the basket has been submitted  using Order Center (considered by it&#39;s client id) the channel type will  be set to \&quot;Call Center\&quot;. In case another channel type was set by a script  before submitting the basket, the channel type will be reset to  \&quot;Call Center\&quot; and a warning will be logged.  The only considered value from the request body is basket_id.
     * @param {module:model/Basket} body 
     * @param {module:api/OrdersApi~postOrdersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Order}
     */
    this.postOrders = function(body, callback) {
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling postOrders");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Order;

      return this.apiClient.callApi(
        '/orders', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postOrdersByIDNotes operation.
     * @callback module:api/OrdersApi~postOrdersByIDNotesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Order} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Adds a note to an existing order.
     * @param {String} orderNo The id of the order to be modified.
     * @param {module:model/Note} body 
     * @param {module:api/OrdersApi~postOrdersByIDNotesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Order}
     */
    this.postOrdersByIDNotes = function(orderNo, body, callback) {
      var postBody = body;

      // verify the required parameter 'orderNo' is set
      if (orderNo == undefined || orderNo == null) {
        throw new Error("Missing the required parameter 'orderNo' when calling postOrdersByIDNotes");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling postOrdersByIDNotes");
      }


      var pathParams = {
        'order_no': orderNo
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Order;

      return this.apiClient.callApi(
        '/orders/{order_no}/notes', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postOrdersByIDPaymentInstruments operation.
     * @callback module:api/OrdersApi~postOrdersByIDPaymentInstrumentsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Order} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Adds a payment instrument to an order. It is possible either to supply the full payment information or only a  customer payment instrument id and amount. In case the customer payment instrument id was set all the other  properties (except amount) are ignored and the payment data is resolved from the stored customer payment  information. An attempt is made to authorize the order by passing it to the authorize or authorizeCreditCard  hook.   Details:    The payment instrument is added with the provided details or the details from the customer payment  instrument. The payment method must be applicable for the order see GET  /baskets/{basket_id}/payment_methods, if the payment method is &#39;CREDIT_CARD&#39; a  payment_card must be specified in the request.      Order authorization:      To authorize the order one of two possible customization hooks is called and an  dw.order.OrderPaymentInstrument is passed as an input argument.      Which hook is called?      If the request includes a payment_card or the dw.order.OrderPaymentInstrument  contains a creditCardType the customization hook dw.order.payment.authorizeCreditCard is called.   See dw.order.hooks.PaymentHooks.authorizeCreditCard(order : Order, paymentDetails : OrderPaymentInstrument, cvn : String) : Status.  Otherwise dw.order.payment.authorize is called. See dw.order.hooks.PaymentHooks.authorize(order : Order, paymentDetails : OrderPaymentInstrument) : Status.      What is the dw.order.OrderPaymentInstrument input argument passed to the hook?      If the request contains a customer_payment_instrument_id the  dw.order.OrderPaymentInstrument is copied from the customer payment instrument (An exception is thrown  if none was found).  Otherwise the data from the request document is passed (payment_card or  payment_bank_account etc. information).      Note: the amount and the security_code (cvn) contained in the  payment_card data will be propagated if available to  dw.order.payment.authorizeCreditCard even if the dw.order.OrderPaymentInstrument is  resolved from a customer payment instrument.      Customization hook dw.ocapi.shop.order.afterPostPaymentInstrument is called. The default  implementation places the order if the order status is CREATED and the authorization amount equals or exceeds the  order total. Placing the order (equivalent to calling dw.order.OrderMgr.placeOrder(order : Order) in the  scripting API) results in the order being changed to status NEW and prepared for export.  
     * @param {String} orderNo the order number
     * @param {module:model/OrderPaymentInstrumentRequest} body 
     * @param {module:api/OrdersApi~postOrdersByIDPaymentInstrumentsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Order}
     */
    this.postOrdersByIDPaymentInstruments = function(orderNo, body, callback) {
      var postBody = body;

      // verify the required parameter 'orderNo' is set
      if (orderNo == undefined || orderNo == null) {
        throw new Error("Missing the required parameter 'orderNo' when calling postOrdersByIDPaymentInstruments");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling postOrdersByIDPaymentInstruments");
      }


      var pathParams = {
        'order_no': orderNo
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Order;

      return this.apiClient.callApi(
        '/orders/{order_no}/payment_instruments', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/PriceAdjustmentLimits'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/PriceAdjustmentLimits'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.PriceAdjustmentLimitsApi = factory(root.ShopApi.ApiClient, root.ShopApi.PriceAdjustmentLimits);
  }
}(this, function(ApiClient, PriceAdjustmentLimits) {
  'use strict';

  /**
   * PriceAdjustmentLimits service.
   * @module api/PriceAdjustmentLimitsApi
   * @version 17.3
   */

  /**
   * Constructs a new PriceAdjustmentLimitsApi. 
   * @alias module:api/PriceAdjustmentLimitsApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getPriceAdjustmentLimits operation.
     * @callback module:api/PriceAdjustmentLimitsApi~getPriceAdjustmentLimitsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PriceAdjustmentLimits} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Returns a list of price adjustment limits for the authenticated user and the site defined in the URL.    At least one of the following functional permissions must be assigned to the user to be able to access it:  Adjust_Item_Price or Adjust_Shipping_Price or Adjust_Order_Price.  
     * @param {module:api/PriceAdjustmentLimitsApi~getPriceAdjustmentLimitsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PriceAdjustmentLimits}
     */
    this.getPriceAdjustmentLimits = function(callback) {
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = PriceAdjustmentLimits;

      return this.apiClient.callApi(
        '/PriceAdjustmentLimits', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/PublicProductList', 'model/PublicProductListItem', 'model/PublicProductListItemResult', 'model/PublicProductListResult'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/PublicProductList'), require('../model/PublicProductListItem'), require('../model/PublicProductListItemResult'), require('../model/PublicProductListResult'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ProductListsApi = factory(root.ShopApi.ApiClient, root.ShopApi.PublicProductList, root.ShopApi.PublicProductListItem, root.ShopApi.PublicProductListItemResult, root.ShopApi.PublicProductListResult);
  }
}(this, function(ApiClient, PublicProductList, PublicProductListItem, PublicProductListItemResult, PublicProductListResult) {
  'use strict';

  /**
   * ProductLists service.
   * @module api/ProductListsApi
   * @version 17.3
   */

  /**
   * Constructs a new ProductListsApi. 
   * @alias module:api/ProductListsApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getProductLists operation.
     * @callback module:api/ProductListsApi~getProductListsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PublicProductListResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * productListResultWO  | /data[1]/link  Retrieves all public product lists as defined by the given search term (email, first name, last name).
     * @param {Object} opts Optional parameters
     * @param {String} opts.email The email address of the customer, the product lists belong to.
     * @param {String} opts.firstname The first name of the customer, the product lists belong to.
     * @param {String} opts.lastname The last name of the customer, the product lists belong to.
     * @param {module:api/ProductListsApi~getProductListsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PublicProductListResult}
     */
    this.getProductLists = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'email': opts['email'],
        'firstname': opts['firstname'],
        'lastname': opts['lastname']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = PublicProductListResult;

      return this.apiClient.callApi(
        '/ProductLists', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getProductListsByID operation.
     * @callback module:api/ProductListsApi~getProductListsByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PublicProductList} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieves a public product list by id.
     * @param {String} listId The id of the list.
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.expand 
     * @param {module:api/ProductListsApi~getProductListsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PublicProductList}
     */
    this.getProductListsByID = function(listId, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'listId' is set
      if (listId == undefined || listId == null) {
        throw new Error("Missing the required parameter 'listId' when calling getProductListsByID");
      }


      var pathParams = {
        'list_id': listId
      };
      var queryParams = {
        'expand': this.apiClient.buildCollectionParam(opts['expand'], 'csv')
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = PublicProductList;

      return this.apiClient.callApi(
        '/ProductLists/{list_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getProductListsByIDItems operation.
     * @callback module:api/ProductListsApi~getProductListsByIDItemsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PublicProductListItemResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieves the items of a public product list.
     * @param {String} listId The id of the list.
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.expand 
     * @param {module:api/ProductListsApi~getProductListsByIDItemsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PublicProductListItemResult}
     */
    this.getProductListsByIDItems = function(listId, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'listId' is set
      if (listId == undefined || listId == null) {
        throw new Error("Missing the required parameter 'listId' when calling getProductListsByIDItems");
      }


      var pathParams = {
        'list_id': listId
      };
      var queryParams = {
        'expand': this.apiClient.buildCollectionParam(opts['expand'], 'csv')
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = PublicProductListItemResult;

      return this.apiClient.callApi(
        '/ProductLists/{list_id}/items', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getProductListsByIDItemsByID operation.
     * @callback module:api/ProductListsApi~getProductListsByIDItemsByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PublicProductListItem} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieves an item from a public product list.
     * @param {String} listId The id of the list.
     * @param {String} itemId The id of the item.
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.expand 
     * @param {module:api/ProductListsApi~getProductListsByIDItemsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PublicProductListItem}
     */
    this.getProductListsByIDItemsByID = function(listId, itemId, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'listId' is set
      if (listId == undefined || listId == null) {
        throw new Error("Missing the required parameter 'listId' when calling getProductListsByIDItemsByID");
      }

      // verify the required parameter 'itemId' is set
      if (itemId == undefined || itemId == null) {
        throw new Error("Missing the required parameter 'itemId' when calling getProductListsByIDItemsByID");
      }


      var pathParams = {
        'list_id': listId,
        'item_id': itemId
      };
      var queryParams = {
        'expand': this.apiClient.buildCollectionParam(opts['expand'], 'csv')
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = PublicProductListItem;

      return this.apiClient.callApi(
        '/ProductLists/{list_id}/items/{item_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ProductSearchResult'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/ProductSearchResult'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ProductSearchApi = factory(root.ShopApi.ApiClient, root.ShopApi.ProductSearchResult);
  }
}(this, function(ApiClient, ProductSearchResult) {
  'use strict';

  /**
   * ProductSearch service.
   * @module api/ProductSearchApi
   * @version 17.3
   */

  /**
   * Constructs a new ProductSearchApi. 
   * @alias module:api/ProductSearchApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getProductSearch operation.
     * @callback module:api/ProductSearchApi~getProductSearchCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ProductSearchResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Provides keyword and refinement search functionality for products. Only returns the product id, link and name in  the product search hit. Other search hit properties can be added by using the expand parameter. The search result  contains only products that are online and assigned to site catalog.
     * @param {Object} opts Optional parameters
     * @param {String} opts.q The query phrase to search for.
     * @param {Array.<String>} opts.refine Parameter that represents a refinement attribute/value(s) pair. Refinement attribute id and             value(s) are separated by &#39;&#x3D;&#39;. Multiple values are supported by a sub-set of refinement attributes and             can be provided by separating them using a pipe (URL             encoded &#x3D; \&quot;|\&quot;). Value ranges can be specified like this: refine&#x3D;price&#x3D;(100..500) Multiple refine             parameters can be provided by adding an underscore in combination with an integer counter right behind             the parameter name and a counter range 1..9. I.e. refine_1&#x3D;c_refinementColor&#x3D;red|green|blue. The             following system refinement attribute ids are supported:                          cgid: Allows to refine per single category id. Multiple category ids are not supported.             price: Allows to refine per single price range. Multiple price ranges are not supported.             pmid: Allows to refine per promotion id(s).             orderable_only: Unavailable products will be excluded from the search results if true is set. Multiple             refinement values are not supported.             
     * @param {String} opts.sort The id of the sorting option to sort the search hits.
     * @param {Number} opts.start The result set index to return the first instance for. Default value is 0.
     * @param {Number} opts.count The maximum number of instances per request. Default value is 25.
     * @param {Array.<String>} opts.expand The expand parameter. A comma separated list with the allowed values (availability, images,             prices, variations)
     * @param {String} opts.currency The currency mnemonic specified for price. This parameter is effective only if specified expand parameter value contains prices.
     * @param {String} opts.locale The locale context.
     * @param {module:api/ProductSearchApi~getProductSearchCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ProductSearchResult}
     */
    this.getProductSearch = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'q': opts['q'],
        'refine': this.apiClient.buildCollectionParam(opts['refine'], 'csv'),
        'sort': opts['sort'],
        'start': opts['start'],
        'count': opts['count'],
        'expand': this.apiClient.buildCollectionParam(opts['expand'], 'csv'),
        'currency': opts['currency'],
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = ProductSearchResult;

      return this.apiClient.callApi(
        '/ProductSearch', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getProductSearchAvailability operation.
     * @callback module:api/ProductSearchApi~getProductSearchAvailabilityCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ProductSearchResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Provides keyword and refinement search functionality for products. Only returns the product id, link, name and  availability information in the product search hit.
     * @param {Object} opts Optional parameters
     * @param {String} opts.q The query phrase to search for.
     * @param {Array.<String>} opts.refine Parameter that represents a refinement attribute/value(s) pair. Refinement attribute id and             value(s) are separated by &#39;&#x3D;&#39;. Multiple values are supported by a sub-set of refinement attributes and             can be provided by separating them using a pipe (URL             encoded &#x3D; \&quot;|\&quot;). Value ranges can be specified like this: refine&#x3D;price&#x3D;(100..500) Multiple refine             parameters can be provided by adding an underscore in combination with an integer counter right behind             the parameter name and a counter range 1..9. I.e. refine_1&#x3D;c_refinementColor&#x3D;red|green|blue. The             following system refinement attribute ids are supported:                          cgid: Allows to refine per single category id. Multiple category ids are not supported.             price: Allows to refine per single price range. Multiple price ranges are not supported.             pmid: Allows to refine per promotion id(s).             orderable_only: Unavailable products will be excluded from the search results if true is set. Multiple             refinement values are not supported.             
     * @param {String} opts.sort The id of the sorting option to sort the search hits.
     * @param {Number} opts.start The result set index to return the first instance for. Default value is 0.
     * @param {Number} opts.count The maximum number of instances per request. Default value is 25.
     * @param {String} opts.locale The locale context.
     * @param {module:api/ProductSearchApi~getProductSearchAvailabilityCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ProductSearchResult}
     */
    this.getProductSearchAvailability = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'q': opts['q'],
        'refine': this.apiClient.buildCollectionParam(opts['refine'], 'csv'),
        'sort': opts['sort'],
        'start': opts['start'],
        'count': opts['count'],
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = ProductSearchResult;

      return this.apiClient.callApi(
        '/ProductSearch/availability', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getProductSearchImages operation.
     * @callback module:api/ProductSearchApi~getProductSearchImagesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ProductSearchResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Provides keyword and refinement search functionality for products. Only returns the product id, link, name and  image information in the product search hit.
     * @param {Object} opts Optional parameters
     * @param {String} opts.q The query phrase to search for.
     * @param {Array.<String>} opts.refine Parameter that represents a refinement attribute/value(s) pair. Refinement attribute id and             value(s) are separated by &#39;&#x3D;&#39;. Multiple values are supported by a sub-set of refinement attributes and             can be provided by separating them using a pipe (URL             encoded &#x3D; \&quot;|\&quot;). Value ranges can be specified like this: refine&#x3D;price&#x3D;(100..500) Multiple refine             parameters can be provided by adding an underscore in combination with an integer counter right behind             the parameter name and a counter range 1..9. I.e. refine_1&#x3D;c_refinementColor&#x3D;red|green|blue. The             following system refinement attribute ids are supported:                          cgid: Allows to refine per single category id. Multiple category ids are not supported.             price: Allows to refine per single price range. Multiple price ranges are not supported.             pmid: Allows to refine per promotion id(s).             orderable_only: Unavailable products will be excluded from the search results if true is set. Multiple             refinement values are not supported.             
     * @param {String} opts.sort The id of the sorting option to sort the search hits.
     * @param {Number} opts.start The result set index to return the first instance for. Default value is 0.
     * @param {Number} opts.count The maximum number of instances per request. Default value is 25.
     * @param {String} opts.locale The locale context.
     * @param {module:api/ProductSearchApi~getProductSearchImagesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ProductSearchResult}
     */
    this.getProductSearchImages = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'q': opts['q'],
        'refine': this.apiClient.buildCollectionParam(opts['refine'], 'csv'),
        'sort': opts['sort'],
        'start': opts['start'],
        'count': opts['count'],
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = ProductSearchResult;

      return this.apiClient.callApi(
        '/ProductSearch/images', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getProductSearchPrices operation.
     * @callback module:api/ProductSearchApi~getProductSearchPricesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ProductSearchResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Provides keyword and refinement search functionality for products. Only returns the product id, link, name and  price information in the product search hit.
     * @param {Object} opts Optional parameters
     * @param {String} opts.q The query phrase to search for.
     * @param {Array.<String>} opts.refine Parameter that represents a refinement attribute/value(s) pair. Refinement attribute id and             value(s) are separated by &#39;&#x3D;&#39;. Multiple values are supported by a sub-set of refinement attributes and             can be provided by separating them using a pipe (URL             encoded &#x3D; \&quot;|\&quot;). Value ranges can be specified like this: refine&#x3D;price&#x3D;(100..500) Multiple refine             parameters can be provided by adding an underscore in combination with an integer counter right behind             the parameter name and a counter range 1..9. I.e. refine_1&#x3D;c_refinementColor&#x3D;red|green|blue. The             following system refinement attribute ids are supported:                          cgid: Allows to refine per single category id. Multiple category ids are not supported.             price: Allows to refine per single price range. Multiple price ranges are not supported.             pmid: Allows to refine per promotion id(s).             orderable_only: Unavailable products will be excluded from the search results if true is set. Multiple             refinement values are not supported.             
     * @param {String} opts.sort The id of the sorting option to sort the search hits.
     * @param {Number} opts.start The result set index to return the first instance for. Default value is 0.
     * @param {Number} opts.count The maximum number of instances per request. Default value is 25.
     * @param {String} opts.currency The currency mnemonic specified for price.
     * @param {String} opts.locale The locale context.
     * @param {module:api/ProductSearchApi~getProductSearchPricesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ProductSearchResult}
     */
    this.getProductSearchPrices = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'q': opts['q'],
        'refine': this.apiClient.buildCollectionParam(opts['refine'], 'csv'),
        'sort': opts['sort'],
        'start': opts['start'],
        'count': opts['count'],
        'currency': opts['currency'],
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = ProductSearchResult;

      return this.apiClient.callApi(
        '/ProductSearch/prices', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getProductSearchVariations operation.
     * @callback module:api/ProductSearchApi~getProductSearchVariationsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ProductSearchResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Provides keyword and refinement search functionality for products. Only returns the product id, name and  variation information in the product search hit.
     * @param {Object} opts Optional parameters
     * @param {String} opts.q The query phrase to search for.
     * @param {Array.<String>} opts.refine Parameter that represents a refinement attribute/value(s) pair. Refinement attribute id and             value(s) are separated by &#39;&#x3D;&#39;. Multiple values are supported by a sub-set of refinement attributes and             can be provided by separating them using a pipe (URL             encoded &#x3D; \&quot;|\&quot;). Value ranges can be specified like this: refine&#x3D;price&#x3D;(100..500) Multiple refine             parameters can be provided by adding an underscore in combination with an integer counter right behind             the parameter name and a counter range 1..9. I.e. refine_1&#x3D;c_refinementColor&#x3D;red|green|blue. The             following system refinement attribute ids are supported:                          cgid: Allows to refine per single category id. Multiple category ids are not supported.             price: Allows to refine per single price range. Multiple price ranges are not supported.             pmid: Allows to refine per promotion id(s).             orderable_only: Unavailable products will be excluded from the search results if true is set. Multiple             refinement values are not supported.             
     * @param {String} opts.sort The id of the sorting option to sort the search hits.
     * @param {Number} opts.start The result set index to return the first instance for. Default value is 0.
     * @param {Number} opts.count The maximum number of instances per request. Default value is 25.
     * @param {String} opts.locale The locale context.
     * @param {module:api/ProductSearchApi~getProductSearchVariationsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ProductSearchResult}
     */
    this.getProductSearchVariations = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'q': opts['q'],
        'refine': this.apiClient.buildCollectionParam(opts['refine'], 'csv'),
        'sort': opts['sort'],
        'start': opts['start'],
        'count': opts['count'],
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = ProductSearchResult;

      return this.apiClient.callApi(
        '/ProductSearch/variations', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Product', 'model/ProductResult', 'model/ShippingMethodResult'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/Product'), require('../model/ProductResult'), require('../model/ShippingMethodResult'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ProductsApi = factory(root.ShopApi.ApiClient, root.ShopApi.Product, root.ShopApi.ProductResult, root.ShopApi.ShippingMethodResult);
  }
}(this, function(ApiClient, Product, ProductResult, ShippingMethodResult) {
  'use strict';

  /**
   * Products service.
   * @module api/ProductsApi
   * @version 17.3
   */

  /**
   * Constructs a new ProductsApi. 
   * @alias module:api/ProductsApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getProductsByID operation.
     * @callback module:api/ProductsApi~getProductsByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Product} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * To access single products resource, you construct a URL using the template shown below. This template requires  you to specify an Id (typically a SKU) for a product. In response, the server returns a corresponding Product  document, provided the product is online and assigned to site catalog. The document contains variation attributes  (including values) and the variant matrix; this data is provided for both the master and for the variant.
     * @param {String} id The id of the requested product.
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.expand 
     * @param {Array.<String>} opts.inventoryIds 
     * @param {String} opts.currency 
     * @param {String} opts.locale 
     * @param {Boolean} opts.allImages 
     * @param {module:api/ProductsApi~getProductsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Product}
     */
    this.getProductsByID = function(id, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw new Error("Missing the required parameter 'id' when calling getProductsByID");
      }


      var pathParams = {
        'id': id
      };
      var queryParams = {
        'expand': this.apiClient.buildCollectionParam(opts['expand'], 'csv'),
        'inventory_ids': this.apiClient.buildCollectionParam(opts['inventoryIds'], 'csv'),
        'currency': opts['currency'],
        'locale': opts['locale'],
        'all_images': opts['allImages']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Product;

      return this.apiClient.callApi(
        '/products/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getProductsByIDAvailability operation.
     * @callback module:api/ProductsApi~getProductsByIDAvailabilityCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Product} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Access product availability information of products that are online and assigned to site catalog.
     * @param {String} id The requested product id.
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.inventoryIds 
     * @param {String} opts.locale 
     * @param {module:api/ProductsApi~getProductsByIDAvailabilityCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Product}
     */
    this.getProductsByIDAvailability = function(id, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw new Error("Missing the required parameter 'id' when calling getProductsByIDAvailability");
      }


      var pathParams = {
        'id': id
      };
      var queryParams = {
        'inventory_ids': this.apiClient.buildCollectionParam(opts['inventoryIds'], 'csv'),
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Product;

      return this.apiClient.callApi(
        '/products/{id}/availability', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getProductsByIDBundledProducts operation.
     * @callback module:api/ProductsApi~getProductsByIDBundledProductsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Product} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Access bundled product information of products that are online and assigned to site catalog.
     * @param {String} id The requested product id.
     * @param {Object} opts Optional parameters
     * @param {String} opts.locale 
     * @param {module:api/ProductsApi~getProductsByIDBundledProductsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Product}
     */
    this.getProductsByIDBundledProducts = function(id, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw new Error("Missing the required parameter 'id' when calling getProductsByIDBundledProducts");
      }


      var pathParams = {
        'id': id
      };
      var queryParams = {
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Product;

      return this.apiClient.callApi(
        '/products/{id}/bundled_products', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getProductsByIDImages operation.
     * @callback module:api/ProductsApi~getProductsByIDImagesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Product} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Access product image information of products that are online and assigned to site catalog. Filter the result by  view type and variation values.
     * @param {String} id The requested product id.
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.viewType 
     * @param {Boolean} opts.allImages 
     * @param {String} opts.variationAttribute 
     * @param {String} opts.locale 
     * @param {module:api/ProductsApi~getProductsByIDImagesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Product}
     */
    this.getProductsByIDImages = function(id, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw new Error("Missing the required parameter 'id' when calling getProductsByIDImages");
      }


      var pathParams = {
        'id': id
      };
      var queryParams = {
        'view_type': this.apiClient.buildCollectionParam(opts['viewType'], 'csv'),
        'all_images': opts['allImages'],
        'variation_attribute': opts['variationAttribute'],
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Product;

      return this.apiClient.callApi(
        '/products/{id}/images', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getProductsByIDLinks operation.
     * @callback module:api/ProductsApi~getProductsByIDLinksCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Product} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Access product link information of products that are online and assigned to site catalog. Filter the result by  link type and link direction.
     * @param {String} id The requested product id.
     * @param {Object} opts Optional parameters
     * @param {String} opts.type 
     * @param {String} opts.direction 
     * @param {String} opts.locale 
     * @param {module:api/ProductsApi~getProductsByIDLinksCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Product}
     */
    this.getProductsByIDLinks = function(id, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw new Error("Missing the required parameter 'id' when calling getProductsByIDLinks");
      }


      var pathParams = {
        'id': id
      };
      var queryParams = {
        'type': opts['type'],
        'direction': opts['direction'],
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Product;

      return this.apiClient.callApi(
        '/products/{id}/links', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getProductsByIDOptions operation.
     * @callback module:api/ProductsApi~getProductsByIDOptionsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Product} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Access product option information of products that are online and assigned to site catalog.
     * @param {String} id The requested product id.
     * @param {Object} opts Optional parameters
     * @param {String} opts.locale 
     * @param {module:api/ProductsApi~getProductsByIDOptionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Product}
     */
    this.getProductsByIDOptions = function(id, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw new Error("Missing the required parameter 'id' when calling getProductsByIDOptions");
      }


      var pathParams = {
        'id': id
      };
      var queryParams = {
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Product;

      return this.apiClient.callApi(
        '/products/{id}/options', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getProductsByIDPrices operation.
     * @callback module:api/ProductsApi~getProductsByIDPricesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Product} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Access product price information of products that are online and assigned to site catalog.
     * @param {String} id The requested product id.
     * @param {Object} opts Optional parameters
     * @param {String} opts.locale 
     * @param {module:api/ProductsApi~getProductsByIDPricesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Product}
     */
    this.getProductsByIDPrices = function(id, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw new Error("Missing the required parameter 'id' when calling getProductsByIDPrices");
      }


      var pathParams = {
        'id': id
      };
      var queryParams = {
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Product;

      return this.apiClient.callApi(
        '/products/{id}/prices', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getProductsByIDPromotions operation.
     * @callback module:api/ProductsApi~getProductsByIDPromotionsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Product} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Access product promotion information of products that are online and assigned to site catalog.
     * @param {String} id The requested product id.
     * @param {Object} opts Optional parameters
     * @param {String} opts.currency 
     * @param {String} opts.locale 
     * @param {module:api/ProductsApi~getProductsByIDPromotionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Product}
     */
    this.getProductsByIDPromotions = function(id, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw new Error("Missing the required parameter 'id' when calling getProductsByIDPromotions");
      }


      var pathParams = {
        'id': id
      };
      var queryParams = {
        'currency': opts['currency'],
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Product;

      return this.apiClient.callApi(
        '/products/{id}/promotions', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getProductsByIDRecommendations operation.
     * @callback module:api/ProductsApi~getProductsByIDRecommendationsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Product} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Access product recommendation information of products that are online and assigned to site catalog.
     * @param {String} id The requested product id.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.recommendationType 
     * @param {String} opts.locale 
     * @param {module:api/ProductsApi~getProductsByIDRecommendationsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Product}
     */
    this.getProductsByIDRecommendations = function(id, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw new Error("Missing the required parameter 'id' when calling getProductsByIDRecommendations");
      }


      var pathParams = {
        'id': id
      };
      var queryParams = {
        'recommendation_type': opts['recommendationType'],
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Product;

      return this.apiClient.callApi(
        '/products/{id}/recommendations', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getProductsByIDSetProducts operation.
     * @callback module:api/ProductsApi~getProductsByIDSetProductsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Product} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Access product set information of products that are online and assigned to site catalog.
     * @param {String} id The requested product id.
     * @param {Object} opts Optional parameters
     * @param {String} opts.locale 
     * @param {module:api/ProductsApi~getProductsByIDSetProductsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Product}
     */
    this.getProductsByIDSetProducts = function(id, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw new Error("Missing the required parameter 'id' when calling getProductsByIDSetProducts");
      }


      var pathParams = {
        'id': id
      };
      var queryParams = {
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Product;

      return this.apiClient.callApi(
        '/products/{id}/set_products', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getProductsByIDShippingMethods operation.
     * @callback module:api/ProductsApi~getProductsByIDShippingMethodsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ShippingMethodResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieves the applicable shipping methods for a certain product.
     * @param {String} id the requested product id
     * @param {module:api/ProductsApi~getProductsByIDShippingMethodsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ShippingMethodResult}
     */
    this.getProductsByIDShippingMethods = function(id, callback) {
      var postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw new Error("Missing the required parameter 'id' when calling getProductsByIDShippingMethods");
      }


      var pathParams = {
        'id': id
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'oauth2_application'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = ShippingMethodResult;

      return this.apiClient.callApi(
        '/products/{id}/shipping_methods', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getProductsByIDVariations operation.
     * @callback module:api/ProductsApi~getProductsByIDVariationsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Product} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Access product variation information of products that are online and assigned to site catalog.
     * @param {String} id The requested product id.
     * @param {Object} opts Optional parameters
     * @param {String} opts.locale 
     * @param {module:api/ProductsApi~getProductsByIDVariationsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Product}
     */
    this.getProductsByIDVariations = function(id, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw new Error("Missing the required parameter 'id' when calling getProductsByIDVariations");
      }


      var pathParams = {
        'id': id
      };
      var queryParams = {
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Product;

      return this.apiClient.callApi(
        '/products/{id}/variations', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getProductsByIDs operation.
     * @callback module:api/ProductsApi~getProductsByIDsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ProductResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Array.<String>} ids 
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.expand 
     * @param {Array.<String>} opts.inventoryIds 
     * @param {String} opts.currency 
     * @param {String} opts.locale 
     * @param {Boolean} opts.allImages 
     * @param {module:api/ProductsApi~getProductsByIDsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ProductResult}
     */
    this.getProductsByIDs = function(ids, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'ids' is set
      if (ids == undefined || ids == null) {
        throw new Error("Missing the required parameter 'ids' when calling getProductsByIDs");
      }


      var pathParams = {
        'ids': ids
      };
      var queryParams = {
        'expand': this.apiClient.buildCollectionParam(opts['expand'], 'csv'),
        'inventory_ids': this.apiClient.buildCollectionParam(opts['inventoryIds'], 'csv'),
        'currency': opts['currency'],
        'locale': opts['locale'],
        'all_images': opts['allImages']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = ProductResult;

      return this.apiClient.callApi(
        '/products/({ids})', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Promotion', 'model/PromotionResult'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/Promotion'), require('../model/PromotionResult'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.PromotionsApi = factory(root.ShopApi.ApiClient, root.ShopApi.Promotion, root.ShopApi.PromotionResult);
  }
}(this, function(ApiClient, Promotion, PromotionResult) {
  'use strict';

  /**
   * Promotions service.
   * @module api/PromotionsApi
   * @version 17.3
   */

  /**
   * Constructs a new PromotionsApi. 
   * @alias module:api/PromotionsApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getPromotions operation.
     * @callback module:api/PromotionsApi~getPromotionsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PromotionResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Handles get promotion by filter criteria Returns an array of enabled promotions matching specified filter  criteria. In the request URL, you must provide a campaign_id parameter, and you can optionally specify a date  range by providing start_date and end_date parameters. Both parameters are required to specify a date range:  omitting one causes the server to return a MissingParameterException fault. Each request returns only enabled  promotions; the server does not consider promotion qualifiers or schedules.
     * @param {String} campaignId Find the promotions assigned to this campaign (mandatory)
     * @param {Object} opts Optional parameters
     * @param {String} opts.startDate The start date of the promotion in ISO8601 date time format: yyyy-MM-dd&#39;T&#39;HH:mmZ
     * @param {String} opts.endDate The end date of the promotion in ISO8601 date time format: yyyy-MM-dd&#39;T&#39;HH:mmZ
     * @param {String} opts.currency The currency mnemonic specified for price
     * @param {module:api/PromotionsApi~getPromotionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PromotionResult}
     */
    this.getPromotions = function(campaignId, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'campaignId' is set
      if (campaignId == undefined || campaignId == null) {
        throw new Error("Missing the required parameter 'campaignId' when calling getPromotions");
      }


      var pathParams = {
      };
      var queryParams = {
        'campaign_id': campaignId,
        'start_date': opts['startDate'],
        'end_date': opts['endDate'],
        'currency': opts['currency']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = PromotionResult;

      return this.apiClient.callApi(
        '/promotions', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getPromotionsByID operation.
     * @callback module:api/PromotionsApi~getPromotionsByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Promotion} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Returns an enabled promotion using a specified id. Each request returns a response only for an enabled promotion;  the server does not consider promotion qualifiers or schedules.
     * @param {String} id The id of the requested promotion.
     * @param {Object} opts Optional parameters
     * @param {String} opts.locale 
     * @param {module:api/PromotionsApi~getPromotionsByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Promotion}
     */
    this.getPromotionsByID = function(id, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw new Error("Missing the required parameter 'id' when calling getPromotionsByID");
      }


      var pathParams = {
        'id': id
      };
      var queryParams = {
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Promotion;

      return this.apiClient.callApi(
        '/promotions/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getPromotionsByIDs operation.
     * @callback module:api/PromotionsApi~getPromotionsByIDsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PromotionResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Array.<String>} ids 
     * @param {Object} opts Optional parameters
     * @param {String} opts.locale 
     * @param {module:api/PromotionsApi~getPromotionsByIDsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PromotionResult}
     */
    this.getPromotionsByIDs = function(ids, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'ids' is set
      if (ids == undefined || ids == null) {
        throw new Error("Missing the required parameter 'ids' when calling getPromotionsByIDs");
      }


      var pathParams = {
        'ids': ids
      };
      var queryParams = {
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = PromotionResult;

      return this.apiClient.callApi(
        '/promotions/({ids})', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/SuggestionResult'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/SuggestionResult'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.SearchSuggestionApi = factory(root.ShopApi.ApiClient, root.ShopApi.SuggestionResult);
  }
}(this, function(ApiClient, SuggestionResult) {
  'use strict';

  /**
   * SearchSuggestion service.
   * @module api/SearchSuggestionApi
   * @version 17.3
   */

  /**
   * Constructs a new SearchSuggestionApi. 
   * @alias module:api/SearchSuggestionApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getSearchSuggestion operation.
     * @callback module:api/SearchSuggestionApi~getSearchSuggestionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SuggestionResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Provides keyword search functionality for products, categories, content, brands and custom suggestions.  Returns suggested products, suggested categories, suggested content, suggested brands and custom suggestions  for the given search phrase.
     * @param {String} q The query phrase to search for.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.count The maximum number of suggestions per request. Default value is 5. This affects all types of suggestions (category, product, content, brand, custom suggestions).
     * @param {String} opts.currency The currency mnemonic specified for price. This parameter is effective only for product suggestions.
     * @param {String} opts.locale 
     * @param {module:api/SearchSuggestionApi~getSearchSuggestionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SuggestionResult}
     */
    this.getSearchSuggestion = function(q, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'q' is set
      if (q == undefined || q == null) {
        throw new Error("Missing the required parameter 'q' when calling getSearchSuggestion");
      }


      var pathParams = {
      };
      var queryParams = {
        'q': q,
        'count': opts['count'],
        'currency': opts['currency'],
        'locale': opts['locale']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = SuggestionResult;

      return this.apiClient.callApi(
        '/SearchSuggestion', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.SessionsApi = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * Sessions service.
   * @module api/SessionsApi
   * @version 17.3
   */

  /**
   * Constructs a new SessionsApi. 
   * @alias module:api/SessionsApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the postSessions operation.
     * @callback module:api/SessionsApi~postSessionsCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Exchanges a JWT token into a new session. If the given token is valid, creates a new session, which is associated  with the authenticated or anonymous customer. All Set-Cookie headers for handling the session are applied  on the response.    Please note that this resource always creates a new session with the consequence that you have no session basket  after you do that. Once you created a session from a JWT token you can use this session and stateless OCAPI calls  using the JWT in parallel. There is no additional need to call the bridging resources again.    When a session ID is sent in with the request, the specified session is ignored. Only the incoming JWT token is  used to create a new session.
     * @param {module:api/SessionsApi~postSessionsCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.postSessions = function(callback) {
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = null;

      return this.apiClient.callApi(
        '/sessions', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Site'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/Site'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.SiteApi = factory(root.ShopApi.ApiClient, root.ShopApi.Site);
  }
}(this, function(ApiClient, Site) {
  'use strict';

  /**
   * Site service.
   * @module api/SiteApi
   * @version 17.3
   */

  /**
   * Constructs a new SiteApi. 
   * @alias module:api/SiteApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getSite operation.
     * @callback module:api/SiteApi~getSiteCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Site} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Access site information, like site status and site content URLs.
     * @param {module:api/SiteApi~getSiteCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Site}
     */
    this.getSite = function(callback) {
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Site;

      return this.apiClient.callApi(
        '/site', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Store', 'model/StoreResult'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/Store'), require('../model/StoreResult'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.StoresApi = factory(root.ShopApi.ApiClient, root.ShopApi.Store, root.ShopApi.StoreResult);
  }
}(this, function(ApiClient, Store, StoreResult) {
  'use strict';

  /**
   * Stores service.
   * @module api/StoresApi
   * @version 17.3
   */

  /**
   * Constructs a new StoresApi. 
   * @alias module:api/StoresApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getStores operation.
     * @callback module:api/StoresApi~getStoresCallback
     * @param {String} error Error message, if any.
     * @param {module:model/StoreResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * This resource retrieves a list of stores, for the given site, that are within a configured distance of a location  on the earth. The stores and their distance from the specified location are returned as a result set of Store  objects. The distance is interpreted either in miles or kilometers depending on the \&quot;distance_unit\&quot; input  parameter.   The location can be specified by either directly providing a latitude/longitude coordinate pair or by providing a  country and a postal code:    If a postal code is passed, the resource looks in the system&#39;s geolocation mappings to find the coordinates  for this postal code. If no matching geolocation is found, the resource will return an empty list of stores.  If coordinates are passed, the values for country and postal code are ignored.  
     * @param {Object} opts Optional parameters
     * @param {Number} opts.latitude The geo coordinate latitude to search for stores                       (value range -90.00 .. 90.00).
     * @param {Number} opts.longitude The geo coordinate longitude to search for stores                       (value range -180.00 .. 180.00).
     * @param {String} opts.countryCode The two letter ISO country code e.g. \&quot;US\&quot;.
     * @param {String} opts.postalCode The postal code e.g. \&quot;01801\&quot;.
     * @param {String} opts.distanceUnit The distance unit. Supported values are \&quot;mi\&quot; and \&quot;km\&quot;                       (for miles and kilometers respectively, default is \&quot;km\&quot;).
     * @param {Number} opts.maxDistance The area (radius) in distancUnit where stores will be                       searched for (default is half of the earth&#39;s perimeter).
     * @param {Number} opts.start The result set index to return the first instance for. Default value is 0.
     * @param {Number} opts.count The maximum number of instances per request. Default value is 25.
     * @param {module:api/StoresApi~getStoresCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/StoreResult}
     */
    this.getStores = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'latitude': opts['latitude'],
        'longitude': opts['longitude'],
        'country_code': opts['countryCode'],
        'postal_code': opts['postalCode'],
        'distance_unit': opts['distanceUnit'],
        'max_distance': opts['maxDistance'],
        'start': opts['start'],
        'count': opts['count']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = StoreResult;

      return this.apiClient.callApi(
        '/stores', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getStoresByID operation.
     * @callback module:api/StoresApi~getStoresByIDCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Store} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * To access a store, you construct a URL using the template shown below. This template requires you to specify a  store id. In the response, the server returns a corresponding store document.
     * @param {String} id The id of the requested store.
     * @param {module:api/StoresApi~getStoresByIDCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Store}
     */
    this.getStoresByID = function(id, callback) {
      var postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw new Error("Missing the required parameter 'id' when calling getStoresByID");
      }


      var pathParams = {
        'id': id
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = Store;

      return this.apiClient.callApi(
        '/stores/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getStoresByIDs operation.
     * @callback module:api/StoresApi~getStoresByIDsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/StoreResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Array.<String>} ids 
     * @param {module:api/StoresApi~getStoresByIDsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/StoreResult}
     */
    this.getStoresByIDs = function(ids, callback) {
      var postBody = null;

      // verify the required parameter 'ids' is set
      if (ids == undefined || ids == null) {
        throw new Error("Missing the required parameter 'ids' when calling getStoresByIDs");
      }


      var pathParams = {
        'ids': ids
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['customers_auth', 'client_id'];
      var contentTypes = ['application/json', 'text/xml', 'application/xml'];
      var accepts = ['application/json', 'text/xml', 'application/xml'];
      var returnType = StoreResult;

      return this.apiClient.callApi(
        '/stores/({ids})', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
;/**
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

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/AuthRequest', 'model/Basket', 'model/BasketPaymentInstrumentRequest', 'model/BasketsResult', 'model/BonusDiscountLineItem', 'model/BoolFilter', 'model/BoolQuery', 'model/BundledProduct', 'model/Category', 'model/CategoryResult', 'model/Content', 'model/ContentFolder', 'model/ContentFolderResult', 'model/ContentResult', 'model/ContentSearchRefinement', 'model/ContentSearchRefinementValue', 'model/ContentSearchResult', 'model/CouponItem', 'model/CustomObject', 'model/Customer', 'model/CustomerAddress', 'model/CustomerAddressLink', 'model/CustomerAddressResult', 'model/CustomerInfo', 'model/CustomerOrderResult', 'model/CustomerPaymentCardRequest', 'model/CustomerPaymentInstrument', 'model/CustomerPaymentInstrumentRequest', 'model/CustomerPaymentInstrumentResult', 'model/CustomerProductList', 'model/CustomerProductListItem', 'model/CustomerProductListItemLink', 'model/CustomerProductListItemPurchase', 'model/CustomerProductListItemPurchaseResult', 'model/CustomerProductListItemResult', 'model/CustomerProductListRegistrant', 'model/CustomerProductListResult', 'model/CustomerRegistration', 'model/Discount', 'model/DiscountRequest', 'model/FilteredQuery', 'model/GiftCertificate', 'model/GiftCertificateItem', 'model/GiftCertificateRequest', 'model/Image', 'model/ImageGroup', 'model/Inventory', 'model/Locale', 'model/Master', 'model/NestedQuery', 'model/Note', 'model/NotesResult', 'model/Option', 'model/OptionItem', 'model/OptionValue', 'model/Order', 'model/OrderAddress', 'model/OrderPaymentCardRequest', 'model/OrderPaymentInstrument', 'model/OrderPaymentInstrumentRequest', 'model/OrderSearchHit', 'model/OrderSearchRequest', 'model/OrderSearchResult', 'model/PasswordChangeRequest', 'model/PasswordReset', 'model/PaymentBankAccount', 'model/PaymentBankAccountRequest', 'model/PaymentCard', 'model/PaymentCardSpec', 'model/PaymentMethod', 'model/PaymentMethodResult', 'model/PriceAdjustment', 'model/PriceAdjustmentLimit', 'model/PriceAdjustmentLimits', 'model/PriceAdjustmentRequest', 'model/Product', 'model/ProductDetailsLink', 'model/ProductItem', 'model/ProductLink', 'model/ProductListEvent', 'model/ProductListItemReference', 'model/ProductListLink', 'model/ProductListRegistrant', 'model/ProductListShippingAddress', 'model/ProductPromotion', 'model/ProductResult', 'model/ProductSearchHit', 'model/ProductSearchRefinement', 'model/ProductSearchRefinementValue', 'model/ProductSearchResult', 'model/ProductSearchSortingOption', 'model/ProductSimpleLink', 'model/ProductType', 'model/Promotion', 'model/PromotionResult', 'model/PublicProductList', 'model/PublicProductListItem', 'model/PublicProductListItemResult', 'model/PublicProductListLink', 'model/PublicProductListResult', 'model/QueryFilter', 'model/Range2Filter', 'model/RangeFilter', 'model/Recommendation', 'model/RecommendationType', 'model/ResultPage', 'model/Shipment', 'model/ShippingItem', 'model/ShippingMethod', 'model/ShippingMethodResult', 'model/ShippingPromotion', 'model/SimpleLink', 'model/Site', 'model/Sort', 'model/Status', 'model/Store', 'model/StoreResult', 'model/SuggestedCategory', 'model/SuggestedContent', 'model/SuggestedPhrase', 'model/SuggestedProduct', 'model/SuggestedTerm', 'model/SuggestedTerms', 'model/Suggestion', 'model/SuggestionResult', 'model/TermFilter', 'model/TermQuery', 'model/TextQuery', 'model/Variant', 'model/VariationAttribute', 'model/VariationAttributeValue', 'model/VariationGroup', 'api/BasketsApi', 'api/CategoriesApi', 'api/ContentApi', 'api/ContentSearchApi', 'api/CustomObjectsApi', 'api/CustomersApi', 'api/FoldersApi', 'api/GiftCertificateApi', 'api/OrderSearchApi', 'api/OrdersApi', 'api/PriceAdjustmentLimitsApi', 'api/ProductListsApi', 'api/ProductSearchApi', 'api/ProductsApi', 'api/PromotionsApi', 'api/SearchSuggestionApi', 'api/SessionsApi', 'api/SiteApi', 'api/StoresApi'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('./ApiClient'), require('./model/AuthRequest'), require('./model/Basket'), require('./model/BasketPaymentInstrumentRequest'), require('./model/BasketsResult'), require('./model/BonusDiscountLineItem'), require('./model/BoolFilter'), require('./model/BoolQuery'), require('./model/BundledProduct'), require('./model/Category'), require('./model/CategoryResult'), require('./model/Content'), require('./model/ContentFolder'), require('./model/ContentFolderResult'), require('./model/ContentResult'), require('./model/ContentSearchRefinement'), require('./model/ContentSearchRefinementValue'), require('./model/ContentSearchResult'), require('./model/CouponItem'), require('./model/CustomObject'), require('./model/Customer'), require('./model/CustomerAddress'), require('./model/CustomerAddressLink'), require('./model/CustomerAddressResult'), require('./model/CustomerInfo'), require('./model/CustomerOrderResult'), require('./model/CustomerPaymentCardRequest'), require('./model/CustomerPaymentInstrument'), require('./model/CustomerPaymentInstrumentRequest'), require('./model/CustomerPaymentInstrumentResult'), require('./model/CustomerProductList'), require('./model/CustomerProductListItem'), require('./model/CustomerProductListItemLink'), require('./model/CustomerProductListItemPurchase'), require('./model/CustomerProductListItemPurchaseResult'), require('./model/CustomerProductListItemResult'), require('./model/CustomerProductListRegistrant'), require('./model/CustomerProductListResult'), require('./model/CustomerRegistration'), require('./model/Discount'), require('./model/DiscountRequest'), require('./model/FilteredQuery'), require('./model/GiftCertificate'), require('./model/GiftCertificateItem'), require('./model/GiftCertificateRequest'), require('./model/Image'), require('./model/ImageGroup'), require('./model/Inventory'), require('./model/Locale'), require('./model/Master'), require('./model/NestedQuery'), require('./model/Note'), require('./model/NotesResult'), require('./model/Option'), require('./model/OptionItem'), require('./model/OptionValue'), require('./model/Order'), require('./model/OrderAddress'), require('./model/OrderPaymentCardRequest'), require('./model/OrderPaymentInstrument'), require('./model/OrderPaymentInstrumentRequest'), require('./model/OrderSearchHit'), require('./model/OrderSearchRequest'), require('./model/OrderSearchResult'), require('./model/PasswordChangeRequest'), require('./model/PasswordReset'), require('./model/PaymentBankAccount'), require('./model/PaymentBankAccountRequest'), require('./model/PaymentCard'), require('./model/PaymentCardSpec'), require('./model/PaymentMethod'), require('./model/PaymentMethodResult'), require('./model/PriceAdjustment'), require('./model/PriceAdjustmentLimit'), require('./model/PriceAdjustmentLimits'), require('./model/PriceAdjustmentRequest'), require('./model/Product'), require('./model/ProductDetailsLink'), require('./model/ProductItem'), require('./model/ProductLink'), require('./model/ProductListEvent'), require('./model/ProductListItemReference'), require('./model/ProductListLink'), require('./model/ProductListRegistrant'), require('./model/ProductListShippingAddress'), require('./model/ProductPromotion'), require('./model/ProductResult'), require('./model/ProductSearchHit'), require('./model/ProductSearchRefinement'), require('./model/ProductSearchRefinementValue'), require('./model/ProductSearchResult'), require('./model/ProductSearchSortingOption'), require('./model/ProductSimpleLink'), require('./model/ProductType'), require('./model/Promotion'), require('./model/PromotionResult'), require('./model/PublicProductList'), require('./model/PublicProductListItem'), require('./model/PublicProductListItemResult'), require('./model/PublicProductListLink'), require('./model/PublicProductListResult'), require('./model/QueryFilter'), require('./model/Range2Filter'), require('./model/RangeFilter'), require('./model/Recommendation'), require('./model/RecommendationType'), require('./model/ResultPage'), require('./model/Shipment'), require('./model/ShippingItem'), require('./model/ShippingMethod'), require('./model/ShippingMethodResult'), require('./model/ShippingPromotion'), require('./model/SimpleLink'), require('./model/Site'), require('./model/Sort'), require('./model/Status'), require('./model/Store'), require('./model/StoreResult'), require('./model/SuggestedCategory'), require('./model/SuggestedContent'), require('./model/SuggestedPhrase'), require('./model/SuggestedProduct'), require('./model/SuggestedTerm'), require('./model/SuggestedTerms'), require('./model/Suggestion'), require('./model/SuggestionResult'), require('./model/TermFilter'), require('./model/TermQuery'), require('./model/TextQuery'), require('./model/Variant'), require('./model/VariationAttribute'), require('./model/VariationAttributeValue'), require('./model/VariationGroup'), require('./api/BasketsApi'), require('./api/CategoriesApi'), require('./api/ContentApi'), require('./api/ContentSearchApi'), require('./api/CustomObjectsApi'), require('./api/CustomersApi'), require('./api/FoldersApi'), require('./api/GiftCertificateApi'), require('./api/OrderSearchApi'), require('./api/OrdersApi'), require('./api/PriceAdjustmentLimitsApi'), require('./api/ProductListsApi'), require('./api/ProductSearchApi'), require('./api/ProductsApi'), require('./api/PromotionsApi'), require('./api/SearchSuggestionApi'), require('./api/SessionsApi'), require('./api/SiteApi'), require('./api/StoresApi'));
  }
}(function(ApiClient, AuthRequest, Basket, BasketPaymentInstrumentRequest, BasketsResult, BonusDiscountLineItem, BoolFilter, BoolQuery, BundledProduct, Category, CategoryResult, Content, ContentFolder, ContentFolderResult, ContentResult, ContentSearchRefinement, ContentSearchRefinementValue, ContentSearchResult, CouponItem, CustomObject, Customer, CustomerAddress, CustomerAddressLink, CustomerAddressResult, CustomerInfo, CustomerOrderResult, CustomerPaymentCardRequest, CustomerPaymentInstrument, CustomerPaymentInstrumentRequest, CustomerPaymentInstrumentResult, CustomerProductList, CustomerProductListItem, CustomerProductListItemLink, CustomerProductListItemPurchase, CustomerProductListItemPurchaseResult, CustomerProductListItemResult, CustomerProductListRegistrant, CustomerProductListResult, CustomerRegistration, Discount, DiscountRequest, FilteredQuery, GiftCertificate, GiftCertificateItem, GiftCertificateRequest, Image, ImageGroup, Inventory, Locale, Master, NestedQuery, Note, NotesResult, Option, OptionItem, OptionValue, Order, OrderAddress, OrderPaymentCardRequest, OrderPaymentInstrument, OrderPaymentInstrumentRequest, OrderSearchHit, OrderSearchRequest, OrderSearchResult, PasswordChangeRequest, PasswordReset, PaymentBankAccount, PaymentBankAccountRequest, PaymentCard, PaymentCardSpec, PaymentMethod, PaymentMethodResult, PriceAdjustment, PriceAdjustmentLimit, PriceAdjustmentLimits, PriceAdjustmentRequest, Product, ProductDetailsLink, ProductItem, ProductLink, ProductListEvent, ProductListItemReference, ProductListLink, ProductListRegistrant, ProductListShippingAddress, ProductPromotion, ProductResult, ProductSearchHit, ProductSearchRefinement, ProductSearchRefinementValue, ProductSearchResult, ProductSearchSortingOption, ProductSimpleLink, ProductType, Promotion, PromotionResult, PublicProductList, PublicProductListItem, PublicProductListItemResult, PublicProductListLink, PublicProductListResult, QueryFilter, Range2Filter, RangeFilter, Recommendation, RecommendationType, ResultPage, Shipment, ShippingItem, ShippingMethod, ShippingMethodResult, ShippingPromotion, SimpleLink, Site, Sort, Status, Store, StoreResult, SuggestedCategory, SuggestedContent, SuggestedPhrase, SuggestedProduct, SuggestedTerm, SuggestedTerms, Suggestion, SuggestionResult, TermFilter, TermQuery, TextQuery, Variant, VariationAttribute, VariationAttributeValue, VariationGroup, BasketsApi, CategoriesApi, ContentApi, ContentSearchApi, CustomObjectsApi, CustomersApi, FoldersApi, GiftCertificateApi, OrderSearchApi, OrdersApi, PriceAdjustmentLimitsApi, ProductListsApi, ProductSearchApi, ProductsApi, PromotionsApi, SearchSuggestionApi, SessionsApi, SiteApi, StoresApi) {
  'use strict';

  /**
   * ERROR_UNKNOWN.<br>
   * The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
   * <p>
   * An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
   * <pre>
   * var ShopApi = require('index'); // See note below*.
   * var xxxSvc = new ShopApi.XxxApi(); // Allocate the API class we're going to use.
   * var yyyModel = new ShopApi.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
   * and put the application logic within the callback function.</em>
   * </p>
   * <p>
   * A non-AMD browser application (discouraged) might do something like this:
   * <pre>
   * var xxxSvc = new ShopApi.XxxApi(); // Allocate the API class we're going to use.
   * var yyy = new ShopApi.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * </p>
   * @module index
   * @version 17.3
   */
  var exports = {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient: ApiClient,
    /**
     * The AuthRequest model constructor.
     * @property {module:model/AuthRequest}
     */
    AuthRequest: AuthRequest,
    /**
     * The Basket model constructor.
     * @property {module:model/Basket}
     */
    Basket: Basket,
    /**
     * The BasketPaymentInstrumentRequest model constructor.
     * @property {module:model/BasketPaymentInstrumentRequest}
     */
    BasketPaymentInstrumentRequest: BasketPaymentInstrumentRequest,
    /**
     * The BasketsResult model constructor.
     * @property {module:model/BasketsResult}
     */
    BasketsResult: BasketsResult,
    /**
     * The BonusDiscountLineItem model constructor.
     * @property {module:model/BonusDiscountLineItem}
     */
    BonusDiscountLineItem: BonusDiscountLineItem,
    /**
     * The BoolFilter model constructor.
     * @property {module:model/BoolFilter}
     */
    BoolFilter: BoolFilter,
    /**
     * The BoolQuery model constructor.
     * @property {module:model/BoolQuery}
     */
    BoolQuery: BoolQuery,
    /**
     * The BundledProduct model constructor.
     * @property {module:model/BundledProduct}
     */
    BundledProduct: BundledProduct,
    /**
     * The Category model constructor.
     * @property {module:model/Category}
     */
    Category: Category,
    /**
     * The CategoryResult model constructor.
     * @property {module:model/CategoryResult}
     */
    CategoryResult: CategoryResult,
    /**
     * The Content model constructor.
     * @property {module:model/Content}
     */
    Content: Content,
    /**
     * The ContentFolder model constructor.
     * @property {module:model/ContentFolder}
     */
    ContentFolder: ContentFolder,
    /**
     * The ContentFolderResult model constructor.
     * @property {module:model/ContentFolderResult}
     */
    ContentFolderResult: ContentFolderResult,
    /**
     * The ContentResult model constructor.
     * @property {module:model/ContentResult}
     */
    ContentResult: ContentResult,
    /**
     * The ContentSearchRefinement model constructor.
     * @property {module:model/ContentSearchRefinement}
     */
    ContentSearchRefinement: ContentSearchRefinement,
    /**
     * The ContentSearchRefinementValue model constructor.
     * @property {module:model/ContentSearchRefinementValue}
     */
    ContentSearchRefinementValue: ContentSearchRefinementValue,
    /**
     * The ContentSearchResult model constructor.
     * @property {module:model/ContentSearchResult}
     */
    ContentSearchResult: ContentSearchResult,
    /**
     * The CouponItem model constructor.
     * @property {module:model/CouponItem}
     */
    CouponItem: CouponItem,
    /**
     * The CustomObject model constructor.
     * @property {module:model/CustomObject}
     */
    CustomObject: CustomObject,
    /**
     * The Customer model constructor.
     * @property {module:model/Customer}
     */
    Customer: Customer,
    /**
     * The CustomerAddress model constructor.
     * @property {module:model/CustomerAddress}
     */
    CustomerAddress: CustomerAddress,
    /**
     * The CustomerAddressLink model constructor.
     * @property {module:model/CustomerAddressLink}
     */
    CustomerAddressLink: CustomerAddressLink,
    /**
     * The CustomerAddressResult model constructor.
     * @property {module:model/CustomerAddressResult}
     */
    CustomerAddressResult: CustomerAddressResult,
    /**
     * The CustomerInfo model constructor.
     * @property {module:model/CustomerInfo}
     */
    CustomerInfo: CustomerInfo,
    /**
     * The CustomerOrderResult model constructor.
     * @property {module:model/CustomerOrderResult}
     */
    CustomerOrderResult: CustomerOrderResult,
    /**
     * The CustomerPaymentCardRequest model constructor.
     * @property {module:model/CustomerPaymentCardRequest}
     */
    CustomerPaymentCardRequest: CustomerPaymentCardRequest,
    /**
     * The CustomerPaymentInstrument model constructor.
     * @property {module:model/CustomerPaymentInstrument}
     */
    CustomerPaymentInstrument: CustomerPaymentInstrument,
    /**
     * The CustomerPaymentInstrumentRequest model constructor.
     * @property {module:model/CustomerPaymentInstrumentRequest}
     */
    CustomerPaymentInstrumentRequest: CustomerPaymentInstrumentRequest,
    /**
     * The CustomerPaymentInstrumentResult model constructor.
     * @property {module:model/CustomerPaymentInstrumentResult}
     */
    CustomerPaymentInstrumentResult: CustomerPaymentInstrumentResult,
    /**
     * The CustomerProductList model constructor.
     * @property {module:model/CustomerProductList}
     */
    CustomerProductList: CustomerProductList,
    /**
     * The CustomerProductListItem model constructor.
     * @property {module:model/CustomerProductListItem}
     */
    CustomerProductListItem: CustomerProductListItem,
    /**
     * The CustomerProductListItemLink model constructor.
     * @property {module:model/CustomerProductListItemLink}
     */
    CustomerProductListItemLink: CustomerProductListItemLink,
    /**
     * The CustomerProductListItemPurchase model constructor.
     * @property {module:model/CustomerProductListItemPurchase}
     */
    CustomerProductListItemPurchase: CustomerProductListItemPurchase,
    /**
     * The CustomerProductListItemPurchaseResult model constructor.
     * @property {module:model/CustomerProductListItemPurchaseResult}
     */
    CustomerProductListItemPurchaseResult: CustomerProductListItemPurchaseResult,
    /**
     * The CustomerProductListItemResult model constructor.
     * @property {module:model/CustomerProductListItemResult}
     */
    CustomerProductListItemResult: CustomerProductListItemResult,
    /**
     * The CustomerProductListRegistrant model constructor.
     * @property {module:model/CustomerProductListRegistrant}
     */
    CustomerProductListRegistrant: CustomerProductListRegistrant,
    /**
     * The CustomerProductListResult model constructor.
     * @property {module:model/CustomerProductListResult}
     */
    CustomerProductListResult: CustomerProductListResult,
    /**
     * The CustomerRegistration model constructor.
     * @property {module:model/CustomerRegistration}
     */
    CustomerRegistration: CustomerRegistration,
    /**
     * The Discount model constructor.
     * @property {module:model/Discount}
     */
    Discount: Discount,
    /**
     * The DiscountRequest model constructor.
     * @property {module:model/DiscountRequest}
     */
    DiscountRequest: DiscountRequest,
    /**
     * The FilteredQuery model constructor.
     * @property {module:model/FilteredQuery}
     */
    FilteredQuery: FilteredQuery,
    /**
     * The GiftCertificate model constructor.
     * @property {module:model/GiftCertificate}
     */
    GiftCertificate: GiftCertificate,
    /**
     * The GiftCertificateItem model constructor.
     * @property {module:model/GiftCertificateItem}
     */
    GiftCertificateItem: GiftCertificateItem,
    /**
     * The GiftCertificateRequest model constructor.
     * @property {module:model/GiftCertificateRequest}
     */
    GiftCertificateRequest: GiftCertificateRequest,
    /**
     * The Image model constructor.
     * @property {module:model/Image}
     */
    Image: Image,
    /**
     * The ImageGroup model constructor.
     * @property {module:model/ImageGroup}
     */
    ImageGroup: ImageGroup,
    /**
     * The Inventory model constructor.
     * @property {module:model/Inventory}
     */
    Inventory: Inventory,
    /**
     * The Locale model constructor.
     * @property {module:model/Locale}
     */
    Locale: Locale,
    /**
     * The Master model constructor.
     * @property {module:model/Master}
     */
    Master: Master,
    /**
     * The NestedQuery model constructor.
     * @property {module:model/NestedQuery}
     */
    NestedQuery: NestedQuery,
    /**
     * The Note model constructor.
     * @property {module:model/Note}
     */
    Note: Note,
    /**
     * The NotesResult model constructor.
     * @property {module:model/NotesResult}
     */
    NotesResult: NotesResult,
    /**
     * The Option model constructor.
     * @property {module:model/Option}
     */
    Option: Option,
    /**
     * The OptionItem model constructor.
     * @property {module:model/OptionItem}
     */
    OptionItem: OptionItem,
    /**
     * The OptionValue model constructor.
     * @property {module:model/OptionValue}
     */
    OptionValue: OptionValue,
    /**
     * The Order model constructor.
     * @property {module:model/Order}
     */
    Order: Order,
    /**
     * The OrderAddress model constructor.
     * @property {module:model/OrderAddress}
     */
    OrderAddress: OrderAddress,
    /**
     * The OrderPaymentCardRequest model constructor.
     * @property {module:model/OrderPaymentCardRequest}
     */
    OrderPaymentCardRequest: OrderPaymentCardRequest,
    /**
     * The OrderPaymentInstrument model constructor.
     * @property {module:model/OrderPaymentInstrument}
     */
    OrderPaymentInstrument: OrderPaymentInstrument,
    /**
     * The OrderPaymentInstrumentRequest model constructor.
     * @property {module:model/OrderPaymentInstrumentRequest}
     */
    OrderPaymentInstrumentRequest: OrderPaymentInstrumentRequest,
    /**
     * The OrderSearchHit model constructor.
     * @property {module:model/OrderSearchHit}
     */
    OrderSearchHit: OrderSearchHit,
    /**
     * The OrderSearchRequest model constructor.
     * @property {module:model/OrderSearchRequest}
     */
    OrderSearchRequest: OrderSearchRequest,
    /**
     * The OrderSearchResult model constructor.
     * @property {module:model/OrderSearchResult}
     */
    OrderSearchResult: OrderSearchResult,
    /**
     * The PasswordChangeRequest model constructor.
     * @property {module:model/PasswordChangeRequest}
     */
    PasswordChangeRequest: PasswordChangeRequest,
    /**
     * The PasswordReset model constructor.
     * @property {module:model/PasswordReset}
     */
    PasswordReset: PasswordReset,
    /**
     * The PaymentBankAccount model constructor.
     * @property {module:model/PaymentBankAccount}
     */
    PaymentBankAccount: PaymentBankAccount,
    /**
     * The PaymentBankAccountRequest model constructor.
     * @property {module:model/PaymentBankAccountRequest}
     */
    PaymentBankAccountRequest: PaymentBankAccountRequest,
    /**
     * The PaymentCard model constructor.
     * @property {module:model/PaymentCard}
     */
    PaymentCard: PaymentCard,
    /**
     * The PaymentCardSpec model constructor.
     * @property {module:model/PaymentCardSpec}
     */
    PaymentCardSpec: PaymentCardSpec,
    /**
     * The PaymentMethod model constructor.
     * @property {module:model/PaymentMethod}
     */
    PaymentMethod: PaymentMethod,
    /**
     * The PaymentMethodResult model constructor.
     * @property {module:model/PaymentMethodResult}
     */
    PaymentMethodResult: PaymentMethodResult,
    /**
     * The PriceAdjustment model constructor.
     * @property {module:model/PriceAdjustment}
     */
    PriceAdjustment: PriceAdjustment,
    /**
     * The PriceAdjustmentLimit model constructor.
     * @property {module:model/PriceAdjustmentLimit}
     */
    PriceAdjustmentLimit: PriceAdjustmentLimit,
    /**
     * The PriceAdjustmentLimits model constructor.
     * @property {module:model/PriceAdjustmentLimits}
     */
    PriceAdjustmentLimits: PriceAdjustmentLimits,
    /**
     * The PriceAdjustmentRequest model constructor.
     * @property {module:model/PriceAdjustmentRequest}
     */
    PriceAdjustmentRequest: PriceAdjustmentRequest,
    /**
     * The Product model constructor.
     * @property {module:model/Product}
     */
    Product: Product,
    /**
     * The ProductDetailsLink model constructor.
     * @property {module:model/ProductDetailsLink}
     */
    ProductDetailsLink: ProductDetailsLink,
    /**
     * The ProductItem model constructor.
     * @property {module:model/ProductItem}
     */
    ProductItem: ProductItem,
    /**
     * The ProductLink model constructor.
     * @property {module:model/ProductLink}
     */
    ProductLink: ProductLink,
    /**
     * The ProductListEvent model constructor.
     * @property {module:model/ProductListEvent}
     */
    ProductListEvent: ProductListEvent,
    /**
     * The ProductListItemReference model constructor.
     * @property {module:model/ProductListItemReference}
     */
    ProductListItemReference: ProductListItemReference,
    /**
     * The ProductListLink model constructor.
     * @property {module:model/ProductListLink}
     */
    ProductListLink: ProductListLink,
    /**
     * The ProductListRegistrant model constructor.
     * @property {module:model/ProductListRegistrant}
     */
    ProductListRegistrant: ProductListRegistrant,
    /**
     * The ProductListShippingAddress model constructor.
     * @property {module:model/ProductListShippingAddress}
     */
    ProductListShippingAddress: ProductListShippingAddress,
    /**
     * The ProductPromotion model constructor.
     * @property {module:model/ProductPromotion}
     */
    ProductPromotion: ProductPromotion,
    /**
     * The ProductResult model constructor.
     * @property {module:model/ProductResult}
     */
    ProductResult: ProductResult,
    /**
     * The ProductSearchHit model constructor.
     * @property {module:model/ProductSearchHit}
     */
    ProductSearchHit: ProductSearchHit,
    /**
     * The ProductSearchRefinement model constructor.
     * @property {module:model/ProductSearchRefinement}
     */
    ProductSearchRefinement: ProductSearchRefinement,
    /**
     * The ProductSearchRefinementValue model constructor.
     * @property {module:model/ProductSearchRefinementValue}
     */
    ProductSearchRefinementValue: ProductSearchRefinementValue,
    /**
     * The ProductSearchResult model constructor.
     * @property {module:model/ProductSearchResult}
     */
    ProductSearchResult: ProductSearchResult,
    /**
     * The ProductSearchSortingOption model constructor.
     * @property {module:model/ProductSearchSortingOption}
     */
    ProductSearchSortingOption: ProductSearchSortingOption,
    /**
     * The ProductSimpleLink model constructor.
     * @property {module:model/ProductSimpleLink}
     */
    ProductSimpleLink: ProductSimpleLink,
    /**
     * The ProductType model constructor.
     * @property {module:model/ProductType}
     */
    ProductType: ProductType,
    /**
     * The Promotion model constructor.
     * @property {module:model/Promotion}
     */
    Promotion: Promotion,
    /**
     * The PromotionResult model constructor.
     * @property {module:model/PromotionResult}
     */
    PromotionResult: PromotionResult,
    /**
     * The PublicProductList model constructor.
     * @property {module:model/PublicProductList}
     */
    PublicProductList: PublicProductList,
    /**
     * The PublicProductListItem model constructor.
     * @property {module:model/PublicProductListItem}
     */
    PublicProductListItem: PublicProductListItem,
    /**
     * The PublicProductListItemResult model constructor.
     * @property {module:model/PublicProductListItemResult}
     */
    PublicProductListItemResult: PublicProductListItemResult,
    /**
     * The PublicProductListLink model constructor.
     * @property {module:model/PublicProductListLink}
     */
    PublicProductListLink: PublicProductListLink,
    /**
     * The PublicProductListResult model constructor.
     * @property {module:model/PublicProductListResult}
     */
    PublicProductListResult: PublicProductListResult,
    /**
     * The QueryFilter model constructor.
     * @property {module:model/QueryFilter}
     */
    QueryFilter: QueryFilter,
    /**
     * The Range2Filter model constructor.
     * @property {module:model/Range2Filter}
     */
    Range2Filter: Range2Filter,
    /**
     * The RangeFilter model constructor.
     * @property {module:model/RangeFilter}
     */
    RangeFilter: RangeFilter,
    /**
     * The Recommendation model constructor.
     * @property {module:model/Recommendation}
     */
    Recommendation: Recommendation,
    /**
     * The RecommendationType model constructor.
     * @property {module:model/RecommendationType}
     */
    RecommendationType: RecommendationType,
    /**
     * The ResultPage model constructor.
     * @property {module:model/ResultPage}
     */
    ResultPage: ResultPage,
    /**
     * The Shipment model constructor.
     * @property {module:model/Shipment}
     */
    Shipment: Shipment,
    /**
     * The ShippingItem model constructor.
     * @property {module:model/ShippingItem}
     */
    ShippingItem: ShippingItem,
    /**
     * The ShippingMethod model constructor.
     * @property {module:model/ShippingMethod}
     */
    ShippingMethod: ShippingMethod,
    /**
     * The ShippingMethodResult model constructor.
     * @property {module:model/ShippingMethodResult}
     */
    ShippingMethodResult: ShippingMethodResult,
    /**
     * The ShippingPromotion model constructor.
     * @property {module:model/ShippingPromotion}
     */
    ShippingPromotion: ShippingPromotion,
    /**
     * The SimpleLink model constructor.
     * @property {module:model/SimpleLink}
     */
    SimpleLink: SimpleLink,
    /**
     * The Site model constructor.
     * @property {module:model/Site}
     */
    Site: Site,
    /**
     * The Sort model constructor.
     * @property {module:model/Sort}
     */
    Sort: Sort,
    /**
     * The Status model constructor.
     * @property {module:model/Status}
     */
    Status: Status,
    /**
     * The Store model constructor.
     * @property {module:model/Store}
     */
    Store: Store,
    /**
     * The StoreResult model constructor.
     * @property {module:model/StoreResult}
     */
    StoreResult: StoreResult,
    /**
     * The SuggestedCategory model constructor.
     * @property {module:model/SuggestedCategory}
     */
    SuggestedCategory: SuggestedCategory,
    /**
     * The SuggestedContent model constructor.
     * @property {module:model/SuggestedContent}
     */
    SuggestedContent: SuggestedContent,
    /**
     * The SuggestedPhrase model constructor.
     * @property {module:model/SuggestedPhrase}
     */
    SuggestedPhrase: SuggestedPhrase,
    /**
     * The SuggestedProduct model constructor.
     * @property {module:model/SuggestedProduct}
     */
    SuggestedProduct: SuggestedProduct,
    /**
     * The SuggestedTerm model constructor.
     * @property {module:model/SuggestedTerm}
     */
    SuggestedTerm: SuggestedTerm,
    /**
     * The SuggestedTerms model constructor.
     * @property {module:model/SuggestedTerms}
     */
    SuggestedTerms: SuggestedTerms,
    /**
     * The Suggestion model constructor.
     * @property {module:model/Suggestion}
     */
    Suggestion: Suggestion,
    /**
     * The SuggestionResult model constructor.
     * @property {module:model/SuggestionResult}
     */
    SuggestionResult: SuggestionResult,
    /**
     * The TermFilter model constructor.
     * @property {module:model/TermFilter}
     */
    TermFilter: TermFilter,
    /**
     * The TermQuery model constructor.
     * @property {module:model/TermQuery}
     */
    TermQuery: TermQuery,
    /**
     * The TextQuery model constructor.
     * @property {module:model/TextQuery}
     */
    TextQuery: TextQuery,
    /**
     * The Variant model constructor.
     * @property {module:model/Variant}
     */
    Variant: Variant,
    /**
     * The VariationAttribute model constructor.
     * @property {module:model/VariationAttribute}
     */
    VariationAttribute: VariationAttribute,
    /**
     * The VariationAttributeValue model constructor.
     * @property {module:model/VariationAttributeValue}
     */
    VariationAttributeValue: VariationAttributeValue,
    /**
     * The VariationGroup model constructor.
     * @property {module:model/VariationGroup}
     */
    VariationGroup: VariationGroup,
    /**
     * The BasketsApi service constructor.
     * @property {module:api/BasketsApi}
     */
    BasketsApi: BasketsApi,
    /**
     * The CategoriesApi service constructor.
     * @property {module:api/CategoriesApi}
     */
    CategoriesApi: CategoriesApi,
    /**
     * The ContentApi service constructor.
     * @property {module:api/ContentApi}
     */
    ContentApi: ContentApi,
    /**
     * The ContentSearchApi service constructor.
     * @property {module:api/ContentSearchApi}
     */
    ContentSearchApi: ContentSearchApi,
    /**
     * The CustomObjectsApi service constructor.
     * @property {module:api/CustomObjectsApi}
     */
    CustomObjectsApi: CustomObjectsApi,
    /**
     * The CustomersApi service constructor.
     * @property {module:api/CustomersApi}
     */
    CustomersApi: CustomersApi,
    /**
     * The FoldersApi service constructor.
     * @property {module:api/FoldersApi}
     */
    FoldersApi: FoldersApi,
    /**
     * The GiftCertificateApi service constructor.
     * @property {module:api/GiftCertificateApi}
     */
    GiftCertificateApi: GiftCertificateApi,
    /**
     * The OrderSearchApi service constructor.
     * @property {module:api/OrderSearchApi}
     */
    OrderSearchApi: OrderSearchApi,
    /**
     * The OrdersApi service constructor.
     * @property {module:api/OrdersApi}
     */
    OrdersApi: OrdersApi,
    /**
     * The PriceAdjustmentLimitsApi service constructor.
     * @property {module:api/PriceAdjustmentLimitsApi}
     */
    PriceAdjustmentLimitsApi: PriceAdjustmentLimitsApi,
    /**
     * The ProductListsApi service constructor.
     * @property {module:api/ProductListsApi}
     */
    ProductListsApi: ProductListsApi,
    /**
     * The ProductSearchApi service constructor.
     * @property {module:api/ProductSearchApi}
     */
    ProductSearchApi: ProductSearchApi,
    /**
     * The ProductsApi service constructor.
     * @property {module:api/ProductsApi}
     */
    ProductsApi: ProductsApi,
    /**
     * The PromotionsApi service constructor.
     * @property {module:api/PromotionsApi}
     */
    PromotionsApi: PromotionsApi,
    /**
     * The SearchSuggestionApi service constructor.
     * @property {module:api/SearchSuggestionApi}
     */
    SearchSuggestionApi: SearchSuggestionApi,
    /**
     * The SessionsApi service constructor.
     * @property {module:api/SessionsApi}
     */
    SessionsApi: SessionsApi,
    /**
     * The SiteApi service constructor.
     * @property {module:api/SiteApi}
     */
    SiteApi: SiteApi,
    /**
     * The StoresApi service constructor.
     * @property {module:api/StoresApi}
     */
    StoresApi: StoresApi
  };

  return exports;
}));
;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.AuthRequest = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The AuthRequest model module.
   * @module model/AuthRequest
   * @version 17.3
   */

  /**
   * Constructs a new <code>AuthRequest</code>.
   * Document representing the authentication request type.
   * @alias module:model/AuthRequest
   * @class
   * @param type {module:model/AuthRequest.TypeEnum} Type of authentication request: guest, login (credentials), refresh or session.
   */
  var exports = function(type) {
    var _this = this;

    _this['type'] = type;
  };

  /**
   * Constructs a <code>AuthRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AuthRequest} obj Optional instance to populate.
   * @return {module:model/AuthRequest} The populated <code>AuthRequest</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
    }
    return obj;
  }

  /**
   * Type of authentication request: guest, login (credentials), refresh or session.
   * @member {module:model/AuthRequest.TypeEnum} type
   */
  exports.prototype['type'] = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "guest"
     * @const
     */
    "guest": "guest",
    /**
     * value: "credentials"
     * @const
     */
    "credentials": "credentials",
    /**
     * value: "refresh"
     * @const
     */
    "refresh": "refresh",
    /**
     * value: "session"
     * @const
     */
    "session": "session"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/BonusDiscountLineItem', 'model/CouponItem', 'model/CustomerInfo', 'model/GiftCertificateItem', 'model/OrderAddress', 'model/OrderPaymentInstrument', 'model/PriceAdjustment', 'model/ProductItem', 'model/Shipment', 'model/ShippingItem', 'model/SimpleLink'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./BonusDiscountLineItem'), require('./CouponItem'), require('./CustomerInfo'), require('./GiftCertificateItem'), require('./OrderAddress'), require('./OrderPaymentInstrument'), require('./PriceAdjustment'), require('./ProductItem'), require('./Shipment'), require('./ShippingItem'), require('./SimpleLink'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.Basket = factory(root.ShopApi.ApiClient, root.ShopApi.BonusDiscountLineItem, root.ShopApi.CouponItem, root.ShopApi.CustomerInfo, root.ShopApi.GiftCertificateItem, root.ShopApi.OrderAddress, root.ShopApi.OrderPaymentInstrument, root.ShopApi.PriceAdjustment, root.ShopApi.ProductItem, root.ShopApi.Shipment, root.ShopApi.ShippingItem, root.ShopApi.SimpleLink);
  }
}(this, function(ApiClient, BonusDiscountLineItem, CouponItem, CustomerInfo, GiftCertificateItem, OrderAddress, OrderPaymentInstrument, PriceAdjustment, ProductItem, Shipment, ShippingItem, SimpleLink) {
  'use strict';




  /**
   * The Basket model module.
   * @module model/Basket
   * @version 17.3
   */

  /**
   * Constructs a new <code>Basket</code>.
   * Document representing a basket.  
   * @alias module:model/Basket
   * @class
   */
  var exports = function() {
    var _this = this;






























  };

  /**
   * Constructs a <code>Basket</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Basket} obj Optional instance to populate.
   * @return {module:model/Basket} The populated <code>Basket</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('adjusted_merchandize_total_tax')) {
        obj['adjusted_merchandize_total_tax'] = ApiClient.convertToType(data['adjusted_merchandize_total_tax'], 'Number');
      }
      if (data.hasOwnProperty('adjusted_shipping_total_tax')) {
        obj['adjusted_shipping_total_tax'] = ApiClient.convertToType(data['adjusted_shipping_total_tax'], 'Number');
      }
      if (data.hasOwnProperty('agent_basket')) {
        obj['agent_basket'] = ApiClient.convertToType(data['agent_basket'], 'Boolean');
      }
      if (data.hasOwnProperty('basket_id')) {
        obj['basket_id'] = ApiClient.convertToType(data['basket_id'], 'String');
      }
      if (data.hasOwnProperty('billing_address')) {
        obj['billing_address'] = OrderAddress.constructFromObject(data['billing_address']);
      }
      if (data.hasOwnProperty('bonus_discount_line_items')) {
        obj['bonus_discount_line_items'] = ApiClient.convertToType(data['bonus_discount_line_items'], [BonusDiscountLineItem]);
      }
      if (data.hasOwnProperty('c_sessionAddressBook')) {
        obj['c_sessionAddressBook'] = ApiClient.convertToType(data['c_sessionAddressBook'], 'String');
      }
      if (data.hasOwnProperty('channel_type')) {
        obj['channel_type'] = ApiClient.convertToType(data['channel_type'], 'String');
      }
      if (data.hasOwnProperty('coupon_items')) {
        obj['coupon_items'] = ApiClient.convertToType(data['coupon_items'], [CouponItem]);
      }
      if (data.hasOwnProperty('creation_date')) {
        obj['creation_date'] = ApiClient.convertToType(data['creation_date'], 'Date');
      }
      if (data.hasOwnProperty('currency')) {
        obj['currency'] = ApiClient.convertToType(data['currency'], 'String');
      }
      if (data.hasOwnProperty('customer_info')) {
        obj['customer_info'] = CustomerInfo.constructFromObject(data['customer_info']);
      }
      if (data.hasOwnProperty('gift_certificate_items')) {
        obj['gift_certificate_items'] = ApiClient.convertToType(data['gift_certificate_items'], [GiftCertificateItem]);
      }
      if (data.hasOwnProperty('last_modified')) {
        obj['last_modified'] = ApiClient.convertToType(data['last_modified'], 'Date');
      }
      if (data.hasOwnProperty('merchandize_total_tax')) {
        obj['merchandize_total_tax'] = ApiClient.convertToType(data['merchandize_total_tax'], 'Number');
      }
      if (data.hasOwnProperty('notes')) {
        obj['notes'] = SimpleLink.constructFromObject(data['notes']);
      }
      if (data.hasOwnProperty('order_price_adjustments')) {
        obj['order_price_adjustments'] = ApiClient.convertToType(data['order_price_adjustments'], [PriceAdjustment]);
      }
      if (data.hasOwnProperty('order_total')) {
        obj['order_total'] = ApiClient.convertToType(data['order_total'], 'Number');
      }
      if (data.hasOwnProperty('payment_instruments')) {
        obj['payment_instruments'] = ApiClient.convertToType(data['payment_instruments'], [OrderPaymentInstrument]);
      }
      if (data.hasOwnProperty('product_items')) {
        obj['product_items'] = ApiClient.convertToType(data['product_items'], [ProductItem]);
      }
      if (data.hasOwnProperty('product_sub_total')) {
        obj['product_sub_total'] = ApiClient.convertToType(data['product_sub_total'], 'Number');
      }
      if (data.hasOwnProperty('product_total')) {
        obj['product_total'] = ApiClient.convertToType(data['product_total'], 'Number');
      }
      if (data.hasOwnProperty('shipments')) {
        obj['shipments'] = ApiClient.convertToType(data['shipments'], [Shipment]);
      }
      if (data.hasOwnProperty('shipping_items')) {
        obj['shipping_items'] = ApiClient.convertToType(data['shipping_items'], [ShippingItem]);
      }
      if (data.hasOwnProperty('shipping_total')) {
        obj['shipping_total'] = ApiClient.convertToType(data['shipping_total'], 'Number');
      }
      if (data.hasOwnProperty('shipping_total_tax')) {
        obj['shipping_total_tax'] = ApiClient.convertToType(data['shipping_total_tax'], 'Number');
      }
      if (data.hasOwnProperty('source_code')) {
        obj['source_code'] = ApiClient.convertToType(data['source_code'], 'String');
      }
      if (data.hasOwnProperty('tax_total')) {
        obj['tax_total'] = ApiClient.convertToType(data['tax_total'], 'Number');
      }
      if (data.hasOwnProperty('taxation')) {
        obj['taxation'] = ApiClient.convertToType(data['taxation'], 'String');
      }
    }
    return obj;
  }

  /**
   * The products tax after discounts applying in purchase currency.   Adjusted merchandize prices represent the sum of product prices before  services such as shipping have been added, but after adjustment from  promotions have been added.
   * @member {Number} adjusted_merchandize_total_tax
   */
  exports.prototype['adjusted_merchandize_total_tax'] = undefined;
  /**
   * The tax of all shipping line items of the line item container after  shipping adjustments have been applied.
   * @member {Number} adjusted_shipping_total_tax
   */
  exports.prototype['adjusted_shipping_total_tax'] = undefined;
  /**
   * Is the basket created by an agent?
   * @member {Boolean} agent_basket
   */
  exports.prototype['agent_basket'] = undefined;
  /**
   * The unique identifier for the basket.
   * @member {String} basket_id
   */
  exports.prototype['basket_id'] = undefined;
  /**
   * The billing address. This property is part of basket checkout information only.
   * @member {module:model/OrderAddress} billing_address
   */
  exports.prototype['billing_address'] = undefined;
  /**
   * The bonus discount line items of the line item container.
   * @member {Array.<module:model/BonusDiscountLineItem>} bonus_discount_line_items
   */
  exports.prototype['bonus_discount_line_items'] = undefined;
  /**
   * @member {String} c_sessionAddressBook
   */
  exports.prototype['c_sessionAddressBook'] = undefined;
  /**
   * The sales channel for the order.
   * @member {module:model/Basket.ChannelTypeEnum} channel_type
   */
  exports.prototype['channel_type'] = undefined;
  /**
   * The sorted array of coupon items. This array can be empty.
   * @member {Array.<module:model/CouponItem>} coupon_items
   */
  exports.prototype['coupon_items'] = undefined;
  /**
   * Returns the value of attribute 'creationDate'.
   * @member {Date} creation_date
   */
  exports.prototype['creation_date'] = undefined;
  /**
   * The ISO 4217 mnemonic code of the currency.
   * @member {String} currency
   */
  exports.prototype['currency'] = undefined;
  /**
   * The customer information for logged in customers. This property is part of basket checkout information only.
   * @member {module:model/CustomerInfo} customer_info
   */
  exports.prototype['customer_info'] = undefined;
  /**
   * The sorted array of gift certificate line items. This array can be empty.
   * @member {Array.<module:model/GiftCertificateItem>} gift_certificate_items
   */
  exports.prototype['gift_certificate_items'] = undefined;
  /**
   * Returns the value of attribute 'lastModified'.
   * @member {Date} last_modified
   */
  exports.prototype['last_modified'] = undefined;
  /**
   * The products total tax in purchase currency.   Merchandize total prices represent the sum of product prices before  services such as shipping or adjustment from promotions have  been added.
   * @member {Number} merchandize_total_tax
   */
  exports.prototype['merchandize_total_tax'] = undefined;
  /**
   * The notes for the line item container.
   * @member {module:model/SimpleLink} notes
   */
  exports.prototype['notes'] = undefined;
  /**
   * The array of order level price adjustments. This array can be empty.
   * @member {Array.<module:model/PriceAdjustment>} order_price_adjustments
   */
  exports.prototype['order_price_adjustments'] = undefined;
  /**
   * The total price of the order, including products, shipping and tax. This property is part of basket checkout  information only.
   * @member {Number} order_total
   */
  exports.prototype['order_total'] = undefined;
  /**
   * The payment instruments list for the order.
   * @member {Array.<module:model/OrderPaymentInstrument>} payment_instruments
   */
  exports.prototype['payment_instruments'] = undefined;
  /**
   * The sorted array of product items (up to a maximum of 50 items). This array can be empty.
   * @member {Array.<module:model/ProductItem>} product_items
   */
  exports.prototype['product_items'] = undefined;
  /**
   * The total price of all product items after all product discounts.  Depending on taxation policy the returned price is net or gross.
   * @member {Number} product_sub_total
   */
  exports.prototype['product_sub_total'] = undefined;
  /**
   * The total price of all product items after all product and order discounts.  Depending on taxation policy the returned price is net or gross.
   * @member {Number} product_total
   */
  exports.prototype['product_total'] = undefined;
  /**
   * The array of shipments. This property is part of basket checkout information only.
   * @member {Array.<module:model/Shipment>} shipments
   */
  exports.prototype['shipments'] = undefined;
  /**
   * The sorted array of shipping items. This array can be empty.
   * @member {Array.<module:model/ShippingItem>} shipping_items
   */
  exports.prototype['shipping_items'] = undefined;
  /**
   * The total shipping price of the order after all shipping discounts. Excludes tax if taxation policy is net. Includes  tax if taxation policy is gross. This property is part of basket checkout information only.
   * @member {Number} shipping_total
   */
  exports.prototype['shipping_total'] = undefined;
  /**
   * The tax of all shipping line items of the line item container before  shipping adjustments have been applied.
   * @member {Number} shipping_total_tax
   */
  exports.prototype['shipping_total_tax'] = undefined;
  /**
   * Gets the source code assigned to this basket.
   * @member {String} source_code
   */
  exports.prototype['source_code'] = undefined;
  /**
   * The total tax amount of the order. This property is part of basket checkout information only.
   * @member {Number} tax_total
   */
  exports.prototype['tax_total'] = undefined;
  /**
   * The taxation the line item container is based on.
   * @member {module:model/Basket.TaxationEnum} taxation
   */
  exports.prototype['taxation'] = undefined;


  /**
   * Allowed values for the <code>channel_type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.ChannelTypeEnum = {
    /**
     * value: "storefront"
     * @const
     */
    "storefront": "storefront",
    /**
     * value: "callcenter"
     * @const
     */
    "callcenter": "callcenter",
    /**
     * value: "marketplace"
     * @const
     */
    "marketplace": "marketplace",
    /**
     * value: "dss"
     * @const
     */
    "dss": "dss",
    /**
     * value: "store"
     * @const
     */
    "store": "store",
    /**
     * value: "pinterest"
     * @const
     */
    "pinterest": "pinterest",
    /**
     * value: "twitter"
     * @const
     */
    "twitter": "twitter",
    /**
     * value: "facebookads"
     * @const
     */
    "facebookads": "facebookads",
    /**
     * value: "subscriptions"
     * @const
     */
    "subscriptions": "subscriptions",
    /**
     * value: "onlinereservation"
     * @const
     */
    "onlinereservation": "onlinereservation",
    /**
     * value: "customerservicecenter"
     * @const
     */
    "customerservicecenter": "customerservicecenter"  };

  /**
   * Allowed values for the <code>taxation</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TaxationEnum = {
    /**
     * value: "gross"
     * @const
     */
    "gross": "gross",
    /**
     * value: "net"
     * @const
     */
    "net": "net"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/OrderPaymentCardRequest', 'model/PaymentBankAccountRequest'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./OrderPaymentCardRequest'), require('./PaymentBankAccountRequest'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.BasketPaymentInstrumentRequest = factory(root.ShopApi.ApiClient, root.ShopApi.OrderPaymentCardRequest, root.ShopApi.PaymentBankAccountRequest);
  }
}(this, function(ApiClient, OrderPaymentCardRequest, PaymentBankAccountRequest) {
  'use strict';




  /**
   * The BasketPaymentInstrumentRequest model module.
   * @module model/BasketPaymentInstrumentRequest
   * @version 17.3
   */

  /**
   * Constructs a new <code>BasketPaymentInstrumentRequest</code>.
   * Document representing a basket payment instrument request.
   * @alias module:model/BasketPaymentInstrumentRequest
   * @class
   */
  var exports = function() {
    var _this = this;








  };

  /**
   * Constructs a <code>BasketPaymentInstrumentRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/BasketPaymentInstrumentRequest} obj Optional instance to populate.
   * @return {module:model/BasketPaymentInstrumentRequest} The populated <code>BasketPaymentInstrumentRequest</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('amount')) {
        obj['amount'] = ApiClient.convertToType(data['amount'], 'Number');
      }
      if (data.hasOwnProperty('bank_routing_number')) {
        obj['bank_routing_number'] = ApiClient.convertToType(data['bank_routing_number'], 'String');
      }
      if (data.hasOwnProperty('customer_payment_instrument_id')) {
        obj['customer_payment_instrument_id'] = ApiClient.convertToType(data['customer_payment_instrument_id'], 'String');
      }
      if (data.hasOwnProperty('gift_certificate_code')) {
        obj['gift_certificate_code'] = ApiClient.convertToType(data['gift_certificate_code'], 'String');
      }
      if (data.hasOwnProperty('payment_bank_account')) {
        obj['payment_bank_account'] = PaymentBankAccountRequest.constructFromObject(data['payment_bank_account']);
      }
      if (data.hasOwnProperty('payment_card')) {
        obj['payment_card'] = OrderPaymentCardRequest.constructFromObject(data['payment_card']);
      }
      if (data.hasOwnProperty('payment_method_id')) {
        obj['payment_method_id'] = ApiClient.convertToType(data['payment_method_id'], 'String');
      }
    }
    return obj;
  }

  /**
   * The payment transaction amount.
   * @member {Number} amount
   */
  exports.prototype['amount'] = undefined;
  /**
   * The bank routing number.
   * @member {String} bank_routing_number
   */
  exports.prototype['bank_routing_number'] = undefined;
  /**
   * The id of a customer payment instrument.
   * @member {String} customer_payment_instrument_id
   */
  exports.prototype['customer_payment_instrument_id'] = undefined;
  /**
   * The gift certificate code.
   * @member {String} gift_certificate_code
   */
  exports.prototype['gift_certificate_code'] = undefined;
  /**
   * The payment bank account request data.
   * @member {module:model/PaymentBankAccountRequest} payment_bank_account
   */
  exports.prototype['payment_bank_account'] = undefined;
  /**
   * The payment card.
   * @member {module:model/OrderPaymentCardRequest} payment_card
   */
  exports.prototype['payment_card'] = undefined;
  /**
   * The payment method id. Optional if a customer payment instrument id is specified.
   * @member {String} payment_method_id
   */
  exports.prototype['payment_method_id'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Basket'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Basket'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.BasketsResult = factory(root.ShopApi.ApiClient, root.ShopApi.Basket);
  }
}(this, function(ApiClient, Basket) {
  'use strict';




  /**
   * The BasketsResult model module.
   * @module model/BasketsResult
   * @version 17.3
   */

  /**
   * Constructs a new <code>BasketsResult</code>.
   * Result document containing an array of baskets.
   * @alias module:model/BasketsResult
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>BasketsResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/BasketsResult} obj Optional instance to populate.
   * @return {module:model/BasketsResult} The populated <code>BasketsResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('baskets')) {
        obj['baskets'] = ApiClient.convertToType(data['baskets'], [Basket]);
      }
      if (data.hasOwnProperty('total')) {
        obj['total'] = ApiClient.convertToType(data['total'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The list of baskets for a customer.
   * @member {Array.<module:model/Basket>} baskets
   */
  exports.prototype['baskets'] = undefined;
  /**
   * The total number of baskets.
   * @member {Number} total
   */
  exports.prototype['total'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ProductDetailsLink'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ProductDetailsLink'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.BonusDiscountLineItem = factory(root.ShopApi.ApiClient, root.ShopApi.ProductDetailsLink);
  }
}(this, function(ApiClient, ProductDetailsLink) {
  'use strict';




  /**
   * The BonusDiscountLineItem model module.
   * @module model/BonusDiscountLineItem
   * @version 17.3
   */

  /**
   * Constructs a new <code>BonusDiscountLineItem</code>.
   * Document representing a bonus discount line item
   * @alias module:model/BonusDiscountLineItem
   * @class
   */
  var exports = function() {
    var _this = this;






  };

  /**
   * Constructs a <code>BonusDiscountLineItem</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/BonusDiscountLineItem} obj Optional instance to populate.
   * @return {module:model/BonusDiscountLineItem} The populated <code>BonusDiscountLineItem</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('bonus_products')) {
        obj['bonus_products'] = ApiClient.convertToType(data['bonus_products'], [ProductDetailsLink]);
      }
      if (data.hasOwnProperty('coupon_code')) {
        obj['coupon_code'] = ApiClient.convertToType(data['coupon_code'], 'String');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('max_bonus_items')) {
        obj['max_bonus_items'] = ApiClient.convertToType(data['max_bonus_items'], 'Number');
      }
      if (data.hasOwnProperty('promotion_id')) {
        obj['promotion_id'] = ApiClient.convertToType(data['promotion_id'], 'String');
      }
    }
    return obj;
  }

  /**
   * The list of links to the bonus products the customer can choose from.
   * @member {Array.<module:model/ProductDetailsLink>} bonus_products
   */
  exports.prototype['bonus_products'] = undefined;
  /**
   * The coupon code that triggered the promotion, if applicable.
   * @member {String} coupon_code
   */
  exports.prototype['coupon_code'] = undefined;
  /**
   * The ID of the line item.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The maximum number of bonus items the user can select for this promotion.
   * @member {Number} max_bonus_items
   */
  exports.prototype['max_bonus_items'] = undefined;
  /**
   * The ID of the promotion which triggered the creation of the line item.
   * @member {String} promotion_id
   */
  exports.prototype['promotion_id'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Filter'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Filter'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.BoolFilter = factory(root.ShopApi.ApiClient, root.ShopApi.Filter);
  }
}(this, function(ApiClient, Filter) {
  'use strict';




  /**
   * The BoolFilter model module.
   * @module model/BoolFilter
   * @version 17.3
   */

  /**
   * Constructs a new <code>BoolFilter</code>.
   * Document representing a boolean filter.  
   * @alias module:model/BoolFilter
   * @class
   * @param operator {module:model/BoolFilter.OperatorEnum} The logical operator the filters are combined with.
   */
  var exports = function(operator) {
    var _this = this;


    _this['operator'] = operator;
  };

  /**
   * Constructs a <code>BoolFilter</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/BoolFilter} obj Optional instance to populate.
   * @return {module:model/BoolFilter} The populated <code>BoolFilter</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('filters')) {
        obj['filters'] = ApiClient.convertToType(data['filters'], [Filter]);
      }
      if (data.hasOwnProperty('operator')) {
        obj['operator'] = ApiClient.convertToType(data['operator'], 'String');
      }
    }
    return obj;
  }

  /**
   * A list of filters, which are logically combined by an operator.
   * @member {Array.<module:model/Filter>} filters
   */
  exports.prototype['filters'] = undefined;
  /**
   * The logical operator the filters are combined with.
   * @member {module:model/BoolFilter.OperatorEnum} operator
   */
  exports.prototype['operator'] = undefined;


  /**
   * Allowed values for the <code>operator</code> property.
   * @enum {String}
   * @readonly
   */
  exports.OperatorEnum = {
    /**
     * value: "and"
     * @const
     */
    "and": "and",
    /**
     * value: "or"
     * @const
     */
    "or": "or",
    /**
     * value: "not"
     * @const
     */
    "not": "not"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Query'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Query'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.BoolQuery = factory(root.ShopApi.ApiClient, root.ShopApi.Query);
  }
}(this, function(ApiClient, Query) {
  'use strict';




  /**
   * The BoolQuery model module.
   * @module model/BoolQuery
   * @version 17.3
   */

  /**
   * Constructs a new <code>BoolQuery</code>.
   * A boolean query allows to construct full logical expression trees consisting of other queries (usually term and text  queries). A boolean query basically has 3 sets of clauses that &#39;must&#39;, &#39;should&#39; and / or &#39;must not&#39; match.  If &#39;must&#39;,  &#39;must_not&#39;, or &#39;should&#39; appear in the same boolean query, they are combined logically using the AND operator.  
   * @alias module:model/BoolQuery
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>BoolQuery</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/BoolQuery} obj Optional instance to populate.
   * @return {module:model/BoolQuery} The populated <code>BoolQuery</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('must')) {
        obj['must'] = ApiClient.convertToType(data['must'], [Query]);
      }
      if (data.hasOwnProperty('must_not')) {
        obj['must_not'] = ApiClient.convertToType(data['must_not'], [Query]);
      }
      if (data.hasOwnProperty('should')) {
        obj['should'] = ApiClient.convertToType(data['should'], [Query]);
      }
    }
    return obj;
  }

  /**
   * List of queries, which must match.
   * @member {Array.<module:model/Query>} must
   */
  exports.prototype['must'] = undefined;
  /**
   * List of queries, which must not match.
   * @member {Array.<module:model/Query>} must_not
   */
  exports.prototype['must_not'] = undefined;
  /**
   * List of queries, which should match.
   * @member {Array.<module:model/Query>} should
   */
  exports.prototype['should'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Product'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Product'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.BundledProduct = factory(root.ShopApi.ApiClient, root.ShopApi.Product);
  }
}(this, function(ApiClient, Product) {
  'use strict';




  /**
   * The BundledProduct model module.
   * @module model/BundledProduct
   * @version 17.3
   */

  /**
   * Constructs a new <code>BundledProduct</code>.
   * Document representing a bundled product within a product bundle.
   * @alias module:model/BundledProduct
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>BundledProduct</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/BundledProduct} obj Optional instance to populate.
   * @return {module:model/BundledProduct} The populated <code>BundledProduct</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('product')) {
        obj['product'] = Product.constructFromObject(data['product']);
      }
      if (data.hasOwnProperty('quantity')) {
        obj['quantity'] = ApiClient.convertToType(data['quantity'], 'Number');
      }
    }
    return obj;
  }

  /**
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The product being bundled.
   * @member {module:model/Product} product
   */
  exports.prototype['product'] = undefined;
  /**
   * For the product being bundled, the quantity added to the bundle.
   * @member {Number} quantity
   */
  exports.prototype['quantity'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Category'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Category'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.Category = factory(root.ShopApi.ApiClient, root.ShopApi.Category);
  }
}(this, function(ApiClient, Category) {
  'use strict';




  /**
   * The Category model module.
   * @module model/Category
   * @version 17.3
   */

  /**
   * Constructs a new <code>Category</code>.
   * Document representing a category.
   * @alias module:model/Category
   * @class
   */
  var exports = function() {
    var _this = this;





















  };

  /**
   * Constructs a <code>Category</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Category} obj Optional instance to populate.
   * @return {module:model/Category} The populated <code>Category</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('c__context')) {
        obj['c__context'] = ApiClient.convertToType(data['c__context'], Object);
      }
      if (data.hasOwnProperty('c_alternativeUrl')) {
        obj['c_alternativeUrl'] = ApiClient.convertToType(data['c_alternativeUrl'], 'String');
      }
      if (data.hasOwnProperty('c_catBannerID')) {
        obj['c_catBannerID'] = ApiClient.convertToType(data['c_catBannerID'], 'String');
      }
      if (data.hasOwnProperty('c_customCSSFile')) {
        obj['c_customCSSFile'] = ApiClient.convertToType(data['c_customCSSFile'], 'String');
      }
      if (data.hasOwnProperty('c_enableCompare')) {
        obj['c_enableCompare'] = ApiClient.convertToType(data['c_enableCompare'], 'Boolean');
      }
      if (data.hasOwnProperty('c_headerMenuBanner')) {
        obj['c_headerMenuBanner'] = ApiClient.convertToType(data['c_headerMenuBanner'], 'String');
      }
      if (data.hasOwnProperty('c_headerMenuOrientation')) {
        obj['c_headerMenuOrientation'] = ApiClient.convertToType(data['c_headerMenuOrientation'], 'String');
      }
      if (data.hasOwnProperty('c_showInMenu')) {
        obj['c_showInMenu'] = ApiClient.convertToType(data['c_showInMenu'], 'Boolean');
      }
      if (data.hasOwnProperty('c_sizeChartID')) {
        obj['c_sizeChartID'] = ApiClient.convertToType(data['c_sizeChartID'], 'String');
      }
      if (data.hasOwnProperty('c_slotBannerHtml')) {
        obj['c_slotBannerHtml'] = ApiClient.convertToType(data['c_slotBannerHtml'], 'String');
      }
      if (data.hasOwnProperty('c_slotBannerImage')) {
        obj['c_slotBannerImage'] = ApiClient.convertToType(data['c_slotBannerImage'], 'String');
      }
      if (data.hasOwnProperty('categories')) {
        obj['categories'] = ApiClient.convertToType(data['categories'], [Category]);
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('image')) {
        obj['image'] = ApiClient.convertToType(data['image'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('page_description')) {
        obj['page_description'] = ApiClient.convertToType(data['page_description'], 'String');
      }
      if (data.hasOwnProperty('page_keywords')) {
        obj['page_keywords'] = ApiClient.convertToType(data['page_keywords'], 'String');
      }
      if (data.hasOwnProperty('page_title')) {
        obj['page_title'] = ApiClient.convertToType(data['page_title'], 'String');
      }
      if (data.hasOwnProperty('parent_category_id')) {
        obj['parent_category_id'] = ApiClient.convertToType(data['parent_category_id'], 'String');
      }
      if (data.hasOwnProperty('thumbnail')) {
        obj['thumbnail'] = ApiClient.convertToType(data['thumbnail'], 'String');
      }
    }
    return obj;
  }

  /**
   * Renders an alternative URL in main navigation. Uses Salesforce B2C Commerce content url notation. For example: $url('Account-Show')$ or normal URL http://xchange.demandware.com
   * @member {String} c_alternativeUrl
   */
  exports.prototype['c_alternativeUrl'] = undefined;
  /**
   * Used to define the content asset used to populate a grid page banner for a category. This value is applied to all sub-category navigation (cascading) if no specific catBannerID has been defined for  a sub-category.
   * @member {String} c_catBannerID
   */
  exports.prototype['c_catBannerID'] = undefined;
  /**
   * Use this attribute to apply custom styles for this category.
   * @member {String} c_customCSSFile
   */
  exports.prototype['c_customCSSFile'] = undefined;
  /**
   * Used to define if/when the Compare feature is to be visualized in the storefront based on navigation. If enableCompare = FALSE, no Compare checkboxes will be displayed in the grid view. If enableCompare = TRUE, the category (and its children) will support the Compare feature.
   * @member {Boolean} c_enableCompare
   */
  exports.prototype['c_enableCompare'] = undefined;
  /**
   * @member {String} c_headerMenuBanner
   */
  exports.prototype['c_headerMenuBanner'] = undefined;
  /**
   * Which way to orient the menu and optional header menu HTML. Vertical will list all in one line. Horizontal will list in columns.
   * @member {module:model/Category.CHeaderMenuOrientationEnum} c_headerMenuOrientation
   */
  exports.prototype['c_headerMenuOrientation'] = undefined;
  /**
   * Used to indicate that a category (such as Mens -> Footwear -> Boots) will display in the roll-over navigation. A sub-category only shows if also the parent category is marked as showInMenu. Up to three category levels are shown in roll-over navigation.
   * @member {Boolean} c_showInMenu
   */
  exports.prototype['c_showInMenu'] = undefined;
  /**
   * Used to define the content asset ID of the Size Chart that is appropriate for products whose PRIMARY category is the associated category (and its children). Whenever a product detail page (or quick view) is rendered, the Size Chart link is populated based on the value of this attribute for the products primary categorization. If not defined, NO size chart link is displayed.
   * @member {String} c_sizeChartID
   */
  exports.prototype['c_sizeChartID'] = undefined;
  /**
   * @member {String} c_slotBannerHtml
   */
  exports.prototype['c_slotBannerHtml'] = undefined;
  /**
   * Image used on either the top or bottom slot on the category landing pages.
   * @member {String} c_slotBannerImage
   */
  exports.prototype['c_slotBannerImage'] = undefined;
  /**
   * Array of subcategories. Can be empty.
   * @member {Array.<module:model/Category>} categories
   */
  exports.prototype['categories'] = undefined;
  /**
   * The localized description of the category.
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * The id of the category.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The URL to the category image.
   * @member {String} image
   */
  exports.prototype['image'] = undefined;
  /**
   * The localized name of the category.
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * The localized page description of the category.
   * @member {String} page_description
   */
  exports.prototype['page_description'] = undefined;
  /**
   * The localized page keywords of the category.
   * @member {String} page_keywords
   */
  exports.prototype['page_keywords'] = undefined;
  /**
   * The localized page title of the category.
   * @member {String} page_title
   */
  exports.prototype['page_title'] = undefined;
  /**
   * The id of the parent category.
   * @member {String} parent_category_id
   */
  exports.prototype['parent_category_id'] = undefined;
  /**
   * The URL to the category thumbnail.
   * @member {String} thumbnail
   */
  exports.prototype['thumbnail'] = undefined;


  /**
   * Allowed values for the <code>c_headerMenuOrientation</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CHeaderMenuOrientationEnum = {
    /**
     * value: "Horizontal"
     * @const
     */
    "Horizontal": "Horizontal",
    /**
     * value: "Vertical"
     * @const
     */
    "Vertical": "Vertical"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Category'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Category'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.CategoryResult = factory(root.ShopApi.ApiClient, root.ShopApi.Category);
  }
}(this, function(ApiClient, Category) {
  'use strict';




  /**
   * The CategoryResult model module.
   * @module model/CategoryResult
   * @version 17.3
   */

  /**
   * Constructs a new <code>CategoryResult</code>.
   * Result document containing an array of categories.
   * @alias module:model/CategoryResult
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>CategoryResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CategoryResult} obj Optional instance to populate.
   * @return {module:model/CategoryResult} The populated <code>CategoryResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('count')) {
        obj['count'] = ApiClient.convertToType(data['count'], 'Number');
      }
      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], [Category]);
      }
      if (data.hasOwnProperty('total')) {
        obj['total'] = ApiClient.convertToType(data['total'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The number of returned documents.
   * @member {Number} count
   */
  exports.prototype['count'] = undefined;
  /**
   * The array of category documents.
   * @member {Array.<module:model/Category>} data
   */
  exports.prototype['data'] = undefined;
  /**
   * The total number of documents.
   * @member {Number} total
   */
  exports.prototype['total'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.Content = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Content model module.
   * @module model/Content
   * @version 17.3
   */

  /**
   * Constructs a new <code>Content</code>.
   * Document representing a content asset.
   * @alias module:model/Content
   * @class
   * @param id {String} The id of the content asset.
   */
  var exports = function(id) {
    var _this = this;





    _this['id'] = id;




  };

  /**
   * Constructs a <code>Content</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Content} obj Optional instance to populate.
   * @return {module:model/Content} The populated <code>Content</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('c_Year')) {
        obj['c_Year'] = ApiClient.convertToType(data['c_Year'], 'String');
      }
      if (data.hasOwnProperty('c_body')) {
        obj['c_body'] = ApiClient.convertToType(data['c_body'], 'String');
      }
      if (data.hasOwnProperty('c_customCSSFile')) {
        obj['c_customCSSFile'] = ApiClient.convertToType(data['c_customCSSFile'], 'String');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('page_description')) {
        obj['page_description'] = ApiClient.convertToType(data['page_description'], 'String');
      }
      if (data.hasOwnProperty('page_keywords')) {
        obj['page_keywords'] = ApiClient.convertToType(data['page_keywords'], 'String');
      }
      if (data.hasOwnProperty('page_title')) {
        obj['page_title'] = ApiClient.convertToType(data['page_title'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {String} c_Year
   */
  exports.prototype['c_Year'] = undefined;
  /**
   * @member {String} c_body
   */
  exports.prototype['c_body'] = undefined;
  /**
   * Use this attribute to apply custom styles for this content asset.
   * @member {String} c_customCSSFile
   */
  exports.prototype['c_customCSSFile'] = undefined;
  /**
   * The localized content asset description.
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * The id of the content asset.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The localized content asset name.
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * The localized content asset page description.
   * @member {String} page_description
   */
  exports.prototype['page_description'] = undefined;
  /**
   * The localized content asset page description.
   * @member {String} page_keywords
   */
  exports.prototype['page_keywords'] = undefined;
  /**
   * The localized content asset page title.
   * @member {String} page_title
   */
  exports.prototype['page_title'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ContentFolder'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ContentFolder'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ContentFolder = factory(root.ShopApi.ApiClient, root.ShopApi.ContentFolder);
  }
}(this, function(ApiClient, ContentFolder) {
  'use strict';




  /**
   * The ContentFolder model module.
   * @module model/ContentFolder
   * @version 17.3
   */

  /**
   * Constructs a new <code>ContentFolder</code>.
   * Document representing a content folder.
   * @alias module:model/ContentFolder
   * @class
   * @param id {String} The id of the content folder.
   */
  var exports = function(id) {
    var _this = this;




    _this['id'] = id;





  };

  /**
   * Constructs a <code>ContentFolder</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ContentFolder} obj Optional instance to populate.
   * @return {module:model/ContentFolder} The populated <code>ContentFolder</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('c_customCSSFile')) {
        obj['c_customCSSFile'] = ApiClient.convertToType(data['c_customCSSFile'], 'String');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('folders')) {
        obj['folders'] = ApiClient.convertToType(data['folders'], [ContentFolder]);
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('page_description')) {
        obj['page_description'] = ApiClient.convertToType(data['page_description'], 'String');
      }
      if (data.hasOwnProperty('page_keywords')) {
        obj['page_keywords'] = ApiClient.convertToType(data['page_keywords'], 'String');
      }
      if (data.hasOwnProperty('page_title')) {
        obj['page_title'] = ApiClient.convertToType(data['page_title'], 'String');
      }
      if (data.hasOwnProperty('parent_folder_id')) {
        obj['parent_folder_id'] = ApiClient.convertToType(data['parent_folder_id'], 'String');
      }
    }
    return obj;
  }

  /**
   * Use this attribute to apply custom styles for this category.
   * @member {String} c_customCSSFile
   */
  exports.prototype['c_customCSSFile'] = undefined;
  /**
   * The localized content folder description.
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * The array of content subfolders. This array can be empty.
   * @member {Array.<module:model/ContentFolder>} folders
   */
  exports.prototype['folders'] = undefined;
  /**
   * The id of the content folder.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The localized content folder name.
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * The localized content folder page description.
   * @member {String} page_description
   */
  exports.prototype['page_description'] = undefined;
  /**
   * The localized content folder page description.
   * @member {String} page_keywords
   */
  exports.prototype['page_keywords'] = undefined;
  /**
   * The localized content folder page title.
   * @member {String} page_title
   */
  exports.prototype['page_title'] = undefined;
  /**
   * The id of the parent content folder.
   * @member {String} parent_folder_id
   */
  exports.prototype['parent_folder_id'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ContentFolder'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ContentFolder'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ContentFolderResult = factory(root.ShopApi.ApiClient, root.ShopApi.ContentFolder);
  }
}(this, function(ApiClient, ContentFolder) {
  'use strict';




  /**
   * The ContentFolderResult model module.
   * @module model/ContentFolderResult
   * @version 17.3
   */

  /**
   * Constructs a new <code>ContentFolderResult</code>.
   * Result document containing an array of content folders.
   * @alias module:model/ContentFolderResult
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>ContentFolderResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ContentFolderResult} obj Optional instance to populate.
   * @return {module:model/ContentFolderResult} The populated <code>ContentFolderResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('count')) {
        obj['count'] = ApiClient.convertToType(data['count'], 'Number');
      }
      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], [ContentFolder]);
      }
      if (data.hasOwnProperty('total')) {
        obj['total'] = ApiClient.convertToType(data['total'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The number of returned documents.
   * @member {Number} count
   */
  exports.prototype['count'] = undefined;
  /**
   * The array of content folder documents.
   * @member {Array.<module:model/ContentFolder>} data
   */
  exports.prototype['data'] = undefined;
  /**
   * The total number of documents.
   * @member {Number} total
   */
  exports.prototype['total'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Content'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Content'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ContentResult = factory(root.ShopApi.ApiClient, root.ShopApi.Content);
  }
}(this, function(ApiClient, Content) {
  'use strict';




  /**
   * The ContentResult model module.
   * @module model/ContentResult
   * @version 17.3
   */

  /**
   * Constructs a new <code>ContentResult</code>.
   * Result document containing an array of content assets.
   * @alias module:model/ContentResult
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>ContentResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ContentResult} obj Optional instance to populate.
   * @return {module:model/ContentResult} The populated <code>ContentResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('count')) {
        obj['count'] = ApiClient.convertToType(data['count'], 'Number');
      }
      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], [Content]);
      }
      if (data.hasOwnProperty('total')) {
        obj['total'] = ApiClient.convertToType(data['total'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The number of returned documents.
   * @member {Number} count
   */
  exports.prototype['count'] = undefined;
  /**
   * The array of content assets.
   * @member {Array.<module:model/Content>} data
   */
  exports.prototype['data'] = undefined;
  /**
   * The total number of documents.
   * @member {Number} total
   */
  exports.prototype['total'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ContentSearchRefinementValue'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ContentSearchRefinementValue'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ContentSearchRefinement = factory(root.ShopApi.ApiClient, root.ShopApi.ContentSearchRefinementValue);
  }
}(this, function(ApiClient, ContentSearchRefinementValue) {
  'use strict';




  /**
   * The ContentSearchRefinement model module.
   * @module model/ContentSearchRefinement
   * @version 17.3
   */

  /**
   * Constructs a new <code>ContentSearchRefinement</code>.
   * Document representing a search refinement attribute.
   * @alias module:model/ContentSearchRefinement
   * @class
   * @param attributeId {String} The id of the search refinement attribute. In the case of an attribute refinement, this is the  attribute id. Custom attributes are marked by the prefix \"c_\".
   */
  var exports = function(attributeId) {
    var _this = this;

    _this['attribute_id'] = attributeId;


  };

  /**
   * Constructs a <code>ContentSearchRefinement</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ContentSearchRefinement} obj Optional instance to populate.
   * @return {module:model/ContentSearchRefinement} The populated <code>ContentSearchRefinement</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('attribute_id')) {
        obj['attribute_id'] = ApiClient.convertToType(data['attribute_id'], 'String');
      }
      if (data.hasOwnProperty('label')) {
        obj['label'] = ApiClient.convertToType(data['label'], 'String');
      }
      if (data.hasOwnProperty('values')) {
        obj['values'] = ApiClient.convertToType(data['values'], [ContentSearchRefinementValue]);
      }
    }
    return obj;
  }

  /**
   * The id of the search refinement attribute. In the case of an attribute refinement, this is the  attribute id. Custom attributes are marked by the prefix \"c_\".
   * @member {String} attribute_id
   */
  exports.prototype['attribute_id'] = undefined;
  /**
   * The localized label of the refinement.
   * @member {String} label
   */
  exports.prototype['label'] = undefined;
  /**
   * The sorted array of refinement values. The array can be empty.
   * @member {Array.<module:model/ContentSearchRefinementValue>} values
   */
  exports.prototype['values'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ContentSearchRefinementValue'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ContentSearchRefinementValue'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ContentSearchRefinementValue = factory(root.ShopApi.ApiClient, root.ShopApi.ContentSearchRefinementValue);
  }
}(this, function(ApiClient, ContentSearchRefinementValue) {
  'use strict';




  /**
   * The ContentSearchRefinementValue model module.
   * @module model/ContentSearchRefinementValue
   * @version 17.3
   */

  /**
   * Constructs a new <code>ContentSearchRefinementValue</code>.
   * Document representing a search refinement value.
   * @alias module:model/ContentSearchRefinementValue
   * @class
   */
  var exports = function() {
    var _this = this;







  };

  /**
   * Constructs a <code>ContentSearchRefinementValue</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ContentSearchRefinementValue} obj Optional instance to populate.
   * @return {module:model/ContentSearchRefinementValue} The populated <code>ContentSearchRefinementValue</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('hit_count')) {
        obj['hit_count'] = ApiClient.convertToType(data['hit_count'], 'Number');
      }
      if (data.hasOwnProperty('label')) {
        obj['label'] = ApiClient.convertToType(data['label'], 'String');
      }
      if (data.hasOwnProperty('presentation_id')) {
        obj['presentation_id'] = ApiClient.convertToType(data['presentation_id'], 'String');
      }
      if (data.hasOwnProperty('value')) {
        obj['value'] = ApiClient.convertToType(data['value'], 'String');
      }
      if (data.hasOwnProperty('values')) {
        obj['values'] = ApiClient.convertToType(data['values'], [ContentSearchRefinementValue]);
      }
    }
    return obj;
  }

  /**
   * The localized description of the refinement value.
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * The number of search hits (0 or more) when selecting the refinement value.
   * @member {Number} hit_count
   */
  exports.prototype['hit_count'] = undefined;
  /**
   * The localized label of the refinement value.
   * @member {String} label
   */
  exports.prototype['label'] = undefined;
  /**
   * The optional presentation id associated with the refinement value.  The presentation id can be used, for example, to associate an id with  an HTML widget.
   * @member {String} presentation_id
   */
  exports.prototype['presentation_id'] = undefined;
  /**
   * The refinement value. In the case of an attribute refinement, this is the bucket,  the attribute value, or a value range. In the case of a content folder refinement,  this is the folder id.
   * @member {String} value
   */
  exports.prototype['value'] = undefined;
  /**
   * The array of hierarchical refinement values. This array can be empty.
   * @member {Array.<module:model/ContentSearchRefinementValue>} values
   */
  exports.prototype['values'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Content', 'model/ContentSearchRefinement'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Content'), require('./ContentSearchRefinement'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ContentSearchResult = factory(root.ShopApi.ApiClient, root.ShopApi.Content, root.ShopApi.ContentSearchRefinement);
  }
}(this, function(ApiClient, Content, ContentSearchRefinement) {
  'use strict';




  /**
   * The ContentSearchResult model module.
   * @module model/ContentSearchResult
   * @version 17.3
   */

  /**
   * Constructs a new <code>ContentSearchResult</code>.
   * Document representing a content search result.
   * @alias module:model/ContentSearchResult
   * @class
   */
  var exports = function() {
    var _this = this;











  };

  /**
   * Constructs a <code>ContentSearchResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ContentSearchResult} obj Optional instance to populate.
   * @return {module:model/ContentSearchResult} The populated <code>ContentSearchResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('count')) {
        obj['count'] = ApiClient.convertToType(data['count'], 'Number');
      }
      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], [Object]);
      }
      if (data.hasOwnProperty('hits')) {
        obj['hits'] = ApiClient.convertToType(data['hits'], [Content]);
      }
      if (data.hasOwnProperty('next')) {
        obj['next'] = ApiClient.convertToType(data['next'], 'String');
      }
      if (data.hasOwnProperty('previous')) {
        obj['previous'] = ApiClient.convertToType(data['previous'], 'String');
      }
      if (data.hasOwnProperty('query')) {
        obj['query'] = ApiClient.convertToType(data['query'], 'String');
      }
      if (data.hasOwnProperty('refinements')) {
        obj['refinements'] = ApiClient.convertToType(data['refinements'], [ContentSearchRefinement]);
      }
      if (data.hasOwnProperty('selected_refinements')) {
        obj['selected_refinements'] = ApiClient.convertToType(data['selected_refinements'], {'String': 'String'});
      }
      if (data.hasOwnProperty('start')) {
        obj['start'] = ApiClient.convertToType(data['start'], 'Number');
      }
      if (data.hasOwnProperty('total')) {
        obj['total'] = ApiClient.convertToType(data['total'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The number of returned documents.
   * @member {Number} count
   */
  exports.prototype['count'] = undefined;
  /**
   * @member {Array.<Object>} data
   */
  exports.prototype['data'] = undefined;
  /**
   * The sorted array of search hits. Can be empty.
   * @member {Array.<module:model/Content>} hits
   */
  exports.prototype['hits'] = undefined;
  /**
   * The URL of the next result page.
   * @member {String} next
   */
  exports.prototype['next'] = undefined;
  /**
   * The URL of the previous result page.
   * @member {String} previous
   */
  exports.prototype['previous'] = undefined;
  /**
   * The query String that was searched for.
   * @member {String} query
   */
  exports.prototype['query'] = undefined;
  /**
   * The sorted array of search refinements. Can be empty.
   * @member {Array.<module:model/ContentSearchRefinement>} refinements
   */
  exports.prototype['refinements'] = undefined;
  /**
   * Map of selected refinement attribute id/value(s) pairs. The sorting order is the same like in request URL.
   * @member {Object.<String, String>} selected_refinements
   */
  exports.prototype['selected_refinements'] = undefined;
  /**
   * The zero-based index of the first search hit to include in the result.
   * @member {Number} start
   */
  exports.prototype['start'] = undefined;
  /**
   * The total number of documents.
   * @member {Number} total
   */
  exports.prototype['total'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.CouponItem = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The CouponItem model module.
   * @module model/CouponItem
   * @version 17.3
   */

  /**
   * Constructs a new <code>CouponItem</code>.
   * Document representing a coupon item.
   * @alias module:model/CouponItem
   * @class
   * @param code {String} The coupon code.
   */
  var exports = function(code) {
    var _this = this;

    _this['code'] = code;



  };

  /**
   * Constructs a <code>CouponItem</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CouponItem} obj Optional instance to populate.
   * @return {module:model/CouponItem} The populated <code>CouponItem</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('code')) {
        obj['code'] = ApiClient.convertToType(data['code'], 'String');
      }
      if (data.hasOwnProperty('coupon_item_id')) {
        obj['coupon_item_id'] = ApiClient.convertToType(data['coupon_item_id'], 'String');
      }
      if (data.hasOwnProperty('status_code')) {
        obj['status_code'] = ApiClient.convertToType(data['status_code'], 'String');
      }
      if (data.hasOwnProperty('valid')) {
        obj['valid'] = ApiClient.convertToType(data['valid'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * The coupon code.
   * @member {String} code
   */
  exports.prototype['code'] = undefined;
  /**
   * The coupon item id.
   * @member {String} coupon_item_id
   */
  exports.prototype['coupon_item_id'] = undefined;
  /**
   * The status of the coupon item.
   * @member {module:model/CouponItem.StatusCodeEnum} status_code
   */
  exports.prototype['status_code'] = undefined;
  /**
   * A flag indicating whether the coupon item is valid. A coupon line item is valid if  the status code is 'applied' or 'no_applicable_promotion'.
   * @member {Boolean} valid
   */
  exports.prototype['valid'] = undefined;


  /**
   * Allowed values for the <code>status_code</code> property.
   * @enum {String}
   * @readonly
   */
  exports.StatusCodeEnum = {
    /**
     * value: "coupon_code_already_in_basket"
     * @const
     */
    "coupon_code_already_in_basket": "coupon_code_already_in_basket",
    /**
     * value: "coupon_code_already_redeemed"
     * @const
     */
    "coupon_code_already_redeemed": "coupon_code_already_redeemed",
    /**
     * value: "coupon_code_unknown"
     * @const
     */
    "coupon_code_unknown": "coupon_code_unknown",
    /**
     * value: "coupon_disabled"
     * @const
     */
    "coupon_disabled": "coupon_disabled",
    /**
     * value: "redemption_limit_exceeded"
     * @const
     */
    "redemption_limit_exceeded": "redemption_limit_exceeded",
    /**
     * value: "customer_redemption_limit_exceeded"
     * @const
     */
    "customer_redemption_limit_exceeded": "customer_redemption_limit_exceeded",
    /**
     * value: "timeframe_redemption_limit_exceeded"
     * @const
     */
    "timeframe_redemption_limit_exceeded": "timeframe_redemption_limit_exceeded",
    /**
     * value: "no_active_promotion"
     * @const
     */
    "no_active_promotion": "no_active_promotion",
    /**
     * value: "coupon_already_in_basket"
     * @const
     */
    "coupon_already_in_basket": "coupon_already_in_basket",
    /**
     * value: "no_applicable_promotion"
     * @const
     */
    "no_applicable_promotion": "no_applicable_promotion",
    /**
     * value: "applied"
     * @const
     */
    "applied": "applied",
    /**
     * value: "adhoc"
     * @const
     */
    "adhoc": "adhoc"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.CustomObject = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The CustomObject model module.
   * @module model/CustomObject
   * @version 17.3
   */

  /**
   * Constructs a new <code>CustomObject</code>.
   * Document representing a custom object that contains all defined custom attributes for its  object type.
   * @alias module:model/CustomObject
   * @class
   */
  var exports = function() {
    var _this = this;





  };

  /**
   * Constructs a <code>CustomObject</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CustomObject} obj Optional instance to populate.
   * @return {module:model/CustomObject} The populated <code>CustomObject</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('key_property')) {
        obj['key_property'] = ApiClient.convertToType(data['key_property'], 'String');
      }
      if (data.hasOwnProperty('key_value_integer')) {
        obj['key_value_integer'] = ApiClient.convertToType(data['key_value_integer'], 'Number');
      }
      if (data.hasOwnProperty('key_value_string')) {
        obj['key_value_string'] = ApiClient.convertToType(data['key_value_string'], 'String');
      }
      if (data.hasOwnProperty('object_type')) {
        obj['object_type'] = ApiClient.convertToType(data['object_type'], 'String');
      }
    }
    return obj;
  }

  /**
   * The name of the key property for the custom object.
   * @member {String} key_property
   */
  exports.prototype['key_property'] = undefined;
  /**
   * The id of the custom object when the type of the key is Integer.
   * @member {Number} key_value_integer
   */
  exports.prototype['key_value_integer'] = undefined;
  /**
   * The id of the custom object when the type of the key is String.
   * @member {String} key_value_string
   */
  exports.prototype['key_value_string'] = undefined;
  /**
   * The id of the object type.
   * @member {String} object_type
   */
  exports.prototype['object_type'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/CustomerAddress', 'model/CustomerPaymentInstrument'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./CustomerAddress'), require('./CustomerPaymentInstrument'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.Customer = factory(root.ShopApi.ApiClient, root.ShopApi.CustomerAddress, root.ShopApi.CustomerPaymentInstrument);
  }
}(this, function(ApiClient, CustomerAddress, CustomerPaymentInstrument) {
  'use strict';




  /**
   * The Customer model module.
   * @module model/Customer
   * @version 17.3
   */

  /**
   * Constructs a new <code>Customer</code>.
   * Document representing a customer.
   * @alias module:model/Customer
   * @class
   */
  var exports = function() {
    var _this = this;
































  };

  /**
   * Constructs a <code>Customer</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Customer} obj Optional instance to populate.
   * @return {module:model/Customer} The populated <code>Customer</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('addresses')) {
        obj['addresses'] = ApiClient.convertToType(data['addresses'], [CustomerAddress]);
      }
      if (data.hasOwnProperty('auth_type')) {
        obj['auth_type'] = ApiClient.convertToType(data['auth_type'], 'String');
      }
      if (data.hasOwnProperty('birthday')) {
        obj['birthday'] = ApiClient.convertToType(data['birthday'], 'Date');
      }
      if (data.hasOwnProperty('c_familyStatus')) {
        obj['c_familyStatus'] = ApiClient.convertToType(data['c_familyStatus'], 'String');
      }
      if (data.hasOwnProperty('company_name')) {
        obj['company_name'] = ApiClient.convertToType(data['company_name'], 'String');
      }
      if (data.hasOwnProperty('creation_date')) {
        obj['creation_date'] = ApiClient.convertToType(data['creation_date'], 'Date');
      }
      if (data.hasOwnProperty('customer_id')) {
        obj['customer_id'] = ApiClient.convertToType(data['customer_id'], 'String');
      }
      if (data.hasOwnProperty('customer_no')) {
        obj['customer_no'] = ApiClient.convertToType(data['customer_no'], 'String');
      }
      if (data.hasOwnProperty('email')) {
        obj['email'] = ApiClient.convertToType(data['email'], 'String');
      }
      if (data.hasOwnProperty('enabled')) {
        obj['enabled'] = ApiClient.convertToType(data['enabled'], 'Boolean');
      }
      if (data.hasOwnProperty('fax')) {
        obj['fax'] = ApiClient.convertToType(data['fax'], 'String');
      }
      if (data.hasOwnProperty('first_name')) {
        obj['first_name'] = ApiClient.convertToType(data['first_name'], 'String');
      }
      if (data.hasOwnProperty('gender')) {
        obj['gender'] = ApiClient.convertToType(data['gender'], 'Number');
      }
      if (data.hasOwnProperty('job_title')) {
        obj['job_title'] = ApiClient.convertToType(data['job_title'], 'String');
      }
      if (data.hasOwnProperty('last_login_time')) {
        obj['last_login_time'] = ApiClient.convertToType(data['last_login_time'], 'Date');
      }
      if (data.hasOwnProperty('last_modified')) {
        obj['last_modified'] = ApiClient.convertToType(data['last_modified'], 'Date');
      }
      if (data.hasOwnProperty('last_name')) {
        obj['last_name'] = ApiClient.convertToType(data['last_name'], 'String');
      }
      if (data.hasOwnProperty('last_visit_time')) {
        obj['last_visit_time'] = ApiClient.convertToType(data['last_visit_time'], 'Date');
      }
      if (data.hasOwnProperty('login')) {
        obj['login'] = ApiClient.convertToType(data['login'], 'String');
      }
      if (data.hasOwnProperty('note')) {
        obj['note'] = ApiClient.convertToType(data['note'], 'String');
      }
      if (data.hasOwnProperty('payment_instruments')) {
        obj['payment_instruments'] = ApiClient.convertToType(data['payment_instruments'], [CustomerPaymentInstrument]);
      }
      if (data.hasOwnProperty('phone_business')) {
        obj['phone_business'] = ApiClient.convertToType(data['phone_business'], 'String');
      }
      if (data.hasOwnProperty('phone_home')) {
        obj['phone_home'] = ApiClient.convertToType(data['phone_home'], 'String');
      }
      if (data.hasOwnProperty('phone_mobile')) {
        obj['phone_mobile'] = ApiClient.convertToType(data['phone_mobile'], 'String');
      }
      if (data.hasOwnProperty('preferred_locale')) {
        obj['preferred_locale'] = ApiClient.convertToType(data['preferred_locale'], 'String');
      }
      if (data.hasOwnProperty('previous_login_time')) {
        obj['previous_login_time'] = ApiClient.convertToType(data['previous_login_time'], 'Date');
      }
      if (data.hasOwnProperty('previous_visit_time')) {
        obj['previous_visit_time'] = ApiClient.convertToType(data['previous_visit_time'], 'Date');
      }
      if (data.hasOwnProperty('salutation')) {
        obj['salutation'] = ApiClient.convertToType(data['salutation'], 'String');
      }
      if (data.hasOwnProperty('second_name')) {
        obj['second_name'] = ApiClient.convertToType(data['second_name'], 'String');
      }
      if (data.hasOwnProperty('suffix')) {
        obj['suffix'] = ApiClient.convertToType(data['suffix'], 'String');
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
    }
    return obj;
  }

  /**
   * The customer's addresses.
   * @member {Array.<module:model/CustomerAddress>} addresses
   */
  exports.prototype['addresses'] = undefined;
  /**
   * The customer's authorization type (indicates if the customer is a guest  or a registered customer).
   * @member {module:model/Customer.AuthTypeEnum} auth_type
   */
  exports.prototype['auth_type'] = undefined;
  /**
   * The customer's birthday.
   * @member {Date} birthday
   */
  exports.prototype['birthday'] = undefined;
  /**
   * @member {String} c_familyStatus
   */
  exports.prototype['c_familyStatus'] = undefined;
  /**
   * The customer's company name.
   * @member {String} company_name
   */
  exports.prototype['company_name'] = undefined;
  /**
   * Returns the value of attribute 'creationDate'.
   * @member {Date} creation_date
   */
  exports.prototype['creation_date'] = undefined;
  /**
   * The customer's number (id). Both registered and guest customers have a  customer id.
   * @member {String} customer_id
   */
  exports.prototype['customer_id'] = undefined;
  /**
   * The customer's number (id). Only a registered customer has a customer  number.
   * @member {String} customer_no
   */
  exports.prototype['customer_no'] = undefined;
  /**
   * The customer's email address.
   * @member {String} email
   */
  exports.prototype['email'] = undefined;
  /**
   * A flag indicating whether this customer is is enabled and can log in.
   * @member {Boolean} enabled
   */
  exports.prototype['enabled'] = undefined;
  /**
   * The customer's fax number. The length is restricted to 32 characters.
   * @member {String} fax
   */
  exports.prototype['fax'] = undefined;
  /**
   * The customer's first name.
   * @member {String} first_name
   */
  exports.prototype['first_name'] = undefined;
  /**
   * The customer's gender.
   * @member {module:model/Customer.GenderEnum} gender
   */
  exports.prototype['gender'] = undefined;
  /**
   * The customer's job title.
   * @member {String} job_title
   */
  exports.prototype['job_title'] = undefined;
  /**
   * The time when the customer last logged in.
   * @member {Date} last_login_time
   */
  exports.prototype['last_login_time'] = undefined;
  /**
   * Returns the value of attribute 'lastModified'.
   * @member {Date} last_modified
   */
  exports.prototype['last_modified'] = undefined;
  /**
   * The customer's last name.
   * @member {String} last_name
   */
  exports.prototype['last_name'] = undefined;
  /**
   * The time when the customer last visited.
   * @member {Date} last_visit_time
   */
  exports.prototype['last_visit_time'] = undefined;
  /**
   * The customer's login.
   * @member {String} login
   */
  exports.prototype['login'] = undefined;
  /**
   * The customer's note.
   * @member {String} note
   */
  exports.prototype['note'] = undefined;
  /**
   * The customer's payment instruments.
   * @member {Array.<module:model/CustomerPaymentInstrument>} payment_instruments
   */
  exports.prototype['payment_instruments'] = undefined;
  /**
   * The customer's business phone number.
   * @member {String} phone_business
   */
  exports.prototype['phone_business'] = undefined;
  /**
   * The customer's home phone number.
   * @member {String} phone_home
   */
  exports.prototype['phone_home'] = undefined;
  /**
   * The customer's mobile phone number.
   * @member {String} phone_mobile
   */
  exports.prototype['phone_mobile'] = undefined;
  /**
   * The customer's preferred locale.
   * @member {String} preferred_locale
   */
  exports.prototype['preferred_locale'] = undefined;
  /**
   * The time when the customer logged in previously.
   * @member {Date} previous_login_time
   */
  exports.prototype['previous_login_time'] = undefined;
  /**
   * The time when the customer last visited the store.
   * @member {Date} previous_visit_time
   */
  exports.prototype['previous_visit_time'] = undefined;
  /**
   * The salutation to use for the customer.
   * @member {String} salutation
   */
  exports.prototype['salutation'] = undefined;
  /**
   * The customer's second name.
   * @member {String} second_name
   */
  exports.prototype['second_name'] = undefined;
  /**
   * The customer's suffix (for example, \"Jr.\" or \"Sr.\").
   * @member {String} suffix
   */
  exports.prototype['suffix'] = undefined;
  /**
   * The customer's title (for example, \"Mrs\" or \"Mr\").
   * @member {String} title
   */
  exports.prototype['title'] = undefined;


  /**
   * Allowed values for the <code>auth_type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.AuthTypeEnum = {
    /**
     * value: "guest"
     * @const
     */
    "guest": "guest",
    /**
     * value: "registered"
     * @const
     */
    "registered": "registered"  };

  /**
   * Allowed values for the <code>gender</code> property.
   * @enum {Number}
   * @readonly
   */
  exports.GenderEnum = {
    /**
     * value: 1
     * @const
     */
    "1": 1,
    /**
     * value: 2
     * @const
     */
    "2": 2  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.CustomerAddress = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The CustomerAddress model module.
   * @module model/CustomerAddress
   * @version 17.3
   */

  /**
   * Constructs a new <code>CustomerAddress</code>.
   * Document representing a customer address.
   * @alias module:model/CustomerAddress
   * @class
   */
  var exports = function() {
    var _this = this;























  };

  /**
   * Constructs a <code>CustomerAddress</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CustomerAddress} obj Optional instance to populate.
   * @return {module:model/CustomerAddress} The populated <code>CustomerAddress</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('address1')) {
        obj['address1'] = ApiClient.convertToType(data['address1'], 'String');
      }
      if (data.hasOwnProperty('address2')) {
        obj['address2'] = ApiClient.convertToType(data['address2'], 'String');
      }
      if (data.hasOwnProperty('address_id')) {
        obj['address_id'] = ApiClient.convertToType(data['address_id'], 'String');
      }
      if (data.hasOwnProperty('city')) {
        obj['city'] = ApiClient.convertToType(data['city'], 'String');
      }
      if (data.hasOwnProperty('company_name')) {
        obj['company_name'] = ApiClient.convertToType(data['company_name'], 'String');
      }
      if (data.hasOwnProperty('country_code')) {
        obj['country_code'] = ApiClient.convertToType(data['country_code'], 'String');
      }
      if (data.hasOwnProperty('creation_date')) {
        obj['creation_date'] = ApiClient.convertToType(data['creation_date'], 'Date');
      }
      if (data.hasOwnProperty('first_name')) {
        obj['first_name'] = ApiClient.convertToType(data['first_name'], 'String');
      }
      if (data.hasOwnProperty('full_name')) {
        obj['full_name'] = ApiClient.convertToType(data['full_name'], 'String');
      }
      if (data.hasOwnProperty('job_title')) {
        obj['job_title'] = ApiClient.convertToType(data['job_title'], 'String');
      }
      if (data.hasOwnProperty('last_modified')) {
        obj['last_modified'] = ApiClient.convertToType(data['last_modified'], 'Date');
      }
      if (data.hasOwnProperty('last_name')) {
        obj['last_name'] = ApiClient.convertToType(data['last_name'], 'String');
      }
      if (data.hasOwnProperty('phone')) {
        obj['phone'] = ApiClient.convertToType(data['phone'], 'String');
      }
      if (data.hasOwnProperty('post_box')) {
        obj['post_box'] = ApiClient.convertToType(data['post_box'], 'String');
      }
      if (data.hasOwnProperty('postal_code')) {
        obj['postal_code'] = ApiClient.convertToType(data['postal_code'], 'String');
      }
      if (data.hasOwnProperty('preferred')) {
        obj['preferred'] = ApiClient.convertToType(data['preferred'], 'Boolean');
      }
      if (data.hasOwnProperty('salutation')) {
        obj['salutation'] = ApiClient.convertToType(data['salutation'], 'String');
      }
      if (data.hasOwnProperty('second_name')) {
        obj['second_name'] = ApiClient.convertToType(data['second_name'], 'String');
      }
      if (data.hasOwnProperty('state_code')) {
        obj['state_code'] = ApiClient.convertToType(data['state_code'], 'String');
      }
      if (data.hasOwnProperty('suffix')) {
        obj['suffix'] = ApiClient.convertToType(data['suffix'], 'String');
      }
      if (data.hasOwnProperty('suite')) {
        obj['suite'] = ApiClient.convertToType(data['suite'], 'String');
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
    }
    return obj;
  }

  /**
   * The first address.
   * @member {String} address1
   */
  exports.prototype['address1'] = undefined;
  /**
   * The second address.
   * @member {String} address2
   */
  exports.prototype['address2'] = undefined;
  /**
   * The id of the address as specified by account owner.
   * @member {String} address_id
   */
  exports.prototype['address_id'] = undefined;
  /**
   * The city.
   * @member {String} city
   */
  exports.prototype['city'] = undefined;
  /**
   * The company name.
   * @member {String} company_name
   */
  exports.prototype['company_name'] = undefined;
  /**
   * The two-letter ISO 3166-1 (Alpha-2) country code.
   * @member {module:model/CustomerAddress.CountryCodeEnum} country_code
   */
  exports.prototype['country_code'] = undefined;
  /**
   * Returns the value of attribute 'creationDate'.
   * @member {Date} creation_date
   */
  exports.prototype['creation_date'] = undefined;
  /**
   * The first name.
   * @member {String} first_name
   */
  exports.prototype['first_name'] = undefined;
  /**
   * The full name.
   * @member {String} full_name
   */
  exports.prototype['full_name'] = undefined;
  /**
   * The job title.
   * @member {String} job_title
   */
  exports.prototype['job_title'] = undefined;
  /**
   * Returns the value of attribute 'lastModified'.
   * @member {Date} last_modified
   */
  exports.prototype['last_modified'] = undefined;
  /**
   * The last name.
   * @member {String} last_name
   */
  exports.prototype['last_name'] = undefined;
  /**
   * The phone number.
   * @member {String} phone
   */
  exports.prototype['phone'] = undefined;
  /**
   * The post box.
   * @member {String} post_box
   */
  exports.prototype['post_box'] = undefined;
  /**
   * The postal code.
   * @member {String} postal_code
   */
  exports.prototype['postal_code'] = undefined;
  /**
   * The preferred attribute.
   * @member {Boolean} preferred
   */
  exports.prototype['preferred'] = undefined;
  /**
   * The salutation.
   * @member {String} salutation
   */
  exports.prototype['salutation'] = undefined;
  /**
   * The second name.
   * @member {String} second_name
   */
  exports.prototype['second_name'] = undefined;
  /**
   * The state code.
   * @member {String} state_code
   */
  exports.prototype['state_code'] = undefined;
  /**
   * The suffix.
   * @member {String} suffix
   */
  exports.prototype['suffix'] = undefined;
  /**
   * The suite.
   * @member {String} suite
   */
  exports.prototype['suite'] = undefined;
  /**
   * The title.
   * @member {String} title
   */
  exports.prototype['title'] = undefined;


  /**
   * Allowed values for the <code>country_code</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CountryCodeEnum = {
    /**
     * value: "US"
     * @const
     */
    "US": "US",
    /**
     * value: "FR"
     * @const
     */
    "FR": "FR",
    /**
     * value: "IT"
     * @const
     */
    "IT": "IT",
    /**
     * value: "JP"
     * @const
     */
    "JP": "JP",
    /**
     * value: "CN"
     * @const
     */
    "CN": "CN",
    /**
     * value: "GB"
     * @const
     */
    "GB": "GB"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.CustomerAddressLink = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The CustomerAddressLink model module.
   * @module model/CustomerAddressLink
   * @version 17.3
   */

  /**
   * Constructs a new <code>CustomerAddressLink</code>.
   * * Result document of product list addresses.
   * @alias module:model/CustomerAddressLink
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>CustomerAddressLink</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CustomerAddressLink} obj Optional instance to populate.
   * @return {module:model/CustomerAddressLink} The populated <code>CustomerAddressLink</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('address_id')) {
        obj['address_id'] = ApiClient.convertToType(data['address_id'], 'String');
      }
      if (data.hasOwnProperty('link')) {
        obj['link'] = ApiClient.convertToType(data['link'], 'String');
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
    }
    return obj;
  }

  /**
   * The id of the address.
   * @member {String} address_id
   */
  exports.prototype['address_id'] = undefined;
  /**
   * The target of the link.
   * @member {String} link
   */
  exports.prototype['link'] = undefined;
  /**
   * The link title.
   * @member {String} title
   */
  exports.prototype['title'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/CustomerAddress'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./CustomerAddress'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.CustomerAddressResult = factory(root.ShopApi.ApiClient, root.ShopApi.CustomerAddress);
  }
}(this, function(ApiClient, CustomerAddress) {
  'use strict';




  /**
   * The CustomerAddressResult model module.
   * @module model/CustomerAddressResult
   * @version 17.3
   */

  /**
   * Constructs a new <code>CustomerAddressResult</code>.
   * Result document containing an array of customer addresses.
   * @alias module:model/CustomerAddressResult
   * @class
   */
  var exports = function() {
    var _this = this;








  };

  /**
   * Constructs a <code>CustomerAddressResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CustomerAddressResult} obj Optional instance to populate.
   * @return {module:model/CustomerAddressResult} The populated <code>CustomerAddressResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('count')) {
        obj['count'] = ApiClient.convertToType(data['count'], 'Number');
      }
      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], [CustomerAddress]);
      }
      if (data.hasOwnProperty('next')) {
        obj['next'] = ApiClient.convertToType(data['next'], 'String');
      }
      if (data.hasOwnProperty('previous')) {
        obj['previous'] = ApiClient.convertToType(data['previous'], 'String');
      }
      if (data.hasOwnProperty('select')) {
        obj['select'] = ApiClient.convertToType(data['select'], 'String');
      }
      if (data.hasOwnProperty('start')) {
        obj['start'] = ApiClient.convertToType(data['start'], 'Number');
      }
      if (data.hasOwnProperty('total')) {
        obj['total'] = ApiClient.convertToType(data['total'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The number of returned documents.
   * @member {Number} count
   */
  exports.prototype['count'] = undefined;
  /**
   * The array of customer address documents.
   * @member {Array.<module:model/CustomerAddress>} data
   */
  exports.prototype['data'] = undefined;
  /**
   * The URL of the next result page.
   * @member {String} next
   */
  exports.prototype['next'] = undefined;
  /**
   * The URL of the previous result page.
   * @member {String} previous
   */
  exports.prototype['previous'] = undefined;
  /**
   * 
   * @member {String} select
   */
  exports.prototype['select'] = undefined;
  /**
   * The zero-based index of the first search hit to include in the result.
   * @member {Number} start
   */
  exports.prototype['start'] = undefined;
  /**
   * The total number of documents.
   * @member {Number} total
   */
  exports.prototype['total'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.CustomerInfo = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The CustomerInfo model module.
   * @module model/CustomerInfo
   * @version 17.3
   */

  /**
   * Constructs a new <code>CustomerInfo</code>.
   * Document representing information used to identify a customer.
   * @alias module:model/CustomerInfo
   * @class
   * @param email {String} The customer's email address.
   */
  var exports = function(email) {
    var _this = this;





    _this['email'] = email;
  };

  /**
   * Constructs a <code>CustomerInfo</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CustomerInfo} obj Optional instance to populate.
   * @return {module:model/CustomerInfo} The populated <code>CustomerInfo</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('c_familyStatus')) {
        obj['c_familyStatus'] = ApiClient.convertToType(data['c_familyStatus'], 'String');
      }
      if (data.hasOwnProperty('customer_id')) {
        obj['customer_id'] = ApiClient.convertToType(data['customer_id'], 'String');
      }
      if (data.hasOwnProperty('customer_name')) {
        obj['customer_name'] = ApiClient.convertToType(data['customer_name'], 'String');
      }
      if (data.hasOwnProperty('customer_no')) {
        obj['customer_no'] = ApiClient.convertToType(data['customer_no'], 'String');
      }
      if (data.hasOwnProperty('email')) {
        obj['email'] = ApiClient.convertToType(data['email'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {String} c_familyStatus
   */
  exports.prototype['c_familyStatus'] = undefined;
  /**
   * The customer's number (id).
   * @member {String} customer_id
   */
  exports.prototype['customer_id'] = undefined;
  /**
   * 
   * @member {String} customer_name
   */
  exports.prototype['customer_name'] = undefined;
  /**
   * The customer's number (id).
   * @member {String} customer_no
   */
  exports.prototype['customer_no'] = undefined;
  /**
   * The customer's email address.
   * @member {String} email
   */
  exports.prototype['email'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Order'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Order'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.CustomerOrderResult = factory(root.ShopApi.ApiClient, root.ShopApi.Order);
  }
}(this, function(ApiClient, Order) {
  'use strict';




  /**
   * The CustomerOrderResult model module.
   * @module model/CustomerOrderResult
   * @version 17.3
   */

  /**
   * Constructs a new <code>CustomerOrderResult</code>.
   * Result document containing an array of customer orders.
   * @alias module:model/CustomerOrderResult
   * @class
   */
  var exports = function() {
    var _this = this;








  };

  /**
   * Constructs a <code>CustomerOrderResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CustomerOrderResult} obj Optional instance to populate.
   * @return {module:model/CustomerOrderResult} The populated <code>CustomerOrderResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('count')) {
        obj['count'] = ApiClient.convertToType(data['count'], 'Number');
      }
      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], [Order]);
      }
      if (data.hasOwnProperty('next')) {
        obj['next'] = ApiClient.convertToType(data['next'], 'String');
      }
      if (data.hasOwnProperty('previous')) {
        obj['previous'] = ApiClient.convertToType(data['previous'], 'String');
      }
      if (data.hasOwnProperty('select')) {
        obj['select'] = ApiClient.convertToType(data['select'], 'String');
      }
      if (data.hasOwnProperty('start')) {
        obj['start'] = ApiClient.convertToType(data['start'], 'Number');
      }
      if (data.hasOwnProperty('total')) {
        obj['total'] = ApiClient.convertToType(data['total'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The number of returned documents.
   * @member {Number} count
   */
  exports.prototype['count'] = undefined;
  /**
   * The array of customer order documents.
   * @member {Array.<module:model/Order>} data
   */
  exports.prototype['data'] = undefined;
  /**
   * The URL of the next result page.
   * @member {String} next
   */
  exports.prototype['next'] = undefined;
  /**
   * The URL of the previous result page.
   * @member {String} previous
   */
  exports.prototype['previous'] = undefined;
  /**
   * The fields that you want to select.
   * @member {String} select
   */
  exports.prototype['select'] = undefined;
  /**
   * The zero-based index of the first search hit to include in the result.
   * @member {Number} start
   */
  exports.prototype['start'] = undefined;
  /**
   * The total number of documents.
   * @member {Number} total
   */
  exports.prototype['total'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.CustomerPaymentCardRequest = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The CustomerPaymentCardRequest model module.
   * @module model/CustomerPaymentCardRequest
   * @version 17.3
   */

  /**
   * Constructs a new <code>CustomerPaymentCardRequest</code>.
   * Document representing a customer payment card request.
   * @alias module:model/CustomerPaymentCardRequest
   * @class
   */
  var exports = function() {
    var _this = this;










  };

  /**
   * Constructs a <code>CustomerPaymentCardRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CustomerPaymentCardRequest} obj Optional instance to populate.
   * @return {module:model/CustomerPaymentCardRequest} The populated <code>CustomerPaymentCardRequest</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('card_type')) {
        obj['card_type'] = ApiClient.convertToType(data['card_type'], 'String');
      }
      if (data.hasOwnProperty('credit_card_token')) {
        obj['credit_card_token'] = ApiClient.convertToType(data['credit_card_token'], 'String');
      }
      if (data.hasOwnProperty('expiration_month')) {
        obj['expiration_month'] = ApiClient.convertToType(data['expiration_month'], 'Number');
      }
      if (data.hasOwnProperty('expiration_year')) {
        obj['expiration_year'] = ApiClient.convertToType(data['expiration_year'], 'Number');
      }
      if (data.hasOwnProperty('holder')) {
        obj['holder'] = ApiClient.convertToType(data['holder'], 'String');
      }
      if (data.hasOwnProperty('issue_number')) {
        obj['issue_number'] = ApiClient.convertToType(data['issue_number'], 'String');
      }
      if (data.hasOwnProperty('number')) {
        obj['number'] = ApiClient.convertToType(data['number'], 'String');
      }
      if (data.hasOwnProperty('valid_from_month')) {
        obj['valid_from_month'] = ApiClient.convertToType(data['valid_from_month'], 'Number');
      }
      if (data.hasOwnProperty('valid_from_year')) {
        obj['valid_from_year'] = ApiClient.convertToType(data['valid_from_year'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The payment card type (for example, 'Visa').
   * @member {String} card_type
   */
  exports.prototype['card_type'] = undefined;
  /**
   * A credit card token. If a credit card is tokenized, the token can be used to look up the credit card data at the  token store.
   * @member {String} credit_card_token
   */
  exports.prototype['credit_card_token'] = undefined;
  /**
   * The month when the payment card expires.
   * @member {Number} expiration_month
   */
  exports.prototype['expiration_month'] = undefined;
  /**
   * The year when the payment card expires.
   * @member {Number} expiration_year
   */
  exports.prototype['expiration_year'] = undefined;
  /**
   * The payment card holder.
   * @member {String} holder
   */
  exports.prototype['holder'] = undefined;
  /**
   * The payment card issue number.
   * @member {String} issue_number
   */
  exports.prototype['issue_number'] = undefined;
  /**
   * The payment card number.
   * @member {String} number
   */
  exports.prototype['number'] = undefined;
  /**
   * The payment card valid from month.
   * @member {Number} valid_from_month
   */
  exports.prototype['valid_from_month'] = undefined;
  /**
   * The payment card valid from year.
   * @member {Number} valid_from_year
   */
  exports.prototype['valid_from_year'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/PaymentBankAccount', 'model/PaymentCard'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./PaymentBankAccount'), require('./PaymentCard'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.CustomerPaymentInstrument = factory(root.ShopApi.ApiClient, root.ShopApi.PaymentBankAccount, root.ShopApi.PaymentCard);
  }
}(this, function(ApiClient, PaymentBankAccount, PaymentCard) {
  'use strict';




  /**
   * The CustomerPaymentInstrument model module.
   * @module model/CustomerPaymentInstrument
   * @version 17.3
   */

  /**
   * Constructs a new <code>CustomerPaymentInstrument</code>.
   * Document representing a customer payment instrument.
   * @alias module:model/CustomerPaymentInstrument
   * @class
   */
  var exports = function() {
    var _this = this;









  };

  /**
   * Constructs a <code>CustomerPaymentInstrument</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CustomerPaymentInstrument} obj Optional instance to populate.
   * @return {module:model/CustomerPaymentInstrument} The populated <code>CustomerPaymentInstrument</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('bank_routing_number')) {
        obj['bank_routing_number'] = ApiClient.convertToType(data['bank_routing_number'], 'String');
      }
      if (data.hasOwnProperty('creation_date')) {
        obj['creation_date'] = ApiClient.convertToType(data['creation_date'], 'Date');
      }
      if (data.hasOwnProperty('last_modified')) {
        obj['last_modified'] = ApiClient.convertToType(data['last_modified'], 'Date');
      }
      if (data.hasOwnProperty('masked_gift_certificate_code')) {
        obj['masked_gift_certificate_code'] = ApiClient.convertToType(data['masked_gift_certificate_code'], 'String');
      }
      if (data.hasOwnProperty('payment_bank_account')) {
        obj['payment_bank_account'] = PaymentBankAccount.constructFromObject(data['payment_bank_account']);
      }
      if (data.hasOwnProperty('payment_card')) {
        obj['payment_card'] = PaymentCard.constructFromObject(data['payment_card']);
      }
      if (data.hasOwnProperty('payment_instrument_id')) {
        obj['payment_instrument_id'] = ApiClient.convertToType(data['payment_instrument_id'], 'String');
      }
      if (data.hasOwnProperty('payment_method_id')) {
        obj['payment_method_id'] = ApiClient.convertToType(data['payment_method_id'], 'String');
      }
    }
    return obj;
  }

  /**
   * The bank routing number.
   * @member {String} bank_routing_number
   */
  exports.prototype['bank_routing_number'] = undefined;
  /**
   * Returns the value of attribute 'creationDate'.
   * @member {Date} creation_date
   */
  exports.prototype['creation_date'] = undefined;
  /**
   * Returns the value of attribute 'lastModified'.
   * @member {Date} last_modified
   */
  exports.prototype['last_modified'] = undefined;
  /**
   * The masked gift certificate code.
   * @member {String} masked_gift_certificate_code
   */
  exports.prototype['masked_gift_certificate_code'] = undefined;
  /**
   * The payment bank account.
   * @member {module:model/PaymentBankAccount} payment_bank_account
   */
  exports.prototype['payment_bank_account'] = undefined;
  /**
   * The payment card.
   * @member {module:model/PaymentCard} payment_card
   */
  exports.prototype['payment_card'] = undefined;
  /**
   * The payment instrument ID.
   * @member {String} payment_instrument_id
   */
  exports.prototype['payment_instrument_id'] = undefined;
  /**
   * The payment method id. Optional if a customer payment instrument id is specified.
   * @member {String} payment_method_id
   */
  exports.prototype['payment_method_id'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/CustomerPaymentCardRequest', 'model/PaymentBankAccountRequest'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./CustomerPaymentCardRequest'), require('./PaymentBankAccountRequest'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.CustomerPaymentInstrumentRequest = factory(root.ShopApi.ApiClient, root.ShopApi.CustomerPaymentCardRequest, root.ShopApi.PaymentBankAccountRequest);
  }
}(this, function(ApiClient, CustomerPaymentCardRequest, PaymentBankAccountRequest) {
  'use strict';




  /**
   * The CustomerPaymentInstrumentRequest model module.
   * @module model/CustomerPaymentInstrumentRequest
   * @version 17.3
   */

  /**
   * Constructs a new <code>CustomerPaymentInstrumentRequest</code>.
   * Document representing a customer payment instrument request.
   * @alias module:model/CustomerPaymentInstrumentRequest
   * @class
   */
  var exports = function() {
    var _this = this;






  };

  /**
   * Constructs a <code>CustomerPaymentInstrumentRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CustomerPaymentInstrumentRequest} obj Optional instance to populate.
   * @return {module:model/CustomerPaymentInstrumentRequest} The populated <code>CustomerPaymentInstrumentRequest</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('bank_routing_number')) {
        obj['bank_routing_number'] = ApiClient.convertToType(data['bank_routing_number'], 'String');
      }
      if (data.hasOwnProperty('gift_certificate_code')) {
        obj['gift_certificate_code'] = ApiClient.convertToType(data['gift_certificate_code'], 'String');
      }
      if (data.hasOwnProperty('payment_bank_account')) {
        obj['payment_bank_account'] = PaymentBankAccountRequest.constructFromObject(data['payment_bank_account']);
      }
      if (data.hasOwnProperty('payment_card')) {
        obj['payment_card'] = CustomerPaymentCardRequest.constructFromObject(data['payment_card']);
      }
      if (data.hasOwnProperty('payment_method_id')) {
        obj['payment_method_id'] = ApiClient.convertToType(data['payment_method_id'], 'String');
      }
    }
    return obj;
  }

  /**
   * The bank routing number.
   * @member {String} bank_routing_number
   */
  exports.prototype['bank_routing_number'] = undefined;
  /**
   * The gift certificate code.
   * @member {String} gift_certificate_code
   */
  exports.prototype['gift_certificate_code'] = undefined;
  /**
   * The payment bank account request data.
   * @member {module:model/PaymentBankAccountRequest} payment_bank_account
   */
  exports.prototype['payment_bank_account'] = undefined;
  /**
   * The customer payment card.
   * @member {module:model/CustomerPaymentCardRequest} payment_card
   */
  exports.prototype['payment_card'] = undefined;
  /**
   * The payment method id. Optional if a customer payment instrument id is specified.
   * @member {String} payment_method_id
   */
  exports.prototype['payment_method_id'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/CustomerPaymentInstrument'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./CustomerPaymentInstrument'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.CustomerPaymentInstrumentResult = factory(root.ShopApi.ApiClient, root.ShopApi.CustomerPaymentInstrument);
  }
}(this, function(ApiClient, CustomerPaymentInstrument) {
  'use strict';




  /**
   * The CustomerPaymentInstrumentResult model module.
   * @module model/CustomerPaymentInstrumentResult
   * @version 17.3
   */

  /**
   * Constructs a new <code>CustomerPaymentInstrumentResult</code>.
   * Document representing a customer payment instrument result. The payment data contained is masked where needed for security purposes.
   * @alias module:model/CustomerPaymentInstrumentResult
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>CustomerPaymentInstrumentResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CustomerPaymentInstrumentResult} obj Optional instance to populate.
   * @return {module:model/CustomerPaymentInstrumentResult} The populated <code>CustomerPaymentInstrumentResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('count')) {
        obj['count'] = ApiClient.convertToType(data['count'], 'Number');
      }
      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], [CustomerPaymentInstrument]);
      }
      if (data.hasOwnProperty('total')) {
        obj['total'] = ApiClient.convertToType(data['total'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The number of returned documents.
   * @member {Number} count
   */
  exports.prototype['count'] = undefined;
  /**
   * The customer payment instruments list.
   * @member {Array.<module:model/CustomerPaymentInstrument>} data
   */
  exports.prototype['data'] = undefined;
  /**
   * The total number of documents.
   * @member {Number} total
   */
  exports.prototype['total'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/CustomerAddressLink', 'model/CustomerProductListItem', 'model/CustomerProductListItemLink', 'model/CustomerProductListRegistrant', 'model/ProductListEvent', 'model/ProductListShippingAddress'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./CustomerAddressLink'), require('./CustomerProductListItem'), require('./CustomerProductListItemLink'), require('./CustomerProductListRegistrant'), require('./ProductListEvent'), require('./ProductListShippingAddress'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.CustomerProductList = factory(root.ShopApi.ApiClient, root.ShopApi.CustomerAddressLink, root.ShopApi.CustomerProductListItem, root.ShopApi.CustomerProductListItemLink, root.ShopApi.CustomerProductListRegistrant, root.ShopApi.ProductListEvent, root.ShopApi.ProductListShippingAddress);
  }
}(this, function(ApiClient, CustomerAddressLink, CustomerProductListItem, CustomerProductListItemLink, CustomerProductListRegistrant, ProductListEvent, ProductListShippingAddress) {
  'use strict';




  /**
   * The CustomerProductList model module.
   * @module model/CustomerProductList
   * @version 17.3
   */

  /**
   * Constructs a new <code>CustomerProductList</code>.
   * Document representing a customer product List.
   * @alias module:model/CustomerProductList
   * @class
   */
  var exports = function() {
    var _this = this;

















  };

  /**
   * Constructs a <code>CustomerProductList</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CustomerProductList} obj Optional instance to populate.
   * @return {module:model/CustomerProductList} The populated <code>CustomerProductList</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('co_registrant')) {
        obj['co_registrant'] = CustomerProductListRegistrant.constructFromObject(data['co_registrant']);
      }
      if (data.hasOwnProperty('creation_date')) {
        obj['creation_date'] = ApiClient.convertToType(data['creation_date'], 'Date');
      }
      if (data.hasOwnProperty('current_shipping_address_link')) {
        obj['current_shipping_address_link'] = CustomerAddressLink.constructFromObject(data['current_shipping_address_link']);
      }
      if (data.hasOwnProperty('customer_product_list_items')) {
        obj['customer_product_list_items'] = ApiClient.convertToType(data['customer_product_list_items'], [CustomerProductListItem]);
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('event')) {
        obj['event'] = ProductListEvent.constructFromObject(data['event']);
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('items_link')) {
        obj['items_link'] = CustomerProductListItemLink.constructFromObject(data['items_link']);
      }
      if (data.hasOwnProperty('last_modified')) {
        obj['last_modified'] = ApiClient.convertToType(data['last_modified'], 'Date');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('post_event_shipping_address_link')) {
        obj['post_event_shipping_address_link'] = CustomerAddressLink.constructFromObject(data['post_event_shipping_address_link']);
      }
      if (data.hasOwnProperty('product_list_shipping_address')) {
        obj['product_list_shipping_address'] = ProductListShippingAddress.constructFromObject(data['product_list_shipping_address']);
      }
      if (data.hasOwnProperty('public')) {
        obj['public'] = ApiClient.convertToType(data['public'], 'Boolean');
      }
      if (data.hasOwnProperty('registrant')) {
        obj['registrant'] = CustomerProductListRegistrant.constructFromObject(data['registrant']);
      }
      if (data.hasOwnProperty('shipping_address_link')) {
        obj['shipping_address_link'] = CustomerAddressLink.constructFromObject(data['shipping_address_link']);
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
    }
    return obj;
  }

  /**
   * The coRegistrant of this product list.
   * @member {module:model/CustomerProductListRegistrant} co_registrant
   */
  exports.prototype['co_registrant'] = undefined;
  /**
   * Returns the value of attribute 'creationDate'.
   * @member {Date} creation_date
   */
  exports.prototype['creation_date'] = undefined;
  /**
   * The resource link to the current shipping address of this customer product list.
   * @member {module:model/CustomerAddressLink} current_shipping_address_link
   */
  exports.prototype['current_shipping_address_link'] = undefined;
  /**
   * The list of customer product list items.
   * @member {Array.<module:model/CustomerProductListItem>} customer_product_list_items
   */
  exports.prototype['customer_product_list_items'] = undefined;
  /**
   * The description of this product list.
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * The event of this product list.
   * @member {module:model/ProductListEvent} event
   */
  exports.prototype['event'] = undefined;
  /**
   * The id of this product list.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The resource link to the items of this customer product list.
   * @member {module:model/CustomerProductListItemLink} items_link
   */
  exports.prototype['items_link'] = undefined;
  /**
   * Returns the value of attribute 'lastModified'.
   * @member {Date} last_modified
   */
  exports.prototype['last_modified'] = undefined;
  /**
   * The name of this product list.
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * The resource link to the post event shipping address of this customer product list.
   * @member {module:model/CustomerAddressLink} post_event_shipping_address_link
   */
  exports.prototype['post_event_shipping_address_link'] = undefined;
  /**
   * The abbreviated shipping address of this product list representing what anonymous user can see.
   * @member {module:model/ProductListShippingAddress} product_list_shipping_address
   */
  exports.prototype['product_list_shipping_address'] = undefined;
  /**
   * Indicates whether the owner made this product list available for access by other customers.
   * @member {Boolean} public
   */
  exports.prototype['public'] = undefined;
  /**
   * The registrant of this product list.
   * @member {module:model/CustomerProductListRegistrant} registrant
   */
  exports.prototype['registrant'] = undefined;
  /**
   * The resource link to the shipping address of this customer product list.
   * @member {module:model/CustomerAddressLink} shipping_address_link
   */
  exports.prototype['shipping_address_link'] = undefined;
  /**
   * The type of the product list.
   * @member {module:model/CustomerProductList.TypeEnum} type
   */
  exports.prototype['type'] = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "wish_list"
     * @const
     */
    "wish_list": "wish_list",
    /**
     * value: "gift_registry"
     * @const
     */
    "gift_registry": "gift_registry",
    /**
     * value: "shopping_list"
     * @const
     */
    "shopping_list": "shopping_list",
    /**
     * value: "custom_1"
     * @const
     */
    "custom_1": "custom_1",
    /**
     * value: "custom_2"
     * @const
     */
    "custom_2": "custom_2",
    /**
     * value: "custom_3"
     * @const
     */
    "custom_3": "custom_3"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Product', 'model/ProductSimpleLink'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Product'), require('./ProductSimpleLink'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.CustomerProductListItem = factory(root.ShopApi.ApiClient, root.ShopApi.Product, root.ShopApi.ProductSimpleLink);
  }
}(this, function(ApiClient, Product, ProductSimpleLink) {
  'use strict';




  /**
   * The CustomerProductListItem model module.
   * @module model/CustomerProductListItem
   * @version 17.3
   */

  /**
   * Constructs a new <code>CustomerProductListItem</code>.
   * Document representing a customer product list item.
   * @alias module:model/CustomerProductListItem
   * @class
   */
  var exports = function() {
    var _this = this;










  };

  /**
   * Constructs a <code>CustomerProductListItem</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CustomerProductListItem} obj Optional instance to populate.
   * @return {module:model/CustomerProductListItem} The populated <code>CustomerProductListItem</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('priority')) {
        obj['priority'] = ApiClient.convertToType(data['priority'], 'Number');
      }
      if (data.hasOwnProperty('product')) {
        obj['product'] = Product.constructFromObject(data['product']);
      }
      if (data.hasOwnProperty('product_details_link')) {
        obj['product_details_link'] = ProductSimpleLink.constructFromObject(data['product_details_link']);
      }
      if (data.hasOwnProperty('product_id')) {
        obj['product_id'] = ApiClient.convertToType(data['product_id'], 'String');
      }
      if (data.hasOwnProperty('public')) {
        obj['public'] = ApiClient.convertToType(data['public'], 'Boolean');
      }
      if (data.hasOwnProperty('purchased_quantity')) {
        obj['purchased_quantity'] = ApiClient.convertToType(data['purchased_quantity'], 'Number');
      }
      if (data.hasOwnProperty('quantity')) {
        obj['quantity'] = ApiClient.convertToType(data['quantity'], 'Number');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
    }
    return obj;
  }

  /**
   * The id of this product list item.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The priority of the item.
   * @member {Number} priority
   */
  exports.prototype['priority'] = undefined;
  /**
   * The product item
   * @member {module:model/Product} product
   */
  exports.prototype['product'] = undefined;
  /**
   * A link to the product.
   * @member {module:model/ProductSimpleLink} product_details_link
   */
  exports.prototype['product_details_link'] = undefined;
  /**
   * The id of the product.
   * @member {String} product_id
   */
  exports.prototype['product_id'] = undefined;
  /**
   * Is this product list item available for access by other customers?
   * @member {Boolean} public
   */
  exports.prototype['public'] = undefined;
  /**
   * The quantity of products already purchased.
   * @member {Number} purchased_quantity
   */
  exports.prototype['purchased_quantity'] = undefined;
  /**
   * The quantity of this product list item.
   * @member {Number} quantity
   */
  exports.prototype['quantity'] = undefined;
  /**
   * The type of the item.
   * @member {module:model/CustomerProductListItem.TypeEnum} type
   */
  exports.prototype['type'] = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "product"
     * @const
     */
    "product": "product",
    /**
     * value: "gift_certificate"
     * @const
     */
    "gift_certificate": "gift_certificate"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.CustomerProductListItemLink = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The CustomerProductListItemLink model module.
   * @module model/CustomerProductListItemLink
   * @version 17.3
   */

  /**
   * Constructs a new <code>CustomerProductListItemLink</code>.
   * Document representing a customer product list item link.
   * @alias module:model/CustomerProductListItemLink
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>CustomerProductListItemLink</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CustomerProductListItemLink} obj Optional instance to populate.
   * @return {module:model/CustomerProductListItemLink} The populated <code>CustomerProductListItemLink</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('link')) {
        obj['link'] = ApiClient.convertToType(data['link'], 'String');
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
    }
    return obj;
  }

  /**
   * The target of the link.
   * @member {String} link
   */
  exports.prototype['link'] = undefined;
  /**
   * The link title.
   * @member {String} title
   */
  exports.prototype['title'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.CustomerProductListItemPurchase = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The CustomerProductListItemPurchase model module.
   * @module model/CustomerProductListItemPurchase
   * @version 17.3
   */

  /**
   * Constructs a new <code>CustomerProductListItemPurchase</code>.
   * Document representing a customer product list item purchase.
   * @alias module:model/CustomerProductListItemPurchase
   * @class
   */
  var exports = function() {
    var _this = this;






  };

  /**
   * Constructs a <code>CustomerProductListItemPurchase</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CustomerProductListItemPurchase} obj Optional instance to populate.
   * @return {module:model/CustomerProductListItemPurchase} The populated <code>CustomerProductListItemPurchase</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('order_no')) {
        obj['order_no'] = ApiClient.convertToType(data['order_no'], 'String');
      }
      if (data.hasOwnProperty('product_list_item_id')) {
        obj['product_list_item_id'] = ApiClient.convertToType(data['product_list_item_id'], 'String');
      }
      if (data.hasOwnProperty('purchaser_name')) {
        obj['purchaser_name'] = ApiClient.convertToType(data['purchaser_name'], 'String');
      }
      if (data.hasOwnProperty('quantity')) {
        obj['quantity'] = ApiClient.convertToType(data['quantity'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The id of this purchase.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The order number of this purchase.
   * @member {String} order_no
   */
  exports.prototype['order_no'] = undefined;
  /**
   * The id of the product list item this purchase relates to.
   * @member {String} product_list_item_id
   */
  exports.prototype['product_list_item_id'] = undefined;
  /**
   * The name of the purchaser.
   * @member {String} purchaser_name
   */
  exports.prototype['purchaser_name'] = undefined;
  /**
   * The quantity of this product list item purchased.
   * @member {Number} quantity
   */
  exports.prototype['quantity'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/CustomerProductListItemPurchase'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./CustomerProductListItemPurchase'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.CustomerProductListItemPurchaseResult = factory(root.ShopApi.ApiClient, root.ShopApi.CustomerProductListItemPurchase);
  }
}(this, function(ApiClient, CustomerProductListItemPurchase) {
  'use strict';




  /**
   * The CustomerProductListItemPurchaseResult model module.
   * @module model/CustomerProductListItemPurchaseResult
   * @version 17.3
   */

  /**
   * Constructs a new <code>CustomerProductListItemPurchaseResult</code>.
   * Document representing a customer product list purchases result.
   * @alias module:model/CustomerProductListItemPurchaseResult
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>CustomerProductListItemPurchaseResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CustomerProductListItemPurchaseResult} obj Optional instance to populate.
   * @return {module:model/CustomerProductListItemPurchaseResult} The populated <code>CustomerProductListItemPurchaseResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('count')) {
        obj['count'] = ApiClient.convertToType(data['count'], 'Number');
      }
      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], [CustomerProductListItemPurchase]);
      }
      if (data.hasOwnProperty('total')) {
        obj['total'] = ApiClient.convertToType(data['total'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The number of returned documents.
   * @member {Number} count
   */
  exports.prototype['count'] = undefined;
  /**
   * The customer product list item purchases.
   * @member {Array.<module:model/CustomerProductListItemPurchase>} data
   */
  exports.prototype['data'] = undefined;
  /**
   * The total number of documents.
   * @member {Number} total
   */
  exports.prototype['total'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/CustomerProductListItem'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./CustomerProductListItem'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.CustomerProductListItemResult = factory(root.ShopApi.ApiClient, root.ShopApi.CustomerProductListItem);
  }
}(this, function(ApiClient, CustomerProductListItem) {
  'use strict';




  /**
   * The CustomerProductListItemResult model module.
   * @module model/CustomerProductListItemResult
   * @version 17.3
   */

  /**
   * Constructs a new <code>CustomerProductListItemResult</code>.
   * Document representing a customer product list items result.
   * @alias module:model/CustomerProductListItemResult
   * @class
   */
  var exports = function() {
    var _this = this;







  };

  /**
   * Constructs a <code>CustomerProductListItemResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CustomerProductListItemResult} obj Optional instance to populate.
   * @return {module:model/CustomerProductListItemResult} The populated <code>CustomerProductListItemResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('count')) {
        obj['count'] = ApiClient.convertToType(data['count'], 'Number');
      }
      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], [CustomerProductListItem]);
      }
      if (data.hasOwnProperty('next')) {
        obj['next'] = ApiClient.convertToType(data['next'], 'String');
      }
      if (data.hasOwnProperty('previous')) {
        obj['previous'] = ApiClient.convertToType(data['previous'], 'String');
      }
      if (data.hasOwnProperty('start')) {
        obj['start'] = ApiClient.convertToType(data['start'], 'Number');
      }
      if (data.hasOwnProperty('total')) {
        obj['total'] = ApiClient.convertToType(data['total'], 'Number');
      }
    }
    return obj;
  }

  /**
   * @member {Number} count
   */
  exports.prototype['count'] = undefined;
  /**
   * The customer product list items.
   * @member {Array.<module:model/CustomerProductListItem>} data
   */
  exports.prototype['data'] = undefined;
  /**
   * The URL of the next result page.
   * @member {String} next
   */
  exports.prototype['next'] = undefined;
  /**
   * The URL of the previous result page.
   * @member {String} previous
   */
  exports.prototype['previous'] = undefined;
  /**
   * The zero-based index of the first search hit to include in the result.
   * @member {Number} start
   */
  exports.prototype['start'] = undefined;
  /**
   * @member {Number} total
   */
  exports.prototype['total'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.CustomerProductListRegistrant = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The CustomerProductListRegistrant model module.
   * @module model/CustomerProductListRegistrant
   * @version 17.3
   */

  /**
   * Constructs a new <code>CustomerProductListRegistrant</code>.
   * Document representing a customer product list registrant.
   * @alias module:model/CustomerProductListRegistrant
   * @class
   */
  var exports = function() {
    var _this = this;





  };

  /**
   * Constructs a <code>CustomerProductListRegistrant</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CustomerProductListRegistrant} obj Optional instance to populate.
   * @return {module:model/CustomerProductListRegistrant} The populated <code>CustomerProductListRegistrant</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('email')) {
        obj['email'] = ApiClient.convertToType(data['email'], 'String');
      }
      if (data.hasOwnProperty('first_name')) {
        obj['first_name'] = ApiClient.convertToType(data['first_name'], 'String');
      }
      if (data.hasOwnProperty('last_name')) {
        obj['last_name'] = ApiClient.convertToType(data['last_name'], 'String');
      }
      if (data.hasOwnProperty('role')) {
        obj['role'] = ApiClient.convertToType(data['role'], 'String');
      }
    }
    return obj;
  }

  /**
   * The email of the registrant.
   * @member {String} email
   */
  exports.prototype['email'] = undefined;
  /**
   * The first name of the registrant.
   * @member {String} first_name
   */
  exports.prototype['first_name'] = undefined;
  /**
   * The last name of the registrant.
   * @member {String} last_name
   */
  exports.prototype['last_name'] = undefined;
  /**
   * The role of the registrant.
   * @member {String} role
   */
  exports.prototype['role'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/CustomerProductList'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./CustomerProductList'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.CustomerProductListResult = factory(root.ShopApi.ApiClient, root.ShopApi.CustomerProductList);
  }
}(this, function(ApiClient, CustomerProductList) {
  'use strict';




  /**
   * The CustomerProductListResult model module.
   * @module model/CustomerProductListResult
   * @version 17.3
   */

  /**
   * Constructs a new <code>CustomerProductListResult</code>.
   * Document representing a customer product lists result.
   * @alias module:model/CustomerProductListResult
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>CustomerProductListResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CustomerProductListResult} obj Optional instance to populate.
   * @return {module:model/CustomerProductListResult} The populated <code>CustomerProductListResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('count')) {
        obj['count'] = ApiClient.convertToType(data['count'], 'Number');
      }
      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], [CustomerProductList]);
      }
      if (data.hasOwnProperty('total')) {
        obj['total'] = ApiClient.convertToType(data['total'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The number of returned documents.
   * @member {Number} count
   */
  exports.prototype['count'] = undefined;
  /**
   * The customer product lists.
   * @member {Array.<module:model/CustomerProductList>} data
   */
  exports.prototype['data'] = undefined;
  /**
   * The total number of documents.
   * @member {Number} total
   */
  exports.prototype['total'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Customer'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Customer'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.CustomerRegistration = factory(root.ShopApi.ApiClient, root.ShopApi.Customer);
  }
}(this, function(ApiClient, Customer) {
  'use strict';




  /**
   * The CustomerRegistration model module.
   * @module model/CustomerRegistration
   * @version 17.3
   */

  /**
   * Constructs a new <code>CustomerRegistration</code>.
   * Document representing the registration information for a customer.
   * @alias module:model/CustomerRegistration
   * @class
   * @param customer {module:model/Customer} The customer registration information.  The mandatory properties for registration are login, last name and email.
   */
  var exports = function(customer) {
    var _this = this;

    _this['customer'] = customer;

  };

  /**
   * Constructs a <code>CustomerRegistration</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CustomerRegistration} obj Optional instance to populate.
   * @return {module:model/CustomerRegistration} The populated <code>CustomerRegistration</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('customer')) {
        obj['customer'] = Customer.constructFromObject(data['customer']);
      }
      if (data.hasOwnProperty('password')) {
        obj['password'] = ApiClient.convertToType(data['password'], 'String');
      }
    }
    return obj;
  }

  /**
   * The customer registration information.  The mandatory properties for registration are login, last name and email.
   * @member {module:model/Customer} customer
   */
  exports.prototype['customer'] = undefined;
  /**
   * The password to authorize.
   * @member {String} password
   */
  exports.prototype['password'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.Discount = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Discount model module.
   * @module model/Discount
   * @version 17.3
   */

  /**
   * Constructs a new <code>Discount</code>.
   * Document representing a discount that was 
   * @alias module:model/Discount
   * @class
   * @param type {module:model/Discount.TypeEnum} The type of discount.
   */
  var exports = function(type) {
    var _this = this;




    _this['type'] = type;
  };

  /**
   * Constructs a <code>Discount</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Discount} obj Optional instance to populate.
   * @return {module:model/Discount} The populated <code>Discount</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('amount')) {
        obj['amount'] = ApiClient.convertToType(data['amount'], 'Number');
      }
      if (data.hasOwnProperty('percentage')) {
        obj['percentage'] = ApiClient.convertToType(data['percentage'], 'Number');
      }
      if (data.hasOwnProperty('price_book_id')) {
        obj['price_book_id'] = ApiClient.convertToType(data['price_book_id'], 'String');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
    }
    return obj;
  }

  /**
   * The amount that is used with the amount and fixed price types.
   * @member {Number} amount
   */
  exports.prototype['amount'] = undefined;
  /**
   * The percentage that is used with percentage types.
   * @member {Number} percentage
   */
  exports.prototype['percentage'] = undefined;
  /**
   * The price book id that is used with some types.
   * @member {String} price_book_id
   */
  exports.prototype['price_book_id'] = undefined;
  /**
   * The type of discount.
   * @member {module:model/Discount.TypeEnum} type
   */
  exports.prototype['type'] = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "percentage"
     * @const
     */
    "percentage": "percentage",
    /**
     * value: "fixed_price"
     * @const
     */
    "fixed_price": "fixed_price",
    /**
     * value: "amount"
     * @const
     */
    "amount": "amount",
    /**
     * value: "free"
     * @const
     */
    "free": "free",
    /**
     * value: "price_book_price"
     * @const
     */
    "price_book_price": "price_book_price",
    /**
     * value: "bonus"
     * @const
     */
    "bonus": "bonus",
    /**
     * value: "total_fixed_price"
     * @const
     */
    "total_fixed_price": "total_fixed_price",
    /**
     * value: "bonus_choice"
     * @const
     */
    "bonus_choice": "bonus_choice",
    /**
     * value: "percentage_off_options"
     * @const
     */
    "percentage_off_options": "percentage_off_options"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.DiscountRequest = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The DiscountRequest model module.
   * @module model/DiscountRequest
   * @version 17.3
   */

  /**
   * Constructs a new <code>DiscountRequest</code>.
   * Document representing a discount to be applied to a custom price adjustment. The properties 
   * @alias module:model/DiscountRequest
   * @class
   * @param type {module:model/DiscountRequest.TypeEnum} The type of discount.
   * @param value {Number} The amount of the discount.
   */
  var exports = function(type, value) {
    var _this = this;

    _this['type'] = type;
    _this['value'] = value;
  };

  /**
   * Constructs a <code>DiscountRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/DiscountRequest} obj Optional instance to populate.
   * @return {module:model/DiscountRequest} The populated <code>DiscountRequest</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
      if (data.hasOwnProperty('value')) {
        obj['value'] = ApiClient.convertToType(data['value'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The type of discount.
   * @member {module:model/DiscountRequest.TypeEnum} type
   */
  exports.prototype['type'] = undefined;
  /**
   * The amount of the discount.
   * @member {Number} value
   */
  exports.prototype['value'] = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "percentage"
     * @const
     */
    "percentage": "percentage",
    /**
     * value: "fixed_price"
     * @const
     */
    "fixed_price": "fixed_price",
    /**
     * value: "amount"
     * @const
     */
    "amount": "amount"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.Filter = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Filter model module.
   * @module model/Filter
   * @version 17.3
   */

  /**
   * Constructs a new <code>BoolFilter</code>.
   * Document representing a boolean filter.  
   * @alias module:model/BoolFilter
   * @class
   * @param operator {module:model/BoolFilter.OperatorEnum} The logical operator the filters are combined with.
   */
  var exports = function(operator) {
    var _this = this;
  };

  /**
   * Constructs a <code>BoolFilter</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/BoolFilter} obj Optional instance to populate.
   * @return {module:model/BoolFilter} The populated <code>BoolFilter</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
    }
    return obj;
  }
  
  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Filter', 'model/Query'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Filter'), require('./Query'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.FilteredQuery = factory(root.ShopApi.ApiClient, root.ShopApi.Filter, root.ShopApi.Query);
  }
}(this, function(ApiClient, Filter, Query) {
  'use strict';




  /**
   * The FilteredQuery model module.
   * @module model/FilteredQuery
   * @version 17.3
   */

  /**
   * Constructs a new <code>FilteredQuery</code>.
   * A filtered query allows to filter the result of a (possibly complex) query using a (possibly complex) filter.  
   * @alias module:model/FilteredQuery
   * @class
   * @param filter {module:model/Filter} The (possibly complex) filter object.
   * @param query {module:model/Query} The query object.
   */
  var exports = function(filter, query) {
    var _this = this;

    _this['filter'] = filter;
    _this['query'] = query;
  };

  /**
   * Constructs a <code>FilteredQuery</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/FilteredQuery} obj Optional instance to populate.
   * @return {module:model/FilteredQuery} The populated <code>FilteredQuery</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('filter')) {
        obj['filter'] = Filter.constructFromObject(data['filter']);
      }
      if (data.hasOwnProperty('query')) {
        obj['query'] = Query.constructFromObject(data['query']);
      }
    }
    return obj;
  }

  /**
   * The (possibly complex) filter object.
   * @member {module:model/Filter} filter
   */
  exports.prototype['filter'] = undefined;
  /**
   * The query object.
   * @member {module:model/Query} query
   */
  exports.prototype['query'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.GiftCertificate = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The GiftCertificate model module.
   * @module model/GiftCertificate
   * @version 17.3
   */

  /**
   * Constructs a new <code>GiftCertificate</code>.
   * Document representing a gift certificate.
   * @alias module:model/GiftCertificate
   * @class
   */
  var exports = function() {
    var _this = this;












  };

  /**
   * Constructs a <code>GiftCertificate</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GiftCertificate} obj Optional instance to populate.
   * @return {module:model/GiftCertificate} The populated <code>GiftCertificate</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('amount')) {
        obj['amount'] = ApiClient.convertToType(data['amount'], 'Number');
      }
      if (data.hasOwnProperty('balance')) {
        obj['balance'] = ApiClient.convertToType(data['balance'], 'Number');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('enabled')) {
        obj['enabled'] = ApiClient.convertToType(data['enabled'], 'Boolean');
      }
      if (data.hasOwnProperty('masked_gift_certificate_code')) {
        obj['masked_gift_certificate_code'] = ApiClient.convertToType(data['masked_gift_certificate_code'], 'String');
      }
      if (data.hasOwnProperty('merchant_id')) {
        obj['merchant_id'] = ApiClient.convertToType(data['merchant_id'], 'String');
      }
      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
      if (data.hasOwnProperty('recipient_email')) {
        obj['recipient_email'] = ApiClient.convertToType(data['recipient_email'], 'String');
      }
      if (data.hasOwnProperty('recipient_name')) {
        obj['recipient_name'] = ApiClient.convertToType(data['recipient_name'], 'String');
      }
      if (data.hasOwnProperty('sender_name')) {
        obj['sender_name'] = ApiClient.convertToType(data['sender_name'], 'String');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = ApiClient.convertToType(data['status'], 'String');
      }
    }
    return obj;
  }

  /**
   * The gift certificate original amount.
   * @member {Number} amount
   */
  exports.prototype['amount'] = undefined;
  /**
   * The gift certificate balance.
   * @member {Number} balance
   */
  exports.prototype['balance'] = undefined;
  /**
   * The gift certificate description.
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * Is the gift certificate is enabled?
   * @member {Boolean} enabled
   */
  exports.prototype['enabled'] = undefined;
  /**
   * The masked gift certificate code.
   * @member {String} masked_gift_certificate_code
   */
  exports.prototype['masked_gift_certificate_code'] = undefined;
  /**
   * The merchant ID.
   * @member {String} merchant_id
   */
  exports.prototype['merchant_id'] = undefined;
  /**
   * The message.
   * @member {String} message
   */
  exports.prototype['message'] = undefined;
  /**
   * The recipient email.
   * @member {String} recipient_email
   */
  exports.prototype['recipient_email'] = undefined;
  /**
   * The recipient name.
   * @member {String} recipient_name
   */
  exports.prototype['recipient_name'] = undefined;
  /**
   * The sender name.
   * @member {String} sender_name
   */
  exports.prototype['sender_name'] = undefined;
  /**
   * The gift certificate status.
   * @member {module:model/GiftCertificate.StatusEnum} status
   */
  exports.prototype['status'] = undefined;


  /**
   * Allowed values for the <code>status</code> property.
   * @enum {String}
   * @readonly
   */
  exports.StatusEnum = {
    /**
     * value: "pending"
     * @const
     */
    "pending": "pending",
    /**
     * value: "issued"
     * @const
     */
    "issued": "issued",
    /**
     * value: "partially_redeemed"
     * @const
     */
    "partially_redeemed": "partially_redeemed",
    /**
     * value: "redeemed"
     * @const
     */
    "redeemed": "redeemed"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.GiftCertificateItem = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The GiftCertificateItem model module.
   * @module model/GiftCertificateItem
   * @version 17.3
   */

  /**
   * Constructs a new <code>GiftCertificateItem</code>.
   * A gift certificate item.
   * @alias module:model/GiftCertificateItem
   * @class
   * @param amount {Number} The certificate item amount.
   * @param recipientEmail {String} The recipient's email.
   */
  var exports = function(amount, recipientEmail) {
    var _this = this;

    _this['amount'] = amount;


    _this['recipient_email'] = recipientEmail;



  };

  /**
   * Constructs a <code>GiftCertificateItem</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GiftCertificateItem} obj Optional instance to populate.
   * @return {module:model/GiftCertificateItem} The populated <code>GiftCertificateItem</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('amount')) {
        obj['amount'] = ApiClient.convertToType(data['amount'], 'Number');
      }
      if (data.hasOwnProperty('gift_certificate_item_id')) {
        obj['gift_certificate_item_id'] = ApiClient.convertToType(data['gift_certificate_item_id'], 'String');
      }
      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
      if (data.hasOwnProperty('recipient_email')) {
        obj['recipient_email'] = ApiClient.convertToType(data['recipient_email'], 'String');
      }
      if (data.hasOwnProperty('recipient_name')) {
        obj['recipient_name'] = ApiClient.convertToType(data['recipient_name'], 'String');
      }
      if (data.hasOwnProperty('sender_name')) {
        obj['sender_name'] = ApiClient.convertToType(data['sender_name'], 'String');
      }
      if (data.hasOwnProperty('shipment_id')) {
        obj['shipment_id'] = ApiClient.convertToType(data['shipment_id'], 'String');
      }
    }
    return obj;
  }

  /**
   * The certificate item amount.
   * @member {Number} amount
   */
  exports.prototype['amount'] = undefined;
  /**
   * Id used to identify this item
   * @member {String} gift_certificate_item_id
   */
  exports.prototype['gift_certificate_item_id'] = undefined;
  /**
   * The certificate's message.
   * @member {String} message
   */
  exports.prototype['message'] = undefined;
  /**
   * The recipient's email.
   * @member {String} recipient_email
   */
  exports.prototype['recipient_email'] = undefined;
  /**
   * The recipient's name.
   * @member {String} recipient_name
   */
  exports.prototype['recipient_name'] = undefined;
  /**
   * The sender's name.
   * @member {String} sender_name
   */
  exports.prototype['sender_name'] = undefined;
  /**
   * The shipment id.
   * @member {String} shipment_id
   */
  exports.prototype['shipment_id'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.GiftCertificateRequest = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The GiftCertificateRequest model module.
   * @module model/GiftCertificateRequest
   * @version 17.3
   */

  /**
   * Constructs a new <code>GiftCertificateRequest</code>.
   * Document representing a gift certificate request data.
   * @alias module:model/GiftCertificateRequest
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>GiftCertificateRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GiftCertificateRequest} obj Optional instance to populate.
   * @return {module:model/GiftCertificateRequest} The populated <code>GiftCertificateRequest</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('gift_certificate_code')) {
        obj['gift_certificate_code'] = ApiClient.convertToType(data['gift_certificate_code'], 'String');
      }
    }
    return obj;
  }

  /**
   * The gift certificate code.
   * @member {String} gift_certificate_code
   */
  exports.prototype['gift_certificate_code'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.Image = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Image model module.
   * @module model/Image
   * @version 17.3
   */

  /**
   * Constructs a new <code>Image</code>.
   * @alias module:model/Image
   * @class
   * @param link {String} 
   */
  var exports = function(link) {
    var _this = this;



    _this['link'] = link;

  };

  /**
   * Constructs a <code>Image</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Image} obj Optional instance to populate.
   * @return {module:model/Image} The populated <code>Image</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('alt')) {
        obj['alt'] = ApiClient.convertToType(data['alt'], 'String');
      }
      if (data.hasOwnProperty('dis_base_link')) {
        obj['dis_base_link'] = ApiClient.convertToType(data['dis_base_link'], 'String');
      }
      if (data.hasOwnProperty('link')) {
        obj['link'] = ApiClient.convertToType(data['link'], 'String');
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {String} alt
   */
  exports.prototype['alt'] = undefined;
  /**
   * @member {String} dis_base_link
   */
  exports.prototype['dis_base_link'] = undefined;
  /**
   * @member {String} link
   */
  exports.prototype['link'] = undefined;
  /**
   * @member {String} title
   */
  exports.prototype['title'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Image', 'model/VariationAttribute'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Image'), require('./VariationAttribute'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ImageGroup = factory(root.ShopApi.ApiClient, root.ShopApi.Image, root.ShopApi.VariationAttribute);
  }
}(this, function(ApiClient, Image, VariationAttribute) {
  'use strict';




  /**
   * The ImageGroup model module.
   * @module model/ImageGroup
   * @version 17.3
   */

  /**
   * Constructs a new <code>ImageGroup</code>.
   * Document representing an image group containing a list of images for a particular view type and an optional variation value.
   * @alias module:model/ImageGroup
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>ImageGroup</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ImageGroup} obj Optional instance to populate.
   * @return {module:model/ImageGroup} The populated <code>ImageGroup</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('images')) {
        obj['images'] = ApiClient.convertToType(data['images'], [Image]);
      }
      if (data.hasOwnProperty('variation_attributes')) {
        obj['variation_attributes'] = ApiClient.convertToType(data['variation_attributes'], [VariationAttribute]);
      }
      if (data.hasOwnProperty('view_type')) {
        obj['view_type'] = ApiClient.convertToType(data['view_type'], 'String');
      }
    }
    return obj;
  }

  /**
   * The images of the image group.
   * @member {Array.<module:model/Image>} images
   */
  exports.prototype['images'] = undefined;
  /**
   * Returns a list of variation attributes applying to this image group.
   * @member {Array.<module:model/VariationAttribute>} variation_attributes
   */
  exports.prototype['variation_attributes'] = undefined;
  /**
   * The image view type.
   * @member {String} view_type
   */
  exports.prototype['view_type'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.Inventory = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Inventory model module.
   * @module model/Inventory
   * @version 17.3
   */

  /**
   * Constructs a new <code>Inventory</code>.
   * Document representing inventory information of the current product for a particular inventory list.
   * @alias module:model/Inventory
   * @class
   * @param id {String} The inventory id.
   */
  var exports = function(id) {
    var _this = this;



    _this['id'] = id;




  };

  /**
   * Constructs a <code>Inventory</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Inventory} obj Optional instance to populate.
   * @return {module:model/Inventory} The populated <code>Inventory</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('ats')) {
        obj['ats'] = ApiClient.convertToType(data['ats'], 'Number');
      }
      if (data.hasOwnProperty('backorderable')) {
        obj['backorderable'] = ApiClient.convertToType(data['backorderable'], 'Boolean');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('in_stock_date')) {
        obj['in_stock_date'] = ApiClient.convertToType(data['in_stock_date'], 'Date');
      }
      if (data.hasOwnProperty('orderable')) {
        obj['orderable'] = ApiClient.convertToType(data['orderable'], 'Boolean');
      }
      if (data.hasOwnProperty('preorderable')) {
        obj['preorderable'] = ApiClient.convertToType(data['preorderable'], 'Boolean');
      }
      if (data.hasOwnProperty('stock_level')) {
        obj['stock_level'] = ApiClient.convertToType(data['stock_level'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The ats of the product. If it is infinity, the return value is 999999. The value can be overwritten by the  OCAPI setting 'product.inventory.ats.max_threshold'.
   * @member {Number} ats
   */
  exports.prototype['ats'] = undefined;
  /**
   * A flag indicating whether the product is back orderable.
   * @member {Boolean} backorderable
   */
  exports.prototype['backorderable'] = undefined;
  /**
   * The inventory id.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * A flag indicating the date when the product will be in stock.
   * @member {Date} in_stock_date
   */
  exports.prototype['in_stock_date'] = undefined;
  /**
   * A flag indicating whether at least one of products is available to sell.
   * @member {Boolean} orderable
   */
  exports.prototype['orderable'] = undefined;
  /**
   * A flag indicating whether the product is pre orderable.
   * @member {Boolean} preorderable
   */
  exports.prototype['preorderable'] = undefined;
  /**
   * The stock level of the product. If it is infinity, the return value is 999999. The value can be overwritten by the  OCAPI setting 'product.inventory.stock_level.max_threshold'.
   * @member {Number} stock_level
   */
  exports.prototype['stock_level'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.Locale = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Locale model module.
   * @module model/Locale
   * @version 17.3
   */

  /**
   * Constructs a new <code>Locale</code>.
   * Document that describes a single locale.
   * @alias module:model/Locale
   * @class
   */
  var exports = function() {
    var _this = this;











  };

  /**
   * Constructs a <code>Locale</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Locale} obj Optional instance to populate.
   * @return {module:model/Locale} The populated <code>Locale</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('country')) {
        obj['country'] = ApiClient.convertToType(data['country'], 'String');
      }
      if (data.hasOwnProperty('default')) {
        obj['default'] = ApiClient.convertToType(data['default'], 'Boolean');
      }
      if (data.hasOwnProperty('display_country')) {
        obj['display_country'] = ApiClient.convertToType(data['display_country'], 'String');
      }
      if (data.hasOwnProperty('display_language')) {
        obj['display_language'] = ApiClient.convertToType(data['display_language'], 'String');
      }
      if (data.hasOwnProperty('display_name')) {
        obj['display_name'] = ApiClient.convertToType(data['display_name'], 'String');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('iso3_country')) {
        obj['iso3_country'] = ApiClient.convertToType(data['iso3_country'], 'String');
      }
      if (data.hasOwnProperty('iso3_language')) {
        obj['iso3_language'] = ApiClient.convertToType(data['iso3_language'], 'String');
      }
      if (data.hasOwnProperty('language')) {
        obj['language'] = ApiClient.convertToType(data['language'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
    }
    return obj;
  }

  /**
   * The country/region code for this Locale, which will  either be the empty string or an upercase ISO 3166 2-letter code.
   * @member {String} country
   */
  exports.prototype['country'] = undefined;
  /**
   * Flag that is true if the locale is the default one to use if an explicit locale is not specified.
   * @member {Boolean} default
   */
  exports.prototype['default'] = undefined;
  /**
   * The name for the Locale's country that is appropriate for  display to the user, or an empty string if no country has been specified  for the Locale.  The display country is returned in the language defined for this locale,  and not in the language of the session locale.
   * @member {String} display_country
   */
  exports.prototype['display_country'] = undefined;
  /**
   * The name for the Locale's language that is appropriate for  display to the user, or an empty string if no language has been specified  for the Locale.  The display language is returned in the language defined for this locale,  and not in the language of the session locale.
   * @member {String} display_language
   */
  exports.prototype['display_language'] = undefined;
  /**
   * The name for the Locale that is appropriate for  display to the user, or an empty string if no display name has been  specified for the Locale.  The display name is returned in the language defined for this locale,  and not in the language of the session locale.
   * @member {String} display_name
   */
  exports.prototype['display_name'] = undefined;
  /**
   * The identifier of the Locale. Contains a combination of the  language and the country key, concatenated by \"-\", e.g. \"en-US\". This  attribute is the primary key of the class.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The three-letter abbreviation for this Locale's country, or an  empty string if no country has been specified for the Locale.
   * @member {String} iso3_country
   */
  exports.prototype['iso3_country'] = undefined;
  /**
   * The three-letter abbreviation for this Locale's language, or an  empty string if no language has been specified for the  Locale.
   * @member {String} iso3_language
   */
  exports.prototype['iso3_language'] = undefined;
  /**
   * The language code for this Locale, which will either  be the empty string or a lowercase ISO 639 code.
   * @member {String} language
   */
  exports.prototype['language'] = undefined;
  /**
   * The display name of the Locale. This uses the current  request locale to localize the value.
   * @member {String} name
   */
  exports.prototype['name'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.Master = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Master model module.
   * @module model/Master
   * @version 17.3
   */

  /**
   * Constructs a new <code>Master</code>.
   * @alias module:model/Master
   * @class
   * @param link {String} 
   * @param masterId {String} 
   */
  var exports = function(link, masterId) {
    var _this = this;

    _this['link'] = link;
    _this['master_id'] = masterId;




  };

  /**
   * Constructs a <code>Master</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Master} obj Optional instance to populate.
   * @return {module:model/Master} The populated <code>Master</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('link')) {
        obj['link'] = ApiClient.convertToType(data['link'], 'String');
      }
      if (data.hasOwnProperty('master_id')) {
        obj['master_id'] = ApiClient.convertToType(data['master_id'], 'String');
      }
      if (data.hasOwnProperty('orderable')) {
        obj['orderable'] = ApiClient.convertToType(data['orderable'], 'Boolean');
      }
      if (data.hasOwnProperty('price')) {
        obj['price'] = ApiClient.convertToType(data['price'], 'Number');
      }
      if (data.hasOwnProperty('price_max')) {
        obj['price_max'] = ApiClient.convertToType(data['price_max'], 'Number');
      }
      if (data.hasOwnProperty('prices')) {
        obj['prices'] = ApiClient.convertToType(data['prices'], {'String': 'Number'});
      }
    }
    return obj;
  }

  /**
   * @member {String} link
   */
  exports.prototype['link'] = undefined;
  /**
   * @member {String} master_id
   */
  exports.prototype['master_id'] = undefined;
  /**
   * @member {Boolean} orderable
   */
  exports.prototype['orderable'] = undefined;
  /**
   * @member {Number} price
   */
  exports.prototype['price'] = undefined;
  /**
   * @member {Number} price_max
   */
  exports.prototype['price_max'] = undefined;
  /**
   * @member {Object.<String, Number>} prices
   */
  exports.prototype['prices'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Query'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Query'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.NestedQuery = factory(root.ShopApi.ApiClient, root.ShopApi.Query);
  }
}(this, function(ApiClient, Query) {
  'use strict';




  /**
   * The NestedQuery model module.
   * @module model/NestedQuery
   * @version 17.3
   */

  /**
   * Constructs a new <code>NestedQuery</code>.
   * @alias module:model/NestedQuery
   * @class
   * @param path {String} 
   * @param query {module:model/Query} 
   */
  var exports = function(path, query) {
    var _this = this;

    _this['path'] = path;
    _this['query'] = query;

  };

  /**
   * Constructs a <code>NestedQuery</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/NestedQuery} obj Optional instance to populate.
   * @return {module:model/NestedQuery} The populated <code>NestedQuery</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('path')) {
        obj['path'] = ApiClient.convertToType(data['path'], 'String');
      }
      if (data.hasOwnProperty('query')) {
        obj['query'] = Query.constructFromObject(data['query']);
      }
      if (data.hasOwnProperty('score_mode')) {
        obj['score_mode'] = ApiClient.convertToType(data['score_mode'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {String} path
   */
  exports.prototype['path'] = undefined;
  /**
   * @member {module:model/Query} query
   */
  exports.prototype['query'] = undefined;
  /**
   * @member {module:model/NestedQuery.ScoreModeEnum} score_mode
   */
  exports.prototype['score_mode'] = undefined;


  /**
   * Allowed values for the <code>score_mode</code> property.
   * @enum {String}
   * @readonly
   */
  exports.ScoreModeEnum = {
    /**
     * value: "avg"
     * @const
     */
    "avg": "avg",
    /**
     * value: "total"
     * @const
     */
    "total": "total",
    /**
     * value: "max"
     * @const
     */
    "max": "max",
    /**
     * value: "none"
     * @const
     */
    "none": "none"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.Note = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Note model module.
   * @module model/Note
   * @version 17.3
   */

  /**
   * Constructs a new <code>Note</code>.
   * Document representing a note to an object.
   * @alias module:model/Note
   * @class
   */
  var exports = function() {
    var _this = this;






  };

  /**
   * Constructs a <code>Note</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Note} obj Optional instance to populate.
   * @return {module:model/Note} The populated <code>Note</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('created_by')) {
        obj['created_by'] = ApiClient.convertToType(data['created_by'], 'String');
      }
      if (data.hasOwnProperty('creation_date')) {
        obj['creation_date'] = ApiClient.convertToType(data['creation_date'], 'Date');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('subject')) {
        obj['subject'] = ApiClient.convertToType(data['subject'], 'String');
      }
      if (data.hasOwnProperty('text')) {
        obj['text'] = ApiClient.convertToType(data['text'], 'String');
      }
    }
    return obj;
  }

  /**
   * The author of the note.
   * @member {String} created_by
   */
  exports.prototype['created_by'] = undefined;
  /**
   * The creation date of the note.
   * @member {Date} creation_date
   */
  exports.prototype['creation_date'] = undefined;
  /**
   * The ID of the note.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The note's subject.
   * @member {String} subject
   */
  exports.prototype['subject'] = undefined;
  /**
   * The note's text.
   * @member {String} text
   */
  exports.prototype['text'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Note'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Note'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.NotesResult = factory(root.ShopApi.ApiClient, root.ShopApi.Note);
  }
}(this, function(ApiClient, Note) {
  'use strict';




  /**
   * The NotesResult model module.
   * @module model/NotesResult
   * @version 17.3
   */

  /**
   * Constructs a new <code>NotesResult</code>.
   * A result of a note request.   Contains notes for an object - for example, for a basket.
   * @alias module:model/NotesResult
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>NotesResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/NotesResult} obj Optional instance to populate.
   * @return {module:model/NotesResult} The populated <code>NotesResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('notes')) {
        obj['notes'] = ApiClient.convertToType(data['notes'], [Note]);
      }
    }
    return obj;
  }

  /**
   * The notes for an object.
   * @member {Array.<module:model/Note>} notes
   */
  exports.prototype['notes'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/OptionValue'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./OptionValue'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.Option = factory(root.ShopApi.ApiClient, root.ShopApi.OptionValue);
  }
}(this, function(ApiClient, OptionValue) {
  'use strict';




  /**
   * The Option model module.
   * @module model/Option
   * @version 17.3
   */

  /**
   * Constructs a new <code>Option</code>.
   * Document representing a product option.
   * @alias module:model/Option
   * @class
   * @param id {String} The id of the option.
   */
  var exports = function(id) {
    var _this = this;


    _this['id'] = id;



  };

  /**
   * Constructs a <code>Option</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Option} obj Optional instance to populate.
   * @return {module:model/Option} The populated <code>Option</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('image')) {
        obj['image'] = ApiClient.convertToType(data['image'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('values')) {
        obj['values'] = ApiClient.convertToType(data['values'], [OptionValue]);
      }
    }
    return obj;
  }

  /**
   * The localized description of the option.
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * The id of the option.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The URL to the option image.
   * @member {String} image
   */
  exports.prototype['image'] = undefined;
  /**
   * The localized name of the option.
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * The array of option values. This array can be empty.
   * @member {Array.<module:model/OptionValue>} values
   */
  exports.prototype['values'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/OptionItem', 'model/PriceAdjustment', 'model/ProductItem', 'model/ProductListItemReference'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./OptionItem'), require('./PriceAdjustment'), require('./ProductItem'), require('./ProductListItemReference'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.OptionItem = factory(root.ShopApi.ApiClient, root.ShopApi.OptionItem, root.ShopApi.PriceAdjustment, root.ShopApi.ProductItem, root.ShopApi.ProductListItemReference);
  }
}(this, function(ApiClient, OptionItem, PriceAdjustment, ProductItem, ProductListItemReference) {
  'use strict';




  /**
   * The OptionItem model module.
   * @module model/OptionItem
   * @version 17.3
   */

  /**
   * Constructs a new <code>OptionItem</code>.
   * Document representing an option item.
   * @alias module:model/OptionItem
   * @class
   * @param optionId {String} The id of the option.
   * @param optionValueId {String} The id of the option value.
   */
  var exports = function(optionId, optionValueId) {
    var _this = this;









    _this['option_id'] = optionId;

    _this['option_value_id'] = optionValueId;














  };

  /**
   * Constructs a <code>OptionItem</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OptionItem} obj Optional instance to populate.
   * @return {module:model/OptionItem} The populated <code>OptionItem</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('adjusted_tax')) {
        obj['adjusted_tax'] = ApiClient.convertToType(data['adjusted_tax'], 'Number');
      }
      if (data.hasOwnProperty('base_price')) {
        obj['base_price'] = ApiClient.convertToType(data['base_price'], 'Number');
      }
      if (data.hasOwnProperty('bonus_discount_line_item_id')) {
        obj['bonus_discount_line_item_id'] = ApiClient.convertToType(data['bonus_discount_line_item_id'], 'String');
      }
      if (data.hasOwnProperty('bonus_product_line_item')) {
        obj['bonus_product_line_item'] = ApiClient.convertToType(data['bonus_product_line_item'], 'Boolean');
      }
      if (data.hasOwnProperty('bundled_product_items')) {
        obj['bundled_product_items'] = ApiClient.convertToType(data['bundled_product_items'], [ProductItem]);
      }
      if (data.hasOwnProperty('inventory_id')) {
        obj['inventory_id'] = ApiClient.convertToType(data['inventory_id'], 'String');
      }
      if (data.hasOwnProperty('item_id')) {
        obj['item_id'] = ApiClient.convertToType(data['item_id'], 'String');
      }
      if (data.hasOwnProperty('item_text')) {
        obj['item_text'] = ApiClient.convertToType(data['item_text'], 'String');
      }
      if (data.hasOwnProperty('option_id')) {
        obj['option_id'] = ApiClient.convertToType(data['option_id'], 'String');
      }
      if (data.hasOwnProperty('option_items')) {
        obj['option_items'] = ApiClient.convertToType(data['option_items'], [OptionItem]);
      }
      if (data.hasOwnProperty('option_value_id')) {
        obj['option_value_id'] = ApiClient.convertToType(data['option_value_id'], 'String');
      }
      if (data.hasOwnProperty('price')) {
        obj['price'] = ApiClient.convertToType(data['price'], 'Number');
      }
      if (data.hasOwnProperty('price_adjustments')) {
        obj['price_adjustments'] = ApiClient.convertToType(data['price_adjustments'], [PriceAdjustment]);
      }
      if (data.hasOwnProperty('price_after_item_discount')) {
        obj['price_after_item_discount'] = ApiClient.convertToType(data['price_after_item_discount'], 'Number');
      }
      if (data.hasOwnProperty('price_after_order_discount')) {
        obj['price_after_order_discount'] = ApiClient.convertToType(data['price_after_order_discount'], 'Number');
      }
      if (data.hasOwnProperty('product_id')) {
        obj['product_id'] = ApiClient.convertToType(data['product_id'], 'String');
      }
      if (data.hasOwnProperty('product_list_item')) {
        obj['product_list_item'] = ProductListItemReference.constructFromObject(data['product_list_item']);
      }
      if (data.hasOwnProperty('product_name')) {
        obj['product_name'] = ApiClient.convertToType(data['product_name'], 'String');
      }
      if (data.hasOwnProperty('quantity')) {
        obj['quantity'] = ApiClient.convertToType(data['quantity'], 'Number');
      }
      if (data.hasOwnProperty('shipment_id')) {
        obj['shipment_id'] = ApiClient.convertToType(data['shipment_id'], 'String');
      }
      if (data.hasOwnProperty('shipping_item_id')) {
        obj['shipping_item_id'] = ApiClient.convertToType(data['shipping_item_id'], 'String');
      }
      if (data.hasOwnProperty('tax')) {
        obj['tax'] = ApiClient.convertToType(data['tax'], 'Number');
      }
      if (data.hasOwnProperty('tax_basis')) {
        obj['tax_basis'] = ApiClient.convertToType(data['tax_basis'], 'Number');
      }
      if (data.hasOwnProperty('tax_class_id')) {
        obj['tax_class_id'] = ApiClient.convertToType(data['tax_class_id'], 'String');
      }
      if (data.hasOwnProperty('tax_rate')) {
        obj['tax_rate'] = ApiClient.convertToType(data['tax_rate'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The tax of the product item after adjustments applying.
   * @member {Number} adjusted_tax
   */
  exports.prototype['adjusted_tax'] = undefined;
  /**
   * The base price for the line item, which is the  price of the unit before applying adjustments, in the purchase  currency. The base price may be net or gross of tax depending  on the configured taxation policy.
   * @member {Number} base_price
   */
  exports.prototype['base_price'] = undefined;
  /**
   * The id of the bonus discount line item this bonus product relates to.
   * @member {String} bonus_discount_line_item_id
   */
  exports.prototype['bonus_discount_line_item_id'] = undefined;
  /**
   * A flag indicating whether the product item is a bonus.
   * @member {Boolean} bonus_product_line_item
   */
  exports.prototype['bonus_product_line_item'] = undefined;
  /**
   * The array of bundled product items. Can be empty.
   * @member {Array.<module:model/ProductItem>} bundled_product_items
   */
  exports.prototype['bundled_product_items'] = undefined;
  /**
   * The inventory list id associated with this item.
   * @member {String} inventory_id
   */
  exports.prototype['inventory_id'] = undefined;
  /**
   * The item identifier. Use this to identify an item when updating the item quantity or creating a custom price  adjustment for an item.
   * @member {String} item_id
   */
  exports.prototype['item_id'] = undefined;
  /**
   * The text describing the item in more detail.
   * @member {String} item_text
   */
  exports.prototype['item_text'] = undefined;
  /**
   * The id of the option.
   * @member {String} option_id
   */
  exports.prototype['option_id'] = undefined;
  /**
   * The array of option items. This array can be empty.
   * @member {Array.<module:model/OptionItem>} option_items
   */
  exports.prototype['option_items'] = undefined;
  /**
   * The id of the option value.
   * @member {String} option_value_id
   */
  exports.prototype['option_value_id'] = undefined;
  /**
   * The price of the line item before applying any adjustments. If the line item is based on net pricing  then the net price is returned. If the line item is based on gross  pricing then the gross price is returned.
   * @member {Number} price
   */
  exports.prototype['price'] = undefined;
  /**
   * Array of price adjustments. Can be empty.
   * @member {Array.<module:model/PriceAdjustment>} price_adjustments
   */
  exports.prototype['price_adjustments'] = undefined;
  /**
   * The price of the product line item after applying all product-level  adjustments. For net pricing the adjusted net price is returned. For gross pricing, the adjusted  gross price is returned.
   * @member {Number} price_after_item_discount
   */
  exports.prototype['price_after_item_discount'] = undefined;
  /**
   * The price of this product line item after considering all  dependent price adjustments and prorating all order-level  price adjustments. For net pricing the net price is returned. For gross  pricing, the gross price is returned.
   * @member {Number} price_after_order_discount
   */
  exports.prototype['price_after_order_discount'] = undefined;
  /**
   * 
   * @member {String} product_id
   */
  exports.prototype['product_id'] = undefined;
  /**
   * 
   * @member {module:model/ProductListItemReference} product_list_item
   */
  exports.prototype['product_list_item'] = undefined;
  /**
   * The name of the product.
   * @member {String} product_name
   */
  exports.prototype['product_name'] = undefined;
  /**
   * The quantity of the products represented by this item.
   * @member {Number} quantity
   */
  exports.prototype['quantity'] = undefined;
  /**
   * The id of the shipment which includes the product item.
   * @member {String} shipment_id
   */
  exports.prototype['shipment_id'] = undefined;
  /**
   * The reference to the related shipping item if it exists. This is the case if for example when a surcharge is  defined for individual products using a particular a shipping method.
   * @member {String} shipping_item_id
   */
  exports.prototype['shipping_item_id'] = undefined;
  /**
   * The tax of the product item before adjustments applying.
   * @member {Number} tax
   */
  exports.prototype['tax'] = undefined;
  /**
   * The price used to calculate the tax for this product item.
   * @member {Number} tax_basis
   */
  exports.prototype['tax_basis'] = undefined;
  /**
   * The tax class ID for the product item or null  if no tax class ID is associated with the product item.
   * @member {String} tax_class_id
   */
  exports.prototype['tax_class_id'] = undefined;
  /**
   * The tax rate, which is the decimal tax rate to be applied  to the product represented by this item.
   * @member {Number} tax_rate
   */
  exports.prototype['tax_rate'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.OptionValue = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The OptionValue model module.
   * @module model/OptionValue
   * @version 17.3
   */

  /**
   * Constructs a new <code>OptionValue</code>.
   * Document representing an option value.
   * @alias module:model/OptionValue
   * @class
   * @param id {String} The id of the option value.
   */
  var exports = function(id) {
    var _this = this;


    _this['id'] = id;


  };

  /**
   * Constructs a <code>OptionValue</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OptionValue} obj Optional instance to populate.
   * @return {module:model/OptionValue} The populated <code>OptionValue</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('default')) {
        obj['default'] = ApiClient.convertToType(data['default'], 'Boolean');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('price')) {
        obj['price'] = ApiClient.convertToType(data['price'], 'Number');
      }
    }
    return obj;
  }

  /**
   * A flag indicating whether this option value is the default one.
   * @member {Boolean} default
   */
  exports.prototype['default'] = undefined;
  /**
   * The id of the option value.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The localized name of the option value.
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * The effective price of this option value.
   * @member {Number} price
   */
  exports.prototype['price'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/BonusDiscountLineItem', 'model/CouponItem', 'model/CustomerInfo', 'model/GiftCertificateItem', 'model/OrderAddress', 'model/OrderPaymentInstrument', 'model/PriceAdjustment', 'model/ProductItem', 'model/Shipment', 'model/ShippingItem', 'model/SimpleLink'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./BonusDiscountLineItem'), require('./CouponItem'), require('./CustomerInfo'), require('./GiftCertificateItem'), require('./OrderAddress'), require('./OrderPaymentInstrument'), require('./PriceAdjustment'), require('./ProductItem'), require('./Shipment'), require('./ShippingItem'), require('./SimpleLink'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.Order = factory(root.ShopApi.ApiClient, root.ShopApi.BonusDiscountLineItem, root.ShopApi.CouponItem, root.ShopApi.CustomerInfo, root.ShopApi.GiftCertificateItem, root.ShopApi.OrderAddress, root.ShopApi.OrderPaymentInstrument, root.ShopApi.PriceAdjustment, root.ShopApi.ProductItem, root.ShopApi.Shipment, root.ShopApi.ShippingItem, root.ShopApi.SimpleLink);
  }
}(this, function(ApiClient, BonusDiscountLineItem, CouponItem, CustomerInfo, GiftCertificateItem, OrderAddress, OrderPaymentInstrument, PriceAdjustment, ProductItem, Shipment, ShippingItem, SimpleLink) {
  'use strict';




  /**
   * The Order model module.
   * @module model/Order
   * @version 17.3
   */

  /**
   * Constructs a new <code>Order</code>.
   * Document representing an order.
   * @alias module:model/Order
   * @class
   */
  var exports = function() {
    var _this = this;








































  };

  /**
   * Constructs a <code>Order</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Order} obj Optional instance to populate.
   * @return {module:model/Order} The populated <code>Order</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('adjusted_merchandize_total_tax')) {
        obj['adjusted_merchandize_total_tax'] = ApiClient.convertToType(data['adjusted_merchandize_total_tax'], 'Number');
      }
      if (data.hasOwnProperty('adjusted_shipping_total_tax')) {
        obj['adjusted_shipping_total_tax'] = ApiClient.convertToType(data['adjusted_shipping_total_tax'], 'Number');
      }
      if (data.hasOwnProperty('billing_address')) {
        obj['billing_address'] = OrderAddress.constructFromObject(data['billing_address']);
      }
      if (data.hasOwnProperty('bonus_discount_line_items')) {
        obj['bonus_discount_line_items'] = ApiClient.convertToType(data['bonus_discount_line_items'], [BonusDiscountLineItem]);
      }
      if (data.hasOwnProperty('c_eaEmployeeId')) {
        obj['c_eaEmployeeId'] = ApiClient.convertToType(data['c_eaEmployeeId'], 'String');
      }
      if (data.hasOwnProperty('c_eaStoreId')) {
        obj['c_eaStoreId'] = ApiClient.convertToType(data['c_eaStoreId'], 'String');
      }
      if (data.hasOwnProperty('channel_type')) {
        obj['channel_type'] = ApiClient.convertToType(data['channel_type'], 'String');
      }
      if (data.hasOwnProperty('confirmation_status')) {
        obj['confirmation_status'] = ApiClient.convertToType(data['confirmation_status'], 'String');
      }
      if (data.hasOwnProperty('coupon_items')) {
        obj['coupon_items'] = ApiClient.convertToType(data['coupon_items'], [CouponItem]);
      }
      if (data.hasOwnProperty('created_by')) {
        obj['created_by'] = ApiClient.convertToType(data['created_by'], 'String');
      }
      if (data.hasOwnProperty('creation_date')) {
        obj['creation_date'] = ApiClient.convertToType(data['creation_date'], 'Date');
      }
      if (data.hasOwnProperty('currency')) {
        obj['currency'] = ApiClient.convertToType(data['currency'], 'String');
      }
      if (data.hasOwnProperty('customer_info')) {
        obj['customer_info'] = CustomerInfo.constructFromObject(data['customer_info']);
      }
      if (data.hasOwnProperty('customer_name')) {
        obj['customer_name'] = ApiClient.convertToType(data['customer_name'], 'String');
      }
      if (data.hasOwnProperty('export_status')) {
        obj['export_status'] = ApiClient.convertToType(data['export_status'], 'String');
      }
      if (data.hasOwnProperty('external_order_status')) {
        obj['external_order_status'] = ApiClient.convertToType(data['external_order_status'], 'String');
      }
      if (data.hasOwnProperty('gift_certificate_items')) {
        obj['gift_certificate_items'] = ApiClient.convertToType(data['gift_certificate_items'], [GiftCertificateItem]);
      }
      if (data.hasOwnProperty('last_modified')) {
        obj['last_modified'] = ApiClient.convertToType(data['last_modified'], 'Date');
      }
      if (data.hasOwnProperty('merchandize_total_tax')) {
        obj['merchandize_total_tax'] = ApiClient.convertToType(data['merchandize_total_tax'], 'Number');
      }
      if (data.hasOwnProperty('notes')) {
        obj['notes'] = SimpleLink.constructFromObject(data['notes']);
      }
      if (data.hasOwnProperty('order_no')) {
        obj['order_no'] = ApiClient.convertToType(data['order_no'], 'String');
      }
      if (data.hasOwnProperty('order_price_adjustments')) {
        obj['order_price_adjustments'] = ApiClient.convertToType(data['order_price_adjustments'], [PriceAdjustment]);
      }
      if (data.hasOwnProperty('order_token')) {
        obj['order_token'] = ApiClient.convertToType(data['order_token'], 'String');
      }
      if (data.hasOwnProperty('order_total')) {
        obj['order_total'] = ApiClient.convertToType(data['order_total'], 'Number');
      }
      if (data.hasOwnProperty('payment_instruments')) {
        obj['payment_instruments'] = ApiClient.convertToType(data['payment_instruments'], [OrderPaymentInstrument]);
      }
      if (data.hasOwnProperty('payment_status')) {
        obj['payment_status'] = ApiClient.convertToType(data['payment_status'], 'String');
      }
      if (data.hasOwnProperty('product_items')) {
        obj['product_items'] = ApiClient.convertToType(data['product_items'], [ProductItem]);
      }
      if (data.hasOwnProperty('product_sub_total')) {
        obj['product_sub_total'] = ApiClient.convertToType(data['product_sub_total'], 'Number');
      }
      if (data.hasOwnProperty('product_total')) {
        obj['product_total'] = ApiClient.convertToType(data['product_total'], 'Number');
      }
      if (data.hasOwnProperty('shipments')) {
        obj['shipments'] = ApiClient.convertToType(data['shipments'], [Shipment]);
      }
      if (data.hasOwnProperty('shipping_items')) {
        obj['shipping_items'] = ApiClient.convertToType(data['shipping_items'], [ShippingItem]);
      }
      if (data.hasOwnProperty('shipping_status')) {
        obj['shipping_status'] = ApiClient.convertToType(data['shipping_status'], 'String');
      }
      if (data.hasOwnProperty('shipping_total')) {
        obj['shipping_total'] = ApiClient.convertToType(data['shipping_total'], 'Number');
      }
      if (data.hasOwnProperty('shipping_total_tax')) {
        obj['shipping_total_tax'] = ApiClient.convertToType(data['shipping_total_tax'], 'Number');
      }
      if (data.hasOwnProperty('site_id')) {
        obj['site_id'] = ApiClient.convertToType(data['site_id'], 'String');
      }
      if (data.hasOwnProperty('source_code')) {
        obj['source_code'] = ApiClient.convertToType(data['source_code'], 'String');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = ApiClient.convertToType(data['status'], 'String');
      }
      if (data.hasOwnProperty('tax_total')) {
        obj['tax_total'] = ApiClient.convertToType(data['tax_total'], 'Number');
      }
      if (data.hasOwnProperty('taxation')) {
        obj['taxation'] = ApiClient.convertToType(data['taxation'], 'String');
      }
    }
    return obj;
  }

  /**
   * The products tax after discounts applying in purchase currency.   Adjusted merchandize prices represent the sum of product prices before  services such as shipping have been added, but after adjustment from  promotions have been added.
   * @member {Number} adjusted_merchandize_total_tax
   */
  exports.prototype['adjusted_merchandize_total_tax'] = undefined;
  /**
   * The tax of all shipping line items of the line item container after  shipping adjustments have been applied.
   * @member {Number} adjusted_shipping_total_tax
   */
  exports.prototype['adjusted_shipping_total_tax'] = undefined;
  /**
   * The billing address. This property is part of basket checkout information only.
   * @member {module:model/OrderAddress} billing_address
   */
  exports.prototype['billing_address'] = undefined;
  /**
   * The bonus discount line items of the line item container.
   * @member {Array.<module:model/BonusDiscountLineItem>} bonus_discount_line_items
   */
  exports.prototype['bonus_discount_line_items'] = undefined;
  /**
   * EmployeeId of Store Associate, if the order was created in the store
   * @member {String} c_eaEmployeeId
   */
  exports.prototype['c_eaEmployeeId'] = undefined;
  /**
   * This field contains the store id used for for clients to attribute sales to a specific store.
   * @member {String} c_eaStoreId
   */
  exports.prototype['c_eaStoreId'] = undefined;
  /**
   * The sales channel for the order.
   * @member {module:model/Order.ChannelTypeEnum} channel_type
   */
  exports.prototype['channel_type'] = undefined;
  /**
   * The confirmation status of the order.
   * @member {module:model/Order.ConfirmationStatusEnum} confirmation_status
   */
  exports.prototype['confirmation_status'] = undefined;
  /**
   * The sorted array of coupon items. This array can be empty.
   * @member {Array.<module:model/CouponItem>} coupon_items
   */
  exports.prototype['coupon_items'] = undefined;
  /**
   * The name of the user who created the order.
   * @member {String} created_by
   */
  exports.prototype['created_by'] = undefined;
  /**
   * Returns the value of attribute 'creationDate'.
   * @member {Date} creation_date
   */
  exports.prototype['creation_date'] = undefined;
  /**
   * The ISO 4217 mnemonic code of the currency.
   * @member {String} currency
   */
  exports.prototype['currency'] = undefined;
  /**
   * The customer information for logged in customers. This property is part of basket checkout information only.
   * @member {module:model/CustomerInfo} customer_info
   */
  exports.prototype['customer_info'] = undefined;
  /**
   * The name of the customer associated with this order.
   * @member {String} customer_name
   */
  exports.prototype['customer_name'] = undefined;
  /**
   * The export status of the order.
   * @member {module:model/Order.ExportStatusEnum} export_status
   */
  exports.prototype['export_status'] = undefined;
  /**
   * The external status of the order.
   * @member {String} external_order_status
   */
  exports.prototype['external_order_status'] = undefined;
  /**
   * The sorted array of gift certificate line items. This array can be empty.
   * @member {Array.<module:model/GiftCertificateItem>} gift_certificate_items
   */
  exports.prototype['gift_certificate_items'] = undefined;
  /**
   * Returns the value of attribute 'lastModified'.
   * @member {Date} last_modified
   */
  exports.prototype['last_modified'] = undefined;
  /**
   * The products total tax in purchase currency.   Merchandize total prices represent the sum of product prices before  services such as shipping or adjustment from promotions have  been added.
   * @member {Number} merchandize_total_tax
   */
  exports.prototype['merchandize_total_tax'] = undefined;
  /**
   * The notes for the line item container.
   * @member {module:model/SimpleLink} notes
   */
  exports.prototype['notes'] = undefined;
  /**
   * The order number of the order.
   * @member {String} order_no
   */
  exports.prototype['order_no'] = undefined;
  /**
   * The array of order level price adjustments. This array can be empty.
   * @member {Array.<module:model/PriceAdjustment>} order_price_adjustments
   */
  exports.prototype['order_price_adjustments'] = undefined;
  /**
   * The order token used to secure the lookup of an order on base of the  plain order number. The order token contains only URL safe characters.
   * @member {String} order_token
   */
  exports.prototype['order_token'] = undefined;
  /**
   * The total price of the order, including products, shipping and tax. This property is part of basket checkout  information only.
   * @member {Number} order_total
   */
  exports.prototype['order_total'] = undefined;
  /**
   * The payment instruments list for the order.
   * @member {Array.<module:model/OrderPaymentInstrument>} payment_instruments
   */
  exports.prototype['payment_instruments'] = undefined;
  /**
   * The payment status of the order.
   * @member {module:model/Order.PaymentStatusEnum} payment_status
   */
  exports.prototype['payment_status'] = undefined;
  /**
   * The sorted array of product items (up to a maximum of 50 items). This array can be empty.
   * @member {Array.<module:model/ProductItem>} product_items
   */
  exports.prototype['product_items'] = undefined;
  /**
   * The total price of all product items after all product discounts.  Depending on taxation policy the returned price is net or gross.
   * @member {Number} product_sub_total
   */
  exports.prototype['product_sub_total'] = undefined;
  /**
   * The total price of all product items after all product and order discounts.  Depending on taxation policy the returned price is net or gross.
   * @member {Number} product_total
   */
  exports.prototype['product_total'] = undefined;
  /**
   * The array of shipments. This property is part of basket checkout information only.
   * @member {Array.<module:model/Shipment>} shipments
   */
  exports.prototype['shipments'] = undefined;
  /**
   * The sorted array of shipping items. This array can be empty.
   * @member {Array.<module:model/ShippingItem>} shipping_items
   */
  exports.prototype['shipping_items'] = undefined;
  /**
   * The shipping status of the order.
   * @member {module:model/Order.ShippingStatusEnum} shipping_status
   */
  exports.prototype['shipping_status'] = undefined;
  /**
   * The total shipping price of the order after all shipping discounts. Excludes tax if taxation policy is net. Includes  tax if taxation policy is gross. This property is part of basket checkout information only.
   * @member {Number} shipping_total
   */
  exports.prototype['shipping_total'] = undefined;
  /**
   * The tax of all shipping line items of the line item container before  shipping adjustments have been applied.
   * @member {Number} shipping_total_tax
   */
  exports.prototype['shipping_total_tax'] = undefined;
  /**
   * The site where the order resides.
   * @member {String} site_id
   */
  exports.prototype['site_id'] = undefined;
  /**
   * Gets the source code assigned to this basket.
   * @member {String} source_code
   */
  exports.prototype['source_code'] = undefined;
  /**
   * The status of the order.
   * @member {module:model/Order.StatusEnum} status
   */
  exports.prototype['status'] = undefined;
  /**
   * The total tax amount of the order. This property is part of basket checkout information only.
   * @member {Number} tax_total
   */
  exports.prototype['tax_total'] = undefined;
  /**
   * The taxation the line item container is based on.
   * @member {module:model/Order.TaxationEnum} taxation
   */
  exports.prototype['taxation'] = undefined;


  /**
   * Allowed values for the <code>channel_type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.ChannelTypeEnum = {
    /**
     * value: "storefront"
     * @const
     */
    "storefront": "storefront",
    /**
     * value: "callcenter"
     * @const
     */
    "callcenter": "callcenter",
    /**
     * value: "marketplace"
     * @const
     */
    "marketplace": "marketplace",
    /**
     * value: "dss"
     * @const
     */
    "dss": "dss",
    /**
     * value: "store"
     * @const
     */
    "store": "store",
    /**
     * value: "pinterest"
     * @const
     */
    "pinterest": "pinterest",
    /**
     * value: "twitter"
     * @const
     */
    "twitter": "twitter",
    /**
     * value: "facebookads"
     * @const
     */
    "facebookads": "facebookads",
    /**
     * value: "subscriptions"
     * @const
     */
    "subscriptions": "subscriptions",
    /**
     * value: "onlinereservation"
     * @const
     */
    "onlinereservation": "onlinereservation",
    /**
     * value: "customerservicecenter"
     * @const
     */
    "customerservicecenter": "customerservicecenter"  };

  /**
   * Allowed values for the <code>confirmation_status</code> property.
   * @enum {String}
   * @readonly
   */
  exports.ConfirmationStatusEnum = {
    /**
     * value: "not_confirmed"
     * @const
     */
    "not_confirmed": "not_confirmed",
    /**
     * value: "confirmed"
     * @const
     */
    "confirmed": "confirmed"  };

  /**
   * Allowed values for the <code>export_status</code> property.
   * @enum {String}
   * @readonly
   */
  exports.ExportStatusEnum = {
    /**
     * value: "not_exported"
     * @const
     */
    "not_exported": "not_exported",
    /**
     * value: "exported"
     * @const
     */
    "exported": "exported",
    /**
     * value: "ready"
     * @const
     */
    "ready": "ready",
    /**
     * value: "failed"
     * @const
     */
    "failed": "failed"  };

  /**
   * Allowed values for the <code>payment_status</code> property.
   * @enum {String}
   * @readonly
   */
  exports.PaymentStatusEnum = {
    /**
     * value: "not_paid"
     * @const
     */
    "not_paid": "not_paid",
    /**
     * value: "part_paid"
     * @const
     */
    "part_paid": "part_paid",
    /**
     * value: "paid"
     * @const
     */
    "paid": "paid"  };

  /**
   * Allowed values for the <code>shipping_status</code> property.
   * @enum {String}
   * @readonly
   */
  exports.ShippingStatusEnum = {
    /**
     * value: "not_shipped"
     * @const
     */
    "not_shipped": "not_shipped",
    /**
     * value: "part_shipped"
     * @const
     */
    "part_shipped": "part_shipped",
    /**
     * value: "shipped"
     * @const
     */
    "shipped": "shipped"  };

  /**
   * Allowed values for the <code>status</code> property.
   * @enum {String}
   * @readonly
   */
  exports.StatusEnum = {
    /**
     * value: "created"
     * @const
     */
    "created": "created",
    /**
     * value: "new"
     * @const
     */
    "new": "new",
    /**
     * value: "open"
     * @const
     */
    "open": "open",
    /**
     * value: "completed"
     * @const
     */
    "completed": "completed",
    /**
     * value: "cancelled"
     * @const
     */
    "cancelled": "cancelled",
    /**
     * value: "replaced"
     * @const
     */
    "replaced": "replaced",
    /**
     * value: "failed"
     * @const
     */
    "failed": "failed"  };

  /**
   * Allowed values for the <code>taxation</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TaxationEnum = {
    /**
     * value: "gross"
     * @const
     */
    "gross": "gross",
    /**
     * value: "net"
     * @const
     */
    "net": "net"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.OrderAddress = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The OrderAddress model module.
   * @module model/OrderAddress
   * @version 17.3
   */

  /**
   * Constructs a new <code>OrderAddress</code>.
   * Document representing an order address.
   * @alias module:model/OrderAddress
   * @class
   */
  var exports = function() {
    var _this = this;




















  };

  /**
   * Constructs a <code>OrderAddress</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OrderAddress} obj Optional instance to populate.
   * @return {module:model/OrderAddress} The populated <code>OrderAddress</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('address1')) {
        obj['address1'] = ApiClient.convertToType(data['address1'], 'String');
      }
      if (data.hasOwnProperty('address2')) {
        obj['address2'] = ApiClient.convertToType(data['address2'], 'String');
      }
      if (data.hasOwnProperty('city')) {
        obj['city'] = ApiClient.convertToType(data['city'], 'String');
      }
      if (data.hasOwnProperty('company_name')) {
        obj['company_name'] = ApiClient.convertToType(data['company_name'], 'String');
      }
      if (data.hasOwnProperty('country_code')) {
        obj['country_code'] = ApiClient.convertToType(data['country_code'], 'String');
      }
      if (data.hasOwnProperty('first_name')) {
        obj['first_name'] = ApiClient.convertToType(data['first_name'], 'String');
      }
      if (data.hasOwnProperty('full_name')) {
        obj['full_name'] = ApiClient.convertToType(data['full_name'], 'String');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('job_title')) {
        obj['job_title'] = ApiClient.convertToType(data['job_title'], 'String');
      }
      if (data.hasOwnProperty('last_name')) {
        obj['last_name'] = ApiClient.convertToType(data['last_name'], 'String');
      }
      if (data.hasOwnProperty('phone')) {
        obj['phone'] = ApiClient.convertToType(data['phone'], 'String');
      }
      if (data.hasOwnProperty('post_box')) {
        obj['post_box'] = ApiClient.convertToType(data['post_box'], 'String');
      }
      if (data.hasOwnProperty('postal_code')) {
        obj['postal_code'] = ApiClient.convertToType(data['postal_code'], 'String');
      }
      if (data.hasOwnProperty('salutation')) {
        obj['salutation'] = ApiClient.convertToType(data['salutation'], 'String');
      }
      if (data.hasOwnProperty('second_name')) {
        obj['second_name'] = ApiClient.convertToType(data['second_name'], 'String');
      }
      if (data.hasOwnProperty('state_code')) {
        obj['state_code'] = ApiClient.convertToType(data['state_code'], 'String');
      }
      if (data.hasOwnProperty('suffix')) {
        obj['suffix'] = ApiClient.convertToType(data['suffix'], 'String');
      }
      if (data.hasOwnProperty('suite')) {
        obj['suite'] = ApiClient.convertToType(data['suite'], 'String');
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
    }
    return obj;
  }

  /**
   * The first address.
   * @member {String} address1
   */
  exports.prototype['address1'] = undefined;
  /**
   * The second address.
   * @member {String} address2
   */
  exports.prototype['address2'] = undefined;
  /**
   * The city.
   * @member {String} city
   */
  exports.prototype['city'] = undefined;
  /**
   * The company name.
   * @member {String} company_name
   */
  exports.prototype['company_name'] = undefined;
  /**
   * The two-letter ISO 3166-1 (Alpha-2) country code.
   * @member {module:model/OrderAddress.CountryCodeEnum} country_code
   */
  exports.prototype['country_code'] = undefined;
  /**
   * The first name.
   * @member {String} first_name
   */
  exports.prototype['first_name'] = undefined;
  /**
   * The full name.
   * @member {String} full_name
   */
  exports.prototype['full_name'] = undefined;
  /**
   * Id used to identify this address
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The job title.
   * @member {String} job_title
   */
  exports.prototype['job_title'] = undefined;
  /**
   * The last name.
   * @member {String} last_name
   */
  exports.prototype['last_name'] = undefined;
  /**
   * The phone number.
   * @member {String} phone
   */
  exports.prototype['phone'] = undefined;
  /**
   * The post box.
   * @member {String} post_box
   */
  exports.prototype['post_box'] = undefined;
  /**
   * The postal code.
   * @member {String} postal_code
   */
  exports.prototype['postal_code'] = undefined;
  /**
   * The salutation.
   * @member {String} salutation
   */
  exports.prototype['salutation'] = undefined;
  /**
   * The second name.
   * @member {String} second_name
   */
  exports.prototype['second_name'] = undefined;
  /**
   * The state code.
   * @member {String} state_code
   */
  exports.prototype['state_code'] = undefined;
  /**
   * The suffix.
   * @member {String} suffix
   */
  exports.prototype['suffix'] = undefined;
  /**
   * The suite.
   * @member {String} suite
   */
  exports.prototype['suite'] = undefined;
  /**
   * The title.
   * @member {String} title
   */
  exports.prototype['title'] = undefined;


  /**
   * Allowed values for the <code>country_code</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CountryCodeEnum = {
    /**
     * value: "US"
     * @const
     */
    "US": "US",
    /**
     * value: "FR"
     * @const
     */
    "FR": "FR",
    /**
     * value: "IT"
     * @const
     */
    "IT": "IT",
    /**
     * value: "JP"
     * @const
     */
    "JP": "JP",
    /**
     * value: "CN"
     * @const
     */
    "CN": "CN",
    /**
     * value: "GB"
     * @const
     */
    "GB": "GB"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.OrderPaymentCardRequest = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The OrderPaymentCardRequest model module.
   * @module model/OrderPaymentCardRequest
   * @version 17.3
   */

  /**
   * Constructs a new <code>OrderPaymentCardRequest</code>.
   * Document representing an order payment card request.
   * @alias module:model/OrderPaymentCardRequest
   * @class
   */
  var exports = function() {
    var _this = this;











  };

  /**
   * Constructs a <code>OrderPaymentCardRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OrderPaymentCardRequest} obj Optional instance to populate.
   * @return {module:model/OrderPaymentCardRequest} The populated <code>OrderPaymentCardRequest</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('card_type')) {
        obj['card_type'] = ApiClient.convertToType(data['card_type'], 'String');
      }
      if (data.hasOwnProperty('credit_card_token')) {
        obj['credit_card_token'] = ApiClient.convertToType(data['credit_card_token'], 'String');
      }
      if (data.hasOwnProperty('expiration_month')) {
        obj['expiration_month'] = ApiClient.convertToType(data['expiration_month'], 'Number');
      }
      if (data.hasOwnProperty('expiration_year')) {
        obj['expiration_year'] = ApiClient.convertToType(data['expiration_year'], 'Number');
      }
      if (data.hasOwnProperty('holder')) {
        obj['holder'] = ApiClient.convertToType(data['holder'], 'String');
      }
      if (data.hasOwnProperty('issue_number')) {
        obj['issue_number'] = ApiClient.convertToType(data['issue_number'], 'String');
      }
      if (data.hasOwnProperty('number')) {
        obj['number'] = ApiClient.convertToType(data['number'], 'String');
      }
      if (data.hasOwnProperty('security_code')) {
        obj['security_code'] = ApiClient.convertToType(data['security_code'], 'String');
      }
      if (data.hasOwnProperty('valid_from_month')) {
        obj['valid_from_month'] = ApiClient.convertToType(data['valid_from_month'], 'Number');
      }
      if (data.hasOwnProperty('valid_from_year')) {
        obj['valid_from_year'] = ApiClient.convertToType(data['valid_from_year'], 'Number');
      }
    }
    return obj;
  }

  /**
   * 
   * @member {String} card_type
   */
  exports.prototype['card_type'] = undefined;
  /**
   * 
   * @member {String} credit_card_token
   */
  exports.prototype['credit_card_token'] = undefined;
  /**
   * 
   * @member {Number} expiration_month
   */
  exports.prototype['expiration_month'] = undefined;
  /**
   * 
   * @member {Number} expiration_year
   */
  exports.prototype['expiration_year'] = undefined;
  /**
   * 
   * @member {String} holder
   */
  exports.prototype['holder'] = undefined;
  /**
   * 
   * @member {String} issue_number
   */
  exports.prototype['issue_number'] = undefined;
  /**
   * 
   * @member {String} number
   */
  exports.prototype['number'] = undefined;
  /**
   * The security code for the payment card.
   * @member {String} security_code
   */
  exports.prototype['security_code'] = undefined;
  /**
   * 
   * @member {Number} valid_from_month
   */
  exports.prototype['valid_from_month'] = undefined;
  /**
   * 
   * @member {Number} valid_from_year
   */
  exports.prototype['valid_from_year'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/PaymentBankAccount', 'model/PaymentCard', 'model/Status'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./PaymentBankAccount'), require('./PaymentCard'), require('./Status'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.OrderPaymentInstrument = factory(root.ShopApi.ApiClient, root.ShopApi.PaymentBankAccount, root.ShopApi.PaymentCard, root.ShopApi.Status);
  }
}(this, function(ApiClient, PaymentBankAccount, PaymentCard, Status) {
  'use strict';




  /**
   * The OrderPaymentInstrument model module.
   * @module model/OrderPaymentInstrument
   * @version 17.3
   */

  /**
   * Constructs a new <code>OrderPaymentInstrument</code>.
   * Document representing an order payment instrument.
   * @alias module:model/OrderPaymentInstrument
   * @class
   */
  var exports = function() {
    var _this = this;










  };

  /**
   * Constructs a <code>OrderPaymentInstrument</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OrderPaymentInstrument} obj Optional instance to populate.
   * @return {module:model/OrderPaymentInstrument} The populated <code>OrderPaymentInstrument</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('amount')) {
        obj['amount'] = ApiClient.convertToType(data['amount'], 'Number');
      }
      if (data.hasOwnProperty('authorization_status')) {
        obj['authorization_status'] = Status.constructFromObject(data['authorization_status']);
      }
      if (data.hasOwnProperty('bank_routing_number')) {
        obj['bank_routing_number'] = ApiClient.convertToType(data['bank_routing_number'], 'String');
      }
      if (data.hasOwnProperty('c_eaRequireSignature')) {
        obj['c_eaRequireSignature'] = ApiClient.convertToType(data['c_eaRequireSignature'], 'Boolean');
      }
      if (data.hasOwnProperty('masked_gift_certificate_code')) {
        obj['masked_gift_certificate_code'] = ApiClient.convertToType(data['masked_gift_certificate_code'], 'String');
      }
      if (data.hasOwnProperty('payment_bank_account')) {
        obj['payment_bank_account'] = PaymentBankAccount.constructFromObject(data['payment_bank_account']);
      }
      if (data.hasOwnProperty('payment_card')) {
        obj['payment_card'] = PaymentCard.constructFromObject(data['payment_card']);
      }
      if (data.hasOwnProperty('payment_instrument_id')) {
        obj['payment_instrument_id'] = ApiClient.convertToType(data['payment_instrument_id'], 'String');
      }
      if (data.hasOwnProperty('payment_method_id')) {
        obj['payment_method_id'] = ApiClient.convertToType(data['payment_method_id'], 'String');
      }
    }
    return obj;
  }

  /**
   * The payment transaction amount.
   * @member {Number} amount
   */
  exports.prototype['amount'] = undefined;
  /**
   * The authorization status of the payment transaction.
   * @member {module:model/Status} authorization_status
   */
  exports.prototype['authorization_status'] = undefined;
  /**
   * The bank routing number.
   * @member {String} bank_routing_number
   */
  exports.prototype['bank_routing_number'] = undefined;
  /**
   * @member {Boolean} c_eaRequireSignature
   */
  exports.prototype['c_eaRequireSignature'] = undefined;
  /**
   * The masked gift certificate code.
   * @member {String} masked_gift_certificate_code
   */
  exports.prototype['masked_gift_certificate_code'] = undefined;
  /**
   * The payment bank account.
   * @member {module:model/PaymentBankAccount} payment_bank_account
   */
  exports.prototype['payment_bank_account'] = undefined;
  /**
   * The payment card.
   * @member {module:model/PaymentCard} payment_card
   */
  exports.prototype['payment_card'] = undefined;
  /**
   * The payment instrument ID.
   * @member {String} payment_instrument_id
   */
  exports.prototype['payment_instrument_id'] = undefined;
  /**
   * The payment method id. Optional if a customer payment instrument id is specified.
   * @member {String} payment_method_id
   */
  exports.prototype['payment_method_id'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/OrderPaymentCardRequest', 'model/PaymentBankAccountRequest'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./OrderPaymentCardRequest'), require('./PaymentBankAccountRequest'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.OrderPaymentInstrumentRequest = factory(root.ShopApi.ApiClient, root.ShopApi.OrderPaymentCardRequest, root.ShopApi.PaymentBankAccountRequest);
  }
}(this, function(ApiClient, OrderPaymentCardRequest, PaymentBankAccountRequest) {
  'use strict';




  /**
   * The OrderPaymentInstrumentRequest model module.
   * @module model/OrderPaymentInstrumentRequest
   * @version 17.3
   */

  /**
   * Constructs a new <code>OrderPaymentInstrumentRequest</code>.
   * Document representing an order payment instrument request.
   * @alias module:model/OrderPaymentInstrumentRequest
   * @class
   */
  var exports = function() {
    var _this = this;










  };

  /**
   * Constructs a <code>OrderPaymentInstrumentRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OrderPaymentInstrumentRequest} obj Optional instance to populate.
   * @return {module:model/OrderPaymentInstrumentRequest} The populated <code>OrderPaymentInstrumentRequest</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('amount')) {
        obj['amount'] = ApiClient.convertToType(data['amount'], 'Number');
      }
      if (data.hasOwnProperty('bank_routing_number')) {
        obj['bank_routing_number'] = ApiClient.convertToType(data['bank_routing_number'], 'String');
      }
      if (data.hasOwnProperty('c_eaRequireSignature')) {
        obj['c_eaRequireSignature'] = ApiClient.convertToType(data['c_eaRequireSignature'], 'Boolean');
      }
      if (data.hasOwnProperty('create_customer_payment_instrument')) {
        obj['create_customer_payment_instrument'] = ApiClient.convertToType(data['create_customer_payment_instrument'], 'Boolean');
      }
      if (data.hasOwnProperty('customer_payment_instrument_id')) {
        obj['customer_payment_instrument_id'] = ApiClient.convertToType(data['customer_payment_instrument_id'], 'String');
      }
      if (data.hasOwnProperty('gift_certificate_code')) {
        obj['gift_certificate_code'] = ApiClient.convertToType(data['gift_certificate_code'], 'String');
      }
      if (data.hasOwnProperty('payment_bank_account')) {
        obj['payment_bank_account'] = PaymentBankAccountRequest.constructFromObject(data['payment_bank_account']);
      }
      if (data.hasOwnProperty('payment_card')) {
        obj['payment_card'] = OrderPaymentCardRequest.constructFromObject(data['payment_card']);
      }
      if (data.hasOwnProperty('payment_method_id')) {
        obj['payment_method_id'] = ApiClient.convertToType(data['payment_method_id'], 'String');
      }
    }
    return obj;
  }

  /**
   * The payment transaction amount.
   * @member {Number} amount
   */
  exports.prototype['amount'] = undefined;
  /**
   * The bank routing number.
   * @member {String} bank_routing_number
   */
  exports.prototype['bank_routing_number'] = undefined;
  /**
   * @member {Boolean} c_eaRequireSignature
   */
  exports.prototype['c_eaRequireSignature'] = undefined;
  /**
   * A flag indicating whether a related customer payment instrument should be created. The CustomerPaymentInstrument  is only created when the OrderPaymentInstrument was authorized successfully.
   * @member {Boolean} create_customer_payment_instrument
   */
  exports.prototype['create_customer_payment_instrument'] = undefined;
  /**
   * The id of a customer payment instrument.
   * @member {String} customer_payment_instrument_id
   */
  exports.prototype['customer_payment_instrument_id'] = undefined;
  /**
   * The gift certificate code.
   * @member {String} gift_certificate_code
   */
  exports.prototype['gift_certificate_code'] = undefined;
  /**
   * The payment bank account request data.
   * @member {module:model/PaymentBankAccountRequest} payment_bank_account
   */
  exports.prototype['payment_bank_account'] = undefined;
  /**
   * The payment card.
   * @member {module:model/OrderPaymentCardRequest} payment_card
   */
  exports.prototype['payment_card'] = undefined;
  /**
   * The payment method id. Optional if a customer payment instrument id is specified.
   * @member {String} payment_method_id
   */
  exports.prototype['payment_method_id'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Order'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Order'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.OrderSearchHit = factory(root.ShopApi.ApiClient, root.ShopApi.Order);
  }
}(this, function(ApiClient, Order) {
  'use strict';




  /**
   * The OrderSearchHit model module.
   * @module model/OrderSearchHit
   * @version 17.3
   */

  /**
   * Constructs a new <code>OrderSearchHit</code>.
   * Document representing an order search hit.
   * @alias module:model/OrderSearchHit
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>OrderSearchHit</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OrderSearchHit} obj Optional instance to populate.
   * @return {module:model/OrderSearchHit} The populated <code>OrderSearchHit</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('data')) {
        obj['data'] = Order.constructFromObject(data['data']);
      }
      if (data.hasOwnProperty('relevance')) {
        obj['relevance'] = ApiClient.convertToType(data['relevance'], 'Number');
      }
    }
    return obj;
  }

  /**
   * 
   * @member {module:model/Order} data
   */
  exports.prototype['data'] = undefined;
  /**
   * The hit's relevance score.
   * @member {Number} relevance
   */
  exports.prototype['relevance'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Query', 'model/Sort'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Query'), require('./Sort'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.OrderSearchRequest = factory(root.ShopApi.ApiClient, root.ShopApi.Query, root.ShopApi.Sort);
  }
}(this, function(ApiClient, Query, Sort) {
  'use strict';




  /**
   * The OrderSearchRequest model module.
   * @module model/OrderSearchRequest
   * @version 17.3
   */

  /**
   * Constructs a new <code>OrderSearchRequest</code>.
   * Document representing an order search request.
   * @alias module:model/OrderSearchRequest
   * @class
   * @param query {module:model/Query} The query to apply
   */
  var exports = function(query) {
    var _this = this;



    _this['query'] = query;



  };

  /**
   * Constructs a <code>OrderSearchRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OrderSearchRequest} obj Optional instance to populate.
   * @return {module:model/OrderSearchRequest} The populated <code>OrderSearchRequest</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('count')) {
        obj['count'] = ApiClient.convertToType(data['count'], 'Number');
      }
      if (data.hasOwnProperty('expand')) {
        obj['expand'] = ApiClient.convertToType(data['expand'], ['String']);
      }
      if (data.hasOwnProperty('query')) {
        obj['query'] = Query.constructFromObject(data['query']);
      }
      if (data.hasOwnProperty('select')) {
        obj['select'] = ApiClient.convertToType(data['select'], 'String');
      }
      if (data.hasOwnProperty('sorts')) {
        obj['sorts'] = ApiClient.convertToType(data['sorts'], [Sort]);
      }
      if (data.hasOwnProperty('start')) {
        obj['start'] = ApiClient.convertToType(data['start'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The number of returned documents.
   * @member {Number} count
   */
  exports.prototype['count'] = undefined;
  /**
   * List of expansions to be applied to each search results. Expands are optional.
   * @member {Array.<String>} expand
   */
  exports.prototype['expand'] = undefined;
  /**
   * The query to apply
   * @member {module:model/Query} query
   */
  exports.prototype['query'] = undefined;
  /**
   * The field to be selected.
   * @member {String} select
   */
  exports.prototype['select'] = undefined;
  /**
   * The list of sort clauses configured for the search request. Sort clauses are optional.
   * @member {Array.<module:model/Sort>} sorts
   */
  exports.prototype['sorts'] = undefined;
  /**
   * The zero-based index of the first search hit to include in the result.
   * @member {Number} start
   */
  exports.prototype['start'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/OrderSearchHit', 'model/Query', 'model/ResultPage', 'model/Sort'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./OrderSearchHit'), require('./Query'), require('./ResultPage'), require('./Sort'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.OrderSearchResult = factory(root.ShopApi.ApiClient, root.ShopApi.OrderSearchHit, root.ShopApi.Query, root.ShopApi.ResultPage, root.ShopApi.Sort);
  }
}(this, function(ApiClient, OrderSearchHit, Query, ResultPage, Sort) {
  'use strict';




  /**
   * The OrderSearchResult model module.
   * @module model/OrderSearchResult
   * @version 17.3
   */

  /**
   * Constructs a new <code>OrderSearchResult</code>.
   * Document representing an order search result.
   * @alias module:model/OrderSearchResult
   * @class
   */
  var exports = function() {
    var _this = this;












  };

  /**
   * Constructs a <code>OrderSearchResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OrderSearchResult} obj Optional instance to populate.
   * @return {module:model/OrderSearchResult} The populated <code>OrderSearchResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('count')) {
        obj['count'] = ApiClient.convertToType(data['count'], 'Number');
      }
      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], [Object]);
      }
      if (data.hasOwnProperty('expand')) {
        obj['expand'] = ApiClient.convertToType(data['expand'], ['String']);
      }
      if (data.hasOwnProperty('hits')) {
        obj['hits'] = ApiClient.convertToType(data['hits'], [OrderSearchHit]);
      }
      if (data.hasOwnProperty('next')) {
        obj['next'] = ResultPage.constructFromObject(data['next']);
      }
      if (data.hasOwnProperty('previous')) {
        obj['previous'] = ResultPage.constructFromObject(data['previous']);
      }
      if (data.hasOwnProperty('query')) {
        obj['query'] = Query.constructFromObject(data['query']);
      }
      if (data.hasOwnProperty('select')) {
        obj['select'] = ApiClient.convertToType(data['select'], 'String');
      }
      if (data.hasOwnProperty('sorts')) {
        obj['sorts'] = ApiClient.convertToType(data['sorts'], [Sort]);
      }
      if (data.hasOwnProperty('start')) {
        obj['start'] = ApiClient.convertToType(data['start'], 'Number');
      }
      if (data.hasOwnProperty('total')) {
        obj['total'] = ApiClient.convertToType(data['total'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The number of returned documents.
   * @member {Number} count
   */
  exports.prototype['count'] = undefined;
  /**
   * @member {Array.<Object>} data
   */
  exports.prototype['data'] = undefined;
  /**
   * The list of expands set for the search request. Expands are optional.
   * @member {Array.<String>} expand
   */
  exports.prototype['expand'] = undefined;
  /**
   * The sorted array of search hits. This array can be empty.
   * @member {Array.<module:model/OrderSearchHit>} hits
   */
  exports.prototype['hits'] = undefined;
  /**
   * The data that can be used (as parameters on the search request) to retrieve the next result page.
   * @member {module:model/ResultPage} next
   */
  exports.prototype['next'] = undefined;
  /**
   * The data that can be used to retrieve the previous result page (as parameters on the search request).
   * @member {module:model/ResultPage} previous
   */
  exports.prototype['previous'] = undefined;
  /**
   * The query passed into the search
   * @member {module:model/Query} query
   */
  exports.prototype['query'] = undefined;
  /**
   * The fields that you want to select.
   * @member {String} select
   */
  exports.prototype['select'] = undefined;
  /**
   * The list of sort clauses configured for the search request. Sort clauses are optional.
   * @member {Array.<module:model/Sort>} sorts
   */
  exports.prototype['sorts'] = undefined;
  /**
   * The zero-based index of the first search hit to include in the result.
   * @member {Number} start
   */
  exports.prototype['start'] = undefined;
  /**
   * The total number of documents.
   * @member {Number} total
   */
  exports.prototype['total'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.PasswordChangeRequest = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The PasswordChangeRequest model module.
   * @module model/PasswordChangeRequest
   * @version 17.3
   */

  /**
   * Constructs a new <code>PasswordChangeRequest</code>.
   * Document representing a password change request.
   * @alias module:model/PasswordChangeRequest
   * @class
   * @param currentPassword {String} The customer's current password.
   * @param password {String} The customer's new password.
   */
  var exports = function(currentPassword, password) {
    var _this = this;

    _this['current_password'] = currentPassword;
    _this['password'] = password;
  };

  /**
   * Constructs a <code>PasswordChangeRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PasswordChangeRequest} obj Optional instance to populate.
   * @return {module:model/PasswordChangeRequest} The populated <code>PasswordChangeRequest</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('current_password')) {
        obj['current_password'] = ApiClient.convertToType(data['current_password'], 'String');
      }
      if (data.hasOwnProperty('password')) {
        obj['password'] = ApiClient.convertToType(data['password'], 'String');
      }
    }
    return obj;
  }

  /**
   * The customer's current password.
   * @member {String} current_password
   */
  exports.prototype['current_password'] = undefined;
  /**
   * The customer's new password.
   * @member {String} password
   */
  exports.prototype['password'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.PasswordReset = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The PasswordReset model module.
   * @module model/PasswordReset
   * @version 17.3
   */

  /**
   * Constructs a new <code>PasswordReset</code>.
   * Document representing a password reset request.
   * @alias module:model/PasswordReset
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>PasswordReset</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PasswordReset} obj Optional instance to populate.
   * @return {module:model/PasswordReset} The populated <code>PasswordReset</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('identification')) {
        obj['identification'] = ApiClient.convertToType(data['identification'], 'String');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
    }
    return obj;
  }

  /**
   * The customer's login or the customer's email depending on the type value.
   * @member {String} identification
   */
  exports.prototype['identification'] = undefined;
  /**
   * The type of customer identification.
   * @member {module:model/PasswordReset.TypeEnum} type
   */
  exports.prototype['type'] = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "email"
     * @const
     */
    "email": "email",
    /**
     * value: "login"
     * @const
     */
    "login": "login"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.PaymentBankAccount = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The PaymentBankAccount model module.
   * @module model/PaymentBankAccount
   * @version 17.3
   */

  /**
   * Constructs a new <code>PaymentBankAccount</code>.
   * Document representing a payment bank account.
   * @alias module:model/PaymentBankAccount
   * @class
   */
  var exports = function() {
    var _this = this;







  };

  /**
   * Constructs a <code>PaymentBankAccount</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PaymentBankAccount} obj Optional instance to populate.
   * @return {module:model/PaymentBankAccount} The populated <code>PaymentBankAccount</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('drivers_license_last_digits')) {
        obj['drivers_license_last_digits'] = ApiClient.convertToType(data['drivers_license_last_digits'], 'String');
      }
      if (data.hasOwnProperty('drivers_license_state_code')) {
        obj['drivers_license_state_code'] = ApiClient.convertToType(data['drivers_license_state_code'], 'String');
      }
      if (data.hasOwnProperty('holder')) {
        obj['holder'] = ApiClient.convertToType(data['holder'], 'String');
      }
      if (data.hasOwnProperty('masked_drivers_license')) {
        obj['masked_drivers_license'] = ApiClient.convertToType(data['masked_drivers_license'], 'String');
      }
      if (data.hasOwnProperty('masked_number')) {
        obj['masked_number'] = ApiClient.convertToType(data['masked_number'], 'String');
      }
      if (data.hasOwnProperty('number_last_digits')) {
        obj['number_last_digits'] = ApiClient.convertToType(data['number_last_digits'], 'String');
      }
    }
    return obj;
  }

  /**
   * The last 4 characters of the decrypted driver's license number of the bank account associated with this payment  instrument.
   * @member {String} drivers_license_last_digits
   */
  exports.prototype['drivers_license_last_digits'] = undefined;
  /**
   * The driver license state code.
   * @member {String} drivers_license_state_code
   */
  exports.prototype['drivers_license_state_code'] = undefined;
  /**
   * The holder of the bank account.
   * @member {String} holder
   */
  exports.prototype['holder'] = undefined;
  /**
   * The decrypted driver's license number of the bank account with all but the last 4 characters replaced with a '*'  character.
   * @member {String} masked_drivers_license
   */
  exports.prototype['masked_drivers_license'] = undefined;
  /**
   * The bank account masked number.
   * @member {String} masked_number
   */
  exports.prototype['masked_number'] = undefined;
  /**
   * The last digits of the bank account number.
   * @member {String} number_last_digits
   */
  exports.prototype['number_last_digits'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.PaymentBankAccountRequest = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The PaymentBankAccountRequest model module.
   * @module model/PaymentBankAccountRequest
   * @version 17.3
   */

  /**
   * Constructs a new <code>PaymentBankAccountRequest</code>.
   * Document representing a payment bank account request.
   * @alias module:model/PaymentBankAccountRequest
   * @class
   */
  var exports = function() {
    var _this = this;





  };

  /**
   * Constructs a <code>PaymentBankAccountRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PaymentBankAccountRequest} obj Optional instance to populate.
   * @return {module:model/PaymentBankAccountRequest} The populated <code>PaymentBankAccountRequest</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('drivers_license')) {
        obj['drivers_license'] = ApiClient.convertToType(data['drivers_license'], 'String');
      }
      if (data.hasOwnProperty('drivers_license_state_code')) {
        obj['drivers_license_state_code'] = ApiClient.convertToType(data['drivers_license_state_code'], 'String');
      }
      if (data.hasOwnProperty('holder')) {
        obj['holder'] = ApiClient.convertToType(data['holder'], 'String');
      }
      if (data.hasOwnProperty('number')) {
        obj['number'] = ApiClient.convertToType(data['number'], 'String');
      }
    }
    return obj;
  }

  /**
   * The drivers license.
   * @member {String} drivers_license
   */
  exports.prototype['drivers_license'] = undefined;
  /**
   * The driver license state code.
   * @member {String} drivers_license_state_code
   */
  exports.prototype['drivers_license_state_code'] = undefined;
  /**
   * The holder of the bank account.
   * @member {String} holder
   */
  exports.prototype['holder'] = undefined;
  /**
   * The payment bank account number.
   * @member {String} number
   */
  exports.prototype['number'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.PaymentCard = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The PaymentCard model module.
   * @module model/PaymentCard
   * @version 17.3
   */

  /**
   * Constructs a new <code>PaymentCard</code>.
   * Document representing a payment card.
   * @alias module:model/PaymentCard
   * @class
   */
  var exports = function() {
    var _this = this;












  };

  /**
   * Constructs a <code>PaymentCard</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PaymentCard} obj Optional instance to populate.
   * @return {module:model/PaymentCard} The populated <code>PaymentCard</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('card_type')) {
        obj['card_type'] = ApiClient.convertToType(data['card_type'], 'String');
      }
      if (data.hasOwnProperty('credit_card_expired')) {
        obj['credit_card_expired'] = ApiClient.convertToType(data['credit_card_expired'], 'Boolean');
      }
      if (data.hasOwnProperty('credit_card_token')) {
        obj['credit_card_token'] = ApiClient.convertToType(data['credit_card_token'], 'String');
      }
      if (data.hasOwnProperty('expiration_month')) {
        obj['expiration_month'] = ApiClient.convertToType(data['expiration_month'], 'Number');
      }
      if (data.hasOwnProperty('expiration_year')) {
        obj['expiration_year'] = ApiClient.convertToType(data['expiration_year'], 'Number');
      }
      if (data.hasOwnProperty('holder')) {
        obj['holder'] = ApiClient.convertToType(data['holder'], 'String');
      }
      if (data.hasOwnProperty('issue_number')) {
        obj['issue_number'] = ApiClient.convertToType(data['issue_number'], 'String');
      }
      if (data.hasOwnProperty('masked_number')) {
        obj['masked_number'] = ApiClient.convertToType(data['masked_number'], 'String');
      }
      if (data.hasOwnProperty('number_last_digits')) {
        obj['number_last_digits'] = ApiClient.convertToType(data['number_last_digits'], 'String');
      }
      if (data.hasOwnProperty('valid_from_month')) {
        obj['valid_from_month'] = ApiClient.convertToType(data['valid_from_month'], 'Number');
      }
      if (data.hasOwnProperty('valid_from_year')) {
        obj['valid_from_year'] = ApiClient.convertToType(data['valid_from_year'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The payment card type (for example, 'Visa').
   * @member {String} card_type
   */
  exports.prototype['card_type'] = undefined;
  /**
   * A flag indicating if the credit card is expired.
   * @member {Boolean} credit_card_expired
   */
  exports.prototype['credit_card_expired'] = undefined;
  /**
   * A credit card token. If a credit card is tokenized, the token can be used to look up the credit card data at the  token store.
   * @member {String} credit_card_token
   */
  exports.prototype['credit_card_token'] = undefined;
  /**
   * The month when the payment card expires.
   * @member {Number} expiration_month
   */
  exports.prototype['expiration_month'] = undefined;
  /**
   * The year when the payment card expires.
   * @member {Number} expiration_year
   */
  exports.prototype['expiration_year'] = undefined;
  /**
   * The payment card holder.
   * @member {String} holder
   */
  exports.prototype['holder'] = undefined;
  /**
   * The payment card issue number.
   * @member {String} issue_number
   */
  exports.prototype['issue_number'] = undefined;
  /**
   * The masked credit card number.
   * @member {String} masked_number
   */
  exports.prototype['masked_number'] = undefined;
  /**
   * The last digits of credit card number.
   * @member {String} number_last_digits
   */
  exports.prototype['number_last_digits'] = undefined;
  /**
   * The payment card valid from month.
   * @member {Number} valid_from_month
   */
  exports.prototype['valid_from_month'] = undefined;
  /**
   * The payment card valid from year.
   * @member {Number} valid_from_year
   */
  exports.prototype['valid_from_year'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.PaymentCardSpec = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The PaymentCardSpec model module.
   * @module model/PaymentCardSpec
   * @version 17.3
   */

  /**
   * Constructs a new <code>PaymentCardSpec</code>.
   * Document representing the specification for a payment card.  
   * @alias module:model/PaymentCardSpec
   * @class
   */
  var exports = function() {
    var _this = this;









  };

  /**
   * Constructs a <code>PaymentCardSpec</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PaymentCardSpec} obj Optional instance to populate.
   * @return {module:model/PaymentCardSpec} The populated <code>PaymentCardSpec</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('card_type')) {
        obj['card_type'] = ApiClient.convertToType(data['card_type'], 'String');
      }
      if (data.hasOwnProperty('checksum_verification_enabled')) {
        obj['checksum_verification_enabled'] = ApiClient.convertToType(data['checksum_verification_enabled'], 'Boolean');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('image')) {
        obj['image'] = ApiClient.convertToType(data['image'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('number_lengths')) {
        obj['number_lengths'] = ApiClient.convertToType(data['number_lengths'], ['String']);
      }
      if (data.hasOwnProperty('number_prefixes')) {
        obj['number_prefixes'] = ApiClient.convertToType(data['number_prefixes'], ['String']);
      }
      if (data.hasOwnProperty('security_code_length')) {
        obj['security_code_length'] = ApiClient.convertToType(data['security_code_length'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The type of the payment card.
   * @member {String} card_type
   */
  exports.prototype['card_type'] = undefined;
  /**
   * A flag indicating whether the card number is verified using the Luhn checksum algorithm.
   * @member {Boolean} checksum_verification_enabled
   */
  exports.prototype['checksum_verification_enabled'] = undefined;
  /**
   * The localized description of the payment card.
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * The URL to the image that represents the payment card.
   * @member {String} image
   */
  exports.prototype['image'] = undefined;
  /**
   * The localized name of the payment card.
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * The sorted list of number lengths (individual lengths as well as  length ranges).
   * @member {Array.<String>} number_lengths
   */
  exports.prototype['number_lengths'] = undefined;
  /**
   * The sorted list of number prefixes (individual prefixes as well  as prefix ranges).
   * @member {Array.<String>} number_prefixes
   */
  exports.prototype['number_prefixes'] = undefined;
  /**
   * The length of the security code for this card.
   * @member {Number} security_code_length
   */
  exports.prototype['security_code_length'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/PaymentCardSpec'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./PaymentCardSpec'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.PaymentMethod = factory(root.ShopApi.ApiClient, root.ShopApi.PaymentCardSpec);
  }
}(this, function(ApiClient, PaymentCardSpec) {
  'use strict';




  /**
   * The PaymentMethod model module.
   * @module model/PaymentMethod
   * @version 17.3
   */

  /**
   * Constructs a new <code>PaymentMethod</code>.
   * Document representing a payment method.
   * @alias module:model/PaymentMethod
   * @class
   * @param id {String} The id of the payment method or card.
   */
  var exports = function(id) {
    var _this = this;



    _this['id'] = id;


  };

  /**
   * Constructs a <code>PaymentMethod</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PaymentMethod} obj Optional instance to populate.
   * @return {module:model/PaymentMethod} The populated <code>PaymentMethod</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('cards')) {
        obj['cards'] = ApiClient.convertToType(data['cards'], [PaymentCardSpec]);
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('image')) {
        obj['image'] = ApiClient.convertToType(data['image'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
    }
    return obj;
  }

  /**
   * The sorted array of payment cards (included only when the system payment method is CREDIT_CARD).
   * @member {Array.<module:model/PaymentCardSpec>} cards
   */
  exports.prototype['cards'] = undefined;
  /**
   * The localized description of the payment method or card.
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * The id of the payment method or card.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The URL to the image that represents the payment method or card.
   * @member {String} image
   */
  exports.prototype['image'] = undefined;
  /**
   * The localized name of the payment method or card.
   * @member {String} name
   */
  exports.prototype['name'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/PaymentMethod'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./PaymentMethod'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.PaymentMethodResult = factory(root.ShopApi.ApiClient, root.ShopApi.PaymentMethod);
  }
}(this, function(ApiClient, PaymentMethod) {
  'use strict';




  /**
   * The PaymentMethodResult model module.
   * @module model/PaymentMethodResult
   * @version 17.3
   */

  /**
   * Constructs a new <code>PaymentMethodResult</code>.
   * Result document of payment methods applicable for a basket.
   * @alias module:model/PaymentMethodResult
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>PaymentMethodResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PaymentMethodResult} obj Optional instance to populate.
   * @return {module:model/PaymentMethodResult} The populated <code>PaymentMethodResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('applicable_payment_methods')) {
        obj['applicable_payment_methods'] = ApiClient.convertToType(data['applicable_payment_methods'], [PaymentMethod]);
      }
    }
    return obj;
  }

  /**
   * The applicable payment methods.
   * @member {Array.<module:model/PaymentMethod>} applicable_payment_methods
   */
  exports.prototype['applicable_payment_methods'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Discount'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Discount'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.PriceAdjustment = factory(root.ShopApi.ApiClient, root.ShopApi.Discount);
  }
}(this, function(ApiClient, Discount) {
  'use strict';




  /**
   * The PriceAdjustment model module.
   * @module model/PriceAdjustment
   * @version 17.3
   */

  /**
   * Constructs a new <code>PriceAdjustment</code>.
   * Document representing a price adjustment within a basket or order. Price adjustments  can be assigned at the order, product, or shipping level. They can be created by the  promotion engine (if the custom flag is set to false) or can be added by custom logic (if the custom  flag is set to true). For custom price adjustments created by a user, the manual flag should be  set to true; this is always the case for price adjustments created using OCAPI.  
   * @alias module:model/PriceAdjustment
   * @class
   */
  var exports = function() {
    var _this = this;














  };

  /**
   * Constructs a <code>PriceAdjustment</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PriceAdjustment} obj Optional instance to populate.
   * @return {module:model/PriceAdjustment} The populated <code>PriceAdjustment</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('applied_discount')) {
        obj['applied_discount'] = Discount.constructFromObject(data['applied_discount']);
      }
      if (data.hasOwnProperty('coupon_code')) {
        obj['coupon_code'] = ApiClient.convertToType(data['coupon_code'], 'String');
      }
      if (data.hasOwnProperty('created_by')) {
        obj['created_by'] = ApiClient.convertToType(data['created_by'], 'String');
      }
      if (data.hasOwnProperty('creation_date')) {
        obj['creation_date'] = ApiClient.convertToType(data['creation_date'], 'Date');
      }
      if (data.hasOwnProperty('custom')) {
        obj['custom'] = ApiClient.convertToType(data['custom'], 'Boolean');
      }
      if (data.hasOwnProperty('item_text')) {
        obj['item_text'] = ApiClient.convertToType(data['item_text'], 'String');
      }
      if (data.hasOwnProperty('last_modified')) {
        obj['last_modified'] = ApiClient.convertToType(data['last_modified'], 'Date');
      }
      if (data.hasOwnProperty('manual')) {
        obj['manual'] = ApiClient.convertToType(data['manual'], 'Boolean');
      }
      if (data.hasOwnProperty('price')) {
        obj['price'] = ApiClient.convertToType(data['price'], 'Number');
      }
      if (data.hasOwnProperty('price_adjustment_id')) {
        obj['price_adjustment_id'] = ApiClient.convertToType(data['price_adjustment_id'], 'String');
      }
      if (data.hasOwnProperty('promotion_id')) {
        obj['promotion_id'] = ApiClient.convertToType(data['promotion_id'], 'String');
      }
      if (data.hasOwnProperty('promotion_link')) {
        obj['promotion_link'] = ApiClient.convertToType(data['promotion_link'], 'String');
      }
      if (data.hasOwnProperty('reason_code')) {
        obj['reason_code'] = ApiClient.convertToType(data['reason_code'], 'String');
      }
    }
    return obj;
  }

  /**
   * A price adjustment that provides details of the discount that was applied.  This is null for custom price adjustments created  without discount details.
   * @member {module:model/Discount} applied_discount
   */
  exports.prototype['applied_discount'] = undefined;
  /**
   * The coupon code that triggered the promotion, provided  the price adjustment was created as the result of a promotion  being triggered by a coupon.
   * @member {String} coupon_code
   */
  exports.prototype['coupon_code'] = undefined;
  /**
   * The user who created the price adjustment.
   * @member {String} created_by
   */
  exports.prototype['created_by'] = undefined;
  /**
   * Returns the value of attribute 'creationDate'.
   * @member {Date} creation_date
   */
  exports.prototype['creation_date'] = undefined;
  /**
   * A flag indicating whether this price adjustment was created by custom logic. This flag is  set to true unless the price adjustment was created by the promotion engine.
   * @member {Boolean} custom
   */
  exports.prototype['custom'] = undefined;
  /**
   * The text describing the item in more detail.
   * @member {String} item_text
   */
  exports.prototype['item_text'] = undefined;
  /**
   * Returns the value of attribute 'lastModified'.
   * @member {Date} last_modified
   */
  exports.prototype['last_modified'] = undefined;
  /**
   * A flag indicating whether this price adjustment was created in a manual process.    For custom price adjustments created using the shop API, this always  returns true. Using the scripting API, however, it is possible to set this to true  or false, according to the use case.
   * @member {Boolean} manual
   */
  exports.prototype['manual'] = undefined;
  /**
   * The adjustment price.
   * @member {Number} price
   */
  exports.prototype['price'] = undefined;
  /**
   * The price adjustment id (uuid).
   * @member {String} price_adjustment_id
   */
  exports.prototype['price_adjustment_id'] = undefined;
  /**
   * The id of the related promotion. Custom price adjustments  can be assigned any promotion id so long it is not  used by a price adjustment belonging to the same item  and is not used by promotion defined in the promotion engine.  If not specified, a promotion id is generated.
   * @member {String} promotion_id
   */
  exports.prototype['promotion_id'] = undefined;
  /**
   * The URL addressing the related promotion.
   * @member {String} promotion_link
   */
  exports.prototype['promotion_link'] = undefined;
  /**
   * The reason why this price adjustment was made.
   * @member {module:model/PriceAdjustment.ReasonCodeEnum} reason_code
   */
  exports.prototype['reason_code'] = undefined;


  /**
   * Allowed values for the <code>reason_code</code> property.
   * @enum {String}
   * @readonly
   */
  exports.ReasonCodeEnum = {
    /**
     * value: "PRICE_MATCH"
     * @const
     */
    "PRICE_MATCH": "PRICE_MATCH",
    /**
     * value: "BACKORDER"
     * @const
     */
    "BACKORDER": "BACKORDER",
    /**
     * value: "EVEN_EXCHANGE"
     * @const
     */
    "EVEN_EXCHANGE": "EVEN_EXCHANGE"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.PriceAdjustmentLimit = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The PriceAdjustmentLimit model module.
   * @module model/PriceAdjustmentLimit
   * @version 17.3
   */

  /**
   * Constructs a new <code>PriceAdjustmentLimit</code>.
   *   A price adjustment limit specifies the amount of manual adjustment that can be applied by a user at the specified  level.  
   * @alias module:model/PriceAdjustmentLimit
   * @class
   */
  var exports = function() {
    var _this = this;





  };

  /**
   * Constructs a <code>PriceAdjustmentLimit</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PriceAdjustmentLimit} obj Optional instance to populate.
   * @return {module:model/PriceAdjustmentLimit} The populated <code>PriceAdjustmentLimit</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('amount')) {
        obj['amount'] = ApiClient.convertToType(data['amount'], 'Number');
      }
      if (data.hasOwnProperty('currency')) {
        obj['currency'] = ApiClient.convertToType(data['currency'], 'String');
      }
      if (data.hasOwnProperty('percent')) {
        obj['percent'] = ApiClient.convertToType(data['percent'], 'Number');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
    }
    return obj;
  }

  /**
   * The value for the currency or null if no currency value is specified.
   * @member {Number} amount
   */
  exports.prototype['amount'] = undefined;
  /**
   * Returns the currency of the Price Adjustment Limit or null if not applicable.    Will be null if this is a percent limit only.    Price adjustment limits can be given up to a fixed amount (unit=a currency unit).
   * @member {String} currency
   */
  exports.prototype['currency'] = undefined;
  /**
   * Returns percentage value of the Price Adjustment Limit or null if not applicable.    Will be null if this is a currency limit only.  
   * @member {Number} percent
   */
  exports.prototype['percent'] = undefined;
  /**
   * The Price Adjustment Limit type - ITEM, SHIPPING or ORDER. It identifies the level at which the Price Adjustment  is applicable.
   * @member {module:model/PriceAdjustmentLimit.TypeEnum} type
   */
  exports.prototype['type'] = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "item"
     * @const
     */
    "item": "item",
    /**
     * value: "shipping"
     * @const
     */
    "shipping": "shipping",
    /**
     * value: "order"
     * @const
     */
    "order": "order"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/PriceAdjustmentLimit'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./PriceAdjustmentLimit'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.PriceAdjustmentLimits = factory(root.ShopApi.ApiClient, root.ShopApi.PriceAdjustmentLimit);
  }
}(this, function(ApiClient, PriceAdjustmentLimit) {
  'use strict';




  /**
   * The PriceAdjustmentLimits model module.
   * @module model/PriceAdjustmentLimits
   * @version 17.3
   */

  /**
   * Constructs a new <code>PriceAdjustmentLimits</code>.
   * Document representing a list of PriceAdjustmentLimit items.  It returns all the price adjustment limits for a particular user  across various Access Roles.
   * @alias module:model/PriceAdjustmentLimits
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>PriceAdjustmentLimits</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PriceAdjustmentLimits} obj Optional instance to populate.
   * @return {module:model/PriceAdjustmentLimits} The populated <code>PriceAdjustmentLimits</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('limits')) {
        obj['limits'] = ApiClient.convertToType(data['limits'], [PriceAdjustmentLimit]);
      }
    }
    return obj;
  }

  /**
   * The list of price adjustment limits applicable for a user across all roles.
   * @member {Array.<module:model/PriceAdjustmentLimit>} limits
   */
  exports.prototype['limits'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/DiscountRequest'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./DiscountRequest'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.PriceAdjustmentRequest = factory(root.ShopApi.ApiClient, root.ShopApi.DiscountRequest);
  }
}(this, function(ApiClient, DiscountRequest) {
  'use strict';




  /**
   * The PriceAdjustmentRequest model module.
   * @module model/PriceAdjustmentRequest
   * @version 17.3
   */

  /**
   * Constructs a new <code>PriceAdjustmentRequest</code>.
   * Document representing a price adjustment request.  
   * @alias module:model/PriceAdjustmentRequest
   * @class
   * @param level {module:model/PriceAdjustmentRequest.LevelEnum} The level at which the adjustment is applied. When a product or shipping  level is specified, you must also specify the item id.
   */
  var exports = function(level) {
    var _this = this;




    _this['level'] = level;


  };

  /**
   * Constructs a <code>PriceAdjustmentRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PriceAdjustmentRequest} obj Optional instance to populate.
   * @return {module:model/PriceAdjustmentRequest} The populated <code>PriceAdjustmentRequest</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('discount')) {
        obj['discount'] = DiscountRequest.constructFromObject(data['discount']);
      }
      if (data.hasOwnProperty('item_id')) {
        obj['item_id'] = ApiClient.convertToType(data['item_id'], 'String');
      }
      if (data.hasOwnProperty('item_text')) {
        obj['item_text'] = ApiClient.convertToType(data['item_text'], 'String');
      }
      if (data.hasOwnProperty('level')) {
        obj['level'] = ApiClient.convertToType(data['level'], 'String');
      }
      if (data.hasOwnProperty('promotion_id')) {
        obj['promotion_id'] = ApiClient.convertToType(data['promotion_id'], 'String');
      }
      if (data.hasOwnProperty('reason_code')) {
        obj['reason_code'] = ApiClient.convertToType(data['reason_code'], 'String');
      }
    }
    return obj;
  }

  /**
   * A discount that you can specify instead of a price.  When defining a discount, you must specify a type and  a value.
   * @member {module:model/DiscountRequest} discount
   */
  exports.prototype['discount'] = undefined;
  /**
   * The item to which the price adjustment should be added, depending on the specified level.  If the level is 'order', you need not specify an item id. If 'shipping', specify the uuid  of the shipping item. If 'product', specify the uuid of the product item.
   * @member {String} item_id
   */
  exports.prototype['item_id'] = undefined;
  /**
   * The text describing the item in more detail.
   * @member {String} item_text
   */
  exports.prototype['item_text'] = undefined;
  /**
   * The level at which the adjustment is applied. When a product or shipping  level is specified, you must also specify the item id.
   * @member {module:model/PriceAdjustmentRequest.LevelEnum} level
   */
  exports.prototype['level'] = undefined;
  /**
   * The id of the related promotion. Custom price adjustments  can be assigned any promotion id so long it is not  used by a price adjustment belonging to the same item  and is not used by promotion defined in the promotion engine.  If not specified, a promotion id is generated.
   * @member {String} promotion_id
   */
  exports.prototype['promotion_id'] = undefined;
  /**
   * The reason why this price adjustment was made.
   * @member {module:model/PriceAdjustmentRequest.ReasonCodeEnum} reason_code
   */
  exports.prototype['reason_code'] = undefined;


  /**
   * Allowed values for the <code>level</code> property.
   * @enum {String}
   * @readonly
   */
  exports.LevelEnum = {
    /**
     * value: "product"
     * @const
     */
    "product": "product",
    /**
     * value: "shipping"
     * @const
     */
    "shipping": "shipping",
    /**
     * value: "order"
     * @const
     */
    "order": "order"  };

  /**
   * Allowed values for the <code>reason_code</code> property.
   * @enum {String}
   * @readonly
   */
  exports.ReasonCodeEnum = {
    /**
     * value: "PRICE_MATCH"
     * @const
     */
    "PRICE_MATCH": "PRICE_MATCH",
    /**
     * value: "BACKORDER"
     * @const
     */
    "BACKORDER": "BACKORDER",
    /**
     * value: "EVEN_EXCHANGE"
     * @const
     */
    "EVEN_EXCHANGE": "EVEN_EXCHANGE"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/BundledProduct', 'model/ImageGroup', 'model/Inventory', 'model/Master', 'model/Option', 'model/Product', 'model/ProductLink', 'model/ProductPromotion', 'model/ProductType', 'model/Recommendation', 'model/Variant', 'model/VariationAttribute', 'model/VariationGroup'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./BundledProduct'), require('./ImageGroup'), require('./Inventory'), require('./Master'), require('./Option'), require('./Product'), require('./ProductLink'), require('./ProductPromotion'), require('./ProductType'), require('./Recommendation'), require('./Variant'), require('./VariationAttribute'), require('./VariationGroup'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.Product = factory(root.ShopApi.ApiClient, root.ShopApi.BundledProduct, root.ShopApi.ImageGroup, root.ShopApi.Inventory, root.ShopApi.Master, root.ShopApi.Option, root.ShopApi.Product, root.ShopApi.ProductLink, root.ShopApi.ProductPromotion, root.ShopApi.ProductType, root.ShopApi.Recommendation, root.ShopApi.Variant, root.ShopApi.VariationAttribute, root.ShopApi.VariationGroup);
  }
}(this, function(ApiClient, BundledProduct, ImageGroup, Inventory, Master, Option, Product, ProductLink, ProductPromotion, ProductType, Recommendation, Variant, VariationAttribute, VariationGroup) {
  'use strict';




  /**
   * The Product model module.
   * @module model/Product
   * @version 17.3
   */

  /**
   * Constructs a new <code>Product</code>.
   * Document representing a product.
   * @alias module:model/Product
   * @class
   * @param id {String} The id (SKU) of the product.
   */
  var exports = function(id) {
    var _this = this;

































































    _this['id'] = id;






























  };

  /**
   * Constructs a <code>Product</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Product} obj Optional instance to populate.
   * @return {module:model/Product} The populated <code>Product</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('brand')) {
        obj['brand'] = ApiClient.convertToType(data['brand'], 'String');
      }
      if (data.hasOwnProperty('bundled_products')) {
        obj['bundled_products'] = ApiClient.convertToType(data['bundled_products'], [BundledProduct]);
      }
      if (data.hasOwnProperty('c_availableForInStorePickup')) {
        obj['c_availableForInStorePickup'] = ApiClient.convertToType(data['c_availableForInStorePickup'], 'Boolean');
      }
      if (data.hasOwnProperty('c_batteryLife')) {
        obj['c_batteryLife'] = ApiClient.convertToType(data['c_batteryLife'], 'String');
      }
      if (data.hasOwnProperty('c_batteryType')) {
        obj['c_batteryType'] = ApiClient.convertToType(data['c_batteryType'], 'String');
      }
      if (data.hasOwnProperty('c_bootType')) {
        obj['c_bootType'] = ApiClient.convertToType(data['c_bootType'], ['String']);
      }
      if (data.hasOwnProperty('c_bottomType')) {
        obj['c_bottomType'] = ApiClient.convertToType(data['c_bottomType'], ['String']);
      }
      if (data.hasOwnProperty('c_color')) {
        obj['c_color'] = ApiClient.convertToType(data['c_color'], 'String');
      }
      if (data.hasOwnProperty('c_consoleWarranty')) {
        obj['c_consoleWarranty'] = ApiClient.convertToType(data['c_consoleWarranty'], 'String');
      }
      if (data.hasOwnProperty('c_customCSSFile')) {
        obj['c_customCSSFile'] = ApiClient.convertToType(data['c_customCSSFile'], 'String');
      }
      if (data.hasOwnProperty('c_digitalCameraFeatures')) {
        obj['c_digitalCameraFeatures'] = ApiClient.convertToType(data['c_digitalCameraFeatures'], ['String']);
      }
      if (data.hasOwnProperty('c_digitalCameraPixels')) {
        obj['c_digitalCameraPixels'] = ApiClient.convertToType(data['c_digitalCameraPixels'], 'String');
      }
      if (data.hasOwnProperty('c_digitalCameraType')) {
        obj['c_digitalCameraType'] = ApiClient.convertToType(data['c_digitalCameraType'], 'String');
      }
      if (data.hasOwnProperty('c_digitalCameraWarranty')) {
        obj['c_digitalCameraWarranty'] = ApiClient.convertToType(data['c_digitalCameraWarranty'], 'String');
      }
      if (data.hasOwnProperty('c_dimDepth')) {
        obj['c_dimDepth'] = ApiClient.convertToType(data['c_dimDepth'], 'String');
      }
      if (data.hasOwnProperty('c_dimHeight')) {
        obj['c_dimHeight'] = ApiClient.convertToType(data['c_dimHeight'], 'String');
      }
      if (data.hasOwnProperty('c_dimWeight')) {
        obj['c_dimWeight'] = ApiClient.convertToType(data['c_dimWeight'], 'String');
      }
      if (data.hasOwnProperty('c_dimWidth')) {
        obj['c_dimWidth'] = ApiClient.convertToType(data['c_dimWidth'], 'String');
      }
      if (data.hasOwnProperty('c_displaySize')) {
        obj['c_displaySize'] = ApiClient.convertToType(data['c_displaySize'], 'String');
      }
      if (data.hasOwnProperty('c_gameGenre')) {
        obj['c_gameGenre'] = ApiClient.convertToType(data['c_gameGenre'], ['String']);
      }
      if (data.hasOwnProperty('c_gameRating')) {
        obj['c_gameRating'] = ApiClient.convertToType(data['c_gameRating'], 'String');
      }
      if (data.hasOwnProperty('c_gameSystemType')) {
        obj['c_gameSystemType'] = ApiClient.convertToType(data['c_gameSystemType'], 'String');
      }
      if (data.hasOwnProperty('c_gpsFeatures')) {
        obj['c_gpsFeatures'] = ApiClient.convertToType(data['c_gpsFeatures'], ['String']);
      }
      if (data.hasOwnProperty('c_gpsType')) {
        obj['c_gpsType'] = ApiClient.convertToType(data['c_gpsType'], ['String']);
      }
      if (data.hasOwnProperty('c_gpsWarranty')) {
        obj['c_gpsWarranty'] = ApiClient.convertToType(data['c_gpsWarranty'], 'String');
      }
      if (data.hasOwnProperty('c_imageAspectRatio')) {
        obj['c_imageAspectRatio'] = ApiClient.convertToType(data['c_imageAspectRatio'], 'String');
      }
      if (data.hasOwnProperty('c_isNew')) {
        obj['c_isNew'] = ApiClient.convertToType(data['c_isNew'], 'Boolean');
      }
      if (data.hasOwnProperty('c_isNewtest')) {
        obj['c_isNewtest'] = ApiClient.convertToType(data['c_isNewtest'], 'Boolean');
      }
      if (data.hasOwnProperty('c_isSale')) {
        obj['c_isSale'] = ApiClient.convertToType(data['c_isSale'], 'Boolean');
      }
      if (data.hasOwnProperty('c_kidsAge')) {
        obj['c_kidsAge'] = ApiClient.convertToType(data['c_kidsAge'], 'String');
      }
      if (data.hasOwnProperty('c_length')) {
        obj['c_length'] = ApiClient.convertToType(data['c_length'], 'String');
      }
      if (data.hasOwnProperty('c_lensAperture')) {
        obj['c_lensAperture'] = ApiClient.convertToType(data['c_lensAperture'], 'String');
      }
      if (data.hasOwnProperty('c_marketplace')) {
        obj['c_marketplace'] = ApiClient.convertToType(data['c_marketplace'], 'Boolean');
      }
      if (data.hasOwnProperty('c_marketplace-product-id')) {
        obj['c_marketplace-product-id'] = ApiClient.convertToType(data['c_marketplace-product-id'], 'String');
      }
      if (data.hasOwnProperty('c_materialTest')) {
        obj['c_materialTest'] = ApiClient.convertToType(data['c_materialTest'], ['String']);
      }
      if (data.hasOwnProperty('c_mediaFormat')) {
        obj['c_mediaFormat'] = ApiClient.convertToType(data['c_mediaFormat'], ['String']);
      }
      if (data.hasOwnProperty('c_memorySize')) {
        obj['c_memorySize'] = ApiClient.convertToType(data['c_memorySize'], 'String');
      }
      if (data.hasOwnProperty('c_memoryType')) {
        obj['c_memoryType'] = ApiClient.convertToType(data['c_memoryType'], ['String']);
      }
      if (data.hasOwnProperty('c_musicStorage')) {
        obj['c_musicStorage'] = ApiClient.convertToType(data['c_musicStorage'], 'String');
      }
      if (data.hasOwnProperty('c_opticalZoom')) {
        obj['c_opticalZoom'] = ApiClient.convertToType(data['c_opticalZoom'], 'String');
      }
      if (data.hasOwnProperty('c_outerwearType')) {
        obj['c_outerwearType'] = ApiClient.convertToType(data['c_outerwearType'], 'String');
      }
      if (data.hasOwnProperty('c_portableAudioType')) {
        obj['c_portableAudioType'] = ApiClient.convertToType(data['c_portableAudioType'], ['String']);
      }
      if (data.hasOwnProperty('c_refinementColor')) {
        obj['c_refinementColor'] = ApiClient.convertToType(data['c_refinementColor'], 'String');
      }
      if (data.hasOwnProperty('c_resolution')) {
        obj['c_resolution'] = ApiClient.convertToType(data['c_resolution'], 'String');
      }
      if (data.hasOwnProperty('c_sandalType')) {
        obj['c_sandalType'] = ApiClient.convertToType(data['c_sandalType'], 'String');
      }
      if (data.hasOwnProperty('c_sheets')) {
        obj['c_sheets'] = ApiClient.convertToType(data['c_sheets'], ['String']);
      }
      if (data.hasOwnProperty('c_shoeType')) {
        obj['c_shoeType'] = ApiClient.convertToType(data['c_shoeType'], 'String');
      }
      if (data.hasOwnProperty('c_size')) {
        obj['c_size'] = ApiClient.convertToType(data['c_size'], 'String');
      }
      if (data.hasOwnProperty('c_skinConcern')) {
        obj['c_skinConcern'] = ApiClient.convertToType(data['c_skinConcern'], ['String']);
      }
      if (data.hasOwnProperty('c_styleNumber')) {
        obj['c_styleNumber'] = ApiClient.convertToType(data['c_styleNumber'], 'String');
      }
      if (data.hasOwnProperty('c_tabDescription')) {
        obj['c_tabDescription'] = ApiClient.convertToType(data['c_tabDescription'], 'String');
      }
      if (data.hasOwnProperty('c_tabDetails')) {
        obj['c_tabDetails'] = ApiClient.convertToType(data['c_tabDetails'], 'String');
      }
      if (data.hasOwnProperty('c_test')) {
        obj['c_test'] = ApiClient.convertToType(data['c_test'], 'String');
      }
      if (data.hasOwnProperty('c_topType')) {
        obj['c_topType'] = ApiClient.convertToType(data['c_topType'], 'String');
      }
      if (data.hasOwnProperty('c_tvSignalFormat')) {
        obj['c_tvSignalFormat'] = ApiClient.convertToType(data['c_tvSignalFormat'], 'String');
      }
      if (data.hasOwnProperty('c_tvSize')) {
        obj['c_tvSize'] = ApiClient.convertToType(data['c_tvSize'], 'String');
      }
      if (data.hasOwnProperty('c_tvType')) {
        obj['c_tvType'] = ApiClient.convertToType(data['c_tvType'], 'String');
      }
      if (data.hasOwnProperty('c_tvWarranty')) {
        obj['c_tvWarranty'] = ApiClient.convertToType(data['c_tvWarranty'], 'String');
      }
      if (data.hasOwnProperty('c_videoStorage')) {
        obj['c_videoStorage'] = ApiClient.convertToType(data['c_videoStorage'], 'String');
      }
      if (data.hasOwnProperty('c_waist')) {
        obj['c_waist'] = ApiClient.convertToType(data['c_waist'], 'String');
      }
      if (data.hasOwnProperty('c_width')) {
        obj['c_width'] = ApiClient.convertToType(data['c_width'], 'String');
      }
      if (data.hasOwnProperty('currency')) {
        obj['currency'] = ApiClient.convertToType(data['currency'], 'String');
      }
      if (data.hasOwnProperty('ean')) {
        obj['ean'] = ApiClient.convertToType(data['ean'], 'String');
      }
      if (data.hasOwnProperty('fetch_date')) {
        obj['fetch_date'] = ApiClient.convertToType(data['fetch_date'], 'Number');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('image_groups')) {
        obj['image_groups'] = ApiClient.convertToType(data['image_groups'], [ImageGroup]);
      }
      if (data.hasOwnProperty('inventories')) {
        obj['inventories'] = ApiClient.convertToType(data['inventories'], [Inventory]);
      }
      if (data.hasOwnProperty('inventory')) {
        obj['inventory'] = Inventory.constructFromObject(data['inventory']);
      }
      if (data.hasOwnProperty('long_description')) {
        obj['long_description'] = ApiClient.convertToType(data['long_description'], 'String');
      }
      if (data.hasOwnProperty('manufacturer_name')) {
        obj['manufacturer_name'] = ApiClient.convertToType(data['manufacturer_name'], 'String');
      }
      if (data.hasOwnProperty('manufacturer_sku')) {
        obj['manufacturer_sku'] = ApiClient.convertToType(data['manufacturer_sku'], 'String');
      }
      if (data.hasOwnProperty('master')) {
        obj['master'] = Master.constructFromObject(data['master']);
      }
      if (data.hasOwnProperty('min_order_quantity')) {
        obj['min_order_quantity'] = ApiClient.convertToType(data['min_order_quantity'], 'Number');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('options')) {
        obj['options'] = ApiClient.convertToType(data['options'], [Option]);
      }
      if (data.hasOwnProperty('page_description')) {
        obj['page_description'] = ApiClient.convertToType(data['page_description'], 'String');
      }
      if (data.hasOwnProperty('page_keywords')) {
        obj['page_keywords'] = ApiClient.convertToType(data['page_keywords'], 'String');
      }
      if (data.hasOwnProperty('page_title')) {
        obj['page_title'] = ApiClient.convertToType(data['page_title'], 'String');
      }
      if (data.hasOwnProperty('price')) {
        obj['price'] = ApiClient.convertToType(data['price'], 'Number');
      }
      if (data.hasOwnProperty('price_max')) {
        obj['price_max'] = ApiClient.convertToType(data['price_max'], 'Number');
      }
      if (data.hasOwnProperty('prices')) {
        obj['prices'] = ApiClient.convertToType(data['prices'], {'String': 'Number'});
      }
      if (data.hasOwnProperty('primary_category_id')) {
        obj['primary_category_id'] = ApiClient.convertToType(data['primary_category_id'], 'String');
      }
      if (data.hasOwnProperty('product_links')) {
        obj['product_links'] = ApiClient.convertToType(data['product_links'], [ProductLink]);
      }
      if (data.hasOwnProperty('product_promotions')) {
        obj['product_promotions'] = ApiClient.convertToType(data['product_promotions'], [ProductPromotion]);
      }
      if (data.hasOwnProperty('recommendations')) {
        obj['recommendations'] = ApiClient.convertToType(data['recommendations'], [Recommendation]);
      }
      if (data.hasOwnProperty('set_products')) {
        obj['set_products'] = ApiClient.convertToType(data['set_products'], [Product]);
      }
      if (data.hasOwnProperty('short_description')) {
        obj['short_description'] = ApiClient.convertToType(data['short_description'], 'String');
      }
      if (data.hasOwnProperty('step_quantity')) {
        obj['step_quantity'] = ApiClient.convertToType(data['step_quantity'], 'Number');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ProductType.constructFromObject(data['type']);
      }
      if (data.hasOwnProperty('unit')) {
        obj['unit'] = ApiClient.convertToType(data['unit'], 'String');
      }
      if (data.hasOwnProperty('upc')) {
        obj['upc'] = ApiClient.convertToType(data['upc'], 'String');
      }
      if (data.hasOwnProperty('variants')) {
        obj['variants'] = ApiClient.convertToType(data['variants'], [Variant]);
      }
      if (data.hasOwnProperty('variation_attributes')) {
        obj['variation_attributes'] = ApiClient.convertToType(data['variation_attributes'], [VariationAttribute]);
      }
      if (data.hasOwnProperty('variation_groups')) {
        obj['variation_groups'] = ApiClient.convertToType(data['variation_groups'], [VariationGroup]);
      }
      if (data.hasOwnProperty('variation_values')) {
        obj['variation_values'] = ApiClient.convertToType(data['variation_values'], {'String': 'String'});
      }
    }
    return obj;
  }

  /**
   * The product's brand.
   * @member {String} brand
   */
  exports.prototype['brand'] = undefined;
  /**
   * The array of all bundled products of this product.
   * @member {Array.<module:model/BundledProduct>} bundled_products
   */
  exports.prototype['bundled_products'] = undefined;
  /**
   * Signals if there are inventory lists for brick-and-mortar stores associated with this product.
   * @member {Boolean} c_availableForInStorePickup
   */
  exports.prototype['c_availableForInStorePickup'] = undefined;
  /**
   * @member {String} c_batteryLife
   */
  exports.prototype['c_batteryLife'] = undefined;
  /**
   * @member {String} c_batteryType
   */
  exports.prototype['c_batteryType'] = undefined;
  /**
   * Type of Boot for search refinement.
   * @member {Array.<module:model/Product.CBootTypeEnum>} c_bootType
   */
  exports.prototype['c_bootType'] = undefined;
  /**
   * Bottom type for search refinement
   * @member {Array.<module:model/Product.CBottomTypeEnum>} c_bottomType
   */
  exports.prototype['c_bottomType'] = undefined;
  /**
   * Product color used for variation attribute
   * @member {String} c_color
   */
  exports.prototype['c_color'] = undefined;
  /**
   * @member {String} c_consoleWarranty
   */
  exports.prototype['c_consoleWarranty'] = undefined;
  /**
   * Use this attribute to apply custom styles for this product.
   * @member {String} c_customCSSFile
   */
  exports.prototype['c_customCSSFile'] = undefined;
  /**
   * @member {Array.<module:model/Product.CDigitalCameraFeaturesEnum>} c_digitalCameraFeatures
   */
  exports.prototype['c_digitalCameraFeatures'] = undefined;
  /**
   * @member {String} c_digitalCameraPixels
   */
  exports.prototype['c_digitalCameraPixels'] = undefined;
  /**
   * @member {String} c_digitalCameraType
   */
  exports.prototype['c_digitalCameraType'] = undefined;
  /**
   * @member {String} c_digitalCameraWarranty
   */
  exports.prototype['c_digitalCameraWarranty'] = undefined;
  /**
   * @member {String} c_dimDepth
   */
  exports.prototype['c_dimDepth'] = undefined;
  /**
   * @member {String} c_dimHeight
   */
  exports.prototype['c_dimHeight'] = undefined;
  /**
   * @member {String} c_dimWeight
   */
  exports.prototype['c_dimWeight'] = undefined;
  /**
   * @member {String} c_dimWidth
   */
  exports.prototype['c_dimWidth'] = undefined;
  /**
   * @member {String} c_displaySize
   */
  exports.prototype['c_displaySize'] = undefined;
  /**
   * @member {Array.<module:model/Product.CGameGenreEnum>} c_gameGenre
   */
  exports.prototype['c_gameGenre'] = undefined;
  /**
   * @member {String} c_gameRating
   */
  exports.prototype['c_gameRating'] = undefined;
  /**
   * @member {String} c_gameSystemType
   */
  exports.prototype['c_gameSystemType'] = undefined;
  /**
   * @member {Array.<module:model/Product.CGpsFeaturesEnum>} c_gpsFeatures
   */
  exports.prototype['c_gpsFeatures'] = undefined;
  /**
   * @member {Array.<module:model/Product.CGpsTypeEnum>} c_gpsType
   */
  exports.prototype['c_gpsType'] = undefined;
  /**
   * @member {String} c_gpsWarranty
   */
  exports.prototype['c_gpsWarranty'] = undefined;
  /**
   * @member {String} c_imageAspectRatio
   */
  exports.prototype['c_imageAspectRatio'] = undefined;
  /**
   * @member {Boolean} c_isNew
   */
  exports.prototype['c_isNew'] = undefined;
  /**
   * This indiciates if the product is a new arrival.
   * @member {Boolean} c_isNewtest
   */
  exports.prototype['c_isNewtest'] = undefined;
  /**
   * This is the help text. It is used for sorting rules.
   * @member {Boolean} c_isSale
   */
  exports.prototype['c_isSale'] = undefined;
  /**
   * Kids Age used for search refinements
   * @member {module:model/Product.CKidsAgeEnum} c_kidsAge
   */
  exports.prototype['c_kidsAge'] = undefined;
  /**
   * This attribute is used for mens and womens pants lengths.
   * @member {String} c_length
   */
  exports.prototype['c_length'] = undefined;
  /**
   * @member {String} c_lensAperture
   */
  exports.prototype['c_lensAperture'] = undefined;
  /**
   * @member {Boolean} c_marketplace
   */
  exports.prototype['c_marketplace'] = undefined;
  /**
   * Contains the product id from the marketplace
   * @member {String} c_marketplace-product-id
   */
  exports.prototype['c_marketplace-product-id'] = undefined;
  /**
   * @member {Array.<module:model/Product.CMaterialTestEnum>} c_materialTest
   */
  exports.prototype['c_materialTest'] = undefined;
  /**
   * Media Format
   * @member {Array.<module:model/Product.CMediaFormatEnum>} c_mediaFormat
   */
  exports.prototype['c_mediaFormat'] = undefined;
  /**
   * Memory Size
   * @member {String} c_memorySize
   */
  exports.prototype['c_memorySize'] = undefined;
  /**
   * @member {Array.<module:model/Product.CMemoryTypeEnum>} c_memoryType
   */
  exports.prototype['c_memoryType'] = undefined;
  /**
   * @member {String} c_musicStorage
   */
  exports.prototype['c_musicStorage'] = undefined;
  /**
   * @member {String} c_opticalZoom
   */
  exports.prototype['c_opticalZoom'] = undefined;
  /**
   * Type of Outerwear for search refinement
   * @member {module:model/Product.COuterwearTypeEnum} c_outerwearType
   */
  exports.prototype['c_outerwearType'] = undefined;
  /**
   * @member {Array.<module:model/Product.CPortableAudioTypeEnum>} c_portableAudioType
   */
  exports.prototype['c_portableAudioType'] = undefined;
  /**
   * @member {module:model/Product.CRefinementColorEnum} c_refinementColor
   */
  exports.prototype['c_refinementColor'] = undefined;
  /**
   * @member {String} c_resolution
   */
  exports.prototype['c_resolution'] = undefined;
  /**
   * Type of Sandal for search refinement
   * @member {module:model/Product.CSandalTypeEnum} c_sandalType
   */
  exports.prototype['c_sandalType'] = undefined;
  /**
   * test attribute
   * @member {Array.<module:model/Product.CSheetsEnum>} c_sheets
   */
  exports.prototype['c_sheets'] = undefined;
  /**
   * Type of Shoe for search refinements
   * @member {module:model/Product.CShoeTypeEnum} c_shoeType
   */
  exports.prototype['c_shoeType'] = undefined;
  /**
   * This attribute is used for all footwear, apparel and accessory sizing for men, women and kids products.
   * @member {String} c_size
   */
  exports.prototype['c_size'] = undefined;
  /**
   * @member {Array.<module:model/Product.CSkinConcernEnum>} c_skinConcern
   */
  exports.prototype['c_skinConcern'] = undefined;
  /**
   * @member {String} c_styleNumber
   */
  exports.prototype['c_styleNumber'] = undefined;
  /**
   * @member {String} c_tabDescription
   */
  exports.prototype['c_tabDescription'] = undefined;
  /**
   * @member {String} c_tabDetails
   */
  exports.prototype['c_tabDetails'] = undefined;
  /**
   * @member {String} c_test
   */
  exports.prototype['c_test'] = undefined;
  /**
   * Type of tops in clothing
   * @member {String} c_topType
   */
  exports.prototype['c_topType'] = undefined;
  /**
   * @member {String} c_tvSignalFormat
   */
  exports.prototype['c_tvSignalFormat'] = undefined;
  /**
   * @member {String} c_tvSize
   */
  exports.prototype['c_tvSize'] = undefined;
  /**
   * @member {module:model/Product.CTvTypeEnum} c_tvType
   */
  exports.prototype['c_tvType'] = undefined;
  /**
   * @member {String} c_tvWarranty
   */
  exports.prototype['c_tvWarranty'] = undefined;
  /**
   * @member {String} c_videoStorage
   */
  exports.prototype['c_videoStorage'] = undefined;
  /**
   * Attribute used for apparel waist sizing.
   * @member {String} c_waist
   */
  exports.prototype['c_waist'] = undefined;
  /**
   * This attribute is used for shoe widths for mens, womens and kids.
   * @member {String} c_width
   */
  exports.prototype['c_width'] = undefined;
  /**
   * The ISO 4217 mnemonic code of the currency.
   * @member {String} currency
   */
  exports.prototype['currency'] = undefined;
  /**
   * The European Article Number.
   * @member {String} ean
   */
  exports.prototype['ean'] = undefined;
  /**
   * @member {Number} fetch_date
   */
  exports.prototype['fetch_date'] = undefined;
  /**
   * The id (SKU) of the product.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The array of product image groups.
   * @member {Array.<module:model/ImageGroup>} image_groups
   */
  exports.prototype['image_groups'] = undefined;
  /**
   * The array of product inventories explicitly requested via 'inventory_ids' query parameter. This property  is only returned in context of the 'availability' expansion.
   * @member {Array.<module:model/Inventory>} inventories
   */
  exports.prototype['inventories'] = undefined;
  /**
   * The site default inventory information. This property is only  returned in context of the 'availability' expansion.
   * @member {module:model/Inventory} inventory
   */
  exports.prototype['inventory'] = undefined;
  /**
   * The localized product long description.
   * @member {String} long_description
   */
  exports.prototype['long_description'] = undefined;
  /**
   * The products manufacturer name.
   * @member {String} manufacturer_name
   */
  exports.prototype['manufacturer_name'] = undefined;
  /**
   * The products manufacturer sku.
   * @member {String} manufacturer_sku
   */
  exports.prototype['manufacturer_sku'] = undefined;
  /**
   * The master product information. Only for types master, variation group and variant.
   * @member {module:model/Master} master
   */
  exports.prototype['master'] = undefined;
  /**
   * The minimum order quantity for this product.
   * @member {Number} min_order_quantity
   */
  exports.prototype['min_order_quantity'] = undefined;
  /**
   * The localized product name.
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * The array of product options. This array can be empty. Only for type option.
   * @member {Array.<module:model/Option>} options
   */
  exports.prototype['options'] = undefined;
  /**
   * The localized products page description.
   * @member {String} page_description
   */
  exports.prototype['page_description'] = undefined;
  /**
   * The localized products page description.
   * @member {String} page_keywords
   */
  exports.prototype['page_keywords'] = undefined;
  /**
   * The localized products page title.
   * @member {String} page_title
   */
  exports.prototype['page_title'] = undefined;
  /**
   * The sales price of the product. In case of complex products like master or set this is the minimum price of  related child products.
   * @member {Number} price
   */
  exports.prototype['price'] = undefined;
  /**
   * The maximum sales of related child products in case of complex products like master or set.
   * @member {Number} price_max
   */
  exports.prototype['price_max'] = undefined;
  /**
   * The prices map with price book ids and their values.
   * @member {Object.<String, Number>} prices
   */
  exports.prototype['prices'] = undefined;
  /**
   * The id of the products primary category.
   * @member {String} primary_category_id
   */
  exports.prototype['primary_category_id'] = undefined;
  /**
   * The array of source and target products links information.
   * @member {Array.<module:model/ProductLink>} product_links
   */
  exports.prototype['product_links'] = undefined;
  /**
   * The array of active customer product promotions for this product. This array can be empty.  Coupon promotions are not returned in this array.
   * @member {Array.<module:model/ProductPromotion>} product_promotions
   */
  exports.prototype['product_promotions'] = undefined;
  /**
   * Returns a list of recommendations.
   * @member {Array.<module:model/Recommendation>} recommendations
   */
  exports.prototype['recommendations'] = undefined;
  /**
   * The array of set products of this product.
   * @member {Array.<module:model/Product>} set_products
   */
  exports.prototype['set_products'] = undefined;
  /**
   * The localized product short description.
   * @member {String} short_description
   */
  exports.prototype['short_description'] = undefined;
  /**
   * The steps in which the order amount of the product can be  increased.
   * @member {Number} step_quantity
   */
  exports.prototype['step_quantity'] = undefined;
  /**
   * The product type information. Can be one or multiple of the following values: item,master,variation_group,variant,bundle,set.
   * @member {module:model/ProductType} type
   */
  exports.prototype['type'] = undefined;
  /**
   * The sales unit of the product.
   * @member {String} unit
   */
  exports.prototype['unit'] = undefined;
  /**
   * The Universal Product Code.
   * @member {String} upc
   */
  exports.prototype['upc'] = undefined;
  /**
   * The array of actual variants. This array can be empty. Only for types master, variation group and variant.
   * @member {Array.<module:model/Variant>} variants
   */
  exports.prototype['variants'] = undefined;
  /**
   * Sorted array of variation attributes information. This array can be empty. Only for types master,  variation group and variant.
   * @member {Array.<module:model/VariationAttribute>} variation_attributes
   */
  exports.prototype['variation_attributes'] = undefined;
  /**
   * The array of actual variation groups. This array can be empty. Only for types master, variation group and variant.
   * @member {Array.<module:model/VariationGroup>} variation_groups
   */
  exports.prototype['variation_groups'] = undefined;
  /**
   * The actual variation attribute id - value pairs. Only for type variant and  variation group.
   * @member {Object.<String, String>} variation_values
   */
  exports.prototype['variation_values'] = undefined;


  /**
   * Allowed values for the <code>cBootType</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CBootTypeEnum = {
    /**
     * value: "0010"
     * @const
     */
    "0010": "0010",
    /**
     * value: "0020"
     * @const
     */
    "0020": "0020",
    /**
     * value: "0030"
     * @const
     */
    "0030": "0030",
    /**
     * value: "0040"
     * @const
     */
    "0040": "0040",
    /**
     * value: "0050"
     * @const
     */
    "0050": "0050",
    /**
     * value: "0060"
     * @const
     */
    "0060": "0060",
    /**
     * value: "0070"
     * @const
     */
    "0070": "0070"  };

  /**
   * Allowed values for the <code>cBottomType</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CBottomTypeEnum = {
    /**
     * value: "0010"
     * @const
     */
    "0010": "0010",
    /**
     * value: "0020"
     * @const
     */
    "0020": "0020",
    /**
     * value: "0030"
     * @const
     */
    "0030": "0030",
    /**
     * value: "0040"
     * @const
     */
    "0040": "0040",
    /**
     * value: "0050"
     * @const
     */
    "0050": "0050",
    /**
     * value: "0060"
     * @const
     */
    "0060": "0060",
    /**
     * value: "0070"
     * @const
     */
    "0070": "0070",
    /**
     * value: "0080"
     * @const
     */
    "0080": "0080"  };

  /**
   * Allowed values for the <code>cDigitalCameraFeatures</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CDigitalCameraFeaturesEnum = {
    /**
     * value: "0010"
     * @const
     */
    "0010": "0010",
    /**
     * value: "0020"
     * @const
     */
    "0020": "0020",
    /**
     * value: "0030"
     * @const
     */
    "0030": "0030",
    /**
     * value: "0040"
     * @const
     */
    "0040": "0040",
    /**
     * value: "0050"
     * @const
     */
    "0050": "0050",
    /**
     * value: "0060"
     * @const
     */
    "0060": "0060",
    /**
     * value: "0070"
     * @const
     */
    "0070": "0070",
    /**
     * value: "0080"
     * @const
     */
    "0080": "0080",
    /**
     * value: "0090"
     * @const
     */
    "0090": "0090",
    /**
     * value: "0100"
     * @const
     */
    "0100": "0100",
    /**
     * value: "0110"
     * @const
     */
    "0110": "0110",
    /**
     * value: "0120"
     * @const
     */
    "0120": "0120",
    /**
     * value: "0130"
     * @const
     */
    "0130": "0130",
    /**
     * value: "0140"
     * @const
     */
    "0140": "0140",
    /**
     * value: "0150"
     * @const
     */
    "0150": "0150",
    /**
     * value: "0160"
     * @const
     */
    "0160": "0160",
    /**
     * value: "0170"
     * @const
     */
    "0170": "0170",
    /**
     * value: "0180"
     * @const
     */
    "0180": "0180",
    /**
     * value: "0190"
     * @const
     */
    "0190": "0190",
    /**
     * value: "0200"
     * @const
     */
    "0200": "0200",
    /**
     * value: "0210"
     * @const
     */
    "0210": "0210",
    /**
     * value: "0220"
     * @const
     */
    "0220": "0220",
    /**
     * value: "0230"
     * @const
     */
    "0230": "0230",
    /**
     * value: "0240"
     * @const
     */
    "0240": "0240",
    /**
     * value: "0250"
     * @const
     */
    "0250": "0250",
    /**
     * value: "0260"
     * @const
     */
    "0260": "0260",
    /**
     * value: "0270"
     * @const
     */
    "0270": "0270",
    /**
     * value: "0280"
     * @const
     */
    "0280": "0280"  };

  /**
   * Allowed values for the <code>cGameGenre</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CGameGenreEnum = {
    /**
     * value: "Action"
     * @const
     */
    "Action": "Action",
    /**
     * value: "Educational"
     * @const
     */
    "Educational": "Educational",
    /**
     * value: "Kids"
     * @const
     */
    "Kids": "Kids",
    /**
     * value: "Racing"
     * @const
     */
    "Racing": "Racing",
    /**
     * value: "Role-Playing"
     * @const
     */
    "Role-Playing": "Role-Playing",
    /**
     * value: "Sports"
     * @const
     */
    "Sports": "Sports",
    /**
     * value: "Strategy"
     * @const
     */
    "Strategy": "Strategy"  };

  /**
   * Allowed values for the <code>cGpsFeatures</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CGpsFeaturesEnum = {
    /**
     * value: "0010"
     * @const
     */
    "0010": "0010",
    /**
     * value: "0020"
     * @const
     */
    "0020": "0020",
    /**
     * value: "0030"
     * @const
     */
    "0030": "0030",
    /**
     * value: "0040"
     * @const
     */
    "0040": "0040",
    /**
     * value: "0050"
     * @const
     */
    "0050": "0050",
    /**
     * value: "0060"
     * @const
     */
    "0060": "0060",
    /**
     * value: "0070"
     * @const
     */
    "0070": "0070",
    /**
     * value: "0080"
     * @const
     */
    "0080": "0080",
    /**
     * value: "0090"
     * @const
     */
    "0090": "0090",
    /**
     * value: "0100"
     * @const
     */
    "0100": "0100",
    /**
     * value: "0110"
     * @const
     */
    "0110": "0110",
    /**
     * value: "0120"
     * @const
     */
    "0120": "0120",
    /**
     * value: "0130"
     * @const
     */
    "0130": "0130",
    /**
     * value: "0140"
     * @const
     */
    "0140": "0140",
    /**
     * value: "0150"
     * @const
     */
    "0150": "0150",
    /**
     * value: "0160"
     * @const
     */
    "0160": "0160",
    /**
     * value: "0170"
     * @const
     */
    "0170": "0170",
    /**
     * value: "0180"
     * @const
     */
    "0180": "0180",
    /**
     * value: "0190"
     * @const
     */
    "0190": "0190",
    /**
     * value: "0200"
     * @const
     */
    "0200": "0200",
    /**
     * value: "0210"
     * @const
     */
    "0210": "0210",
    /**
     * value: "0230"
     * @const
     */
    "0230": "0230"  };

  /**
   * Allowed values for the <code>cGpsType</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CGpsTypeEnum = {
    /**
     * value: "0010"
     * @const
     */
    "0010": "0010",
    /**
     * value: "0020"
     * @const
     */
    "0020": "0020",
    /**
     * value: "0030"
     * @const
     */
    "0030": "0030",
    /**
     * value: "0040"
     * @const
     */
    "0040": "0040"  };

  /**
   * Allowed values for the <code>c_kidsAge</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CKidsAgeEnum = {
    /**
     * value: "0010"
     * @const
     */
    "0010": "0010",
    /**
     * value: "0020"
     * @const
     */
    "0020": "0020",
    /**
     * value: "0030"
     * @const
     */
    "0030": "0030",
    /**
     * value: "0040"
     * @const
     */
    "0040": "0040",
    /**
     * value: "0050"
     * @const
     */
    "0050": "0050",
    /**
     * value: "0060"
     * @const
     */
    "0060": "0060",
    /**
     * value: "0070"
     * @const
     */
    "0070": "0070"  };

  /**
   * Allowed values for the <code>cMaterialTest</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CMaterialTestEnum = {
    /**
     * value: "cotton"
     * @const
     */
    "cotton": "cotton",
    /**
     * value: "wool"
     * @const
     */
    "wool": "wool",
    /**
     * value: "polyester"
     * @const
     */
    "polyester": "polyester"  };

  /**
   * Allowed values for the <code>cMediaFormat</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CMediaFormatEnum = {
    /**
     * value: "0010"
     * @const
     */
    "0010": "0010",
    /**
     * value: "0020"
     * @const
     */
    "0020": "0020",
    /**
     * value: "0030"
     * @const
     */
    "0030": "0030",
    /**
     * value: "0040"
     * @const
     */
    "0040": "0040",
    /**
     * value: "0050"
     * @const
     */
    "0050": "0050",
    /**
     * value: "0060"
     * @const
     */
    "0060": "0060",
    /**
     * value: "0070"
     * @const
     */
    "0070": "0070",
    /**
     * value: "0080"
     * @const
     */
    "0080": "0080",
    /**
     * value: "0090"
     * @const
     */
    "0090": "0090",
    /**
     * value: "0100"
     * @const
     */
    "0100": "0100"  };

  /**
   * Allowed values for the <code>cMemoryType</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CMemoryTypeEnum = {
    /**
     * value: "0010"
     * @const
     */
    "0010": "0010",
    /**
     * value: "0020"
     * @const
     */
    "0020": "0020",
    /**
     * value: "0030"
     * @const
     */
    "0030": "0030",
    /**
     * value: "0040"
     * @const
     */
    "0040": "0040",
    /**
     * value: "0050"
     * @const
     */
    "0050": "0050",
    /**
     * value: "0060"
     * @const
     */
    "0060": "0060",
    /**
     * value: "0070"
     * @const
     */
    "0070": "0070",
    /**
     * value: "0080"
     * @const
     */
    "0080": "0080",
    /**
     * value: "0090"
     * @const
     */
    "0090": "0090"  };

  /**
   * Allowed values for the <code>c_outerwearType</code> property.
   * @enum {String}
   * @readonly
   */
  exports.COuterwearTypeEnum = {
    /**
     * value: "0010"
     * @const
     */
    "0010": "0010",
    /**
     * value: "0020"
     * @const
     */
    "0020": "0020",
    /**
     * value: "0030"
     * @const
     */
    "0030": "0030",
    /**
     * value: "0040"
     * @const
     */
    "0040": "0040",
    /**
     * value: "0050"
     * @const
     */
    "0050": "0050",
    /**
     * value: "0060"
     * @const
     */
    "0060": "0060",
    /**
     * value: "0070"
     * @const
     */
    "0070": "0070",
    /**
     * value: "0080"
     * @const
     */
    "0080": "0080"  };

  /**
   * Allowed values for the <code>cPortableAudioType</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CPortableAudioTypeEnum = {
    /**
     * value: "0010"
     * @const
     */
    "0010": "0010",
    /**
     * value: "0020"
     * @const
     */
    "0020": "0020",
    /**
     * value: "0030"
     * @const
     */
    "0030": "0030"  };

  /**
   * Allowed values for the <code>c_refinementColor</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CRefinementColorEnum = {
    /**
     * value: "black"
     * @const
     */
    "black": "black",
    /**
     * value: "blue"
     * @const
     */
    "blue": "blue",
    /**
     * value: "green"
     * @const
     */
    "green": "green",
    /**
     * value: "red"
     * @const
     */
    "red": "red",
    /**
     * value: "orange"
     * @const
     */
    "orange": "orange",
    /**
     * value: "pink"
     * @const
     */
    "pink": "pink",
    /**
     * value: "purple"
     * @const
     */
    "purple": "purple",
    /**
     * value: "white"
     * @const
     */
    "white": "white",
    /**
     * value: "yellow"
     * @const
     */
    "yellow": "yellow",
    /**
     * value: "grey"
     * @const
     */
    "grey": "grey",
    /**
     * value: "beige"
     * @const
     */
    "beige": "beige",
    /**
     * value: "miscellaneous"
     * @const
     */
    "miscellaneous": "miscellaneous",
    /**
     * value: "brown"
     * @const
     */
    "brown": "brown",
    /**
     * value: "navy"
     * @const
     */
    "navy": "navy"  };

  /**
   * Allowed values for the <code>c_sandalType</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CSandalTypeEnum = {
    /**
     * value: "0010"
     * @const
     */
    "0010": "0010",
    /**
     * value: "0020"
     * @const
     */
    "0020": "0020",
    /**
     * value: "0030"
     * @const
     */
    "0030": "0030"  };

  /**
   * Allowed values for the <code>cSheets</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CSheetsEnum = {
    /**
     * value: "value1"
     * @const
     */
    "value1": "value1",
    /**
     * value: "value2"
     * @const
     */
    "value2": "value2",
    /**
     * value: "value3"
     * @const
     */
    "value3": "value3"  };

  /**
   * Allowed values for the <code>c_shoeType</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CShoeTypeEnum = {
    /**
     * value: "0010"
     * @const
     */
    "0010": "0010",
    /**
     * value: "0020"
     * @const
     */
    "0020": "0020",
    /**
     * value: "0030"
     * @const
     */
    "0030": "0030",
    /**
     * value: "0040"
     * @const
     */
    "0040": "0040",
    /**
     * value: "0050"
     * @const
     */
    "0050": "0050",
    /**
     * value: "0060"
     * @const
     */
    "0060": "0060",
    /**
     * value: "0070"
     * @const
     */
    "0070": "0070",
    /**
     * value: "0080"
     * @const
     */
    "0080": "0080",
    /**
     * value: "0090"
     * @const
     */
    "0090": "0090",
    /**
     * value: "0100"
     * @const
     */
    "0100": "0100",
    /**
     * value: "0110"
     * @const
     */
    "0110": "0110"  };

  /**
   * Allowed values for the <code>cSkinConcern</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CSkinConcernEnum = {
    /**
     * value: "dryTight"
     * @const
     */
    "dryTight": "dryTight",
    /**
     * value: "comprehensive"
     * @const
     */
    "comprehensive": "comprehensive",
    /**
     * value: "liftingLossFirm"
     * @const
     */
    "liftingLossFirm": "liftingLossFirm"  };

  /**
   * Allowed values for the <code>c_tvType</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CTvTypeEnum = {
    /**
     * value: "0010"
     * @const
     */
    "0010": "0010",
    /**
     * value: "0020"
     * @const
     */
    "0020": "0020",
    /**
     * value: "0030"
     * @const
     */
    "0030": "0030",
    /**
     * value: "0040"
     * @const
     */
    "0040": "0040"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ProductDetailsLink = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ProductDetailsLink model module.
   * @module model/ProductDetailsLink
   * @version 17.3
   */

  /**
   * Constructs a new <code>ProductDetailsLink</code>.
   * Document representing a link to the resource for product details.
   * @alias module:model/ProductDetailsLink
   * @class
   * @param productId {String} The id of the product.
   */
  var exports = function(productId) {
    var _this = this;



    _this['product_id'] = productId;


  };

  /**
   * Constructs a <code>ProductDetailsLink</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ProductDetailsLink} obj Optional instance to populate.
   * @return {module:model/ProductDetailsLink} The populated <code>ProductDetailsLink</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('link')) {
        obj['link'] = ApiClient.convertToType(data['link'], 'String');
      }
      if (data.hasOwnProperty('product_description')) {
        obj['product_description'] = ApiClient.convertToType(data['product_description'], 'String');
      }
      if (data.hasOwnProperty('product_id')) {
        obj['product_id'] = ApiClient.convertToType(data['product_id'], 'String');
      }
      if (data.hasOwnProperty('product_name')) {
        obj['product_name'] = ApiClient.convertToType(data['product_name'], 'String');
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
    }
    return obj;
  }

  /**
   * The target of the link.
   * @member {String} link
   */
  exports.prototype['link'] = undefined;
  /**
   * The description of the product.
   * @member {String} product_description
   */
  exports.prototype['product_description'] = undefined;
  /**
   * The id of the product.
   * @member {String} product_id
   */
  exports.prototype['product_id'] = undefined;
  /**
   * The name of the product.
   * @member {String} product_name
   */
  exports.prototype['product_name'] = undefined;
  /**
   * The link title.
   * @member {String} title
   */
  exports.prototype['title'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/OptionItem', 'model/PriceAdjustment', 'model/ProductItem', 'model/ProductListItemReference'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./OptionItem'), require('./PriceAdjustment'), require('./ProductItem'), require('./ProductListItemReference'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ProductItem = factory(root.ShopApi.ApiClient, root.ShopApi.OptionItem, root.ShopApi.PriceAdjustment, root.ShopApi.ProductItem, root.ShopApi.ProductListItemReference);
  }
}(this, function(ApiClient, OptionItem, PriceAdjustment, ProductItem, ProductListItemReference) {
  'use strict';




  /**
   * The ProductItem model module.
   * @module model/ProductItem
   * @version 17.3
   */

  /**
   * Constructs a new <code>ProductItem</code>.
   * Document representing a product item.
   * @alias module:model/ProductItem
   * @class
   * @param quantity {Number} The quantity of the products represented by this item.
   */
  var exports = function(quantity) {
    var _this = this;

























    _this['quantity'] = quantity;






  };

  /**
   * Constructs a <code>ProductItem</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ProductItem} obj Optional instance to populate.
   * @return {module:model/ProductItem} The populated <code>ProductItem</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('adjusted_tax')) {
        obj['adjusted_tax'] = ApiClient.convertToType(data['adjusted_tax'], 'Number');
      }
      if (data.hasOwnProperty('base_price')) {
        obj['base_price'] = ApiClient.convertToType(data['base_price'], 'Number');
      }
      if (data.hasOwnProperty('bonus_discount_line_item_id')) {
        obj['bonus_discount_line_item_id'] = ApiClient.convertToType(data['bonus_discount_line_item_id'], 'String');
      }
      if (data.hasOwnProperty('bonus_product_line_item')) {
        obj['bonus_product_line_item'] = ApiClient.convertToType(data['bonus_product_line_item'], 'Boolean');
      }
      if (data.hasOwnProperty('bundled_product_items')) {
        obj['bundled_product_items'] = ApiClient.convertToType(data['bundled_product_items'], [ProductItem]);
      }
      if (data.hasOwnProperty('c_eaEmployeeId')) {
        obj['c_eaEmployeeId'] = ApiClient.convertToType(data['c_eaEmployeeId'], 'String');
      }
      if (data.hasOwnProperty('c_eaManagerEmployeeId')) {
        obj['c_eaManagerEmployeeId'] = ApiClient.convertToType(data['c_eaManagerEmployeeId'], 'String');
      }
      if (data.hasOwnProperty('c_eaOverrideReasonCode')) {
        obj['c_eaOverrideReasonCode'] = ApiClient.convertToType(data['c_eaOverrideReasonCode'], 'String');
      }
      if (data.hasOwnProperty('c_eaPriceOverrideType')) {
        obj['c_eaPriceOverrideType'] = ApiClient.convertToType(data['c_eaPriceOverrideType'], 'String');
      }
      if (data.hasOwnProperty('c_eaPriceOverrideValue')) {
        obj['c_eaPriceOverrideValue'] = ApiClient.convertToType(data['c_eaPriceOverrideValue'], 'String');
      }
      if (data.hasOwnProperty('c_fromStoreId')) {
        obj['c_fromStoreId'] = ApiClient.convertToType(data['c_fromStoreId'], 'String');
      }
      if (data.hasOwnProperty('c_mpProperties')) {
        obj['c_mpProperties'] = ApiClient.convertToType(data['c_mpProperties'], 'String');
      }
      if (data.hasOwnProperty('c_sampleAttribute')) {
        obj['c_sampleAttribute'] = ApiClient.convertToType(data['c_sampleAttribute'], 'String');
      }
      if (data.hasOwnProperty('inventory_id')) {
        obj['inventory_id'] = ApiClient.convertToType(data['inventory_id'], 'String');
      }
      if (data.hasOwnProperty('item_id')) {
        obj['item_id'] = ApiClient.convertToType(data['item_id'], 'String');
      }
      if (data.hasOwnProperty('item_text')) {
        obj['item_text'] = ApiClient.convertToType(data['item_text'], 'String');
      }
      if (data.hasOwnProperty('option_items')) {
        obj['option_items'] = ApiClient.convertToType(data['option_items'], [OptionItem]);
      }
      if (data.hasOwnProperty('price')) {
        obj['price'] = ApiClient.convertToType(data['price'], 'Number');
      }
      if (data.hasOwnProperty('price_adjustments')) {
        obj['price_adjustments'] = ApiClient.convertToType(data['price_adjustments'], [PriceAdjustment]);
      }
      if (data.hasOwnProperty('price_after_item_discount')) {
        obj['price_after_item_discount'] = ApiClient.convertToType(data['price_after_item_discount'], 'Number');
      }
      if (data.hasOwnProperty('price_after_order_discount')) {
        obj['price_after_order_discount'] = ApiClient.convertToType(data['price_after_order_discount'], 'Number');
      }
      if (data.hasOwnProperty('product_id')) {
        obj['product_id'] = ApiClient.convertToType(data['product_id'], 'String');
      }
      if (data.hasOwnProperty('product_list_item')) {
        obj['product_list_item'] = ProductListItemReference.constructFromObject(data['product_list_item']);
      }
      if (data.hasOwnProperty('product_name')) {
        obj['product_name'] = ApiClient.convertToType(data['product_name'], 'String');
      }
      if (data.hasOwnProperty('quantity')) {
        obj['quantity'] = ApiClient.convertToType(data['quantity'], 'Number');
      }
      if (data.hasOwnProperty('shipment_id')) {
        obj['shipment_id'] = ApiClient.convertToType(data['shipment_id'], 'String');
      }
      if (data.hasOwnProperty('shipping_item_id')) {
        obj['shipping_item_id'] = ApiClient.convertToType(data['shipping_item_id'], 'String');
      }
      if (data.hasOwnProperty('tax')) {
        obj['tax'] = ApiClient.convertToType(data['tax'], 'Number');
      }
      if (data.hasOwnProperty('tax_basis')) {
        obj['tax_basis'] = ApiClient.convertToType(data['tax_basis'], 'Number');
      }
      if (data.hasOwnProperty('tax_class_id')) {
        obj['tax_class_id'] = ApiClient.convertToType(data['tax_class_id'], 'String');
      }
      if (data.hasOwnProperty('tax_rate')) {
        obj['tax_rate'] = ApiClient.convertToType(data['tax_rate'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The tax of the product item after adjustments applying.
   * @member {Number} adjusted_tax
   */
  exports.prototype['adjusted_tax'] = undefined;
  /**
   * The base price for the line item, which is the  price of the unit before applying adjustments, in the purchase  currency. The base price may be net or gross of tax depending  on the configured taxation policy.
   * @member {Number} base_price
   */
  exports.prototype['base_price'] = undefined;
  /**
   * The id of the bonus discount line item this bonus product relates to.
   * @member {String} bonus_discount_line_item_id
   */
  exports.prototype['bonus_discount_line_item_id'] = undefined;
  /**
   * A flag indicating whether the product item is a bonus.
   * @member {Boolean} bonus_product_line_item
   */
  exports.prototype['bonus_product_line_item'] = undefined;
  /**
   * The array of bundled product items. Can be empty.
   * @member {Array.<module:model/ProductItem>} bundled_product_items
   */
  exports.prototype['bundled_product_items'] = undefined;
  /**
   * Store Associate's (Agent) Employee Id
   * @member {String} c_eaEmployeeId
   */
  exports.prototype['c_eaEmployeeId'] = undefined;
  /**
   * Store Manager's Employee Id
   * @member {String} c_eaManagerEmployeeId
   */
  exports.prototype['c_eaManagerEmployeeId'] = undefined;
  /**
   * Reason code for price override
   * @member {String} c_eaOverrideReasonCode
   */
  exports.prototype['c_eaOverrideReasonCode'] = undefined;
  /**
   * \"Amount\", \"Percent\", \"FixedPrice\"
   * @member {String} c_eaPriceOverrideType
   */
  exports.prototype['c_eaPriceOverrideType'] = undefined;
  /**
   * @member {String} c_eaPriceOverrideValue
   */
  exports.prototype['c_eaPriceOverrideValue'] = undefined;
  /**
   * Links the store to the product line item for grouping shipments in the checkout process.
   * @member {String} c_fromStoreId
   */
  exports.prototype['c_fromStoreId'] = undefined;
  /**
   * @member {String} c_mpProperties
   */
  exports.prototype['c_mpProperties'] = undefined;
  /**
   * This is where you can implement things.
   * @member {module:model/ProductItem.CSampleAttributeEnum} c_sampleAttribute
   */
  exports.prototype['c_sampleAttribute'] = undefined;
  /**
   * The inventory list id associated with this item.
   * @member {String} inventory_id
   */
  exports.prototype['inventory_id'] = undefined;
  /**
   * The item identifier. Use this to identify an item when updating the item quantity or creating a custom price  adjustment for an item.
   * @member {String} item_id
   */
  exports.prototype['item_id'] = undefined;
  /**
   * The text describing the item in more detail.
   * @member {String} item_text
   */
  exports.prototype['item_text'] = undefined;
  /**
   * The array of option items. This array can be empty.
   * @member {Array.<module:model/OptionItem>} option_items
   */
  exports.prototype['option_items'] = undefined;
  /**
   * The price of the line item before applying any adjustments. If the line item is based on net pricing  then the net price is returned. If the line item is based on gross  pricing then the gross price is returned.
   * @member {Number} price
   */
  exports.prototype['price'] = undefined;
  /**
   * Array of price adjustments. Can be empty.
   * @member {Array.<module:model/PriceAdjustment>} price_adjustments
   */
  exports.prototype['price_adjustments'] = undefined;
  /**
   * The price of the product line item after applying all product-level  adjustments. For net pricing the adjusted net price is returned. For gross pricing, the adjusted  gross price is returned.
   * @member {Number} price_after_item_discount
   */
  exports.prototype['price_after_item_discount'] = undefined;
  /**
   * The price of this product line item after considering all  dependent price adjustments and prorating all order-level  price adjustments. For net pricing the net price is returned. For gross  pricing, the gross price is returned.
   * @member {Number} price_after_order_discount
   */
  exports.prototype['price_after_order_discount'] = undefined;
  /**
   * 
   * @member {String} product_id
   */
  exports.prototype['product_id'] = undefined;
  /**
   * 
   * @member {module:model/ProductListItemReference} product_list_item
   */
  exports.prototype['product_list_item'] = undefined;
  /**
   * The name of the product.
   * @member {String} product_name
   */
  exports.prototype['product_name'] = undefined;
  /**
   * The quantity of the products represented by this item.
   * @member {Number} quantity
   */
  exports.prototype['quantity'] = undefined;
  /**
   * The id of the shipment which includes the product item.
   * @member {String} shipment_id
   */
  exports.prototype['shipment_id'] = undefined;
  /**
   * The reference to the related shipping item if it exists. This is the case if for example when a surcharge is  defined for individual products using a particular a shipping method.
   * @member {String} shipping_item_id
   */
  exports.prototype['shipping_item_id'] = undefined;
  /**
   * The tax of the product item before adjustments applying.
   * @member {Number} tax
   */
  exports.prototype['tax'] = undefined;
  /**
   * The price used to calculate the tax for this product item.
   * @member {Number} tax_basis
   */
  exports.prototype['tax_basis'] = undefined;
  /**
   * The tax class ID for the product item or null  if no tax class ID is associated with the product item.
   * @member {String} tax_class_id
   */
  exports.prototype['tax_class_id'] = undefined;
  /**
   * The tax rate, which is the decimal tax rate to be applied  to the product represented by this item.
   * @member {Number} tax_rate
   */
  exports.prototype['tax_rate'] = undefined;


  /**
   * Allowed values for the <code>c_sampleAttribute</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CSampleAttributeEnum = {
    /**
     * value: "thing1"
     * @const
     */
    "thing1": "thing1",
    /**
     * value: "thing2"
     * @const
     */
    "thing2": "thing2"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ProductLink = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ProductLink model module.
   * @module model/ProductLink
   * @version 17.3
   */

  /**
   * Constructs a new <code>ProductLink</code>.
   * Document representing a link between two products. It contains the id of the source and target products, the type of  product link, and URLs to retrieve product data.
   * @alias module:model/ProductLink
   * @class
   */
  var exports = function() {
    var _this = this;






  };

  /**
   * Constructs a <code>ProductLink</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ProductLink} obj Optional instance to populate.
   * @return {module:model/ProductLink} The populated <code>ProductLink</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('source_product_id')) {
        obj['source_product_id'] = ApiClient.convertToType(data['source_product_id'], 'String');
      }
      if (data.hasOwnProperty('source_product_link')) {
        obj['source_product_link'] = ApiClient.convertToType(data['source_product_link'], 'String');
      }
      if (data.hasOwnProperty('target_product_id')) {
        obj['target_product_id'] = ApiClient.convertToType(data['target_product_id'], 'String');
      }
      if (data.hasOwnProperty('target_product_link')) {
        obj['target_product_link'] = ApiClient.convertToType(data['target_product_link'], 'String');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
    }
    return obj;
  }

  /**
   * The semantic id of the product from which this product link is coming.
   * @member {String} source_product_id
   */
  exports.prototype['source_product_id'] = undefined;
  /**
   * The URL addressing the product from which this product link is coming.
   * @member {String} source_product_link
   */
  exports.prototype['source_product_link'] = undefined;
  /**
   * The semantic id of the product to which this product link is pointing.
   * @member {String} target_product_id
   */
  exports.prototype['target_product_id'] = undefined;
  /**
   * The URL addressing the product to which this product link is pointing.
   * @member {String} target_product_link
   */
  exports.prototype['target_product_link'] = undefined;
  /**
   * The type of this product link.
   * @member {module:model/ProductLink.TypeEnum} type
   */
  exports.prototype['type'] = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "cross_sell"
     * @const
     */
    "cross_sell": "cross_sell",
    /**
     * value: "replacement"
     * @const
     */
    "replacement": "replacement",
    /**
     * value: "up_sell"
     * @const
     */
    "up_sell": "up_sell",
    /**
     * value: "accessory"
     * @const
     */
    "accessory": "accessory",
    /**
     * value: "newer_version"
     * @const
     */
    "newer_version": "newer_version",
    /**
     * value: "alt_orderunit"
     * @const
     */
    "alt_orderunit": "alt_orderunit",
    /**
     * value: "spare_part"
     * @const
     */
    "spare_part": "spare_part",
    /**
     * value: "other"
     * @const
     */
    "other": "other"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ProductListEvent = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ProductListEvent model module.
   * @module model/ProductListEvent
   * @version 17.3
   */

  /**
   * Constructs a new <code>ProductListEvent</code>.
   * Document representing a product list event.
   * @alias module:model/ProductListEvent
   * @class
   */
  var exports = function() {
    var _this = this;






  };

  /**
   * Constructs a <code>ProductListEvent</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ProductListEvent} obj Optional instance to populate.
   * @return {module:model/ProductListEvent} The populated <code>ProductListEvent</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('city')) {
        obj['city'] = ApiClient.convertToType(data['city'], 'String');
      }
      if (data.hasOwnProperty('country')) {
        obj['country'] = ApiClient.convertToType(data['country'], 'String');
      }
      if (data.hasOwnProperty('date')) {
        obj['date'] = ApiClient.convertToType(data['date'], 'Date');
      }
      if (data.hasOwnProperty('state')) {
        obj['state'] = ApiClient.convertToType(data['state'], 'String');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
    }
    return obj;
  }

  /**
   * The city where the event takes place.
   * @member {String} city
   */
  exports.prototype['city'] = undefined;
  /**
   * The country where the event takes place.
   * @member {String} country
   */
  exports.prototype['country'] = undefined;
  /**
   * The date when the event takes place.
   * @member {Date} date
   */
  exports.prototype['date'] = undefined;
  /**
   * The federal state where the event takes place.
   * @member {String} state
   */
  exports.prototype['state'] = undefined;
  /**
   * Type of the event to celebrate.
   * @member {String} type
   */
  exports.prototype['type'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ProductDetailsLink', 'model/ProductListLink'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ProductDetailsLink'), require('./ProductListLink'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ProductListItemReference = factory(root.ShopApi.ApiClient, root.ShopApi.ProductDetailsLink, root.ShopApi.ProductListLink);
  }
}(this, function(ApiClient, ProductDetailsLink, ProductListLink) {
  'use strict';




  /**
   * The ProductListItemReference model module.
   * @module model/ProductListItemReference
   * @version 17.3
   */

  /**
   * Constructs a new <code>ProductListItemReference</code>.
   * @alias module:model/ProductListItemReference
   * @class
   * @param id {String} The id of the product list item.
   */
  var exports = function(id) {
    var _this = this;

    _this['id'] = id;







  };

  /**
   * Constructs a <code>ProductListItemReference</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ProductListItemReference} obj Optional instance to populate.
   * @return {module:model/ProductListItemReference} The populated <code>ProductListItemReference</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('priority')) {
        obj['priority'] = ApiClient.convertToType(data['priority'], 'Number');
      }
      if (data.hasOwnProperty('product_details_link')) {
        obj['product_details_link'] = ProductDetailsLink.constructFromObject(data['product_details_link']);
      }
      if (data.hasOwnProperty('product_list')) {
        obj['product_list'] = ProductListLink.constructFromObject(data['product_list']);
      }
      if (data.hasOwnProperty('public')) {
        obj['public'] = ApiClient.convertToType(data['public'], 'Boolean');
      }
      if (data.hasOwnProperty('purchased_quantity')) {
        obj['purchased_quantity'] = ApiClient.convertToType(data['purchased_quantity'], 'Number');
      }
      if (data.hasOwnProperty('quantity')) {
        obj['quantity'] = ApiClient.convertToType(data['quantity'], 'Number');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
    }
    return obj;
  }

  /**
   * The id of the product list item.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * @member {Number} priority
   */
  exports.prototype['priority'] = undefined;
  /**
   * @member {module:model/ProductDetailsLink} product_details_link
   */
  exports.prototype['product_details_link'] = undefined;
  /**
   * The link of the product list, the item is assigned
   * @member {module:model/ProductListLink} product_list
   */
  exports.prototype['product_list'] = undefined;
  /**
   * @member {Boolean} public
   */
  exports.prototype['public'] = undefined;
  /**
   * @member {Number} purchased_quantity
   */
  exports.prototype['purchased_quantity'] = undefined;
  /**
   * @member {Number} quantity
   */
  exports.prototype['quantity'] = undefined;
  /**
   * @member {module:model/ProductListItemReference.TypeEnum} type
   */
  exports.prototype['type'] = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "product"
     * @const
     */
    "product": "product",
    /**
     * value: "gift_certificate"
     * @const
     */
    "gift_certificate": "gift_certificate"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ProductListLink = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ProductListLink model module.
   * @module model/ProductListLink
   * @version 17.3
   */

  /**
   * Constructs a new <code>ProductListLink</code>.
   * Document representing a link to a product list.
   * @alias module:model/ProductListLink
   * @class
   */
  var exports = function() {
    var _this = this;







  };

  /**
   * Constructs a <code>ProductListLink</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ProductListLink} obj Optional instance to populate.
   * @return {module:model/ProductListLink} The populated <code>ProductListLink</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('link')) {
        obj['link'] = ApiClient.convertToType(data['link'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('public')) {
        obj['public'] = ApiClient.convertToType(data['public'], 'Boolean');
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
    }
    return obj;
  }

  /**
   * The description of this product list.
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * The target of the link.
   * @member {String} link
   */
  exports.prototype['link'] = undefined;
  /**
   * The name of this product list.
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * A flag indicating whether the owner made this product list available for access  by other customers.
   * @member {Boolean} public
   */
  exports.prototype['public'] = undefined;
  /**
   * The link title.
   * @member {String} title
   */
  exports.prototype['title'] = undefined;
  /**
   * The type of the product list.
   * @member {module:model/ProductListLink.TypeEnum} type
   */
  exports.prototype['type'] = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "wish_list"
     * @const
     */
    "wish_list": "wish_list",
    /**
     * value: "gift_registry"
     * @const
     */
    "gift_registry": "gift_registry",
    /**
     * value: "shopping_list"
     * @const
     */
    "shopping_list": "shopping_list",
    /**
     * value: "custom_1"
     * @const
     */
    "custom_1": "custom_1",
    /**
     * value: "custom_2"
     * @const
     */
    "custom_2": "custom_2",
    /**
     * value: "custom_3"
     * @const
     */
    "custom_3": "custom_3"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ProductListRegistrant = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ProductListRegistrant model module.
   * @module model/ProductListRegistrant
   * @version 17.3
   */

  /**
   * Constructs a new <code>ProductListRegistrant</code>.
   *   A ProductListRegistrant is typically associated with an event related product list such as a gift registry. It holds  information about a person associated with the event such as a bride or groom.  
   * @alias module:model/ProductListRegistrant
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>ProductListRegistrant</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ProductListRegistrant} obj Optional instance to populate.
   * @return {module:model/ProductListRegistrant} The populated <code>ProductListRegistrant</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('first_name')) {
        obj['first_name'] = ApiClient.convertToType(data['first_name'], 'String');
      }
      if (data.hasOwnProperty('last_name')) {
        obj['last_name'] = ApiClient.convertToType(data['last_name'], 'String');
      }
      if (data.hasOwnProperty('role')) {
        obj['role'] = ApiClient.convertToType(data['role'], 'String');
      }
    }
    return obj;
  }

  /**
   * The first name of the registrant.
   * @member {String} first_name
   */
  exports.prototype['first_name'] = undefined;
  /**
   * The last name of the registrant.
   * @member {String} last_name
   */
  exports.prototype['last_name'] = undefined;
  /**
   * The role of the registrant.
   * @member {String} role
   */
  exports.prototype['role'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ProductListShippingAddress = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ProductListShippingAddress model module.
   * @module model/ProductListShippingAddress
   * @version 17.3
   */

  /**
   * Constructs a new <code>ProductListShippingAddress</code>.
   * Document representing a product list shipping address.
   * @alias module:model/ProductListShippingAddress
   * @class
   * @param addressId {String} The id of this address.
   */
  var exports = function(addressId) {
    var _this = this;

    _this['address_id'] = addressId;



  };

  /**
   * Constructs a <code>ProductListShippingAddress</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ProductListShippingAddress} obj Optional instance to populate.
   * @return {module:model/ProductListShippingAddress} The populated <code>ProductListShippingAddress</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('address_id')) {
        obj['address_id'] = ApiClient.convertToType(data['address_id'], 'String');
      }
      if (data.hasOwnProperty('city')) {
        obj['city'] = ApiClient.convertToType(data['city'], 'String');
      }
      if (data.hasOwnProperty('first_name')) {
        obj['first_name'] = ApiClient.convertToType(data['first_name'], 'String');
      }
      if (data.hasOwnProperty('last_name')) {
        obj['last_name'] = ApiClient.convertToType(data['last_name'], 'String');
      }
    }
    return obj;
  }

  /**
   * The id of this address.
   * @member {String} address_id
   */
  exports.prototype['address_id'] = undefined;
  /**
   * The city of this address.
   * @member {String} city
   */
  exports.prototype['city'] = undefined;
  /**
   * The first name of this address.
   * @member {String} first_name
   */
  exports.prototype['first_name'] = undefined;
  /**
   * The last name of this address.
   * @member {String} last_name
   */
  exports.prototype['last_name'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ProductPromotion = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ProductPromotion model module.
   * @module model/ProductPromotion
   * @version 17.3
   */

  /**
   * Constructs a new <code>ProductPromotion</code>.
   * Document representing a product promotion.
   * @alias module:model/ProductPromotion
   * @class
   */
  var exports = function() {
    var _this = this;





  };

  /**
   * Constructs a <code>ProductPromotion</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ProductPromotion} obj Optional instance to populate.
   * @return {module:model/ProductPromotion} The populated <code>ProductPromotion</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('callout_msg')) {
        obj['callout_msg'] = ApiClient.convertToType(data['callout_msg'], 'String');
      }
      if (data.hasOwnProperty('link')) {
        obj['link'] = ApiClient.convertToType(data['link'], 'String');
      }
      if (data.hasOwnProperty('promotion_id')) {
        obj['promotion_id'] = ApiClient.convertToType(data['promotion_id'], 'String');
      }
      if (data.hasOwnProperty('promotional_price')) {
        obj['promotional_price'] = ApiClient.convertToType(data['promotional_price'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The localized call-out message of the promotion.
   * @member {String} callout_msg
   */
  exports.prototype['callout_msg'] = undefined;
  /**
   * The URL addressing the promotion.
   * @member {String} link
   */
  exports.prototype['link'] = undefined;
  /**
   * The unique id of the promotion.
   * @member {String} promotion_id
   */
  exports.prototype['promotion_id'] = undefined;
  /**
   * The promotional price for this product.
   * @member {Number} promotional_price
   */
  exports.prototype['promotional_price'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Product'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Product'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ProductResult = factory(root.ShopApi.ApiClient, root.ShopApi.Product);
  }
}(this, function(ApiClient, Product) {
  'use strict';




  /**
   * The ProductResult model module.
   * @module model/ProductResult
   * @version 17.3
   */

  /**
   * Constructs a new <code>ProductResult</code>.
   * Result document containing an array of products.
   * @alias module:model/ProductResult
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>ProductResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ProductResult} obj Optional instance to populate.
   * @return {module:model/ProductResult} The populated <code>ProductResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('count')) {
        obj['count'] = ApiClient.convertToType(data['count'], 'Number');
      }
      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], [Product]);
      }
      if (data.hasOwnProperty('total')) {
        obj['total'] = ApiClient.convertToType(data['total'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The number of returned documents.
   * @member {Number} count
   */
  exports.prototype['count'] = undefined;
  /**
   * The array of product documents.
   * @member {Array.<module:model/Product>} data
   */
  exports.prototype['data'] = undefined;
  /**
   * The total number of documents.
   * @member {Number} total
   */
  exports.prototype['total'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Image', 'model/ProductType', 'model/VariationAttribute'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Image'), require('./ProductType'), require('./VariationAttribute'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ProductSearchHit = factory(root.ShopApi.ApiClient, root.ShopApi.Image, root.ShopApi.ProductType, root.ShopApi.VariationAttribute);
  }
}(this, function(ApiClient, Image, ProductType, VariationAttribute) {
  'use strict';




  /**
   * The ProductSearchHit model module.
   * @module model/ProductSearchHit
   * @version 17.3
   */

  /**
   * Constructs a new <code>ProductSearchHit</code>.
   * Document representing a product search hit.
   * @alias module:model/ProductSearchHit
   * @class
   */
  var exports = function() {
    var _this = this;












  };

  /**
   * Constructs a <code>ProductSearchHit</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ProductSearchHit} obj Optional instance to populate.
   * @return {module:model/ProductSearchHit} The populated <code>ProductSearchHit</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('currency')) {
        obj['currency'] = ApiClient.convertToType(data['currency'], 'String');
      }
      if (data.hasOwnProperty('image')) {
        obj['image'] = Image.constructFromObject(data['image']);
      }
      if (data.hasOwnProperty('link')) {
        obj['link'] = ApiClient.convertToType(data['link'], 'String');
      }
      if (data.hasOwnProperty('orderable')) {
        obj['orderable'] = ApiClient.convertToType(data['orderable'], 'Boolean');
      }
      if (data.hasOwnProperty('price')) {
        obj['price'] = ApiClient.convertToType(data['price'], 'Number');
      }
      if (data.hasOwnProperty('price_max')) {
        obj['price_max'] = ApiClient.convertToType(data['price_max'], 'Number');
      }
      if (data.hasOwnProperty('prices')) {
        obj['prices'] = ApiClient.convertToType(data['prices'], {'String': 'Number'});
      }
      if (data.hasOwnProperty('product_id')) {
        obj['product_id'] = ApiClient.convertToType(data['product_id'], 'String');
      }
      if (data.hasOwnProperty('product_name')) {
        obj['product_name'] = ApiClient.convertToType(data['product_name'], 'String');
      }
      if (data.hasOwnProperty('product_type')) {
        obj['product_type'] = ProductType.constructFromObject(data['product_type']);
      }
      if (data.hasOwnProperty('variation_attributes')) {
        obj['variation_attributes'] = ApiClient.convertToType(data['variation_attributes'], [VariationAttribute]);
      }
    }
    return obj;
  }

  /**
   * The ISO 4217 mnemonic code of the currency.
   * @member {String} currency
   */
  exports.prototype['currency'] = undefined;
  /**
   * The first image of the product hit for the configured viewtype.
   * @member {module:model/Image} image
   */
  exports.prototype['image'] = undefined;
  /**
   * The URL addressing the product.
   * @member {String} link
   */
  exports.prototype['link'] = undefined;
  /**
   * A flag indicating whether the product is orderable.
   * @member {Boolean} orderable
   */
  exports.prototype['orderable'] = undefined;
  /**
   * The sales price of the product. In case of complex products like master or set this is the minimum price of  related child products.
   * @member {Number} price
   */
  exports.prototype['price'] = undefined;
  /**
   * The maximum sales of related child products in case of complex products like master or set.
   * @member {Number} price_max
   */
  exports.prototype['price_max'] = undefined;
  /**
   * The prices map with price book ids and their values.
   * @member {Object.<String, Number>} prices
   */
  exports.prototype['prices'] = undefined;
  /**
   * The id (SKU) of the product.
   * @member {String} product_id
   */
  exports.prototype['product_id'] = undefined;
  /**
   * The localized name of the product.
   * @member {String} product_name
   */
  exports.prototype['product_name'] = undefined;
  /**
   * The type information for the product.
   * @member {module:model/ProductType} product_type
   */
  exports.prototype['product_type'] = undefined;
  /**
   * The array of represented variation attributes (for the master product only). This array can be empty.
   * @member {Array.<module:model/VariationAttribute>} variation_attributes
   */
  exports.prototype['variation_attributes'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ProductSearchRefinementValue'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ProductSearchRefinementValue'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ProductSearchRefinement = factory(root.ShopApi.ApiClient, root.ShopApi.ProductSearchRefinementValue);
  }
}(this, function(ApiClient, ProductSearchRefinementValue) {
  'use strict';




  /**
   * The ProductSearchRefinement model module.
   * @module model/ProductSearchRefinement
   * @version 17.3
   */

  /**
   * Constructs a new <code>ProductSearchRefinement</code>.
   * Document representing a product search refinement attribute.
   * @alias module:model/ProductSearchRefinement
   * @class
   * @param attributeId {String} The id of the search refinement attribute. In the case of an attribute refinement, this is the attribute id.  Custom attributes are marked by the prefix \"c_\" (for example, \"c_refinementColor\"). In the case of a  category refinement, the id must be \"cgid\". In the case of a price refinement, the id must be \"price\".
   */
  var exports = function(attributeId) {
    var _this = this;

    _this['attribute_id'] = attributeId;


  };

  /**
   * Constructs a <code>ProductSearchRefinement</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ProductSearchRefinement} obj Optional instance to populate.
   * @return {module:model/ProductSearchRefinement} The populated <code>ProductSearchRefinement</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('attribute_id')) {
        obj['attribute_id'] = ApiClient.convertToType(data['attribute_id'], 'String');
      }
      if (data.hasOwnProperty('label')) {
        obj['label'] = ApiClient.convertToType(data['label'], 'String');
      }
      if (data.hasOwnProperty('values')) {
        obj['values'] = ApiClient.convertToType(data['values'], [ProductSearchRefinementValue]);
      }
    }
    return obj;
  }

  /**
   * The id of the search refinement attribute. In the case of an attribute refinement, this is the attribute id.  Custom attributes are marked by the prefix \"c_\" (for example, \"c_refinementColor\"). In the case of a  category refinement, the id must be \"cgid\". In the case of a price refinement, the id must be \"price\".
   * @member {String} attribute_id
   */
  exports.prototype['attribute_id'] = undefined;
  /**
   * The localized label of the refinement.
   * @member {String} label
   */
  exports.prototype['label'] = undefined;
  /**
   * The sorted array of refinement values. This array can be empty.
   * @member {Array.<module:model/ProductSearchRefinementValue>} values
   */
  exports.prototype['values'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ProductSearchRefinementValue'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ProductSearchRefinementValue'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ProductSearchRefinementValue = factory(root.ShopApi.ApiClient, root.ShopApi.ProductSearchRefinementValue);
  }
}(this, function(ApiClient, ProductSearchRefinementValue) {
  'use strict';




  /**
   * The ProductSearchRefinementValue model module.
   * @module model/ProductSearchRefinementValue
   * @version 17.3
   */

  /**
   * Constructs a new <code>ProductSearchRefinementValue</code>.
   * Document representing a product search refinement value.
   * @alias module:model/ProductSearchRefinementValue
   * @class
   */
  var exports = function() {
    var _this = this;







  };

  /**
   * Constructs a <code>ProductSearchRefinementValue</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ProductSearchRefinementValue} obj Optional instance to populate.
   * @return {module:model/ProductSearchRefinementValue} The populated <code>ProductSearchRefinementValue</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('hit_count')) {
        obj['hit_count'] = ApiClient.convertToType(data['hit_count'], 'Number');
      }
      if (data.hasOwnProperty('label')) {
        obj['label'] = ApiClient.convertToType(data['label'], 'String');
      }
      if (data.hasOwnProperty('presentation_id')) {
        obj['presentation_id'] = ApiClient.convertToType(data['presentation_id'], 'String');
      }
      if (data.hasOwnProperty('value')) {
        obj['value'] = ApiClient.convertToType(data['value'], 'String');
      }
      if (data.hasOwnProperty('values')) {
        obj['values'] = ApiClient.convertToType(data['values'], [ProductSearchRefinementValue]);
      }
    }
    return obj;
  }

  /**
   * The localized description of the refinement value.
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * The number of search hits when selecting the refinement value. Can be 0.
   * @member {Number} hit_count
   */
  exports.prototype['hit_count'] = undefined;
  /**
   * The localized label of the refinement value.
   * @member {String} label
   */
  exports.prototype['label'] = undefined;
  /**
   * The optional presentation id associated with the refinement value.  The presentation id can be used, for example, to associate an id with  an HTML widget.
   * @member {String} presentation_id
   */
  exports.prototype['presentation_id'] = undefined;
  /**
   * The refinement value. In the case of an attribute refinement, this is the bucket,  the attribute value, or a value range. In the case of a category refinement, this is the  category id. In the case of a price refinement,k this is the price range. Ranges are  enclosed by parentheses and separated by \"..\"; for example, \"(100..999)\" and \"(Aa..Fa)\"  are valid ranges.
   * @member {String} value
   */
  exports.prototype['value'] = undefined;
  /**
   * The array of hierarchical refinement values. This array can be empty.
   * @member {Array.<module:model/ProductSearchRefinementValue>} values
   */
  exports.prototype['values'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ProductSearchHit', 'model/ProductSearchRefinement', 'model/ProductSearchSortingOption', 'model/Suggestion'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ProductSearchHit'), require('./ProductSearchRefinement'), require('./ProductSearchSortingOption'), require('./Suggestion'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ProductSearchResult = factory(root.ShopApi.ApiClient, root.ShopApi.ProductSearchHit, root.ShopApi.ProductSearchRefinement, root.ShopApi.ProductSearchSortingOption, root.ShopApi.Suggestion);
  }
}(this, function(ApiClient, ProductSearchHit, ProductSearchRefinement, ProductSearchSortingOption, Suggestion) {
  'use strict';




  /**
   * The ProductSearchResult model module.
   * @module model/ProductSearchResult
   * @version 17.3
   */

  /**
   * Constructs a new <code>ProductSearchResult</code>.
   * Document representing a product search result.
   * @alias module:model/ProductSearchResult
   * @class
   */
  var exports = function() {
    var _this = this;















  };

  /**
   * Constructs a <code>ProductSearchResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ProductSearchResult} obj Optional instance to populate.
   * @return {module:model/ProductSearchResult} The populated <code>ProductSearchResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('count')) {
        obj['count'] = ApiClient.convertToType(data['count'], 'Number');
      }
      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], [Object]);
      }
      if (data.hasOwnProperty('fetch_date')) {
        obj['fetch_date'] = ApiClient.convertToType(data['fetch_date'], 'Number');
      }
      if (data.hasOwnProperty('hits')) {
        obj['hits'] = ApiClient.convertToType(data['hits'], [ProductSearchHit]);
      }
      if (data.hasOwnProperty('next')) {
        obj['next'] = ApiClient.convertToType(data['next'], 'String');
      }
      if (data.hasOwnProperty('previous')) {
        obj['previous'] = ApiClient.convertToType(data['previous'], 'String');
      }
      if (data.hasOwnProperty('query')) {
        obj['query'] = ApiClient.convertToType(data['query'], 'String');
      }
      if (data.hasOwnProperty('refinements')) {
        obj['refinements'] = ApiClient.convertToType(data['refinements'], [ProductSearchRefinement]);
      }
      if (data.hasOwnProperty('search_phrase_suggestions')) {
        obj['search_phrase_suggestions'] = Suggestion.constructFromObject(data['search_phrase_suggestions']);
      }
      if (data.hasOwnProperty('selected_refinements')) {
        obj['selected_refinements'] = ApiClient.convertToType(data['selected_refinements'], {'String': 'String'});
      }
      if (data.hasOwnProperty('selected_sorting_option')) {
        obj['selected_sorting_option'] = ApiClient.convertToType(data['selected_sorting_option'], 'String');
      }
      if (data.hasOwnProperty('sorting_options')) {
        obj['sorting_options'] = ApiClient.convertToType(data['sorting_options'], [ProductSearchSortingOption]);
      }
      if (data.hasOwnProperty('start')) {
        obj['start'] = ApiClient.convertToType(data['start'], 'Number');
      }
      if (data.hasOwnProperty('total')) {
        obj['total'] = ApiClient.convertToType(data['total'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The number of returned documents.
   * @member {Number} count
   */
  exports.prototype['count'] = undefined;
  /**
   * @member {Array.<Object>} data
   */
  exports.prototype['data'] = undefined;
  /**
   * @member {Number} fetch_date
   */
  exports.prototype['fetch_date'] = undefined;
  /**
   * The sorted array of search hits. This array can be empty.
   * @member {Array.<module:model/ProductSearchHit>} hits
   */
  exports.prototype['hits'] = undefined;
  /**
   * The URL of the next result page.
   * @member {String} next
   */
  exports.prototype['next'] = undefined;
  /**
   * The URL of the previous result page.
   * @member {String} previous
   */
  exports.prototype['previous'] = undefined;
  /**
   * The query String that was searched for.
   * @member {String} query
   */
  exports.prototype['query'] = undefined;
  /**
   * The sorted array of search refinements. This array can be empty.
   * @member {Array.<module:model/ProductSearchRefinement>} refinements
   */
  exports.prototype['refinements'] = undefined;
  /**
   * The suggestion given by the system for the submitted search phrase.
   * @member {module:model/Suggestion} search_phrase_suggestions
   */
  exports.prototype['search_phrase_suggestions'] = undefined;
  /**
   * A map of selected refinement attribute id/value(s) pairs. The sorting order is the same as in request URL.
   * @member {Object.<String, String>} selected_refinements
   */
  exports.prototype['selected_refinements'] = undefined;
  /**
   * The id of the applied sorting option.
   * @member {String} selected_sorting_option
   */
  exports.prototype['selected_sorting_option'] = undefined;
  /**
   * The sorted array of search sorting options. This array can be empty.
   * @member {Array.<module:model/ProductSearchSortingOption>} sorting_options
   */
  exports.prototype['sorting_options'] = undefined;
  /**
   * The zero-based index of the first search hit to include in the result.
   * @member {Number} start
   */
  exports.prototype['start'] = undefined;
  /**
   * The total number of documents.
   * @member {Number} total
   */
  exports.prototype['total'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ProductSearchSortingOption = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ProductSearchSortingOption model module.
   * @module model/ProductSearchSortingOption
   * @version 17.3
   */

  /**
   * Constructs a new <code>ProductSearchSortingOption</code>.
   * Document representing a product search sorting option.
   * @alias module:model/ProductSearchSortingOption
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>ProductSearchSortingOption</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ProductSearchSortingOption} obj Optional instance to populate.
   * @return {module:model/ProductSearchSortingOption} The populated <code>ProductSearchSortingOption</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('label')) {
        obj['label'] = ApiClient.convertToType(data['label'], 'String');
      }
    }
    return obj;
  }

  /**
   * The id of the sorting option.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The localized label of the sorting option.
   * @member {String} label
   */
  exports.prototype['label'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ProductSimpleLink = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ProductSimpleLink model module.
   * @module model/ProductSimpleLink
   * @version 17.3
   */

  /**
   * Constructs a new <code>ProductSimpleLink</code>.
   * Document representing a link to a product.
   * @alias module:model/ProductSimpleLink
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>ProductSimpleLink</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ProductSimpleLink} obj Optional instance to populate.
   * @return {module:model/ProductSimpleLink} The populated <code>ProductSimpleLink</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('link')) {
        obj['link'] = ApiClient.convertToType(data['link'], 'String');
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
    }
    return obj;
  }

  /**
   * The target of the link.
   * @member {String} link
   */
  exports.prototype['link'] = undefined;
  /**
   * The link title.
   * @member {String} title
   */
  exports.prototype['title'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ProductType = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ProductType model module.
   * @module model/ProductType
   * @version 17.3
   */

  /**
   * Constructs a new <code>ProductType</code>.
   * Document representing a product type.
   * @alias module:model/ProductType
   * @class
   */
  var exports = function() {
    var _this = this;








  };

  /**
   * Constructs a <code>ProductType</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ProductType} obj Optional instance to populate.
   * @return {module:model/ProductType} The populated <code>ProductType</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('bundle')) {
        obj['bundle'] = ApiClient.convertToType(data['bundle'], 'Boolean');
      }
      if (data.hasOwnProperty('item')) {
        obj['item'] = ApiClient.convertToType(data['item'], 'Boolean');
      }
      if (data.hasOwnProperty('master')) {
        obj['master'] = ApiClient.convertToType(data['master'], 'Boolean');
      }
      if (data.hasOwnProperty('option')) {
        obj['option'] = ApiClient.convertToType(data['option'], 'Boolean');
      }
      if (data.hasOwnProperty('set')) {
        obj['set'] = ApiClient.convertToType(data['set'], 'Boolean');
      }
      if (data.hasOwnProperty('variant')) {
        obj['variant'] = ApiClient.convertToType(data['variant'], 'Boolean');
      }
      if (data.hasOwnProperty('variation_group')) {
        obj['variation_group'] = ApiClient.convertToType(data['variation_group'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * A flag indicating whether the product is a bundle.
   * @member {Boolean} bundle
   */
  exports.prototype['bundle'] = undefined;
  /**
   * A flag indicating whether the product is a standard item.
   * @member {Boolean} item
   */
  exports.prototype['item'] = undefined;
  /**
   * A flag indicating whether the product is a master.
   * @member {Boolean} master
   */
  exports.prototype['master'] = undefined;
  /**
   * A flag indicating whether the product is an option.
   * @member {Boolean} option
   */
  exports.prototype['option'] = undefined;
  /**
   * A flag indicating whether the product is a set.
   * @member {Boolean} set
   */
  exports.prototype['set'] = undefined;
  /**
   * A flag indicating whether the product is a variant.
   * @member {Boolean} variant
   */
  exports.prototype['variant'] = undefined;
  /**
   * A flag indicating whether the product is a variation group.
   * @member {Boolean} variation_group
   */
  exports.prototype['variation_group'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.Promotion = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Promotion model module.
   * @module model/Promotion
   * @version 17.3
   */

  /**
   * Constructs a new <code>Promotion</code>.
   * Document representing a promotion.
   * @alias module:model/Promotion
   * @class
   */
  var exports = function() {
    var _this = this;










  };

  /**
   * Constructs a <code>Promotion</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Promotion} obj Optional instance to populate.
   * @return {module:model/Promotion} The populated <code>Promotion</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('callout_msg')) {
        obj['callout_msg'] = ApiClient.convertToType(data['callout_msg'], 'String');
      }
      if (data.hasOwnProperty('currency')) {
        obj['currency'] = ApiClient.convertToType(data['currency'], 'String');
      }
      if (data.hasOwnProperty('details')) {
        obj['details'] = ApiClient.convertToType(data['details'], 'String');
      }
      if (data.hasOwnProperty('discounted_products_link')) {
        obj['discounted_products_link'] = ApiClient.convertToType(data['discounted_products_link'], 'String');
      }
      if (data.hasOwnProperty('end_date')) {
        obj['end_date'] = ApiClient.convertToType(data['end_date'], 'Date');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('image')) {
        obj['image'] = ApiClient.convertToType(data['image'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('start_date')) {
        obj['start_date'] = ApiClient.convertToType(data['start_date'], 'Date');
      }
    }
    return obj;
  }

  /**
   * The localized call-out message of the promotion.
   * @member {String} callout_msg
   */
  exports.prototype['callout_msg'] = undefined;
  /**
   * The currency that a promotion can be applied to. A null value means that the promotion applies to all allowed  currencies.
   * @member {String} currency
   */
  exports.prototype['currency'] = undefined;
  /**
   * The localized detailed description of the promotion.
   * @member {String} details
   */
  exports.prototype['details'] = undefined;
  /**
   * An optional product search link. Product promotions that are marked searchable provide a product search link with the promotion id as  refinement.
   * @member {String} discounted_products_link
   */
  exports.prototype['discounted_products_link'] = undefined;
  /**
   * The end date of the promotion. This property follows the ISO8601 date time format: yyyy-MM-dd'T'HH:mmZ . The time  zone of the date time is always UTC.
   * @member {Date} end_date
   */
  exports.prototype['end_date'] = undefined;
  /**
   * The unique id of the promotion.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The URL to the promotion image.
   * @member {String} image
   */
  exports.prototype['image'] = undefined;
  /**
   * The localized name of the promotion.
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * The start date of the promotion. This property follows the ISO8601 date time format: yyyy-MM-dd'T'HH:mmZ. The  time zone of the date time is always UTC.
   * @member {Date} start_date
   */
  exports.prototype['start_date'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Promotion'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Promotion'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.PromotionResult = factory(root.ShopApi.ApiClient, root.ShopApi.Promotion);
  }
}(this, function(ApiClient, Promotion) {
  'use strict';




  /**
   * The PromotionResult model module.
   * @module model/PromotionResult
   * @version 17.3
   */

  /**
   * Constructs a new <code>PromotionResult</code>.
   * Result document containing an array of promotions.
   * @alias module:model/PromotionResult
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>PromotionResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PromotionResult} obj Optional instance to populate.
   * @return {module:model/PromotionResult} The populated <code>PromotionResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('count')) {
        obj['count'] = ApiClient.convertToType(data['count'], 'Number');
      }
      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], [Promotion]);
      }
      if (data.hasOwnProperty('total')) {
        obj['total'] = ApiClient.convertToType(data['total'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The number of returned documents.
   * @member {Number} count
   */
  exports.prototype['count'] = undefined;
  /**
   * The array of promotion documents.
   * @member {Array.<module:model/Promotion>} data
   */
  exports.prototype['data'] = undefined;
  /**
   * The total number of documents.
   * @member {Number} total
   */
  exports.prototype['total'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ProductListEvent', 'model/ProductListRegistrant', 'model/ProductListShippingAddress', 'model/ProductSimpleLink', 'model/PublicProductListItem'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ProductListEvent'), require('./ProductListRegistrant'), require('./ProductListShippingAddress'), require('./ProductSimpleLink'), require('./PublicProductListItem'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.PublicProductList = factory(root.ShopApi.ApiClient, root.ShopApi.ProductListEvent, root.ShopApi.ProductListRegistrant, root.ShopApi.ProductListShippingAddress, root.ShopApi.ProductSimpleLink, root.ShopApi.PublicProductListItem);
  }
}(this, function(ApiClient, ProductListEvent, ProductListRegistrant, ProductListShippingAddress, ProductSimpleLink, PublicProductListItem) {
  'use strict';




  /**
   * The PublicProductList model module.
   * @module model/PublicProductList
   * @version 17.3
   */

  /**
   * Constructs a new <code>PublicProductList</code>.
   * @alias module:model/PublicProductList
   * @class
   */
  var exports = function() {
    var _this = this;














  };

  /**
   * Constructs a <code>PublicProductList</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PublicProductList} obj Optional instance to populate.
   * @return {module:model/PublicProductList} The populated <code>PublicProductList</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('co_registrant')) {
        obj['co_registrant'] = ProductListRegistrant.constructFromObject(data['co_registrant']);
      }
      if (data.hasOwnProperty('creation_date')) {
        obj['creation_date'] = ApiClient.convertToType(data['creation_date'], 'Date');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('event')) {
        obj['event'] = ProductListEvent.constructFromObject(data['event']);
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('items_link')) {
        obj['items_link'] = ProductSimpleLink.constructFromObject(data['items_link']);
      }
      if (data.hasOwnProperty('last_modified')) {
        obj['last_modified'] = ApiClient.convertToType(data['last_modified'], 'Date');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('product_list_items')) {
        obj['product_list_items'] = ApiClient.convertToType(data['product_list_items'], [PublicProductListItem]);
      }
      if (data.hasOwnProperty('product_list_shipping_address')) {
        obj['product_list_shipping_address'] = ProductListShippingAddress.constructFromObject(data['product_list_shipping_address']);
      }
      if (data.hasOwnProperty('public')) {
        obj['public'] = ApiClient.convertToType(data['public'], 'Boolean');
      }
      if (data.hasOwnProperty('registrant')) {
        obj['registrant'] = ProductListRegistrant.constructFromObject(data['registrant']);
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
    }
    return obj;
  }

  /**
   * The coRegistrant of this product list.
   * @member {module:model/ProductListRegistrant} co_registrant
   */
  exports.prototype['co_registrant'] = undefined;
  /**
   * Returns the value of attribute 'creationDate'.
   * @member {Date} creation_date
   */
  exports.prototype['creation_date'] = undefined;
  /**
   * The description of this product list.
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * The event of this product list.
   * @member {module:model/ProductListEvent} event
   */
  exports.prototype['event'] = undefined;
  /**
   * The id of this product list.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The resource link to the items of this product list.
   * @member {module:model/ProductSimpleLink} items_link
   */
  exports.prototype['items_link'] = undefined;
  /**
   * Returns the value of attribute 'lastModified'.
   * @member {Date} last_modified
   */
  exports.prototype['last_modified'] = undefined;
  /**
   * The name of this product list.
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * The product list items
   * @member {Array.<module:model/PublicProductListItem>} product_list_items
   */
  exports.prototype['product_list_items'] = undefined;
  /**
   * The abbreviated shipping address of this product list representing what anonymous user can see.
   * @member {module:model/ProductListShippingAddress} product_list_shipping_address
   */
  exports.prototype['product_list_shipping_address'] = undefined;
  /**
   * Indicates whether the owner made this product list available for access by other customers.
   * @member {Boolean} public
   */
  exports.prototype['public'] = undefined;
  /**
   * The registrant of this product list.
   * @member {module:model/ProductListRegistrant} registrant
   */
  exports.prototype['registrant'] = undefined;
  /**
   * The type of the product list.
   * @member {module:model/PublicProductList.TypeEnum} type
   */
  exports.prototype['type'] = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "wish_list"
     * @const
     */
    "wish_list": "wish_list",
    /**
     * value: "gift_registry"
     * @const
     */
    "gift_registry": "gift_registry",
    /**
     * value: "shopping_list"
     * @const
     */
    "shopping_list": "shopping_list",
    /**
     * value: "custom_1"
     * @const
     */
    "custom_1": "custom_1",
    /**
     * value: "custom_2"
     * @const
     */
    "custom_2": "custom_2",
    /**
     * value: "custom_3"
     * @const
     */
    "custom_3": "custom_3"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Product', 'model/ProductSimpleLink'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Product'), require('./ProductSimpleLink'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.PublicProductListItem = factory(root.ShopApi.ApiClient, root.ShopApi.Product, root.ShopApi.ProductSimpleLink);
  }
}(this, function(ApiClient, Product, ProductSimpleLink) {
  'use strict';




  /**
   * The PublicProductListItem model module.
   * @module model/PublicProductListItem
   * @version 17.3
   */

  /**
   * Constructs a new <code>PublicProductListItem</code>.
   * Document representing a product list item.
   * @alias module:model/PublicProductListItem
   * @class
   */
  var exports = function() {
    var _this = this;






  };

  /**
   * Constructs a <code>PublicProductListItem</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PublicProductListItem} obj Optional instance to populate.
   * @return {module:model/PublicProductListItem} The populated <code>PublicProductListItem</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('priority')) {
        obj['priority'] = ApiClient.convertToType(data['priority'], 'Number');
      }
      if (data.hasOwnProperty('product')) {
        obj['product'] = Product.constructFromObject(data['product']);
      }
      if (data.hasOwnProperty('product_details_link')) {
        obj['product_details_link'] = ProductSimpleLink.constructFromObject(data['product_details_link']);
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
    }
    return obj;
  }

  /**
   * The id of this product list item.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The priority of the item.
   * @member {Number} priority
   */
  exports.prototype['priority'] = undefined;
  /**
   * The product item
   * @member {module:model/Product} product
   */
  exports.prototype['product'] = undefined;
  /**
   * A link to the product.
   * @member {module:model/ProductSimpleLink} product_details_link
   */
  exports.prototype['product_details_link'] = undefined;
  /**
   * The type of the item.
   * @member {module:model/PublicProductListItem.TypeEnum} type
   */
  exports.prototype['type'] = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "product"
     * @const
     */
    "product": "product",
    /**
     * value: "gift_certificate"
     * @const
     */
    "gift_certificate": "gift_certificate"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/PublicProductListItem'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./PublicProductListItem'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.PublicProductListItemResult = factory(root.ShopApi.ApiClient, root.ShopApi.PublicProductListItem);
  }
}(this, function(ApiClient, PublicProductListItem) {
  'use strict';




  /**
   * The PublicProductListItemResult model module.
   * @module model/PublicProductListItemResult
   * @version 17.3
   */

  /**
   * Constructs a new <code>PublicProductListItemResult</code>.
   * Result document containing an array of product list items.
   * @alias module:model/PublicProductListItemResult
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>PublicProductListItemResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PublicProductListItemResult} obj Optional instance to populate.
   * @return {module:model/PublicProductListItemResult} The populated <code>PublicProductListItemResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('count')) {
        obj['count'] = ApiClient.convertToType(data['count'], 'Number');
      }
      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], [PublicProductListItem]);
      }
      if (data.hasOwnProperty('total')) {
        obj['total'] = ApiClient.convertToType(data['total'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The number of returned documents.
   * @member {Number} count
   */
  exports.prototype['count'] = undefined;
  /**
   * The array of product list item documents.
   * @member {Array.<module:model/PublicProductListItem>} data
   */
  exports.prototype['data'] = undefined;
  /**
   * The total number of documents.
   * @member {Number} total
   */
  exports.prototype['total'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.PublicProductListLink = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The PublicProductListLink model module.
   * @module model/PublicProductListLink
   * @version 17.3
   */

  /**
   * Constructs a new <code>PublicProductListLink</code>.
   * Document representing a link to a public product list.
   * @alias module:model/PublicProductListLink
   * @class
   */
  var exports = function() {
    var _this = this;






  };

  /**
   * Constructs a <code>PublicProductListLink</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PublicProductListLink} obj Optional instance to populate.
   * @return {module:model/PublicProductListLink} The populated <code>PublicProductListLink</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('link')) {
        obj['link'] = ApiClient.convertToType(data['link'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
    }
    return obj;
  }

  /**
   * The description of this product list.
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * The target of the link.
   * @member {String} link
   */
  exports.prototype['link'] = undefined;
  /**
   * The name of this product list.
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * The link title.
   * @member {String} title
   */
  exports.prototype['title'] = undefined;
  /**
   * The type of the product list.
   * @member {module:model/PublicProductListLink.TypeEnum} type
   */
  exports.prototype['type'] = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "wish_list"
     * @const
     */
    "wish_list": "wish_list",
    /**
     * value: "gift_registry"
     * @const
     */
    "gift_registry": "gift_registry",
    /**
     * value: "shopping_list"
     * @const
     */
    "shopping_list": "shopping_list",
    /**
     * value: "custom_1"
     * @const
     */
    "custom_1": "custom_1",
    /**
     * value: "custom_2"
     * @const
     */
    "custom_2": "custom_2",
    /**
     * value: "custom_3"
     * @const
     */
    "custom_3": "custom_3"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/PublicProductListLink'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./PublicProductListLink'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.PublicProductListResult = factory(root.ShopApi.ApiClient, root.ShopApi.PublicProductListLink);
  }
}(this, function(ApiClient, PublicProductListLink) {
  'use strict';




  /**
   * The PublicProductListResult model module.
   * @module model/PublicProductListResult
   * @version 17.3
   */

  /**
   * Constructs a new <code>PublicProductListResult</code>.
   * Result document containing an array of public product list links.
   * @alias module:model/PublicProductListResult
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>PublicProductListResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PublicProductListResult} obj Optional instance to populate.
   * @return {module:model/PublicProductListResult} The populated <code>PublicProductListResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('count')) {
        obj['count'] = ApiClient.convertToType(data['count'], 'Number');
      }
      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], [PublicProductListLink]);
      }
      if (data.hasOwnProperty('total')) {
        obj['total'] = ApiClient.convertToType(data['total'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The number of returned documents.
   * @member {Number} count
   */
  exports.prototype['count'] = undefined;
  /**
   * The array of product list link documents.
   * @member {Array.<module:model/PublicProductListLink>} data
   */
  exports.prototype['data'] = undefined;
  /**
   * The total number of documents.
   * @member {Number} total
   */
  exports.prototype['total'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.Query = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Filter model module.
   * @module model/Filter
   * @version 17.3
   */

  /**
   * Constructs a new <code>BoolFilter</code>.
   * Document representing a boolean filter.  
   * @alias module:model/BoolFilter
   * @class
   * @param operator {module:model/BoolFilter.OperatorEnum} The logical operator the filters are combined with.
   */
  var exports = function(operator) {
    var _this = this;
  };

  /**
   * Constructs a <code>BoolFilter</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/BoolFilter} obj Optional instance to populate.
   * @return {module:model/BoolFilter} The populated <code>BoolFilter</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
    }
    return obj;
  }
  
  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Query'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Query'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.QueryFilter = factory(root.ShopApi.ApiClient, root.ShopApi.Query);
  }
}(this, function(ApiClient, Query) {
  'use strict';




  /**
   * The QueryFilter model module.
   * @module model/QueryFilter
   * @version 17.3
   */

  /**
   * Constructs a new <code>QueryFilter</code>.
   * Document representing a query filter. A query filter wraps any query and allows it to be used as a filter.  
   * @alias module:model/QueryFilter
   * @class
   * @param query {module:model/Query} The query, which should be used as a filter.
   */
  var exports = function(query) {
    var _this = this;

    _this['query'] = query;
  };

  /**
   * Constructs a <code>QueryFilter</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/QueryFilter} obj Optional instance to populate.
   * @return {module:model/QueryFilter} The populated <code>QueryFilter</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('query')) {
        obj['query'] = Query.constructFromObject(data['query']);
      }
    }
    return obj;
  }

  /**
   * The query, which should be used as a filter.
   * @member {module:model/Query} query
   */
  exports.prototype['query'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.Range2Filter = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Range2Filter model module.
   * @module model/Range2Filter
   * @version 17.3
   */

  /**
   * Constructs a new <code>Range2Filter</code>.
   * Document representing a range compare with range filter, named Range2Filter.
   * @alias module:model/Range2Filter
   * @class
   * @param fromField {String} The field name of the field that start the range 1.
   * @param toField {String} The field name of the field that end the range 1.
   */
  var exports = function(fromField, toField) {
    var _this = this;


    _this['from_field'] = fromField;


    _this['to_field'] = toField;


  };

  /**
   * Constructs a <code>Range2Filter</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Range2Filter} obj Optional instance to populate.
   * @return {module:model/Range2Filter} The populated <code>Range2Filter</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('filter_mode')) {
        obj['filter_mode'] = ApiClient.convertToType(data['filter_mode'], 'String');
      }
      if (data.hasOwnProperty('from_field')) {
        obj['from_field'] = ApiClient.convertToType(data['from_field'], 'String');
      }
      if (data.hasOwnProperty('from_inclusive')) {
        obj['from_inclusive'] = ApiClient.convertToType(data['from_inclusive'], 'Boolean');
      }
      if (data.hasOwnProperty('from_value')) {
        obj['from_value'] = ApiClient.convertToType(data['from_value'], Object);
      }
      if (data.hasOwnProperty('to_field')) {
        obj['to_field'] = ApiClient.convertToType(data['to_field'], 'String');
      }
      if (data.hasOwnProperty('to_inclusive')) {
        obj['to_inclusive'] = ApiClient.convertToType(data['to_inclusive'], 'Boolean');
      }
      if (data.hasOwnProperty('to_value')) {
        obj['to_value'] = ApiClient.convertToType(data['to_value'], Object);
      }
    }
    return obj;
  }

  /**
   * compare mode: overlap, containing, contained (default to \"overlap\"). It is optional.
   * @member {module:model/Range2Filter.FilterModeEnum} filter_mode
   */
  exports.prototype['filter_mode'] = undefined;
  /**
   * The field name of the field that start the range 1.
   * @member {String} from_field
   */
  exports.prototype['from_field'] = undefined;
  /**
   * A flag indicating whether the lower bound of the range is inclusive (or exclusive). The default is true (which means that the given  lower bound is inclusive).
   * @member {Boolean} from_inclusive
   */
  exports.prototype['from_inclusive'] = undefined;
  /**
   * The configured lower bound of the filter range. The lower bound is optional. If not given, the range is  open ended with respect to the lower bound.
   * @member {Object} from_value
   */
  exports.prototype['from_value'] = undefined;
  /**
   * The field name of the field that end the range 1.
   * @member {String} to_field
   */
  exports.prototype['to_field'] = undefined;
  /**
   * A flag indicating whether the upper bound of the range is inclusive (or exclusive). The default is true (which means that the given  upper bound is inclusive).
   * @member {Boolean} to_inclusive
   */
  exports.prototype['to_inclusive'] = undefined;
  /**
   * The configured upper bound of the filter range. The upper bound is optional. If not given, the range is  open ended with respect to the upper bound.
   * @member {Object} to_value
   */
  exports.prototype['to_value'] = undefined;


  /**
   * Allowed values for the <code>filter_mode</code> property.
   * @enum {String}
   * @readonly
   */
  exports.FilterModeEnum = {
    /**
     * value: "overlap"
     * @const
     */
    "overlap": "overlap",
    /**
     * value: "containing"
     * @const
     */
    "containing": "containing",
    /**
     * value: "contained"
     * @const
     */
    "contained": "contained"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.RangeFilter = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The RangeFilter model module.
   * @module model/RangeFilter
   * @version 17.3
   */

  /**
   * Constructs a new <code>RangeFilter</code>.
   * Document representing a range filter.  
   * @alias module:model/RangeFilter
   * @class
   * @param field {String} The search field.
   */
  var exports = function(field) {
    var _this = this;

    _this['field'] = field;




  };

  /**
   * Constructs a <code>RangeFilter</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/RangeFilter} obj Optional instance to populate.
   * @return {module:model/RangeFilter} The populated <code>RangeFilter</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('field')) {
        obj['field'] = ApiClient.convertToType(data['field'], 'String');
      }
      if (data.hasOwnProperty('from')) {
        obj['from'] = ApiClient.convertToType(data['from'], Object);
      }
      if (data.hasOwnProperty('from_inclusive')) {
        obj['from_inclusive'] = ApiClient.convertToType(data['from_inclusive'], 'Boolean');
      }
      if (data.hasOwnProperty('to')) {
        obj['to'] = ApiClient.convertToType(data['to'], Object);
      }
      if (data.hasOwnProperty('to_inclusive')) {
        obj['to_inclusive'] = ApiClient.convertToType(data['to_inclusive'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * The search field.
   * @member {String} field
   */
  exports.prototype['field'] = undefined;
  /**
   * The configured lower bound of the filter range. The lower bound is optional. If not given, the range is  open ended with respect to the lower bound.
   * @member {Object} from
   */
  exports.prototype['from'] = undefined;
  /**
   * A flag indicating whether the lower bound of the range is inclusive (or exclusive). The default is true (which means that the given  lower bound is inclusive).
   * @member {Boolean} from_inclusive
   */
  exports.prototype['from_inclusive'] = undefined;
  /**
   * The configured upper bound of the filter range. The upper bound is optional. If not given, the range is  open ended with respect to the upper bound.
   * @member {Object} to
   */
  exports.prototype['to'] = undefined;
  /**
   * A flag indicating whether the upper bound of the range is inclusive (or exclusive). The default is true (which means that the given  upper bound is inclusive).
   * @member {Boolean} to_inclusive
   */
  exports.prototype['to_inclusive'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Image', 'model/RecommendationType'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Image'), require('./RecommendationType'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.Recommendation = factory(root.ShopApi.ApiClient, root.ShopApi.Image, root.ShopApi.RecommendationType);
  }
}(this, function(ApiClient, Image, RecommendationType) {
  'use strict';




  /**
   * The Recommendation model module.
   * @module model/Recommendation
   * @version 17.3
   */

  /**
   * Constructs a new <code>Recommendation</code>.
   * Document representing a product recommendation.
   * @alias module:model/Recommendation
   * @class
   */
  var exports = function() {
    var _this = this;









  };

  /**
   * Constructs a <code>Recommendation</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Recommendation} obj Optional instance to populate.
   * @return {module:model/Recommendation} The populated <code>Recommendation</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('callout_msg')) {
        obj['callout_msg'] = ApiClient.convertToType(data['callout_msg'], 'String');
      }
      if (data.hasOwnProperty('image')) {
        obj['image'] = Image.constructFromObject(data['image']);
      }
      if (data.hasOwnProperty('long_description')) {
        obj['long_description'] = ApiClient.convertToType(data['long_description'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('recommendation_type')) {
        obj['recommendation_type'] = RecommendationType.constructFromObject(data['recommendation_type']);
      }
      if (data.hasOwnProperty('recommended_item_id')) {
        obj['recommended_item_id'] = ApiClient.convertToType(data['recommended_item_id'], 'String');
      }
      if (data.hasOwnProperty('recommended_item_link')) {
        obj['recommended_item_link'] = ApiClient.convertToType(data['recommended_item_link'], 'String');
      }
      if (data.hasOwnProperty('short_description')) {
        obj['short_description'] = ApiClient.convertToType(data['short_description'], 'String');
      }
    }
    return obj;
  }

  /**
   * The localized callout message of the recommendation.
   * @member {String} callout_msg
   */
  exports.prototype['callout_msg'] = undefined;
  /**
   * The image of the recommendation.
   * @member {module:model/Image} image
   */
  exports.prototype['image'] = undefined;
  /**
   * The localized long description of the recommendation.
   * @member {String} long_description
   */
  exports.prototype['long_description'] = undefined;
  /**
   * The localized name of the recommendation.
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * The recommendation type of the recommendation.
   * @member {module:model/RecommendationType} recommendation_type
   */
  exports.prototype['recommendation_type'] = undefined;
  /**
   * The recommended item id of the recommendation.
   * @member {String} recommended_item_id
   */
  exports.prototype['recommended_item_id'] = undefined;
  /**
   * The recommended item link of the recommendation.
   * @member {String} recommended_item_link
   */
  exports.prototype['recommended_item_link'] = undefined;
  /**
   * The localized short description of the recommendation.
   * @member {String} short_description
   */
  exports.prototype['short_description'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.RecommendationType = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The RecommendationType model module.
   * @module model/RecommendationType
   * @version 17.3
   */

  /**
   * Constructs a new <code>RecommendationType</code>.
   * Document representing a recommendation type.
   * @alias module:model/RecommendationType
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>RecommendationType</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/RecommendationType} obj Optional instance to populate.
   * @return {module:model/RecommendationType} The populated <code>RecommendationType</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('display_value')) {
        obj['display_value'] = ApiClient.convertToType(data['display_value'], 'String');
      }
      if (data.hasOwnProperty('value')) {
        obj['value'] = ApiClient.convertToType(data['value'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The localized display value of the recommendation type.
   * @member {String} display_value
   */
  exports.prototype['display_value'] = undefined;
  /**
   * The value of the recommendation type.
   * @member {Number} value
   */
  exports.prototype['value'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ResultPage = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ResultPage model module.
   * @module model/ResultPage
   * @version 17.3
   */

  /**
   * Constructs a new <code>ResultPage</code>.
   * Data that can be used to get the next and previous page of a Data API results object.
   * @alias module:model/ResultPage
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>ResultPage</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResultPage} obj Optional instance to populate.
   * @return {module:model/ResultPage} The populated <code>ResultPage</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('count')) {
        obj['count'] = ApiClient.convertToType(data['count'], 'Number');
      }
      if (data.hasOwnProperty('start')) {
        obj['start'] = ApiClient.convertToType(data['start'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Returns the count of search hits to include in the page.
   * @member {Number} count
   */
  exports.prototype['count'] = undefined;
  /**
   * Returns the zero-based index of the first search hit in the page.
   * @member {Number} start
   */
  exports.prototype['start'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/OrderAddress', 'model/ShippingMethod'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./OrderAddress'), require('./ShippingMethod'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.Shipment = factory(root.ShopApi.ApiClient, root.ShopApi.OrderAddress, root.ShopApi.ShippingMethod);
  }
}(this, function(ApiClient, OrderAddress, ShippingMethod) {
  'use strict';




  /**
   * The Shipment model module.
   * @module model/Shipment
   * @version 17.3
   */

  /**
   * Constructs a new <code>Shipment</code>.
   * Document representing a shipment.
   * @alias module:model/Shipment
   * @class
   */
  var exports = function() {
    var _this = this;




















  };

  /**
   * Constructs a <code>Shipment</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Shipment} obj Optional instance to populate.
   * @return {module:model/Shipment} The populated <code>Shipment</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('adjusted_merchandize_total_tax')) {
        obj['adjusted_merchandize_total_tax'] = ApiClient.convertToType(data['adjusted_merchandize_total_tax'], 'Number');
      }
      if (data.hasOwnProperty('adjusted_shipping_total_tax')) {
        obj['adjusted_shipping_total_tax'] = ApiClient.convertToType(data['adjusted_shipping_total_tax'], 'Number');
      }
      if (data.hasOwnProperty('c_fromStoreId')) {
        obj['c_fromStoreId'] = ApiClient.convertToType(data['c_fromStoreId'], 'String');
      }
      if (data.hasOwnProperty('c_shipmentType')) {
        obj['c_shipmentType'] = ApiClient.convertToType(data['c_shipmentType'], 'String');
      }
      if (data.hasOwnProperty('c_storePickupMessage')) {
        obj['c_storePickupMessage'] = ApiClient.convertToType(data['c_storePickupMessage'], 'String');
      }
      if (data.hasOwnProperty('gift')) {
        obj['gift'] = ApiClient.convertToType(data['gift'], 'Boolean');
      }
      if (data.hasOwnProperty('gift_message')) {
        obj['gift_message'] = ApiClient.convertToType(data['gift_message'], 'String');
      }
      if (data.hasOwnProperty('merchandize_total_tax')) {
        obj['merchandize_total_tax'] = ApiClient.convertToType(data['merchandize_total_tax'], 'Number');
      }
      if (data.hasOwnProperty('product_sub_total')) {
        obj['product_sub_total'] = ApiClient.convertToType(data['product_sub_total'], 'Number');
      }
      if (data.hasOwnProperty('product_total')) {
        obj['product_total'] = ApiClient.convertToType(data['product_total'], 'Number');
      }
      if (data.hasOwnProperty('shipment_id')) {
        obj['shipment_id'] = ApiClient.convertToType(data['shipment_id'], 'String');
      }
      if (data.hasOwnProperty('shipment_no')) {
        obj['shipment_no'] = ApiClient.convertToType(data['shipment_no'], 'String');
      }
      if (data.hasOwnProperty('shipment_total')) {
        obj['shipment_total'] = ApiClient.convertToType(data['shipment_total'], 'Number');
      }
      if (data.hasOwnProperty('shipping_address')) {
        obj['shipping_address'] = OrderAddress.constructFromObject(data['shipping_address']);
      }
      if (data.hasOwnProperty('shipping_method')) {
        obj['shipping_method'] = ShippingMethod.constructFromObject(data['shipping_method']);
      }
      if (data.hasOwnProperty('shipping_status')) {
        obj['shipping_status'] = ApiClient.convertToType(data['shipping_status'], 'String');
      }
      if (data.hasOwnProperty('shipping_total')) {
        obj['shipping_total'] = ApiClient.convertToType(data['shipping_total'], 'Number');
      }
      if (data.hasOwnProperty('shipping_total_tax')) {
        obj['shipping_total_tax'] = ApiClient.convertToType(data['shipping_total_tax'], 'Number');
      }
      if (data.hasOwnProperty('tax_total')) {
        obj['tax_total'] = ApiClient.convertToType(data['tax_total'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The products tax after discounts applying in purchase currency. Adjusted merchandize prices represent the sum of  product prices before services such as shipping have been added, but after adjustment from promotions have been  added.   Note that order level adjustments are considered if Discount Taxation preference is set to  \"Tax Products and Shipping Only Based on Adjusted Price\".
   * @member {Number} adjusted_merchandize_total_tax
   */
  exports.prototype['adjusted_merchandize_total_tax'] = undefined;
  /**
   * The tax of all shipping line items of the line item container after shipping adjustments have been applied.
   * @member {Number} adjusted_shipping_total_tax
   */
  exports.prototype['adjusted_shipping_total_tax'] = undefined;
  /**
   * Used to map the shipment to a  brick and mortar store.
   * @member {String} c_fromStoreId
   */
  exports.prototype['c_fromStoreId'] = undefined;
  /**
   * @member {String} c_shipmentType
   */
  exports.prototype['c_shipmentType'] = undefined;
  /**
   * This is text used by the end user when sending a message to the brick and mortar store about the shipment.  This is reflected in the order export.
   * @member {String} c_storePickupMessage
   */
  exports.prototype['c_storePickupMessage'] = undefined;
  /**
   * A flag indicating whether the shipment is a gift.
   * @member {Boolean} gift
   */
  exports.prototype['gift'] = undefined;
  /**
   * The gift message.
   * @member {String} gift_message
   */
  exports.prototype['gift_message'] = undefined;
  /**
   * The products total tax in purchase currency. Merchandize total prices represent the sum of product prices before  services such as shipping or adjustment from promotions have been added.
   * @member {Number} merchandize_total_tax
   */
  exports.prototype['merchandize_total_tax'] = undefined;
  /**
   * The total price of all product items after all product discounts. Depending on taxation policy the returned price  is net or gross.
   * @member {Number} product_sub_total
   */
  exports.prototype['product_sub_total'] = undefined;
  /**
   * The total price of all product items after all product and order discounts. Depending on taxation policy the  returned price is net or gross.
   * @member {Number} product_total
   */
  exports.prototype['product_total'] = undefined;
  /**
   * The order specific id to identify the shipment.
   * @member {String} shipment_id
   */
  exports.prototype['shipment_id'] = undefined;
  /**
   * Returns the shipment number for this shipment.   This number is automatically generated.
   * @member {String} shipment_no
   */
  exports.prototype['shipment_no'] = undefined;
  /**
   * The total price of the shipment, including products, shipping and tax.   Note that order level adjustments are not considered.
   * @member {Number} shipment_total
   */
  exports.prototype['shipment_total'] = undefined;
  /**
   * The shipping address.
   * @member {module:model/OrderAddress} shipping_address
   */
  exports.prototype['shipping_address'] = undefined;
  /**
   * The shipping method.
   * @member {module:model/ShippingMethod} shipping_method
   */
  exports.prototype['shipping_method'] = undefined;
  /**
   * The shipping status of the shipment.
   * @member {module:model/Shipment.ShippingStatusEnum} shipping_status
   */
  exports.prototype['shipping_status'] = undefined;
  /**
   * The total shipping price of the shipment after all shipping discounts. Excludes tax if taxation policy is net.  Includes tax if taxation policy is gross.
   * @member {Number} shipping_total
   */
  exports.prototype['shipping_total'] = undefined;
  /**
   * The tax of all shipping line items of the line item container before shipping adjustments have been applied.
   * @member {Number} shipping_total_tax
   */
  exports.prototype['shipping_total_tax'] = undefined;
  /**
   * The total tax amount of the shipment.   Note that order level adjustments are considered if Discount Taxation preference is set to  \"Tax Products and Shipping Only Based on Adjusted Price\".
   * @member {Number} tax_total
   */
  exports.prototype['tax_total'] = undefined;


  /**
   * Allowed values for the <code>shipping_status</code> property.
   * @enum {String}
   * @readonly
   */
  exports.ShippingStatusEnum = {
    /**
     * value: "not_shipped"
     * @const
     */
    "not_shipped": "not_shipped",
    /**
     * value: "shipped"
     * @const
     */
    "shipped": "shipped"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/PriceAdjustment'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./PriceAdjustment'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ShippingItem = factory(root.ShopApi.ApiClient, root.ShopApi.PriceAdjustment);
  }
}(this, function(ApiClient, PriceAdjustment) {
  'use strict';




  /**
   * The ShippingItem model module.
   * @module model/ShippingItem
   * @version 17.3
   */

  /**
   * Constructs a new <code>ShippingItem</code>.
   * Document representing a shipping item.
   * @alias module:model/ShippingItem
   * @class
   */
  var exports = function() {
    var _this = this;


















  };

  /**
   * Constructs a <code>ShippingItem</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ShippingItem} obj Optional instance to populate.
   * @return {module:model/ShippingItem} The populated <code>ShippingItem</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('adjusted_tax')) {
        obj['adjusted_tax'] = ApiClient.convertToType(data['adjusted_tax'], 'Number');
      }
      if (data.hasOwnProperty('base_price')) {
        obj['base_price'] = ApiClient.convertToType(data['base_price'], 'Number');
      }
      if (data.hasOwnProperty('c_eaEmployeeId')) {
        obj['c_eaEmployeeId'] = ApiClient.convertToType(data['c_eaEmployeeId'], 'String');
      }
      if (data.hasOwnProperty('c_eaManagerEmployeeId')) {
        obj['c_eaManagerEmployeeId'] = ApiClient.convertToType(data['c_eaManagerEmployeeId'], 'String');
      }
      if (data.hasOwnProperty('c_eaOverrideReasonCode')) {
        obj['c_eaOverrideReasonCode'] = ApiClient.convertToType(data['c_eaOverrideReasonCode'], 'String');
      }
      if (data.hasOwnProperty('c_eaPriceOverrideType')) {
        obj['c_eaPriceOverrideType'] = ApiClient.convertToType(data['c_eaPriceOverrideType'], 'String');
      }
      if (data.hasOwnProperty('c_eaPriceOverrideValue')) {
        obj['c_eaPriceOverrideValue'] = ApiClient.convertToType(data['c_eaPriceOverrideValue'], 'String');
      }
      if (data.hasOwnProperty('item_id')) {
        obj['item_id'] = ApiClient.convertToType(data['item_id'], 'String');
      }
      if (data.hasOwnProperty('item_text')) {
        obj['item_text'] = ApiClient.convertToType(data['item_text'], 'String');
      }
      if (data.hasOwnProperty('price')) {
        obj['price'] = ApiClient.convertToType(data['price'], 'Number');
      }
      if (data.hasOwnProperty('price_adjustments')) {
        obj['price_adjustments'] = ApiClient.convertToType(data['price_adjustments'], [PriceAdjustment]);
      }
      if (data.hasOwnProperty('price_after_item_discount')) {
        obj['price_after_item_discount'] = ApiClient.convertToType(data['price_after_item_discount'], 'Number');
      }
      if (data.hasOwnProperty('shipment_id')) {
        obj['shipment_id'] = ApiClient.convertToType(data['shipment_id'], 'String');
      }
      if (data.hasOwnProperty('tax')) {
        obj['tax'] = ApiClient.convertToType(data['tax'], 'Number');
      }
      if (data.hasOwnProperty('tax_basis')) {
        obj['tax_basis'] = ApiClient.convertToType(data['tax_basis'], 'Number');
      }
      if (data.hasOwnProperty('tax_class_id')) {
        obj['tax_class_id'] = ApiClient.convertToType(data['tax_class_id'], 'String');
      }
      if (data.hasOwnProperty('tax_rate')) {
        obj['tax_rate'] = ApiClient.convertToType(data['tax_rate'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The tax of the product item after adjustments applying.
   * @member {Number} adjusted_tax
   */
  exports.prototype['adjusted_tax'] = undefined;
  /**
   * The base price for the line item, which is the  price of the unit before applying adjustments, in the purchase  currency. The base price may be net or gross of tax depending  on the configured taxation policy.
   * @member {Number} base_price
   */
  exports.prototype['base_price'] = undefined;
  /**
   * @member {String} c_eaEmployeeId
   */
  exports.prototype['c_eaEmployeeId'] = undefined;
  /**
   * @member {String} c_eaManagerEmployeeId
   */
  exports.prototype['c_eaManagerEmployeeId'] = undefined;
  /**
   * @member {String} c_eaOverrideReasonCode
   */
  exports.prototype['c_eaOverrideReasonCode'] = undefined;
  /**
   * \"Amount\", \"Percent\", \"FixedPrice\"
   * @member {String} c_eaPriceOverrideType
   */
  exports.prototype['c_eaPriceOverrideType'] = undefined;
  /**
   * @member {String} c_eaPriceOverrideValue
   */
  exports.prototype['c_eaPriceOverrideValue'] = undefined;
  /**
   * The item identifier. Use this to identify an item when  updating the item quantity or creating a custom price adjustment for an  item.
   * @member {String} item_id
   */
  exports.prototype['item_id'] = undefined;
  /**
   * The text describing the item in more detail.
   * @member {String} item_text
   */
  exports.prototype['item_text'] = undefined;
  /**
   * The price of the line item before applying any adjustments. If the line item is based on net pricing  then the net price is returned. If the line item is based on gross  pricing then the gross price is returned.
   * @member {Number} price
   */
  exports.prototype['price'] = undefined;
  /**
   * Array of price adjustments. Can be empty.
   * @member {Array.<module:model/PriceAdjustment>} price_adjustments
   */
  exports.prototype['price_adjustments'] = undefined;
  /**
   * The price of the product line item after applying all product-level  adjustments. For net pricing the adjusted net price is returned. For gross pricing, the adjusted  gross price is returned.
   * @member {Number} price_after_item_discount
   */
  exports.prototype['price_after_item_discount'] = undefined;
  /**
   * The identifier of the shipment to which this item belongs.
   * @member {String} shipment_id
   */
  exports.prototype['shipment_id'] = undefined;
  /**
   * The tax of the product item before adjustments applying.
   * @member {Number} tax
   */
  exports.prototype['tax'] = undefined;
  /**
   * The price used to calculate the tax for this product item.
   * @member {Number} tax_basis
   */
  exports.prototype['tax_basis'] = undefined;
  /**
   * The tax class ID for the product item or null  if no tax class ID is associated with the product item.
   * @member {String} tax_class_id
   */
  exports.prototype['tax_class_id'] = undefined;
  /**
   * The tax rate, which is the decimal tax rate to be applied  to the product represented by this item.
   * @member {Number} tax_rate
   */
  exports.prototype['tax_rate'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ShippingPromotion'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ShippingPromotion'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ShippingMethod = factory(root.ShopApi.ApiClient, root.ShopApi.ShippingPromotion);
  }
}(this, function(ApiClient, ShippingPromotion) {
  'use strict';




  /**
   * The ShippingMethod model module.
   * @module model/ShippingMethod
   * @version 17.3
   */

  /**
   * Constructs a new <code>ShippingMethod</code>.
   * Document representing a shipping method.
   * @alias module:model/ShippingMethod
   * @class
   * @param cStorePickupEnabled {Boolean} 
   * @param id {String} The shipping method id.
   */
  var exports = function(cStorePickupEnabled, id) {
    var _this = this;


    _this['c_storePickupEnabled'] = cStorePickupEnabled;


    _this['id'] = id;



  };

  /**
   * Constructs a <code>ShippingMethod</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ShippingMethod} obj Optional instance to populate.
   * @return {module:model/ShippingMethod} The populated <code>ShippingMethod</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('c_estimatedArrivalTime')) {
        obj['c_estimatedArrivalTime'] = ApiClient.convertToType(data['c_estimatedArrivalTime'], 'String');
      }
      if (data.hasOwnProperty('c_storePickupEnabled')) {
        obj['c_storePickupEnabled'] = ApiClient.convertToType(data['c_storePickupEnabled'], 'Boolean');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('external_shipping_method')) {
        obj['external_shipping_method'] = ApiClient.convertToType(data['external_shipping_method'], 'String');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('price')) {
        obj['price'] = ApiClient.convertToType(data['price'], 'Number');
      }
      if (data.hasOwnProperty('shipping_promotions')) {
        obj['shipping_promotions'] = ApiClient.convertToType(data['shipping_promotions'], [ShippingPromotion]);
      }
    }
    return obj;
  }

  /**
   * Estimated days until delivery
   * @member {String} c_estimatedArrivalTime
   */
  exports.prototype['c_estimatedArrivalTime'] = undefined;
  /**
   * @member {Boolean} c_storePickupEnabled
   */
  exports.prototype['c_storePickupEnabled'] = undefined;
  /**
   * The localized description of the shipping method.
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * The external shipping method.
   * @member {String} external_shipping_method
   */
  exports.prototype['external_shipping_method'] = undefined;
  /**
   * The shipping method id.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The localized name of the shipping method.
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * The shipping cost total, including shipment level costs and  product level fix and surcharge costs.
   * @member {Number} price
   */
  exports.prototype['price'] = undefined;
  /**
   * The array of active customer shipping promotions for this shipping  method. This array can be empty.
   * @member {Array.<module:model/ShippingPromotion>} shipping_promotions
   */
  exports.prototype['shipping_promotions'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ShippingMethod'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ShippingMethod'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ShippingMethodResult = factory(root.ShopApi.ApiClient, root.ShopApi.ShippingMethod);
  }
}(this, function(ApiClient, ShippingMethod) {
  'use strict';




  /**
   * The ShippingMethodResult model module.
   * @module model/ShippingMethodResult
   * @version 17.3
   */

  /**
   * Constructs a new <code>ShippingMethodResult</code>.
   * Result document containing shipping methods.
   * @alias module:model/ShippingMethodResult
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>ShippingMethodResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ShippingMethodResult} obj Optional instance to populate.
   * @return {module:model/ShippingMethodResult} The populated <code>ShippingMethodResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('applicable_shipping_methods')) {
        obj['applicable_shipping_methods'] = ApiClient.convertToType(data['applicable_shipping_methods'], [ShippingMethod]);
      }
      if (data.hasOwnProperty('default_shipping_method_id')) {
        obj['default_shipping_method_id'] = ApiClient.convertToType(data['default_shipping_method_id'], 'String');
      }
    }
    return obj;
  }

  /**
   * The applicable shipping method documents.
   * @member {Array.<module:model/ShippingMethod>} applicable_shipping_methods
   */
  exports.prototype['applicable_shipping_methods'] = undefined;
  /**
   * The default shipping method.
   * @member {String} default_shipping_method_id
   */
  exports.prototype['default_shipping_method_id'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.ShippingPromotion = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ShippingPromotion model module.
   * @module model/ShippingPromotion
   * @version 17.3
   */

  /**
   * Constructs a new <code>ShippingPromotion</code>.
   * Document representing a shipping promotion.
   * @alias module:model/ShippingPromotion
   * @class
   */
  var exports = function() {
    var _this = this;





  };

  /**
   * Constructs a <code>ShippingPromotion</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ShippingPromotion} obj Optional instance to populate.
   * @return {module:model/ShippingPromotion} The populated <code>ShippingPromotion</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('callout_msg')) {
        obj['callout_msg'] = ApiClient.convertToType(data['callout_msg'], 'String');
      }
      if (data.hasOwnProperty('link')) {
        obj['link'] = ApiClient.convertToType(data['link'], 'String');
      }
      if (data.hasOwnProperty('promotion_id')) {
        obj['promotion_id'] = ApiClient.convertToType(data['promotion_id'], 'String');
      }
      if (data.hasOwnProperty('promotion_name')) {
        obj['promotion_name'] = ApiClient.convertToType(data['promotion_name'], 'String');
      }
    }
    return obj;
  }

  /**
   * The localized call-out message of the promotion.
   * @member {String} callout_msg
   */
  exports.prototype['callout_msg'] = undefined;
  /**
   * The URL addressing the promotion.
   * @member {String} link
   */
  exports.prototype['link'] = undefined;
  /**
   * The unique id of the promotion.
   * @member {String} promotion_id
   */
  exports.prototype['promotion_id'] = undefined;
  /**
   * The localized promotion name.
   * @member {String} promotion_name
   */
  exports.prototype['promotion_name'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.SimpleLink = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The SimpleLink model module.
   * @module model/SimpleLink
   * @version 17.3
   */

  /**
   * Constructs a new <code>SimpleLink</code>.
   * Document representing a link to another resource.
   * @alias module:model/SimpleLink
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>SimpleLink</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SimpleLink} obj Optional instance to populate.
   * @return {module:model/SimpleLink} The populated <code>SimpleLink</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('link')) {
        obj['link'] = ApiClient.convertToType(data['link'], 'String');
      }
    }
    return obj;
  }

  /**
   * The link to the resource.
   * @member {String} link
   */
  exports.prototype['link'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Locale'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Locale'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.Site = factory(root.ShopApi.ApiClient, root.ShopApi.Locale);
  }
}(this, function(ApiClient, Locale) {
  'use strict';




  /**
   * The Site model module.
   * @module model/Site
   * @version 17.3
   */

  /**
   * Constructs a new <code>Site</code>.
   * Document representing a site.
   * @alias module:model/Site
   * @class
   */
  var exports = function() {
    var _this = this;


















  };

  /**
   * Constructs a <code>Site</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Site} obj Optional instance to populate.
   * @return {module:model/Site} The populated <code>Site</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('allowed_currencies')) {
        obj['allowed_currencies'] = ApiClient.convertToType(data['allowed_currencies'], ['String']);
      }
      if (data.hasOwnProperty('allowed_locales')) {
        obj['allowed_locales'] = ApiClient.convertToType(data['allowed_locales'], [Locale]);
      }
      if (data.hasOwnProperty('default_currency')) {
        obj['default_currency'] = ApiClient.convertToType(data['default_currency'], 'String');
      }
      if (data.hasOwnProperty('default_locale')) {
        obj['default_locale'] = ApiClient.convertToType(data['default_locale'], 'String');
      }
      if (data.hasOwnProperty('http_dis_base_url')) {
        obj['http_dis_base_url'] = ApiClient.convertToType(data['http_dis_base_url'], 'String');
      }
      if (data.hasOwnProperty('http_hostname')) {
        obj['http_hostname'] = ApiClient.convertToType(data['http_hostname'], 'String');
      }
      if (data.hasOwnProperty('http_library_content_url')) {
        obj['http_library_content_url'] = ApiClient.convertToType(data['http_library_content_url'], 'String');
      }
      if (data.hasOwnProperty('http_site_content_url')) {
        obj['http_site_content_url'] = ApiClient.convertToType(data['http_site_content_url'], 'String');
      }
      if (data.hasOwnProperty('https_dis_base_url')) {
        obj['https_dis_base_url'] = ApiClient.convertToType(data['https_dis_base_url'], 'String');
      }
      if (data.hasOwnProperty('https_hostname')) {
        obj['https_hostname'] = ApiClient.convertToType(data['https_hostname'], 'String');
      }
      if (data.hasOwnProperty('https_library_content_url')) {
        obj['https_library_content_url'] = ApiClient.convertToType(data['https_library_content_url'], 'String');
      }
      if (data.hasOwnProperty('https_site_content_url')) {
        obj['https_site_content_url'] = ApiClient.convertToType(data['https_site_content_url'], 'String');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = ApiClient.convertToType(data['status'], 'String');
      }
      if (data.hasOwnProperty('timezone')) {
        obj['timezone'] = ApiClient.convertToType(data['timezone'], 'String');
      }
      if (data.hasOwnProperty('timezone_offset')) {
        obj['timezone_offset'] = ApiClient.convertToType(data['timezone_offset'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The list of allowed currencies.
   * @member {Array.<String>} allowed_currencies
   */
  exports.prototype['allowed_currencies'] = undefined;
  /**
   * A list of all allowed site locales.
   * @member {Array.<module:model/Locale>} allowed_locales
   */
  exports.prototype['allowed_locales'] = undefined;
  /**
   * The currency mnemonic of the site.
   * @member {String} default_currency
   */
  exports.prototype['default_currency'] = undefined;
  /**
   * The default locale of the site.
   * @member {String} default_locale
   */
  exports.prototype['default_locale'] = undefined;
  /**
   * The HTTP DIS base URL.
   * @member {String} http_dis_base_url
   */
  exports.prototype['http_dis_base_url'] = undefined;
  /**
   * The configured HTTP host name. If no host name is configured the instance host name is returned.
   * @member {String} http_hostname
   */
  exports.prototype['http_hostname'] = undefined;
  /**
   * The HTTP URL to the library content location of the site.
   * @member {String} http_library_content_url
   */
  exports.prototype['http_library_content_url'] = undefined;
  /**
   * The HTTP URL to the site content location.
   * @member {String} http_site_content_url
   */
  exports.prototype['http_site_content_url'] = undefined;
  /**
   * The HTTPS DIS base URL.
   * @member {String} https_dis_base_url
   */
  exports.prototype['https_dis_base_url'] = undefined;
  /**
   * The configured HTTPS host name. If no host name is configured the instance host name is returned.
   * @member {String} https_hostname
   */
  exports.prototype['https_hostname'] = undefined;
  /**
   * The HTTPS URL to the library content location of the site.
   * @member {String} https_library_content_url
   */
  exports.prototype['https_library_content_url'] = undefined;
  /**
   * The HTTPS URL to the site content location.
   * @member {String} https_site_content_url
   */
  exports.prototype['https_site_content_url'] = undefined;
  /**
   * The id of the site.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The descriptive name for the site.
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * The site status online/offline.
   * @member {module:model/Site.StatusEnum} status
   */
  exports.prototype['status'] = undefined;
  /**
   * The time zone of the site (for example, USA/Eastern).
   * @member {String} timezone
   */
  exports.prototype['timezone'] = undefined;
  /**
   * The time zone offset from UTC for the current time in milliseconds (for example, -14400000).
   * @member {Number} timezone_offset
   */
  exports.prototype['timezone_offset'] = undefined;


  /**
   * Allowed values for the <code>status</code> property.
   * @enum {String}
   * @readonly
   */
  exports.StatusEnum = {
    /**
     * value: "online"
     * @const
     */
    "online": "online",
    /**
     * value: "offline"
     * @const
     */
    "offline": "offline"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.Sort = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Sort model module.
   * @module model/Sort
   * @version 17.3
   */

  /**
   * Constructs a new <code>Sort</code>.
   * Document representing a sort request.
   * @alias module:model/Sort
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>Sort</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Sort} obj Optional instance to populate.
   * @return {module:model/Sort} The populated <code>Sort</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('field')) {
        obj['field'] = ApiClient.convertToType(data['field'], 'String');
      }
      if (data.hasOwnProperty('sort_order')) {
        obj['sort_order'] = ApiClient.convertToType(data['sort_order'], 'String');
      }
    }
    return obj;
  }

  /**
   * The name of the field to sort on.
   * @member {String} field
   */
  exports.prototype['field'] = undefined;
  /**
   * The sort order to be applied when sorting. When omitted, the default sort order (ASC) is used.
   * @member {module:model/Sort.SortOrderEnum} sort_order
   */
  exports.prototype['sort_order'] = undefined;


  /**
   * Allowed values for the <code>sort_order</code> property.
   * @enum {String}
   * @readonly
   */
  exports.SortOrderEnum = {
    /**
     * value: "asc"
     * @const
     */
    "asc": "asc",
    /**
     * value: "desc"
     * @const
     */
    "desc": "desc"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.Status = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Status model module.
   * @module model/Status
   * @version 17.3
   */

  /**
   * Constructs a new <code>Status</code>.
   * Document representing a status of an object.
   * @alias module:model/Status
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>Status</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Status} obj Optional instance to populate.
   * @return {module:model/Status} The populated <code>Status</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('code')) {
        obj['code'] = ApiClient.convertToType(data['code'], 'String');
      }
      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = ApiClient.convertToType(data['status'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The status code.
   * @member {String} code
   */
  exports.prototype['code'] = undefined;
  /**
   * The status message.
   * @member {String} message
   */
  exports.prototype['message'] = undefined;
  /**
   * The status.    For more information on the status values see dw.system.Status.OK and  dw.system.Status.ERROR.
   * @member {Number} status
   */
  exports.prototype['status'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.Store = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Store model module.
   * @module model/Store
   * @version 17.3
   */

  /**
   * Constructs a new <code>Store</code>.
   * Document representing a store.
   * @alias module:model/Store
   * @class
   * @param id {String} The id of the store.
   */
  var exports = function(id) {
    var _this = this;












    _this['id'] = id;












  };

  /**
   * Constructs a <code>Store</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Store} obj Optional instance to populate.
   * @return {module:model/Store} The populated <code>Store</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('address1')) {
        obj['address1'] = ApiClient.convertToType(data['address1'], 'String');
      }
      if (data.hasOwnProperty('address2')) {
        obj['address2'] = ApiClient.convertToType(data['address2'], 'String');
      }
      if (data.hasOwnProperty('c_TestAttribute')) {
        obj['c_TestAttribute'] = ApiClient.convertToType(data['c_TestAttribute'], ['String']);
      }
      if (data.hasOwnProperty('c_countryCodeValue')) {
        obj['c_countryCodeValue'] = ApiClient.convertToType(data['c_countryCodeValue'], 'String');
      }
      if (data.hasOwnProperty('c_inventoryListId')) {
        obj['c_inventoryListId'] = ApiClient.convertToType(data['c_inventoryListId'], 'String');
      }
      if (data.hasOwnProperty('city')) {
        obj['city'] = ApiClient.convertToType(data['city'], 'String');
      }
      if (data.hasOwnProperty('country_code')) {
        obj['country_code'] = ApiClient.convertToType(data['country_code'], 'String');
      }
      if (data.hasOwnProperty('distance')) {
        obj['distance'] = ApiClient.convertToType(data['distance'], 'Number');
      }
      if (data.hasOwnProperty('distance_unit')) {
        obj['distance_unit'] = ApiClient.convertToType(data['distance_unit'], 'String');
      }
      if (data.hasOwnProperty('email')) {
        obj['email'] = ApiClient.convertToType(data['email'], 'String');
      }
      if (data.hasOwnProperty('fax')) {
        obj['fax'] = ApiClient.convertToType(data['fax'], 'String');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('image')) {
        obj['image'] = ApiClient.convertToType(data['image'], 'String');
      }
      if (data.hasOwnProperty('inventory_id')) {
        obj['inventory_id'] = ApiClient.convertToType(data['inventory_id'], 'String');
      }
      if (data.hasOwnProperty('latitude')) {
        obj['latitude'] = ApiClient.convertToType(data['latitude'], 'Number');
      }
      if (data.hasOwnProperty('longitude')) {
        obj['longitude'] = ApiClient.convertToType(data['longitude'], 'Number');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('phone')) {
        obj['phone'] = ApiClient.convertToType(data['phone'], 'String');
      }
      if (data.hasOwnProperty('pos_enabled')) {
        obj['pos_enabled'] = ApiClient.convertToType(data['pos_enabled'], 'Boolean');
      }
      if (data.hasOwnProperty('postal_code')) {
        obj['postal_code'] = ApiClient.convertToType(data['postal_code'], 'String');
      }
      if (data.hasOwnProperty('state_code')) {
        obj['state_code'] = ApiClient.convertToType(data['state_code'], 'String');
      }
      if (data.hasOwnProperty('store_events')) {
        obj['store_events'] = ApiClient.convertToType(data['store_events'], 'String');
      }
      if (data.hasOwnProperty('store_hours')) {
        obj['store_hours'] = ApiClient.convertToType(data['store_hours'], 'String');
      }
      if (data.hasOwnProperty('store_locator_enabled')) {
        obj['store_locator_enabled'] = ApiClient.convertToType(data['store_locator_enabled'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * The first address of the store.
   * @member {String} address1
   */
  exports.prototype['address1'] = undefined;
  /**
   * The second address of the store.
   * @member {String} address2
   */
  exports.prototype['address2'] = undefined;
  /**
   * @member {Array.<String>} c_TestAttribute
   */
  exports.prototype['c_TestAttribute'] = undefined;
  /**
   * Country Code Value - for the form values
   * @member {String} c_countryCodeValue
   */
  exports.prototype['c_countryCodeValue'] = undefined;
  /**
   * Store Inventory List ID
   * @member {String} c_inventoryListId
   */
  exports.prototype['c_inventoryListId'] = undefined;
  /**
   * The city of the store.
   * @member {String} city
   */
  exports.prototype['city'] = undefined;
  /**
   * The country code of the store.
   * @member {module:model/Store.CountryCodeEnum} country_code
   */
  exports.prototype['country_code'] = undefined;
  /**
   * The distance to the given geo location in the unit of attribute distance (miles or kilometers).
   * @member {Number} distance
   */
  exports.prototype['distance'] = undefined;
  /**
   * The distance unit the distance attribute is measured in (either in miles or kilometers).
   * @member {String} distance_unit
   */
  exports.prototype['distance_unit'] = undefined;
  /**
   * The email address of the store.
   * @member {String} email
   */
  exports.prototype['email'] = undefined;
  /**
   * The fax number of the store.
   * @member {String} fax
   */
  exports.prototype['fax'] = undefined;
  /**
   * The id of the store.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The store image.
   * @member {String} image
   */
  exports.prototype['image'] = undefined;
  /**
   * The inventory list id associated with this store.
   * @member {String} inventory_id
   */
  exports.prototype['inventory_id'] = undefined;
  /**
   * The latitude of the store.
   * @member {Number} latitude
   */
  exports.prototype['latitude'] = undefined;
  /**
   * The longitude of the store.
   * @member {Number} longitude
   */
  exports.prototype['longitude'] = undefined;
  /**
   * The store name.
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * The phone number of the store.
   * @member {String} phone
   */
  exports.prototype['phone'] = undefined;
  /**
   * Whether this store uses Store Point-of-Sale.
   * @member {Boolean} pos_enabled
   */
  exports.prototype['pos_enabled'] = undefined;
  /**
   * The postal code of the store.
   * @member {String} postal_code
   */
  exports.prototype['postal_code'] = undefined;
  /**
   * The state code of the store.
   * @member {String} state_code
   */
  exports.prototype['state_code'] = undefined;
  /**
   * The store events.
   * @member {String} store_events
   */
  exports.prototype['store_events'] = undefined;
  /**
   * The store opening hours.
   * @member {String} store_hours
   */
  exports.prototype['store_hours'] = undefined;
  /**
   * Whether this store should show up in store locator results.
   * @member {Boolean} store_locator_enabled
   */
  exports.prototype['store_locator_enabled'] = undefined;


  /**
   * Allowed values for the <code>country_code</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CountryCodeEnum = {
    /**
     * value: "US"
     * @const
     */
    "US": "US",
    /**
     * value: "CA"
     * @const
     */
    "CA": "CA",
    /**
     * value: "DE"
     * @const
     */
    "DE": "DE"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Store'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Store'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.StoreResult = factory(root.ShopApi.ApiClient, root.ShopApi.Store);
  }
}(this, function(ApiClient, Store) {
  'use strict';




  /**
   * The StoreResult model module.
   * @module model/StoreResult
   * @version 17.3
   */

  /**
   * Constructs a new <code>StoreResult</code>.
   * Result document containing an array of stores.
   * @alias module:model/StoreResult
   * @class
   */
  var exports = function() {
    var _this = this;







  };

  /**
   * Constructs a <code>StoreResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/StoreResult} obj Optional instance to populate.
   * @return {module:model/StoreResult} The populated <code>StoreResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('count')) {
        obj['count'] = ApiClient.convertToType(data['count'], 'Number');
      }
      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], [Store]);
      }
      if (data.hasOwnProperty('next')) {
        obj['next'] = ApiClient.convertToType(data['next'], 'String');
      }
      if (data.hasOwnProperty('previous')) {
        obj['previous'] = ApiClient.convertToType(data['previous'], 'String');
      }
      if (data.hasOwnProperty('start')) {
        obj['start'] = ApiClient.convertToType(data['start'], 'Number');
      }
      if (data.hasOwnProperty('total')) {
        obj['total'] = ApiClient.convertToType(data['total'], 'Number');
      }
    }
    return obj;
  }

  /**
   * The number of returned documents.
   * @member {Number} count
   */
  exports.prototype['count'] = undefined;
  /**
   * The array of store documents.
   * @member {Array.<module:model/Store>} data
   */
  exports.prototype['data'] = undefined;
  /**
   * The URL of the next result page.
   * @member {String} next
   */
  exports.prototype['next'] = undefined;
  /**
   * The URL of the previous result page.
   * @member {String} previous
   */
  exports.prototype['previous'] = undefined;
  /**
   * The zero-based index of the first search hit to include in the result.
   * @member {Number} start
   */
  exports.prototype['start'] = undefined;
  /**
   * The total number of documents.
   * @member {Number} total
   */
  exports.prototype['total'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.SuggestedCategory = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The SuggestedCategory model module.
   * @module model/SuggestedCategory
   * @version 17.3
   */

  /**
   * Constructs a new <code>SuggestedCategory</code>.
   * @alias module:model/SuggestedCategory
   * @class
   */
  var exports = function() {
    var _this = this;





  };

  /**
   * Constructs a <code>SuggestedCategory</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SuggestedCategory} obj Optional instance to populate.
   * @return {module:model/SuggestedCategory} The populated <code>SuggestedCategory</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('link')) {
        obj['link'] = ApiClient.convertToType(data['link'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('parent_category_name')) {
        obj['parent_category_name'] = ApiClient.convertToType(data['parent_category_name'], 'String');
      }
    }
    return obj;
  }

  /**
   * The id of the category.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The URL addressing the category.
   * @member {String} link
   */
  exports.prototype['link'] = undefined;
  /**
   * The localized name of the category.
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * The name of the parent category.
   * @member {String} parent_category_name
   */
  exports.prototype['parent_category_name'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.SuggestedContent = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The SuggestedContent model module.
   * @module model/SuggestedContent
   * @version 17.3
   */

  /**
   * Constructs a new <code>SuggestedContent</code>.
   * @alias module:model/SuggestedContent
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>SuggestedContent</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SuggestedContent} obj Optional instance to populate.
   * @return {module:model/SuggestedContent} The populated <code>SuggestedContent</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('link')) {
        obj['link'] = ApiClient.convertToType(data['link'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
    }
    return obj;
  }

  /**
   * The id of the content.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The URL addressing the content.
   * @member {String} link
   */
  exports.prototype['link'] = undefined;
  /**
   * The localized name of the content.
   * @member {String} name
   */
  exports.prototype['name'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.SuggestedPhrase = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The SuggestedPhrase model module.
   * @module model/SuggestedPhrase
   * @version 17.3
   */

  /**
   * Constructs a new <code>SuggestedPhrase</code>.
   * Document representing a suggested search phrase.
   * @alias module:model/SuggestedPhrase
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>SuggestedPhrase</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SuggestedPhrase} obj Optional instance to populate.
   * @return {module:model/SuggestedPhrase} The populated <code>SuggestedPhrase</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('exact_match')) {
        obj['exact_match'] = ApiClient.convertToType(data['exact_match'], 'Boolean');
      }
      if (data.hasOwnProperty('phrase')) {
        obj['phrase'] = ApiClient.convertToType(data['phrase'], 'String');
      }
    }
    return obj;
  }

  /**
   * Returns whether this suggested phrase exactly matches the user input search phrase.
   * @member {Boolean} exact_match
   */
  exports.prototype['exact_match'] = undefined;
  /**
   * Returns the suggested search phrase.
   * @member {String} phrase
   */
  exports.prototype['phrase'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Image'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Image'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.SuggestedProduct = factory(root.ShopApi.ApiClient, root.ShopApi.Image);
  }
}(this, function(ApiClient, Image) {
  'use strict';




  /**
   * The SuggestedProduct model module.
   * @module model/SuggestedProduct
   * @version 17.3
   */

  /**
   * Constructs a new <code>SuggestedProduct</code>.
   * Document representing a product search hit.
   * @alias module:model/SuggestedProduct
   * @class
   */
  var exports = function() {
    var _this = this;







  };

  /**
   * Constructs a <code>SuggestedProduct</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SuggestedProduct} obj Optional instance to populate.
   * @return {module:model/SuggestedProduct} The populated <code>SuggestedProduct</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('currency')) {
        obj['currency'] = ApiClient.convertToType(data['currency'], 'String');
      }
      if (data.hasOwnProperty('image')) {
        obj['image'] = Image.constructFromObject(data['image']);
      }
      if (data.hasOwnProperty('link')) {
        obj['link'] = ApiClient.convertToType(data['link'], 'String');
      }
      if (data.hasOwnProperty('price')) {
        obj['price'] = ApiClient.convertToType(data['price'], 'Number');
      }
      if (data.hasOwnProperty('product_id')) {
        obj['product_id'] = ApiClient.convertToType(data['product_id'], 'String');
      }
      if (data.hasOwnProperty('product_name')) {
        obj['product_name'] = ApiClient.convertToType(data['product_name'], 'String');
      }
    }
    return obj;
  }

  /**
   * The ISO 4217 mnemonic code of the currency.
   * @member {String} currency
   */
  exports.prototype['currency'] = undefined;
  /**
   * The first image of the product hit for the configured viewtype.
   * @member {module:model/Image} image
   */
  exports.prototype['image'] = undefined;
  /**
   * The URL addressing the product.
   * @member {String} link
   */
  exports.prototype['link'] = undefined;
  /**
   * The sales price of the product. In the case of complex products like a master or a set, this is the minimum price of  related child products.
   * @member {Number} price
   */
  exports.prototype['price'] = undefined;
  /**
   * The id (SKU) of the product.
   * @member {String} product_id
   */
  exports.prototype['product_id'] = undefined;
  /**
   * The localized name of the product.
   * @member {String} product_name
   */
  exports.prototype['product_name'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.SuggestedTerm = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The SuggestedTerm model module.
   * @module model/SuggestedTerm
   * @version 17.3
   */

  /**
   * Constructs a new <code>SuggestedTerm</code>.
   * Document representing a suggested term.
   * @alias module:model/SuggestedTerm
   * @class
   */
  var exports = function() {
    var _this = this;





  };

  /**
   * Constructs a <code>SuggestedTerm</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SuggestedTerm} obj Optional instance to populate.
   * @return {module:model/SuggestedTerm} The populated <code>SuggestedTerm</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('completed')) {
        obj['completed'] = ApiClient.convertToType(data['completed'], 'Boolean');
      }
      if (data.hasOwnProperty('corrected')) {
        obj['corrected'] = ApiClient.convertToType(data['corrected'], 'Boolean');
      }
      if (data.hasOwnProperty('exact_match')) {
        obj['exact_match'] = ApiClient.convertToType(data['exact_match'], 'Boolean');
      }
      if (data.hasOwnProperty('value')) {
        obj['value'] = ApiClient.convertToType(data['value'], 'String');
      }
    }
    return obj;
  }

  /**
   * Returns whether this term value is a completion match.
   * @member {Boolean} completed
   */
  exports.prototype['completed'] = undefined;
  /**
   * Returns whether this term value is a correction match.
   * @member {Boolean} corrected
   */
  exports.prototype['corrected'] = undefined;
  /**
   * Returns whether this term value is a exact match.
   * @member {Boolean} exact_match
   */
  exports.prototype['exact_match'] = undefined;
  /**
   * Returns the term value.
   * @member {String} value
   */
  exports.prototype['value'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/SuggestedTerm'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./SuggestedTerm'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.SuggestedTerms = factory(root.ShopApi.ApiClient, root.ShopApi.SuggestedTerm);
  }
}(this, function(ApiClient, SuggestedTerm) {
  'use strict';




  /**
   * The SuggestedTerms model module.
   * @module model/SuggestedTerms
   * @version 17.3
   */

  /**
   * Constructs a new <code>SuggestedTerms</code>.
   * Document representing a list of suggested terms for each term of a search phrase.
   * @alias module:model/SuggestedTerms
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>SuggestedTerms</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SuggestedTerms} obj Optional instance to populate.
   * @return {module:model/SuggestedTerms} The populated <code>SuggestedTerms</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('original_term')) {
        obj['original_term'] = ApiClient.convertToType(data['original_term'], 'String');
      }
      if (data.hasOwnProperty('terms')) {
        obj['terms'] = ApiClient.convertToType(data['terms'], [SuggestedTerm]);
      }
    }
    return obj;
  }

  /**
   * Returns the original term that the suggested terms relates to.
   * @member {String} original_term
   */
  exports.prototype['original_term'] = undefined;
  /**
   * Returns the suggested terms.
   * @member {Array.<module:model/SuggestedTerm>} terms
   */
  exports.prototype['terms'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/SuggestedCategory', 'model/SuggestedContent', 'model/SuggestedPhrase', 'model/SuggestedProduct', 'model/SuggestedTerms'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./SuggestedCategory'), require('./SuggestedContent'), require('./SuggestedPhrase'), require('./SuggestedProduct'), require('./SuggestedTerms'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.Suggestion = factory(root.ShopApi.ApiClient, root.ShopApi.SuggestedCategory, root.ShopApi.SuggestedContent, root.ShopApi.SuggestedPhrase, root.ShopApi.SuggestedProduct, root.ShopApi.SuggestedTerms);
  }
}(this, function(ApiClient, SuggestedCategory, SuggestedContent, SuggestedPhrase, SuggestedProduct, SuggestedTerms) {
  'use strict';




  /**
   * The Suggestion model module.
   * @module model/Suggestion
   * @version 17.3
   */

  /**
   * Constructs a new <code>Suggestion</code>.
   * Document representing a suggestion.
   * @alias module:model/Suggestion
   * @class
   */
  var exports = function() {
    var _this = this;








  };

  /**
   * Constructs a <code>Suggestion</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Suggestion} obj Optional instance to populate.
   * @return {module:model/Suggestion} The populated <code>Suggestion</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('brands')) {
        obj['brands'] = ApiClient.convertToType(data['brands'], ['String']);
      }
      if (data.hasOwnProperty('categories')) {
        obj['categories'] = ApiClient.convertToType(data['categories'], [SuggestedCategory]);
      }
      if (data.hasOwnProperty('content')) {
        obj['content'] = ApiClient.convertToType(data['content'], [SuggestedContent]);
      }
      if (data.hasOwnProperty('custom_suggestions')) {
        obj['custom_suggestions'] = ApiClient.convertToType(data['custom_suggestions'], ['String']);
      }
      if (data.hasOwnProperty('products')) {
        obj['products'] = ApiClient.convertToType(data['products'], [SuggestedProduct]);
      }
      if (data.hasOwnProperty('suggested_phrases')) {
        obj['suggested_phrases'] = ApiClient.convertToType(data['suggested_phrases'], [SuggestedPhrase]);
      }
      if (data.hasOwnProperty('suggested_terms')) {
        obj['suggested_terms'] = ApiClient.convertToType(data['suggested_terms'], [SuggestedTerms]);
      }
    }
    return obj;
  }

  /**
   * The sorted list of suggested brands. This list can be empty.
   * @member {Array.<String>} brands
   */
  exports.prototype['brands'] = undefined;
  /**
   * The sorted list of suggested categories. This list can be empty.
   * @member {Array.<module:model/SuggestedCategory>} categories
   */
  exports.prototype['categories'] = undefined;
  /**
   * The sorted list of suggested content. This list can be empty.
   * @member {Array.<module:model/SuggestedContent>} content
   */
  exports.prototype['content'] = undefined;
  /**
   * The sorted list of suggested custom suggestions. This list can be empty.
   * @member {Array.<String>} custom_suggestions
   */
  exports.prototype['custom_suggestions'] = undefined;
  /**
   * The sorted list of suggested products. This list can be empty.
   * @member {Array.<module:model/SuggestedProduct>} products
   */
  exports.prototype['products'] = undefined;
  /**
   * A list of suggested phrases. This list can be empty.
   * @member {Array.<module:model/SuggestedPhrase>} suggested_phrases
   */
  exports.prototype['suggested_phrases'] = undefined;
  /**
   * A list of suggested terms. This list can be empty.
   * @member {Array.<module:model/SuggestedTerms>} suggested_terms
   */
  exports.prototype['suggested_terms'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Suggestion'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Suggestion'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.SuggestionResult = factory(root.ShopApi.ApiClient, root.ShopApi.Suggestion);
  }
}(this, function(ApiClient, Suggestion) {
  'use strict';




  /**
   * The SuggestionResult model module.
   * @module model/SuggestionResult
   * @version 17.3
   */

  /**
   * Constructs a new <code>SuggestionResult</code>.
   * Document representing a search suggestion result.
   * @alias module:model/SuggestionResult
   * @class
   */
  var exports = function() {
    var _this = this;







  };

  /**
   * Constructs a <code>SuggestionResult</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SuggestionResult} obj Optional instance to populate.
   * @return {module:model/SuggestionResult} The populated <code>SuggestionResult</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('brand_suggestions')) {
        obj['brand_suggestions'] = Suggestion.constructFromObject(data['brand_suggestions']);
      }
      if (data.hasOwnProperty('category_suggestions')) {
        obj['category_suggestions'] = Suggestion.constructFromObject(data['category_suggestions']);
      }
      if (data.hasOwnProperty('content_suggestions')) {
        obj['content_suggestions'] = Suggestion.constructFromObject(data['content_suggestions']);
      }
      if (data.hasOwnProperty('custom_suggestions')) {
        obj['custom_suggestions'] = Suggestion.constructFromObject(data['custom_suggestions']);
      }
      if (data.hasOwnProperty('product_suggestions')) {
        obj['product_suggestions'] = Suggestion.constructFromObject(data['product_suggestions']);
      }
      if (data.hasOwnProperty('query')) {
        obj['query'] = ApiClient.convertToType(data['query'], 'String');
      }
    }
    return obj;
  }

  /**
   * Returns the suggested brands.
   * @member {module:model/Suggestion} brand_suggestions
   */
  exports.prototype['brand_suggestions'] = undefined;
  /**
   * Returns the suggested categories.
   * @member {module:model/Suggestion} category_suggestions
   */
  exports.prototype['category_suggestions'] = undefined;
  /**
   * Returns the suggested content.
   * @member {module:model/Suggestion} content_suggestions
   */
  exports.prototype['content_suggestions'] = undefined;
  /**
   * Returns the suggested custom suggestions.
   * @member {module:model/Suggestion} custom_suggestions
   */
  exports.prototype['custom_suggestions'] = undefined;
  /**
   * Returns the suggested products.
   * @member {module:model/Suggestion} product_suggestions
   */
  exports.prototype['product_suggestions'] = undefined;
  /**
   * The query phrase to search for.
   * @member {String} query
   */
  exports.prototype['query'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.TermFilter = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The TermFilter model module.
   * @module model/TermFilter
   * @version 17.3
   */

  /**
   * Constructs a new <code>TermFilter</code>.
   * Document representing a term filter.  
   * @alias module:model/TermFilter
   * @class
   * @param field {String} The filter field.
   * @param operator {module:model/TermFilter.OperatorEnum} The operator to compare the field's values with the given ones.
   */
  var exports = function(field, operator) {
    var _this = this;

    _this['field'] = field;
    _this['operator'] = operator;

  };

  /**
   * Constructs a <code>TermFilter</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TermFilter} obj Optional instance to populate.
   * @return {module:model/TermFilter} The populated <code>TermFilter</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('field')) {
        obj['field'] = ApiClient.convertToType(data['field'], 'String');
      }
      if (data.hasOwnProperty('operator')) {
        obj['operator'] = ApiClient.convertToType(data['operator'], 'String');
      }
      if (data.hasOwnProperty('values')) {
        obj['values'] = ApiClient.convertToType(data['values'], [Object]);
      }
    }
    return obj;
  }

  /**
   * The filter field.
   * @member {String} field
   */
  exports.prototype['field'] = undefined;
  /**
   * The operator to compare the field's values with the given ones.
   * @member {module:model/TermFilter.OperatorEnum} operator
   */
  exports.prototype['operator'] = undefined;
  /**
   * The filter values.
   * @member {Array.<Object>} values
   */
  exports.prototype['values'] = undefined;


  /**
   * Allowed values for the <code>operator</code> property.
   * @enum {String}
   * @readonly
   */
  exports.OperatorEnum = {
    /**
     * value: "is"
     * @const
     */
    "is": "is",
    /**
     * value: "one_of"
     * @const
     */
    "one_of": "one_of",
    /**
     * value: "is_null"
     * @const
     */
    "is_null": "is_null",
    /**
     * value: "is_not_null"
     * @const
     */
    "is_not_null": "is_not_null",
    /**
     * value: "less"
     * @const
     */
    "less": "less",
    /**
     * value: "greater"
     * @const
     */
    "greater": "greater",
    /**
     * value: "not_in"
     * @const
     */
    "not_in": "not_in",
    /**
     * value: "neq"
     * @const
     */
    "neq": "neq"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.TermQuery = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The TermQuery model module.
   * @module model/TermQuery
   * @version 17.3
   */

  /**
   * Constructs a new <code>TermQuery</code>.
   * A term query matches one (or more) value(s) against one (or more) document field(s). A document is considered a hit  if one of the values matches (exactly) with at least one of the given fields.  The operator \&quot;is\&quot; can only take  one value, while \&quot;one_of\&quot; can take multiple. If multiple fields are specified, they are combined using the OR operator.  
   * @alias module:model/TermQuery
   * @class
   * @param fields {Array.<String>} The document field(s), the value(s) are matched against, combined with the operator.
   * @param operator {module:model/TermQuery.OperatorEnum} Returns the operator to use for the term query.
   */
  var exports = function(fields, operator) {
    var _this = this;

    _this['fields'] = fields;
    _this['operator'] = operator;

  };

  /**
   * Constructs a <code>TermQuery</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TermQuery} obj Optional instance to populate.
   * @return {module:model/TermQuery} The populated <code>TermQuery</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('fields')) {
        obj['fields'] = ApiClient.convertToType(data['fields'], ['String']);
      }
      if (data.hasOwnProperty('operator')) {
        obj['operator'] = ApiClient.convertToType(data['operator'], 'String');
      }
      if (data.hasOwnProperty('values')) {
        obj['values'] = ApiClient.convertToType(data['values'], [Object]);
      }
    }
    return obj;
  }

  /**
   * The document field(s), the value(s) are matched against, combined with the operator.
   * @member {Array.<String>} fields
   */
  exports.prototype['fields'] = undefined;
  /**
   * Returns the operator to use for the term query.
   * @member {module:model/TermQuery.OperatorEnum} operator
   */
  exports.prototype['operator'] = undefined;
  /**
   * The values, the field(s) are compared against, combined with the operator.
   * @member {Array.<Object>} values
   */
  exports.prototype['values'] = undefined;


  /**
   * Allowed values for the <code>operator</code> property.
   * @enum {String}
   * @readonly
   */
  exports.OperatorEnum = {
    /**
     * value: "is"
     * @const
     */
    "is": "is",
    /**
     * value: "one_of"
     * @const
     */
    "one_of": "one_of",
    /**
     * value: "is_null"
     * @const
     */
    "is_null": "is_null",
    /**
     * value: "is_not_null"
     * @const
     */
    "is_not_null": "is_not_null",
    /**
     * value: "less"
     * @const
     */
    "less": "less",
    /**
     * value: "greater"
     * @const
     */
    "greater": "greater",
    /**
     * value: "not_in"
     * @const
     */
    "not_in": "not_in",
    /**
     * value: "neq"
     * @const
     */
    "neq": "neq"  };


  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.TextQuery = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The TextQuery model module.
   * @module model/TextQuery
   * @version 17.3
   */

  /**
   * Constructs a new <code>TextQuery</code>.
   * A text query is used to match some text (i.e. a search phrase possibly consisting of multiple terms) against one or  multiple fields. In case multiple fields are provided, the phrase conceptually forms a logical OR over the fields. In  this case, the terms of the phrase basically have to match within the text, that would result in concatenating all  given fields.  
   * @alias module:model/TextQuery
   * @class
   * @param fields {Array.<String>} The document fields the search phrase has to match against.
   * @param searchPhrase {String} A search phrase, which may consist of multiple terms.
   */
  var exports = function(fields, searchPhrase) {
    var _this = this;

    _this['fields'] = fields;
    _this['search_phrase'] = searchPhrase;
  };

  /**
   * Constructs a <code>TextQuery</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TextQuery} obj Optional instance to populate.
   * @return {module:model/TextQuery} The populated <code>TextQuery</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('fields')) {
        obj['fields'] = ApiClient.convertToType(data['fields'], ['String']);
      }
      if (data.hasOwnProperty('search_phrase')) {
        obj['search_phrase'] = ApiClient.convertToType(data['search_phrase'], 'String');
      }
    }
    return obj;
  }

  /**
   * The document fields the search phrase has to match against.
   * @member {Array.<String>} fields
   */
  exports.prototype['fields'] = undefined;
  /**
   * A search phrase, which may consist of multiple terms.
   * @member {String} search_phrase
   */
  exports.prototype['search_phrase'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.Variant = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Variant model module.
   * @module model/Variant
   * @version 17.3
   */

  /**
   * Constructs a new <code>Variant</code>.
   * Document representing a product variation.
   * @alias module:model/Variant
   * @class
   * @param link {String} The URL addressing the product.
   * @param productId {String} The id (SKU) of the variant.
   */
  var exports = function(link, productId) {
    var _this = this;

    _this['link'] = link;


    _this['product_id'] = productId;

  };

  /**
   * Constructs a <code>Variant</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Variant} obj Optional instance to populate.
   * @return {module:model/Variant} The populated <code>Variant</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('link')) {
        obj['link'] = ApiClient.convertToType(data['link'], 'String');
      }
      if (data.hasOwnProperty('orderable')) {
        obj['orderable'] = ApiClient.convertToType(data['orderable'], 'Boolean');
      }
      if (data.hasOwnProperty('price')) {
        obj['price'] = ApiClient.convertToType(data['price'], 'Number');
      }
      if (data.hasOwnProperty('product_id')) {
        obj['product_id'] = ApiClient.convertToType(data['product_id'], 'String');
      }
      if (data.hasOwnProperty('variation_values')) {
        obj['variation_values'] = ApiClient.convertToType(data['variation_values'], {'String': 'String'});
      }
    }
    return obj;
  }

  /**
   * The URL addressing the product.
   * @member {String} link
   */
  exports.prototype['link'] = undefined;
  /**
   * A flag indicating whether the variant is orderable.
   * @member {Boolean} orderable
   */
  exports.prototype['orderable'] = undefined;
  /**
   * The sales price of the variant.
   * @member {Number} price
   */
  exports.prototype['price'] = undefined;
  /**
   * The id (SKU) of the variant.
   * @member {String} product_id
   */
  exports.prototype['product_id'] = undefined;
  /**
   * The actual variation attribute id - value pairs.
   * @member {Object.<String, String>} variation_values
   */
  exports.prototype['variation_values'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/VariationAttributeValue'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./VariationAttributeValue'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.VariationAttribute = factory(root.ShopApi.ApiClient, root.ShopApi.VariationAttributeValue);
  }
}(this, function(ApiClient, VariationAttributeValue) {
  'use strict';




  /**
   * The VariationAttribute model module.
   * @module model/VariationAttribute
   * @version 17.3
   */

  /**
   * Constructs a new <code>VariationAttribute</code>.
   * @alias module:model/VariationAttribute
   * @class
   * @param id {String} 
   */
  var exports = function(id) {
    var _this = this;

    _this['id'] = id;


  };

  /**
   * Constructs a <code>VariationAttribute</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/VariationAttribute} obj Optional instance to populate.
   * @return {module:model/VariationAttribute} The populated <code>VariationAttribute</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('values')) {
        obj['values'] = ApiClient.convertToType(data['values'], [VariationAttributeValue]);
      }
    }
    return obj;
  }

  /**
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * @member {Array.<module:model/VariationAttributeValue>} values
   */
  exports.prototype['values'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.VariationAttributeValue = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The VariationAttributeValue model module.
   * @module model/VariationAttributeValue
   * @version 17.3
   */

  /**
   * Constructs a new <code>VariationAttributeValue</code>.
   * @alias module:model/VariationAttributeValue
   * @class
   * @param value {String} 
   */
  var exports = function(value) {
    var _this = this;




    _this['value'] = value;
  };

  /**
   * Constructs a <code>VariationAttributeValue</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/VariationAttributeValue} obj Optional instance to populate.
   * @return {module:model/VariationAttributeValue} The populated <code>VariationAttributeValue</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('orderable')) {
        obj['orderable'] = ApiClient.convertToType(data['orderable'], 'Boolean');
      }
      if (data.hasOwnProperty('value')) {
        obj['value'] = ApiClient.convertToType(data['value'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * @member {Boolean} orderable
   */
  exports.prototype['orderable'] = undefined;
  /**
   * @member {String} value
   */
  exports.prototype['value'] = undefined;



  return exports;
}));


;/**
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
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.ShopApi) {
      root.ShopApi = {};
    }
    root.ShopApi.VariationGroup = factory(root.ShopApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The VariationGroup model module.
   * @module model/VariationGroup
   * @version 17.3
   */

  /**
   * Constructs a new <code>VariationGroup</code>.
   * Document representing a variation group.
   * @alias module:model/VariationGroup
   * @class
   */
  var exports = function() {
    var _this = this;






  };

  /**
   * Constructs a <code>VariationGroup</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/VariationGroup} obj Optional instance to populate.
   * @return {module:model/VariationGroup} The populated <code>VariationGroup</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('link')) {
        obj['link'] = ApiClient.convertToType(data['link'], 'String');
      }
      if (data.hasOwnProperty('orderable')) {
        obj['orderable'] = ApiClient.convertToType(data['orderable'], 'Boolean');
      }
      if (data.hasOwnProperty('price')) {
        obj['price'] = ApiClient.convertToType(data['price'], 'Number');
      }
      if (data.hasOwnProperty('product_id')) {
        obj['product_id'] = ApiClient.convertToType(data['product_id'], 'String');
      }
      if (data.hasOwnProperty('variation_values')) {
        obj['variation_values'] = ApiClient.convertToType(data['variation_values'], {'String': 'String'});
      }
    }
    return obj;
  }

  /**
   * The URL addressing the product.
   * @member {String} link
   */
  exports.prototype['link'] = undefined;
  /**
   * A flag indicating whether the variation group is orderable.
   * @member {Boolean} orderable
   */
  exports.prototype['orderable'] = undefined;
  /**
   * The sales price of the variation group.
   * @member {Number} price
   */
  exports.prototype['price'] = undefined;
  /**
   * The id (SKU) of the variation group.
   * @member {String} product_id
   */
  exports.prototype['product_id'] = undefined;
  /**
   * The actual variation attribute id - value pairs.
   * @member {Object.<String, String>} variation_values
   */
  exports.prototype['variation_values'] = undefined;



  return exports;
}));


