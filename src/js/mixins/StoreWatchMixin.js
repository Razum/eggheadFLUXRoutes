var React = require('react');
var appStore = require('../stores/app-store');

var StoreWatchMixin =  function (cb) {
    return {
        getInitialState: function () {
            return cb(this)
        },

        componentWillMount: function() {
            appStore.addChangeListener(this._onChange)
        },
        componentWillUnmount: function () {
            appStore.removeChangeListener(this._onChange)
        },
        _onChange: function () {
            this.setState(cb(this))
        }
    }
};

module.exports = StoreWatchMixin;
