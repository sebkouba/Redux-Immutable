import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Authenticate } from 'components'
import auth from 'helpers/auth'
import * as userActionCreators from 'redux/modules/users'

const AuthenticateContainer = React.createClass({
  handleAuth () {
    this.props.fetchAndHandleUser()
  },
  render () {
    return (
      <Authenticate
        onAuth={this.handleAuth}
        isFetching={this.props.isFetching}
        error={this.props.error}
        user={this.props.user} />
    )
  },
})

export default connect(
  (state) => ({isFetching: state.isFetching, error: state.error, user: state['tylermcginnis']}),
  (dispatch) => bindActionCreators(userActionCreators, dispatch)
)(AuthenticateContainer)