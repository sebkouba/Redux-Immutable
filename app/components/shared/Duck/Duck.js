import React, { PropTypes } from 'react'
import { formatTimestamp } from 'helpers/utils'
import Reply from 'react-icons/lib/fa/reply'
import Star from 'react-icons/lib/fa/star'
import {
  duckContainer, contentContainer, avatar, actionContainer,
  header, text, likeReplyContainer, icon, likedIcon
} from './styles.css'

Duck.defaultProps = {
  hideReplyBtn: false,
  hideLikeCount: true,
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
  handleClick: PropTypes.func,
  handleReply: PropTypes.func,
  isLiked: PropTypes.bool.isRequired,
  favorite: PropTypes.func.isRequired,
  unfavorite: PropTypes.func.isRequired,
  numberOfLikes: PropTypes.number,
  hideReplyBtn: PropTypes.bool.isRequired,
  hideLikeCount: PropTypes.bool.isRequired,
}

export default function Duck (props) {
  const starIcon = props.isLiked === true ? likedIcon : icon
  const starFn = props.isLiked === true ? props.unfavorite : props.favorite
  return (
    <div
      className={duckContainer}
      style={{cursor: props.handleReply ? 'pointer' : 'default'}}
      onClick={props.handleClick}>
        <img src={props.duck.avatar} className={avatar}/>
        <div className={contentContainer}>
          <div className={header}>
            <div>{props.duck.name}</div>
            <div>{formatTimestamp(props.duck.timestamp)}</div>
          </div>
          <div className={text}>{props.duck.text}</div>
          <div className={likeReplyContainer}>
            {props.hideReplyBtn === true
              ? null
              : <Reply className={icon} onClick={props.handleReply} />}
            <div className={actionContainer}>
              <Star className={starIcon} onClick={starFn} />
              {props.hideLikeCount === true ? null : <div>{props.numberOfLikes}</div>}
            </div>
          </div>
        </div>
    </div>
  )
}
