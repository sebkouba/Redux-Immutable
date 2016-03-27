import React from 'react'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { MainContainer, HomeContainer, AuthenticateContainer } from 'containers'

export default function getRoutes () {
  return (
    <Router history={hashHistory}>
      <Route path='/' component={MainContainer}>
        <Route path='auth' component={AuthenticateContainer} />
        <IndexRoute component={HomeContainer} />
      </Route>
    </Router>
  )
}
