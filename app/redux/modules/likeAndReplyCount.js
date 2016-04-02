import { fetchLikeAndReplyCount } from 'helpers/api'

import { ADD_LIKE, REMOVE_LIKE } from './usersLikes'
const FETCH_COUNTS = 'FETCH_COUNTS'
const FETCH_COUNTS_ERROR = 'FETCH_COUNTS_ERROR'
const FETCH_COUNTS_SUCCESS = 'FETCH_COUNTS_SUCCESS'

function fetchCounts () {
  return {
    type: FETCH_COUNTS,
  }
}

function fetchCountsError (error) {
  return {
    type: FETCH_COUNTS_ERROR,
    error,
  }
}

function fetchCountSuccess (duckId, counts) {
  return {
    type: FETCH_COUNTS_SUCCESS,
    duckId,
    counts,
  }
}

export function initLikeAndReplyFetch (duckId) {
  return function (dispatch, getState) {
    dispatch(fetchCounts())

    fetchLikeAndReplyCount(duckId)
      .then((counts) => dispatch(fetchCountSuccess(duckId, counts)))
      .catch((error) => dispatch(fetchCountsError(error)))
  }
}

const initialCountState = {
  numberOfLikes: 0,
  numberOfReplies: 0
}

function count (state = initialCountState, action) {
  const type = action.type
  switch (type) {
    case ADD_LIKE :
      return {
        ...state,
        numberOfLikes: state.numberOfLikes + 1
      }
    case REMOVE_LIKE :
      return {
        ...state,
        numberOfLikes: state.numberOfLikes - 1
      }
    default :
      return state
  }
}

const initialState = {
  isFetching: false,
  error: '',
  lastUpdate: 0,
}

export default function likeAndReplyCount (state = initialState, action) {
  const type = action.type
  switch (type) {
    case FETCH_COUNTS :
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_COUNTS_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case FETCH_COUNTS_SUCCESS :
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.duckId]: action.counts
      }
    case ADD_LIKE :
    case REMOVE_LIKE :
      return typeof state[action.duckId] === 'undefined'
        ? state
        : {
          ...state,
          [action.duckId]: count(state[action.duckId], action)
        }
    default :
      return state
  }
}