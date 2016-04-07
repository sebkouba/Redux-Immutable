import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { User } from 'components'
import * as usersDucksActionCreators from 'redux/modules/usersDucks'
import * as usersActionCreaetors from 'redux/modules/users'
import { staleDucks, staleUser } from 'helpers/utils'

const UserContainer = React.createClass({
  propTypes: {
    name: PropTypes.string.isRequired,
    noUser: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    lastUpdated: PropTypes.number.isRequired,
    duckIds: PropTypes.array.isRequired,
    routeParams: PropTypes.shape({uid: PropTypes.string.isRequired})
  },
  componentDidMount () {
    const uid = this.props.routeParams.uid
    if (this.props.noUser === true || staleUser(this.props.lastUpdated)) {
      this.props.fetchAndHandleUser(uid)
    }

    if (this.props.noUser === true || staleDucks(this.props.lastUpdated)) {
      this.props.fetchAndHandleUsersDucks(uid)
    }
  },
  render () {
    return (
      <User
        noUser={this.props.noUser}
        name={this.props.name}
        isFetching={this.props.isFetching}
        error={this.props.error}
        duckIds={this.props.duckIds} />
    )
  }
})

function mapStateToProps ({users, usersDucks}, props) {
  const specificUsersDucks = usersDucks[props.routeParams.uid]
  const user = users[props.routeParams.uid]
  const noUser = typeof user === 'undefined'
  const name = noUser ? '' : user.info.name
  return {
    noUser,
    name,
    isFetching: users.isFetching || usersDucks.isFetching,
    error: users.error || usersDucks.error,
    lastUpdated: specificUsersDucks ? specificUsersDucks.lastUpdated : 0,
    duckIds: specificUsersDucks ? specificUsersDucks.duckIds : [],
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...usersDucksActionCreators,
    ...usersActionCreaetors
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserContainer)
