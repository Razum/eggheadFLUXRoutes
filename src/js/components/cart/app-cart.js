/** @jsx React.DOM */
var React = require('react');
var appStore = require('../../stores/app-store');
var RemoveFromCart = require('./app-removefromcart');
var Increase = require('./app-increase');
var Decrease = require('./app-decrease');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');


function cartItems() {
    return {items: appStore.getCart()};
}

var Cart = React.createClass({
    mixins: [StoreWatchMixin(cartItems)],
    render: function () {
        var total = 0;
        var items = this.state.items.map(function (item, i) {
            var subtotal = item.cost * item.qty;
            total += subtotal;
            return (<tr key={i}>
                <td><RemoveFromCart index={i} /></td>
                <td>{item.title}</td>
                <td>{item.qty}</td>
                <td><Increase index={i} /> <Decrease index={i} /></td>
                <td>${subtotal}</td>
            </tr>)
        });
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th>Item</th>
                        <th>Qty</th>
                        <th></th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4" className="text-right">Total</td>
                        <td>{total}</td>
                    </tr>
                </tfoot>

            </table>
        )
    }
});



module.exports = Cart;
