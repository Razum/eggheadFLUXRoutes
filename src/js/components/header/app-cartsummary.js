/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router-component').Link;
var appStore = require('../../stores/app-store');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');

function CartTotals () {
    return appStore.getCartTotals();
}

var CartSummary = React.createClass({
    mixins:['StoreWatchMixin'],
    getInitialState: function () {
        return {
            qty: 0,
            total: 0
        }
    },
    render: function () {

        return (
            <div>
                <Link href="/cart" className="btn btn-success">
                    Cart Items: {this.state.qty} / ${this.state.total}
                </Link>
            </div>
        )
    }
});

module.exports = CartSummary;