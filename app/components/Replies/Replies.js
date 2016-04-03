import React, { PropTypes } from 'react'
import { repliesContainer, avatar, replyContainer, header, content, cushion } from './styles.css'
import { Duck } from 'components'
const { bool, string, number, object, func } = PropTypes
import { formatTimestamp } from 'helpers/utils'

function Reply ({comment}) {
  return (
    <div className={replyContainer}>
      <img src={comment.avatar} alt={comment.name} className={avatar}/>
      <div className={cushion}>{comment.name}</div>
      <div className={cushion}>{formatTimestamp(comment.timestamp)}</div>
      <div className={cushion}>{comment.reply}</div>
    </div>
  )
}

function Replies (props) {
  return (
    <div>
      {props.error === true ? <div>ERROR</div> : null}
      {props.isFetching === true
        ? <p>FETCHING</p>
        : <div>
            <h1 className={header}>Replies</h1>
            {Object.keys(props.replies).map((replyId) => (
              <Reply key={replyId} comment={props.replies[replyId]} />
            ))}
          </div>}
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