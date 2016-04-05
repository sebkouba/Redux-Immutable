import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { User } from 'components'
import * as usersDucksActionCreators from 'redux/modules/usersDucks'
import * as usersActionCreaetors from 'redux/modules/users'
import { staleDucks, staleUser } from 'helpers/utils'

const UserContainer = React.createClass({
  propTypes: {
    user: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    lastUpdated: PropTypes.number.isRequired,
    duckIds: PropTypes.array.isRequired,
    routeParams: PropTypes.shape({uid: PropTypes.string.isRequired})
  },
  componentDidMount () {
    const uid = this.props.routeParams.uid

    if (staleDucks(this.props.lastUpdated)) {
      this.props.fetchAndHandleUsersDucks(uid)
    }

    if (!this.props.user || staleUser(this.props.lastUpdated)) {
      this.props.fetchAndHandleUser(uid)
    }
  },
  render () {
    return (
      <User
        name={this.props.user.info.name}
        isFetching={this.props.isFetching}
        error={this.props.error}
        duckIds={this.props.duckIds} />
    )
  }
})

function mapStateToProps ({users, usersDucks}, props) {
  const specificUsersDucks = usersDucks[props.routeParams.uid]
  return {
    user: users[props.routeParams.uid],
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
