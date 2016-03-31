const FETCH_FEED = 'FETCH_FEED'
const FETCH_FEED_ERROR = 'FETCH_FEED_ERROR'
const FETCH_FEED_SUCCESS = 'FETCH_FEED_SUCCESS'
const NEW_DUCKS_AVAILABLE = 'NEW_DUCKS_AVAILABLE'
const RESET_NEW_DUCKS_AVAILABLE = 'RESET_NEW_DUCKS_AVAILABLE'
const ADD_NEW_DUCK_ID_TO_FEED = 'ADD_NEW_DUCK_ID_TO_FEED'
const RESET_NEW_DUCKS_TO_ADD = 'RESET_NEW_DUCKS_TO_ADD'

function fetchFeed (uid) {
  return {
    type: FETCH_FEED,
    uid
  }
}

function fetchFeedError (error) {
  return {
    type: FETCH_FEED_ERROR,
    error
  }
}

function fetchFeedSuccess (duckIds) {
  return {
    type: FETCH_FEED_SUCCESS,
    duckIds
  }
}

function newDucksAvailable () {
  return {
    type: NEW_DUCKS_AVAILABLE,
  }
}

function resetNewDucksAvailable () {
  return {
    type: RESET_NEW_DUCKS_AVAILABLE,
  }
}

export function addNewDuckIdToFeed (duckId) {
  return {
    type: ADD_NEW_DUCK_ID_TO_FEED,
    duckId
  }
}

function resetNewDucksToAdd () {
  return {
    type: RESET_NEW_DUCKS_TO_ADD,
  }
}

const initialState = {
  newDucksAvailable: false,
  newDucksToAdd: [],
  isFetching: false,
  error: '',
  duckIds: []
}

export default function feed (state = initialState, action) {
  const type = action.type
  switch (type) {
    case 'FETCH_FEED' :
      return {
        ...state,
        isFetching: true,
      }
    case 'FETCHFEED_ERROR' :
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case 'FETCHFEED_SUCCESS' :
      return {
        ...state,
        isFetching: false,
        error: '',
        duckIds: action.duckIds
      }
    case 'NEW_DUCKS_AVAILABLE' :
      return {
        ...state,
        newDucksAvailable: true,
      }
    case 'RESET_NEW_DUCKS_AVAILABLE' :
      return {
        ...state,
        newDucksAvailable: false,
      }
    case 'ADD_NEW_DUCK_ID_TO_FEED' :
      return {
        ...state,
        newDucksToAdd: state.newDucksToAdd.concat([action.duckId])
      }
    case 'RESET_NEW_DUCKS_TO_ADD' :
      return {
        ...state,
        duckIds: state.duckIds.concat(state.newDucksToAdd),
        newDucksToAdd: []
      }
    default :
      return state
  }
}