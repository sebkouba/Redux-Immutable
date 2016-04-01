import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Feed } from 'components'
import * as feedActionCreators from 'redux/modules/feed'
import * as listenerActionCreators from 'redux/modules/listeners'

const FeedContainer = React.createClass({
  propTypes: {
    newDucksAvailable: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    ducks: PropTypes.array.isRequired,
    removeListener: PropTypes.func.isRequired,
    setAndHandleFeedListener: PropTypes.func.isRequired,
    off: PropTypes.func,
  },
  componentDidMount () {
    this.props.setAndHandleFeedListener()
  },
  componentWillUnmount () {
    this.props.removeListener('feed', this.props.off)
  },
  render () {
    return (
      <Feed {...this.props}/>
    )
  },
})

function mapStateToProps ({feed, ducks, listeners}) {
  const { newDucksAvailable, error, isFetching, duckIds } = feed
  return {
    newDucksAvailable,
    error,
    isFetching,
    ducks: duckIds.map((id) => ducks[id]),
    off: listeners.feed
  }
}

export default connect(
  mapStateToProps,
  (dispatch) => bindActionCreators({...feedActionCreators, ...listenerActionCreators}, dispatch)
)(FeedContainer)