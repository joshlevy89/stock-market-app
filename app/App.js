import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducers from './reducers'


var isProduction = process.env.NODE_ENV === 'production';

const middleware = isProduction ? [ thunk ]:[thunk, logger()]
let store = createStore(
	applyMiddleware(...middleware)
)


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
      	<h1>Hello, world!</h1>
      </Provider>
    );
  }
}