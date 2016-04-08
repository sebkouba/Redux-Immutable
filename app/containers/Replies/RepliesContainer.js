import React, { PropTypes } from 'react'
import { Replies } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as repliesActionCreators from 'redux/modules/replies'
import { staleReplies } from 'helpers/utils'
import { Map, OrderedMap } from 'immutable'

const RepliesContainer = React.createClass({
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    lastUpdated: PropTypes.number.isRequired,
    replies: PropTypes.instanceOf(Map),
    fetchAndHandleReplies: PropTypes.func.isRequired,
    duckId: PropTypes.string.isRequired,
  },
  getDefaultProps () {
    return {
      lastUpdated: 0,
      replies: OrderedMap(),
    }
  },
  componentDidMount () {
    if (staleReplies(this.props.lastUpdated)) {
      this.props.fetchAndHandleReplies(this.props.duckId)
    }
  },
  render () {
    return (
      <Replies
        isFetching={this.props.isFetching}
        error={this.props.error}
        lastUpdated={this.props.lastUpdated}
        replies={this.props.replies} />
    )
  },
})

function mapStateToProps (state, props) {
  const duckRepliesInfo = state.replies.get(props.duckId) || Map()
  return {
    isFetching: state.replies.get('isFetching'),
    error: state.replies.get('error'),
    lastUpdated: duckRepliesInfo.get('lastUpdated'),
    replies: duckRepliesInfo.get('replies'),
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(repliesActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RepliesContainer)
