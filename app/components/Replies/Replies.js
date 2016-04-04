import React, { PropTypes } from 'react'
import {
  repliesContainer, avatar, replyContainer, header,
  content, cushion, center, replyHeader, author } from './styles.css'
import { formatTimestamp } from 'helpers/utils'
const { bool, string, number, object, func } = PropTypes

Reply.propTypes = {
  comment: object.isRequired,
}

function Reply ({comment}) {
  return (
    <div className={replyContainer}>
      <img src={comment.avatar} alt={comment.name} className={avatar} />
      <div>
        <div className={author}>{comment.name}</div>
        <div className={cushion}>{formatTimestamp(comment.timestamp)}</div>
        <div className={cushion}>{comment.reply}</div>
      </div>
    </div>
  )
}

Replies.propTypes = {
  isFetching: bool.isRequired,
  error: string.isRequired,
  replies: object,
}

function Replies ({replies, error, isFetching}) {
  const replyIds = Object.keys(replies)
  return (
    <div>
      {error === true ? <h3 className={center}>Error: {error}</h3> : null}
      {isFetching === true
        ? <p>Fetching Replies</p>
        : <div>
            <h1 className={header}>Replies</h1>
            {replyIds.map((replyId) => (
              <Reply key={replyId} comment={replies[replyId]} />
            ))}
          </div>}
      {replyIds.length === 0 ? <h3 className={center}>Be the first to comment.</h3> : null}
    </div>
  )
}

export default Replies
