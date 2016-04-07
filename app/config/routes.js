import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import {
  MainContainer, HomeContainer, AuthenticateContainer,
  FeedContainer, LogoutContainer, DuckDetailsContainer,
  UserContainer,
} from 'containers'

export default function getRoutes (checkAuth, history) {
  return (
    <Router history={history} onEnter={checkAuth}>
      <Route path='/' component={MainContainer}>
        <Route path='feed' component={FeedContainer} onEnter={checkAuth} />
        <Route path='logout' component={LogoutContainer} />
        <Route path='auth' component={AuthenticateContainer} onEnter={checkAuth} />
        <Route path='duckDetail/:duckId' component={DuckDetailsContainer} onEnter={checkAuth} />
        <Route path='/:uid' component={UserContainer} onEnter={checkAuth} />
        <IndexRoute component={HomeContainer} onEnter={checkAuth} />
      </Route>
    </Router>
  )
}
