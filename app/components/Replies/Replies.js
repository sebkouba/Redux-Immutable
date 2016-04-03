import React, { PropTypes } from 'react'
const { bool, string, number, object, func } = PropTypes

function Reply ({comment}) {
  return (
    <div>
      <p>{comment.name}</p>
      <p>{comment.reply}</p>
      <p>{comment.uid}</p>
      <p>{comment.timestamp}</p>
      <p>{comment.avatar}</p>
    </div>
  )
}

const Replies = React.createClass({
  propTypes: {
    isFetching: bool.isRequired,
    error: string.isRequired,
    lastUpdated: number,
    replies: object,
    fetchAndHandleReplies: func,
    duckId: string,
  },
  componentDidMount () {
    this.props.fetchAndHandleReplies(this.props.duckId)
  },
  render () {
    console.log(this.props)
    return (
      <div>
        {this.props.error === true ? <div>ERROR</div> : null}
        {this.props.isFetching === true
          ? <p>FETCHING</p>
          : Object.keys(this.props.replies).map((replyId) => (
              <Reply key={replyId} comment={this.props.replies[replyId]} />
            ))}
      </div>
    )
  },
})

export default Replies