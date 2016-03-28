import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import getRoutes from 'config/routes'
import users from 'redux/modules/users'

const store = createStore(users, applyMiddleware(thunk))

function checkAuth (nextState, replace) {
  const { isAuthed } = store.getState()

  if (nextState.location.pathname === '/') {
    if (isAuthed === true) {
      replace('/feed')
    }
  } else {
    if (isAuthed === false) {
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
