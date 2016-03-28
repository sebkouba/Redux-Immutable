import React from 'react'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { MainContainer, HomeContainer, AuthenticateContainer, FeedContainer, LogoutContainer } from 'containers'

export default function getRoutes (checkAuth) {
  return (
    <Router history={hashHistory}>
      <Route path='/' component={MainContainer}>
        <Route onEnter={checkAuth}>
          <Route path='feed' component={FeedContainer} />
          <Route path='logout' component={LogoutContainer} />
        </Route>
        <Route path='auth' component={AuthenticateContainer} />
        <IndexRoute component={HomeContainer} onEnter={checkAuth} />
      </Route>
    </Router>
  )
}
