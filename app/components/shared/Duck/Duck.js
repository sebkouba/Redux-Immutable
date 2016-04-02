import React, { PropTypes } from 'react'
import { formatTimestamp } from 'helpers/utils'
import Reply from 'react-icons/lib/fa/reply'
import Star from 'react-icons/lib/fa/star-o'
import {
  duckContainer, contentContainer, avatar, action,
  content, header, text, likeReplyContainer, icon, likedIcon
} from './styles.css'


export default function Duck ({duck, handleClick, handleReply, likeStar, isLiked, unlikeStar}) {
  const starIcon = isLiked === true ? likedIcon : icon
  const starFn = isLiked === true ? unlikeStar : likeStar
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
          <Star className={starIcon} onClick={starFn} />
        </div>
      </div>
    </div>
  )
}

Duck.propTypes = {
  duck: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    duckId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    uid: PropTypes.string.isRequired,
  }),
  handleClick: PropTypes.func.isRequired,
  handleReply: PropTypes.func.isRequired,
  likeStar: PropTypes.func.isRequired,
  unlikeStar: PropTypes.func.isRequired,
}
