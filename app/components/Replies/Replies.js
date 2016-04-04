import React, { PropTypes } from 'react'
import { repliesContainer, avatar, replyContainer, header, content, cushion, center, replyHeader, author } from './styles.css'
import { Duck } from 'components'
const { bool, string, number, object, func } = PropTypes
import { formatTimestamp } from 'helpers/utils'

function Reply ({comment}) {
  return (
    <div className={replyContainer}>
      <img src={comment.avatar} alt={comment.name} className={avatar}/>
      <div>
        <div className={author}>{comment.name}</div>
        <div className={cushion}>{formatTimestamp(comment.timestamp)}</div>
        <div className={cushion}>{comment.reply}</div>
      </div>
    </div>
  )
}

function Replies (props) {
  const replyIds = Object.keys(props.replies)
  return (
    <div>
      {props.error === true ? <h3 className={center}>Error: {props.error}</h3> : null}
      {props.isFetching === true
        ? <p>Fetching Replies</p>
        : <div>
            <h1 className={header}>Replies</h1>
            {replyIds.map((replyId) => (
              <Reply key={replyId} comment={props.replies[replyId]} />
            ))}
          </div>}
      {replyIds.length === 0 ? <h3 className={center}>Be the first to comment.</h3> : null}
    </div>
  )
}

Replies.propTypes = {
  isFetching: bool.isRequired,
  error: string.isRequired,
  lastUpdated: number,
  replies: object,
  fetchAndHandleReplies: func,
  duckId: string,
}

export default Replies
