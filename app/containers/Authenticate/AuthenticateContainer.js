import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Authenticate } from 'components'
import auth from 'helpers/auth'
import * as userActionCreators from 'redux/modules/users'

const AuthenticateContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  handleAuth (e) {
    e.preventDefault()
    this.props.fetchAndHandleUser()
      .then(() => this.context.router.replace('feed'))
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
  ({users}) => ({isFetching: users.isFetching, error: users.error, user: users[users.authedId]}),
  (dispatch) => bindActionCreators(userActionCreators, dispatch)
)(AuthenticateContainer)
