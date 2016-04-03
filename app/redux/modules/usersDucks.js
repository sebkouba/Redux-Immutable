const FETCH_USERS_DUCKS = 'FETCH_USERS_DUCKS'
const FETCH_USERS_DUCKS_FAILURE = 'FETCH_USERS_DUCKS_FAILURE'
const FETCH_USERS_DUCKS_SUCCESS = 'FETCH_USERS_DUCKS_SUCCESS'
const ADD_SINGLE_USERS_DUCK = 'ADD_SINGLE_USERS_DUCK'

export function fetchUsersDucks (uid) {
  return {
    type: FETCH_USERS_DUCKS,
    uid
  }
}

export function fetchUsersDucksFailure (error) {
  return {
    type: FETCH_USERS_DUCKS_FAILURE,
    error
  }
}

export function fetchUsersDucksSuccess (uid, duckIds, lastUpdated) {
  return {
    type: FETCH_USERS_DUCKS_SUCCESS,
    uid,
    duckIds,
    lastUpdated
  }
}

export function addSigleUsersDuck (uid, duckId) {
  return {
    type: ADD_SINGLE_USERS_DUCK,
    uid,
    duckId,
  }
}

function usersDuck (state = {}, action) {
  const type = action.type
  switch (type) {
    case ADD_SINGLE_USERS_DUCK :
      return {
        ...state,
        duckIds: state.duckIds.concat([action.duckId])
      }
    default :
      return state
  }
}

const initialState = {
  isFetching: false,
  error: false,
}

export default function usersDucks (state = initialState, action) {
  const type = action.type
  switch (type) {
    case FETCH_USERS_DUCKS :
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_USERS_DUCKS_FAILURE :
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case FETCH_USERS_DUCKS_SUCCESS :
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.uid]: {
          lastUpdated: action.timestamp,
          duckIds: action.duckIds
        }
      }
    case ADD_SINGLE_USERS_DUCK :
      return typeof state[action.uid] === 'undefined'
        ? state
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.uid]: usersDuck(state[action.uid], action)
        }
    default :
      return state
  }
}
