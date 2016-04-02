import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Feed } from 'components'
import * as feedActionCreators from 'redux/modules/feed'
import * as listenerActionCreators from 'redux/modules/listeners'
import * as usersActionCreators from 'redux/modules/usersLikes'

const FeedContainer = React.createClass({
  propTypes: {
    addAndHandleLike: PropTypes.func.isRequired,
    ducks: PropTypes.array.isRequired,
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    handleDeleteLike: PropTypes.func.isRequired,
    likes: PropTypes.object.isRequired,
    newDucksAvailable: PropTypes.bool.isRequired,
    off: PropTypes.func,
    removeListener: PropTypes.func.isRequired,
    resetNewDucksAvailable: PropTypes.func.isRequired,
    setAndHandleFeedListener: PropTypes.func.isRequired,
    setUsersLikes: PropTypes.func.isRequired,
  },
  componentDidMount () {
    this.props.setAndHandleFeedListener()
    this.props.setUsersLikes()
  },
  componentWillUnmount () {
    this.props.removeListener('feed', this.props.off)
  },
  render () {
    return (
      <Feed {...this.props} />
    )
  },
})

function mapStateToProps ({feed, ducks, listeners, usersLikes}) {
  const { newDucksAvailable, error, isFetching, duckIds } = feed
  return {
    newDucksAvailable,
    error,
    isFetching,
    ducks: duckIds.map((id) => ducks[id]).sort((a,b) => a.timestamp < b.timestamp),
    off: listeners.feed,
    likes: usersLikes,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...feedActionCreators,
    ...listenerActionCreators,
    ...usersActionCreators,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedContainer)