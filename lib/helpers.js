/* globals window */

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
                if ((value.value === variationValue) || (value.value === variationValue[SWATCH_ATTRIBUTE_ID])) {
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
      imageUrl = matchGroup.images[safeIndex].link;
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
  _exports.addToCartUrl = function (productId) {
    return '/cart/createBasket/' + productId + '?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.mixedProductUrl = function () {
    return '/mixedproducts?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.deleteProductUrl = function (basketId, productId) {
    return '/cart/delete/' + basketId + '/' + productId + '?lang=' + getRoot(arguments).app.site.default_locale;
  };
  _exports.isMaster = function (product) {
    let isMaster = product.type.master;
    return isMaster;
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
