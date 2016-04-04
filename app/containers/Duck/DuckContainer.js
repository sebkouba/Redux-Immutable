import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { DuckView } from 'components'
import { bindActionCreators } from 'redux'
import { fetchAndHandleDuck, removeFetching } from 'redux/modules/ducks'
import { initLikeFetch } from 'redux/modules/likeCount'
import { addAndHandleLike, handleDeleteLike } from 'redux/modules/usersLikes'
import { addAndHandleReply } from 'redux/modules/replies'
const { func, object, string, bool } = PropTypes

const DuckContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  propTypes: {
    duck: object,
    error: string.isRequired,
    isFetching: bool.isRequired,
    likes: object.isRequired,
    fetchAndHandleDuck: func.isRequired,
    removeFetching: func.isRequired,
    addAndHandleLike: func.isRequired,
    handleDeleteLike: func.isRequired,
    addAndHandleReply: func.isRequired
  },
  componentDidMount () {
    this.props.initLikeFetch(this.props.routeParams.duckId)
    if (typeof this.props.duck === 'undefined') {
      this.props.fetchAndHandleDuck(this.props.routeParams.duckId)
    } else {
      this.props.removeFetching()
    }
  },
  goToProfile (event) {
    event.stopPropagation()
    this.context.router.push('/user/' + this.props.duck.uid)
  },
  render () {
    const duckId = this.props.routeParams.duckId
    return (
      <DuckView
        addAndHandleReply={this.props.addAndHandleReply}
        authedUser={this.props.authedUser}
        favorite={(event) => this.props.addAndHandleLike(duckId, event)}
        unfavorite={(event) => this.props.handleDeleteLike(duckId, event)}
        isLiked={this.props.likes[duckId] === true}
        numberOfLikes={this.props.likeCount}
        duck={this.props.duck}
        goToProfile={this.goToProfile}
        error={this.props.error}
        isFetching={this.props.isFetching} />
    )
  },
})

function mapStateToProps ({ducks, likeCount, usersLikes, users}, props) {
  const duckId = props.routeParams.duckId
  return {
    duck: ducks[duckId],
    isFetching: ducks.isFetching || likeCount.isFetching,
    error: ducks.error,
    likeCount: likeCount[duckId],
    likes: usersLikes,
    authedUser: users[users.authedId].info
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchAndHandleDuck,
    removeFetching,
    initLikeFetch,
    addAndHandleLike,
    handleDeleteLike,
    addAndHandleReply,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DuckContainer)
