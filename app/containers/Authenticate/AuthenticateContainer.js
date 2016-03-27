import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Authenticate } from 'components'
import auth from 'helpers/auth'
import * as userActionCreators from 'redux/modules/users'

const AuthenticateContainer = React.createClass({
  handleAuth () {
    this.props.fetchUser()
    auth().then((user) => {
      this.props.fetchUserSuccess(user.uid, user, Date.now())
    })
    .catch((error) => {
      this.props.fetchUserFailure(error)
    })
  },
  render () {
    return (
      <Authenticate onAuth={this.handleAuth}/>
    )
  },
})

function mapStateToProps (state) {
  console.log(state)
  return {
    users: state.users
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer)