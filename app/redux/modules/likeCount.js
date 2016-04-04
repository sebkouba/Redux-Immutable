import { fetchLikeCount } from 'helpers/api'

import { ADD_LIKE, REMOVE_LIKE } from './usersLikes'
const FETCH_COUNT = 'FETCH_COUNT'
const FETCH_COUNT_ERROR = 'FETCH_COUNT_ERROR'
const FETCH_COUNT_SUCCESS = 'FETCH_COUNT_SUCCESS'

function fetchCount () {
  return {
    type: FETCH_COUNT,
  }
}

function fetchCountError (error) {
  return {
    type: FETCH_COUNT_ERROR,
    error: 'Error fetching duck\'s like count',
  }
}

function fetchCountSuccess (duckId, count) {
  return {
    type: FETCH_COUNT_SUCCESS,
    duckId,
    count,
  }
}

export function initLikeFetch (duckId) {
  return function (dispatch, getState) {
    dispatch(fetchCount())

    fetchLikeCount(duckId)
      .then((count) => dispatch(fetchCountSuccess(duckId, count)))
      .catch((error) => dispatch(fetchCountError(error)))
  }
}

function count (state = 0, action) {
  const type = action.type
  switch (type) {
    case ADD_LIKE :
      return state + 1
    case REMOVE_LIKE :
      return state - 1
    default :
      return state
  }
}

const initialState = {
  isFetching: false,
  error: '',
}

export default function likeCount (state = initialState, action) {
  const type = action.type
  switch (type) {
    case FETCH_COUNT :
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_COUNT_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case FETCH_COUNT_SUCCESS :
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.duckId]: action.count
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
