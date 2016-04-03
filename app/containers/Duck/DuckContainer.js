import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { DuckView } from 'components'
import { bindActionCreators } from 'redux'
import { fetchAndHandleDuck, removeFetching } from 'redux/modules/ducks'
import { initLikeFetch } from 'redux/modules/likeCount'
import { addAndHandleLike, handleDeleteLike } from 'redux/modules/usersLikes'

const DuckContainer = React.createClass({
  propTypes: {
    duck: PropTypes.object,
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    likes: PropTypes.object.isRequired,
    fetchAndHandleDuck: PropTypes.func.isRequired,
    removeFetching: PropTypes.func.isRequired,
    addAndHandleLike: PropTypes.func.isRequired,
    handleDeleteLike: PropTypes.func.isRequired,
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
      <DuckView
        favorite={(event) => this.props.addAndHandleLike(duckId, event)}
        unfavorite={(event) => this.props.handleDeleteLike(duckId, event)}
        isLiked={this.props.likes[duckId] === true}
        numberOfLikes={this.props.likeCount}
        duck={this.props.duck}
        error={this.props.error}
        isFetching={this.props.isFetching} />
    )
  },
})

function mapStateToProps ({ducks, likeCount, usersLikes}, props) {
  const duckId = props.routeParams.duckId
  return {
    duck: ducks[duckId],
    isFetching: ducks.isFetching || likeCount.isFetching,
    error: ducks.error,
    likeCount: likeCount[duckId],
    likes: usersLikes,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchAndHandleDuck,
    removeFetching,
    initLikeFetch,
    addAndHandleLike,
    handleDeleteLike,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DuckContainer)