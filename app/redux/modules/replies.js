import { postReply, fetchReplies } from 'helpers/api'
import { Map, OrderedMap } from 'immutable'

const FETCHING_REPLIES = 'FETCHING_REPLIES'
const FETCHING_REPLIES_ERROR = 'FETCHING_REPLIES_ERROR'
const FETCHING_REPLIES_SUCCESS = 'FETCHING_REPLIES_SUCCESS'
const ADD_REPLY = 'ADD_REPLY'
const ADD_REPLY_ERROR = 'ADD_REPLY_ERROR'
const REMOVE_REPLY = 'REMOVE_REPLY'

function addReply (duckId, reply) {
  return {
    type: ADD_REPLY,
    duckId,
    reply,
  }
}

function addReplyError (error) {
  console.warn(error)
  return {
    type: ADD_REPLY_ERROR,
    error: 'Error adding reply',
  }
}

function removeReply (duckId, replyId) {
  return {
    type: REMOVE_REPLY,
    replyId,
  }
}

export function addAndHandleReply (duckId, reply) {
  return function (dispatch, getState) {
    const { replyWithId, replyPromise } = postReply(duckId, reply)

    dispatch(addReply(duckId, replyWithId))
    replyPromise.catch((error) => {
      dispatch(removeReply(duckId, replyWithId.replyId))
      dispatch(addReplyError(error))
    })
  }
}

function fetchingReplies () {
  return {
    type: FETCHING_REPLIES,
  }
}

function fetchingRepliesError (error) {
  console.warn(error)
  return {
    type: FETCHING_REPLIES_ERROR,
    error: 'Error fetching replies',
  }
}

function fetchingRepliesSuccess (duckId, replies) {
  return {
    type: FETCHING_REPLIES_SUCCESS,
    replies,
    duckId,
    lastUpdated: Date.now(),
  }
}

export function fetchAndHandleReplies (duckId) {
  return function (dispatch, getState) {
    dispatch(fetchingReplies())

    fetchReplies(duckId)
      .then((replies) => dispatch(fetchingRepliesSuccess(duckId, replies, Date.now())))
      .catch((error) => dispatch(fetchingRepliesError(error)))
  }
}

const initialReply = Map({
  name: '',
  reply: '',
  uid: '',
  timestamp: 0,
  avatar: '',
  replyId: '',
})

function duckReplies (state = initialReply, action) {
  switch (action.type) {
    case ADD_REPLY :
      return state.set(action.reply.replyId, action.reply)
    case REMOVE_REPLY :
      return state.set(action.replyId, undefined)
    default :
      return state
  }
}

const initialDuckState = Map({
  lastUpdated: Date.now(),
  replies: OrderedMap(),
})

function repliesAndLastUpated (state = initialDuckState, action) {
  switch (action.type) {
    case FETCHING_REPLIES_SUCCESS :
      return state.merge({
        lastUpdated: action.lastUpdated,
        replies: OrderedMap(action.replies),
      })
    case ADD_REPLY :
    case REMOVE_REPLY :
      return state.set('replies', duckReplies(state.get('replies'), action))
    default :
      return state
  }
}

const initialState = Map({
  isFetching: true,
  error: '',
})

export default function replies (state = initialState, action) {
  switch (action.type) {
    case FETCHING_REPLIES :
      return state.set('isFetching', true)
    case FETCHING_REPLIES_ERROR :
    case ADD_REPLY_ERROR :
      return state.merge({
        isFetching: false,
        error: action.error,
      })
    case ADD_REPLY :
    case FETCHING_REPLIES_SUCCESS :
    case REMOVE_REPLY :
      return state.merge({
        isFetching: false,
        error: '',
        [action.duckId]: repliesAndLastUpated(state.get(action.duckId), action),
      })
    default :
      return state
  }
}
