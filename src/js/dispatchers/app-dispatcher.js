/**
 * Created by roman on 20.03.2015.
 */
var Dispatcher = require('./dispatcher');
var objectAssign = require('object-assign');


var AppDispatcher = objectAssign(Dispatcher.prototype, {
    handleViewAction: function (action) {
        console.log('action', action);
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        })
    }
});


module.exports = AppDispatcher;