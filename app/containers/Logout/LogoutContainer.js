import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { text } from './styles.css'
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
      <p className={text}>{'You are now logged out'}</p>
    )
  },
})

export default connect()(LogoutContainer)
