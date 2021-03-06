/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../../actions/app-actions');

var AddToCart = React.createClass({
    handleClick: function () {
        AppActions.addItem(this.props.item);
    },
    render: function () {
        return  <button onClick={this.handleClick} className="btn btn-default">Add To cart</button>
    }
});


module.exports = AddToCart;
