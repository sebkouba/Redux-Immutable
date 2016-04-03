import React, { PropTypes } from 'react'
import { Duck } from 'components'

export default function DuckView (props) {
  return (
    <div>
      {props.isFetching === true
        ? <p> Fetching </p>
        : <Duck
            favorite={props.favorite}
            unfavorite={props.unfavorite}
            hideReplyBtn={true}
            hideLikeCount={false}
            isLiked={props.isLiked}
            numberOfLikes={props.numberOfLikes}
            duck={props.duck} />}
    </div>
  )
}
