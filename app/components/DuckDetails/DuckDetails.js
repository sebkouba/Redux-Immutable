import React, { PropTypes } from 'react'
import { DuckContainer } from 'containers'
import {
  mainContainer, container, content, repliesContainer,
  replyTextAreaContainer, replyTextArea } from './styles.css'
import { subHeader, darkBtn, errorMsg } from 'sharedStyles/styles.css'
import { RepliesContainer } from 'containers'
import { formatReply } from 'helpers/utils'
import { Map } from 'immutable'

Reply.propTypes = {
  submit: PropTypes.func.isRequired,
}

function Reply ({submit}) {
  const handleSubmit = (e) => {
    if (Reply.ref.value.length === 0) return
    submit(Reply.ref.value, e)
    Reply.ref.value = ''
  }

  return (
    <div className={replyTextAreaContainer}>
      <textarea
        className={replyTextArea}
        ref={(ref) => (Reply.ref = ref)}
        maxLength={140}
        type='text'
        placeholder='Your reponse'/>
      <button
        onClick={handleSubmit}
        className={darkBtn}>
          {'Submit'}
      </button>
    </div>
  )
}

DuckDetails.propTypes = {
  authedUser: PropTypes.instanceOf(Map),
  duckId: PropTypes.string.isRequired,
  addAndHandleReply: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
}

export default function DuckDetails ({addAndHandleReply, duckId, isFetching, authedUser, error}) {
  return (
    <div className={mainContainer}>
      {isFetching === true
        ? <p className={subHeader}>{'Fetching'}</p>
        : <div className={container}>
            <div className={content}>
              <DuckContainer duckId={duckId} hideLikeCount={false} hideReplyBtn={true} />
              <Reply submit={(replyText) => addAndHandleReply(duckId, formatReply(authedUser.toJS(), replyText))} />
            </div>
            <div className={repliesContainer}>
              <RepliesContainer duckId={duckId}/>
            </div>
          </div>}
      {error ? <p className={errorMsg}>{error}</p> : null}
    </div>
  )
}
