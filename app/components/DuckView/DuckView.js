import React, { PropTypes } from 'react'
import { Duck } from 'components'
import { mainContainer, container, content, repliesContainer, replyTextAreaContainer, replyTextArea } from './styles.css'
import { pageHeader, darkBtn } from 'sharedStyles/styles.css'
import { RepliesContainer } from 'containers'

function Reply ({submit}) {
  const handleSubmit = (e) => {
    if (Reply.ref.value.length === 0) {
      return
    }
    submit(Reply.ref.value, e)
    Reply.ref.value = ''
  }

  return (
    <div className={replyTextAreaContainer}>
      <textarea
        className={replyTextArea}
        ref={(ref) => Reply.ref = ref}
        maxLength={140}
        type='text'
        placeholder='Your reponse'/>
      <button
        onClick={handleSubmit}
        className={darkBtn}>Submit</button>
    </div>
  )
}

function makeReply ({name, uid, avatar}, reply) {
  return {
    name,
    reply,
    uid,
    timestamp: Date.now(),
    avatar,
  }
}

export default function DuckView (props) {
  return (
    <div className={mainContainer}>
      {props.isFetching === true
        ? <p className={pageHeader}> Fetching </p>
        : <div className={container}>
            <div className={content}>
              <Duck
                favorite={props.favorite}
                unfavorite={props.unfavorite}
                hideReplyBtn={true}
                hideLikeCount={false}
                goToProfile={(e) => props.goToProfile(e)}
                isLiked={props.isLiked}
                numberOfLikes={props.numberOfLikes}
                duck={props.duck} />
              <Reply submit={(replyText) => props.addAndHandleReply(props.duck.duckId, makeReply(props.authedUser, replyText))} />
            </div>
            <div className={repliesContainer}>
              <RepliesContainer duckId={props.duck.duckId}/>
            </div>
          </div>}
    </div>
  )
}
