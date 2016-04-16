import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducers from './reducers'
import StockGraph from './containers/StockGraph'

var isProduction = process.env.NODE_ENV === 'production';

const middleware = isProduction ? [ thunk ]:[thunk, logger()]
let store = createStore(
	reducers,
	applyMiddleware(...middleware)
)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
      	<StockGraph />
      </Provider>
    );
  }
}