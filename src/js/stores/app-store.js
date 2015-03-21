/**
 * Created by roman on 20.03.2015.
 */
var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";

var _catalog = [];
for (var i = 1; i<9; i++) {
    _catalog.push({
        id: 'Widget' + i,
        title: 'Widget #' + i,
        summary: 'This is an awesome Widget!',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        img: '/assets/product.png',
        cost: i
    });
}


var _cartItems = [];

function _removeItem(index) {
    _cartItems[index].inCart = false;
    _cartItems.splice(index, 1)
}

function _increaseItem(index) {
    _cartItems[index].qty++;
}

function _decreaseItem(index) {
    if(_cartItems[index].qty > 1) {
        _cartItems[index].qty--
    } else {
        _removeItem(index)
    }
}

function _addItem(item) {
    if (!item.inCart) {
        item.qty = 1;
        item.inCart = true;
        _cartItems.push(item)
    } else {
        _cartItems.forEach(function (cartItem, i) {
            if (cartItem.id == item.id) {
                _increaseItem(i);
            }
        });
    }
}

function _cartTotals () {
    var qty = 0, total = 0;
    _carItems.forEach(function (cartItem) {
        qty += cartItem.qty;
        total += cartItem.qty * cartItem.total;
    });
    return {qty: qty, total: total};
}

var appStore = objectAssign(EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback)
    },
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback)
    },
    getCart: function () {
        return _cartItems
    },
    getCatalog: function () {
        return _catalog
    },

    getCartTotals: function () {
        return _cartTotals();
    },

    dispatcherIndex: AppDispatcher.register(function (payload) {
        var action = payload.action; //action from handleViewAction
        switch(action.actionType) {
            case AppConstants.ADD_ITEM:
                _addItem(payload.action.item);
                break;
            case AppConstants.REMOVE_ITEM:
                _removeItem(payload.action.index);
                break;
            case AppConstants.INCREASE_ITEM:
                _increaseItem(payload.action.index);
                break;
            case AppConstants.DECREASE_ITEM:
                _decreaseItem(payload.action.index);
                break;
        }
        appStore.emitChange();
        return true;
    })
});

module.exports = appStore;