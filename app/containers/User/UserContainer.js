import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { User } from 'components'
import * as usersDucksActionCreators from 'redux/modules/usersDucks'
import * as usersActionCreaetors from 'redux/modules/users'
import { staleDucks, staleUser } from 'helpers/utils'

const UserContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  propTypes: {
    user: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    ducksData: PropTypes.shape({
      lastUpdated: PropTypes.number.isRequired,
      ducks: PropTypes.array.isRequired,
    }).isRequired,
    routeParams: PropTypes.shape({uid: PropTypes.string.isRequired})
  },
  componentDidMount () {
    const uid = this.props.routeParams.uid
    const { lastUpdated, duckIds } = this.props.ducksData
    if (staleDucks(this.props.ducksData.lastUpdated)) {
      this.props.fetchAndHandleUsersDucks(uid)
    }

    if (!this.props.user || staleUser(this.props.user.lastUpdated)) {
      this.props.fetchAndHandleUser(uid)
    }
  },
  goToDuckPath (duck, e) {
    e.preventDefault()
    this.context.router.push('/duckDetail/' + duck.duckId)
  },
  render () {
    return (
      <User
        name={this.props.user.info.name}
        isFetching={this.props.isFetching}
        error={this.props.error}
        ducksData={this.props.ducksData}
        goToDuckPath={this.goToDuckPath}/>
    )
  }
})

function getDucksDate (usersDucks, ducks) {
  return typeof usersDucks === 'undefined'
    ? {
        lastUpdated: 0,
        ducks: [],
      }
    : {
        lastUpdated: usersDucks.lastUpdated,
        ducks: usersDucks.duckIds.map((duckId) => ducks[duckId]).sort((a,b) => a.timestamp < b.timestamp)
      }
}

function mapStateToProps ({users, usersDucks, ducks}, props) {
  return {
    user: users[props.routeParams.uid],
    isFetching: users.isFetching || usersDucks.isFetching,
    error: users.error || usersDucks.error,
    ducksData: getDucksDate(usersDucks[props.routeParams.uid], ducks)
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
