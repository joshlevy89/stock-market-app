import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import io from 'socket.io-client';
import reducers from './reducers'
import StockGraph from './containers/StockGraph'
import { receive_stock, delete_stock } from './actions'


const middleware = isProduction ? [ thunk ]:[thunk, logger()]
let store = createStore(
	reducers,
	applyMiddleware(...middleware)
)

var isProduction = process.env.NODE_ENV === 'production';
if (isProduction) {
	//var socket = io('https://my-stock-watcher.herokuapp.com/' + process.env.PORT + '/');
	var socket = io('http://localhost:' + 3000 + '/')
}
else {
 	var socket = io('http://localhost:' + 3000 + '/')
}	   	
socket.on('new_stock_added', function(data) {
   store.dispatch(receive_stock(data))
});
socket.on('stock_deleted', function(data) {
   store.dispatch(delete_stock(data.key))
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