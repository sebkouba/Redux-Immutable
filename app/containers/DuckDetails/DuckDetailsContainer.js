import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { DuckDetails } from 'components'
import { bindActionCreators } from 'redux'
import { fetchAndHandleDuck, removeFetching } from 'redux/modules/ducks'
import { initLikeFetch } from 'redux/modules/likeCount'
import { addAndHandleReply } from 'redux/modules/replies'
const { func, object, string, bool, instanceOf } = PropTypes
import { Map } from 'immutable'

const DuckDetailsContainer = React.createClass({
  propTypes: {
    authedUser: instanceOf(Map).isRequired,
    duck: object,
    duckId: string.isRequired,
    error: string.isRequired,
    isFetching: bool.isRequired,
    fetchAndHandleDuck: func.isRequired,
    removeFetching: func.isRequired,
    addAndHandleReply: func.isRequired,
    initLikeFetch: func.isRequired,
  },
  componentDidMount () {
    this.props.initLikeFetch(this.props.duckId)
    if (typeof this.props.duck === 'undefined') {
      this.props.fetchAndHandleDuck(this.props.duckId)
    } else {
      this.props.removeFetching()
    }
  },
  render () {
    return (
      <DuckDetails
        authedUser={this.props.authedUser}
        duckId={this.props.duckId}
        error={this.props.error}
        isFetching={this.props.isFetching}
        addAndHandleReply={this.props.addAndHandleReply} />
    )
  },
})

function mapStateToProps ({ducks, likeCount, usersLikes, users}, props) {
  return {
    isFetching: ducks.get('isFetching') || likeCount.get('isFetching'),
    error: ducks.get('error'),
    authedUser: users.getIn([users.get('authedId'), 'info']),
    duckId: props.routeParams.duckId,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchAndHandleDuck,
    removeFetching,
    initLikeFetch,
    addAndHandleReply,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DuckDetailsContainer)
