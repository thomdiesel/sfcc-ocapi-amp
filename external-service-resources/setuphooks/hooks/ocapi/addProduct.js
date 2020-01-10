/* eslint-disable */
'use strict';

var collections = require('*/cartridge/scripts/util/collections');

/**
 * Returns the first shipping method (and maybe prevent in store pickup)
 * @param {dw.util.Collection} methods - Applicable methods from ShippingShipmentModel
 * @param {boolean} filterPickupInStore - whether to exclude PUIS method
 * @returns {dw.order.ShippingMethod} - the first shipping method (maybe non-PUIS)
 */
function getFirstApplicableShippingMethod(methods, filterPickupInStore) {
    var method;
    var iterator = methods.iterator();
    while (iterator.hasNext()) {
        method = iterator.next();
        if (!filterPickupInStore || (filterPickupInStore && !method.custom.storePickupEnabled)) {
            break;
        }
    }

    return method;
}

/**
 * Sets the default ShippingMethod for a Shipment, if absent
 * @param {dw.order.Shipment} shipment - the target Shipment object
 */
function ensureShipmentHasMethod(shipment) {
    var ShippingMgr = require('dw/order/ShippingMgr');
    var shippingMethod = shipment.shippingMethod;
    if (!shippingMethod) {
        var methods = ShippingMgr.getShipmentShippingModel(shipment).applicableShippingMethods;
        var defaultMethod = ShippingMgr.getDefaultShippingMethod();

        if (!defaultMethod) {
            // If no defaultMethod set, just use the first one
            shippingMethod = getFirstApplicableShippingMethod(methods, true);
        } else {
            // Look for defaultMethod in applicableMethods
            shippingMethod = collections.find(methods, function (method) {
                return method.ID === defaultMethod.ID;
            });
        }

        // If found, use it.  Otherwise return the first one
        if (!shippingMethod && methods && methods.length > 0) {
            shippingMethod = getFirstApplicableShippingMethod(methods, true);
        }

        if (shippingMethod) {
            shipment.setShippingMethod(shippingMethod);
        }
    }
}

function updateCart(basket, productItems) {
    var Status = require('dw/system/Status');
    var HTTPClient = require('dw/net/HTTPClient');
    var Transaction = require('dw/system/Transaction');

    ensureShipmentHasMethod(basket.shipments[0]);

    var productLineItems = basket.getAllProductLineItems().toArray();
    for (var i = 0; i < productLineItems.length; i++) { //in productItems is it productId, in basket it is productID
        if (productLineItems[i].productID === 'external-product') {
            var httpClient = new HTTPClient();
            httpClient.open('GET', 'http://headless-external-service.herokuapp.com/externalProduct');
            httpClient.setRequestHeader('Content-Type', 'application/json');
            httpClient.send();
            var externalProduct = JSON.parse(httpClient.text);
            var externalProductPrice = externalProduct.price;
            if (httpClient.statusCode == 200) {
                Transaction.wrap(function () {
                    productLineItems[i].setPriceValue(externalProduct.price);
                });
            }
        }
    }

    dw.system.HookMgr.callHook('dw.order.calculate', 'calculate', basket);

    return new Status(Status.OK);
}

exports.afterPOST = updateCart;
