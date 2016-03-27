import React from 'react'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { MainContainer, HomeContainer, RegisterContainer, LoginContainer } from 'containers'

export default function getRoutes () {
  return (
    <Router history={hashHistory}>
      <Route path='/' component={MainContainer}>
        <Route path='register' component={RegisterContainer} />
        <Route path='login' component={LoginContainer} />
        <IndexRoute component={HomeContainer} />
      </Route>
    </Router>
  )
}
