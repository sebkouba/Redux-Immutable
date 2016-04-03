import React from 'react'
import { Replies } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as repliesActionCreators from 'redux/modules/replies'

function mapStateToProps (state, props) {
  const duckRepliesInfo = state.replies[props.duckId] || {}
  const { lastUpdated, replies } = duckRepliesInfo

  return {
    isFetching: state.replies.isFetching,
    error: state.replies.error,
    lastUpdated,
    replies,
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(repliesActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Replies)