import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import io from 'socket.io-client';
import reducers from './reducers'
import StockGraph from './containers/StockGraph'
import { receive_stock, delete_stock, receive_all_stocks } from './actions'

var isProduction = process.env.NODE_ENV === 'production';
const middleware = isProduction ? [ thunk ]:[thunk, logger()]
let store = createStore(
	reducers,
	applyMiddleware(...middleware)
)

//var socket = io.connect('/');
var socket = io.connect('/',{secure:true});
socket.on('new_stock_added', function(data) {
   store.dispatch(receive_stock(data.dataset))
});
socket.on('stock_deleted', function(data) {
   store.dispatch(delete_stock(data.id))
});
socket.on('all_stocks_sent', function(data) {
   store.dispatch(receive_all_stocks(data.datasets))
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
      	<StockGraph />
      </Provider>
    );
  }
}