import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { logoutAndUnauth } from 'redux/modules/users'

const LogoutContainer = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
  },
  componentDidMount () {
    this.props.dispatch(logoutAndUnauth())
  },
  render () {
    return (
      <p style={{textAlign: 'center'}}>{'You are now logged out'}</p>
    )
  },
})

export default connect()(LogoutContainer)
