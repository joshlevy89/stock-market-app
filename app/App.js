import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import io from 'socket.io-client';
import reducers from './reducers'
import StockGraph from './containers/StockGraph'
import { receive_stock } from './actions'

var isProduction = process.env.NODE_ENV === 'production';

const middleware = isProduction ? [ thunk ]:[thunk, logger()]
let store = createStore(
	reducers,
	applyMiddleware(...middleware)
)

if (isProduction) {
	var socket = io('http://my-stock-watcher.herokuapp.com/' + process.env.PORT + '/');
}
else {
 	var socket = io('http://localhost:' + 3000 + '/')
}	   	
socket.on('new_stock_added', function(data) {
   store.dispatch(receive_stock(data))
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