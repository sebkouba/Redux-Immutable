import React, { PropTypes } from 'react'
import { OrderedMap } from 'immutable'
import {
  avatar, replyContainer, header,
  cushion, center, author } from './styles.css'
import { formatTimestamp } from 'helpers/utils'
import { errorMsg } from 'sharedStyles/styles.css'
const { bool, string, instanceOf, object } = PropTypes

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
  replies: instanceOf(OrderedMap),
}

function Replies ({replies, error, isFetching}) {
  return (
    <div>
      {error ? <h3 className={errorMsg}>{error}</h3> : null}
      {isFetching === true
        ? <p className={center}>{'Fetching Replies'}</p>
        : <div>
            <h1 className={header}>{'Replies'}</h1>
            {replies.valueSeq().map((reply) => (
              <Reply key={reply.timestamp + reply.uid} comment={reply} />
            ))}
          </div>}
      {replies.size === 0 ? <h3 className={center}>{'Be the first to comment. 😎'}</h3> : null}
    </div>
  )
}

export default Replies
