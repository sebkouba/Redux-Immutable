import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import getRoutes from 'config/routes'
import users from 'redux/reducers/users'

const store = createStore(users)
const routes = getRoutes()

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('app')
)
