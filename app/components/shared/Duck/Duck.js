import React, { PropTypes } from 'react'
import { formatTimestamp } from 'helpers/utils'
import Reply from 'react-icons/lib/fa/reply'
import Star from 'react-icons/lib/fa/star-o'
import {
  duckContainer, contentContainer, avatar, action,
  content, header, text, likeReplyContainer, icon
} from './styles.css'


export default function Duck ({duck, handleClick = () => ({}), handleReply = () => ({}), handleStar = () => ({})}) {
  return (
    <div className={duckContainer} onClick={handleClick}>
      <img src={duck.avatar} className={avatar}/>
      <div className={contentContainer}>
        <div className={header}>
          <div>{duck.name}</div>
          <div>{formatTimestamp(duck.timestamp)}</div>
        </div>
        <div className={text}>{duck.text}</div>
        <div className={likeReplyContainer}>
          <Reply className={icon} onClick={handleReply} />
          <Star className={icon} onClick={handleStar} />
        </div>
      </div>
    </div>
  )
}

Duck.propTypes = {
  duck: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    numberOfLikes: PropTypes.number.isRequired,
    numberOfLikes: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    uid: PropTypes.string.isRequired,
  }),
  handleClick: PropTypes.func.isRequired,
  handleReply: PropTypes.func.isRequired,
  handleStar: PropTypes.func.isRequired,
}
