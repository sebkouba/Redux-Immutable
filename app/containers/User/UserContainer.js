import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { User } from 'components'
import * as usersDucksActionCreators from 'redux/modules/usersDucks'
import * as usersActionCreaetors from 'redux/modules/users'
import { staleDucks, staleUser } from 'helpers/utils'
import { List } from 'immutable'

const UserContainer = React.createClass({
  propTypes: {
    name: PropTypes.string.isRequired,
    noUser: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    lastUpdated: PropTypes.number.isRequired,
    duckIds: PropTypes.instanceOf(List),
    routeParams: PropTypes.shape({uid: PropTypes.string.isRequired}),
    fetchAndHandleUsersDucks: PropTypes.func.isRequired,
    fetchAndHandleUser: PropTypes.func.isRequired,
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
  },
})

function mapStateToProps ({users, usersDucks}, props) {
  const specificUsersDucks = usersDucks.get(props.routeParams.uid)
  const user = users.get(props.routeParams.uid)
  const noUser = typeof user === 'undefined'
  const name = noUser ? '' : user.getIn(['info', 'name'])
  return {
    noUser,
    name,
    isFetching: users.get('isFetching') || usersDucks.get('isFetching'),
    error: users.get('error') || usersDucks.get('error'),
    lastUpdated: specificUsersDucks ? specificUsersDucks.get('lastUpdated') : 0,
    duckIds: specificUsersDucks ? specificUsersDucks.get('duckIds') : List(),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...usersDucksActionCreators,
    ...usersActionCreaetors,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserContainer)
