import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { DuckDetails } from 'components'
import { bindActionCreators } from 'redux'
import { fetchAndHandleDuck, removeFetching } from 'redux/modules/ducks'
import { initLikeFetch } from 'redux/modules/likeCount'
import { addAndHandleReply } from 'redux/modules/replies'
const { func, object, string, bool } = PropTypes

const DuckDetailsContainer = React.createClass({
  propTypes: {
    authedUser: object.isRequired,
    duck: object,
    error: string.isRequired,
    isFetching: bool.isRequired,
    fetchAndHandleDuck: func.isRequired,
    removeFetching: func.isRequired,
    addAndHandleReply: func.isRequired,
    initLikeFetch: func.isRequired,
    routeParams: object.isRequired,
  },
  componentDidMount () {
    this.props.initLikeFetch(this.props.routeParams.duckId)
    if (typeof this.props.duck === 'undefined') {
      this.props.fetchAndHandleDuck(this.props.routeParams.duckId)
    } else {
      this.props.removeFetching()
    }
  },
  render () {
    const duckId = this.props.routeParams.duckId
    return (
      <DuckDetails
        authedUser={this.props.authedUser}
        duckId={duckId}
        error={this.props.error}
        isFetching={this.props.isFetching}
        addAndHandleReply={this.props.addAndHandleReply} />
    )
  },
})

function mapStateToProps ({ducks, likeCount, usersLikes, users}) {
  return {
    isFetching: ducks.isFetching || likeCount.isFetching,
    error: ducks.error,
    authedUser: users[users.authedId].info,
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
