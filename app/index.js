import React from 'react'
import ReactDOM from 'react-dom'
import routes from 'config/routes'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import * as reducers from 'redux/modules'

const store = createStore(
  combineReducers(reducers),
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
)

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
document.getElementById('app'))
