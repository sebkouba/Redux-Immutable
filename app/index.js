import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import getRoutes from 'config/routes'
import * as reducers from 'redux/modules'
import { checkIfAuthed } from 'helpers/auth'

import { ref } from 'config/constants'

const store = createStore(
  combineReducers(reducers),
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

function checkAuth (nextState, replace) {
  const isAuthed = checkIfAuthed(store)
  const nextPath = nextState.location.pathname

  if (nextPath === '/' || nextPath === '/auth') {
    if (isAuthed === true) {
      replace('/feed')
    }
  } else {
    if (isAuthed !== true) {
      replace({
        pathname: '/auth',
        state: {nextPathName: nextState.location.pathname}
      })
    }
  }
}

const routes = getRoutes(checkAuth)

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('app')
)

