/** @jsx React.DOM */
var React = require('react');
var appStore = require('../../stores/app-store');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');
var CatalogItem = require('./app-catalogitem');

function getCatalog() {
    return {items: appStore.getCatalog()};
}

var Catalog = React.createClass({
    mixins: [StoreWatchMixin(getCatalog)],
    render: function () {
        var items = this.state.items.map(function (item, i) {
            return <CatalogItem item={item} />
        });
        return (
            <div className="row">
            {items}
            </div>
        )
    }
});


module.exports = Catalog;