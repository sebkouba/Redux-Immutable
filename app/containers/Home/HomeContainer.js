import React from 'react'
import { Landing } from 'components'

const HomeContainer = React.createClass({
  render () {
    return (
      <Landing />
    )
  }
})

export default HomeContainer

// this.props.isAuthenticated ? <Home /> : <Landing />