/** @jsx React.DOM */

var React = require('react');
var appStore = require('../../stores/app-store');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');
var AddToCart = require('../catalog/app-addtocart');
var Link = require('react-router-component').Link;


function getCatalogItem (component) {
    var thisItem;
    appStore.getCatalog().forEach(function (item) {
        if(item.id.toString() === component.props.item) {
            thisItem = item;
        }
    });
    return {item: thisItem};
}

var CatalogDeatil = React.createClass({
    mixins: [StoreWatchMixin(getCatalogItem)],
    render: function () {

        return (<div>
            <h2>{this.state.item.title}</h2>
            <img src={this.state.item.img} alt="" />
            <p>{this.state.item.decription}</p>
            <p>${this.state.item.cost} <span className="text-success">{this.state.item.inCart && '(' + this.state.item.qty + ' in cart)'}</span></p>
            <div className="btn-group btn-group-sm">
                <AddToCart item={this.state.item} />
                <Link href='/' className="btn btn-default">Continue Shopping</Link>
            </div>
        </div>);
    }
});

module.exports = CatalogDeatil;
