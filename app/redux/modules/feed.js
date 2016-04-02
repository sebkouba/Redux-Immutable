import { listenToFeed } from 'helpers/api'
import { addMultipleDucks } from 'redux/modules/ducks'
import { addListener } from 'redux/modules/listeners'

const SET_FEED_LISTENER = 'SET_FEED_LISTENER'
const SET_FEED_LISTENER_ERROR = 'SET_FEED_LISTENER_ERROR'
const SET_FEED_LISTENER_SUCCESS = 'SET_FEED_LISTENER_SUCCESS'
const ADD_NEW_DUCK_ID_TO_FEED = 'ADD_NEW_DUCK_ID_TO_FEED'
const RESET_NEW_DUCKS_AVAILABLE = 'RESET_NEW_DUCKS_AVAILABLE'

function setFeedListener () {
  return {
    type: SET_FEED_LISTENER,
  }
}

function setFeedListenerError (error) {
  return {
    type: SET_FEED_LISTENER_ERROR,
    error
  }
}

function setFeedListenerSuccess (duckIds) {
  return {
    type: SET_FEED_LISTENER_SUCCESS,
    duckIds
  }
}

function addNewDuckIdToFeed (duckId) {
  return {
    type: ADD_NEW_DUCK_ID_TO_FEED,
    duckId
  }
}

export function setAndHandleFeedListener () {
  let initialFetch = true
  return function (dispatch) {
    dispatch(setFeedListener())
    const off = listenToFeed((feed) => {
      feed = feed === null ? {} : feed
      const duckIds = Object.keys(feed)
      dispatch(addMultipleDucks(feed))
      initialFetch === true
        ? dispatch(setFeedListenerSuccess(duckIds))
        : dispatch(addNewDuckIdToFeed(duckIds[duckIds.length - 1]))
      initialFetch = false
    }, (error) => dispatch(setFeedListenerError(error)))
    dispatch(addListener('feed', off))
  }
}

export function resetNewDucksAvailable () {
  return {
    type: RESET_NEW_DUCKS_AVAILABLE,
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
    case SET_FEED_LISTENER :
      return {
        ...state,
        isFetching: true,
      }
    case SET_FEED_LISTENER_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case SET_FEED_LISTENER_SUCCESS :
      return {
        ...state,
        isFetching: false,
        error: '',
        duckIds: action.duckIds,
        newDucksAvailable: false,
      }
    case ADD_NEW_DUCK_ID_TO_FEED :
      return {
        ...state,
        newDucksToAdd: state.newDucksToAdd.concat([action.duckId]),
        newDucksAvailable: true,
      }
    case RESET_NEW_DUCKS_AVAILABLE :
      return {
        ...state,
        duckIds: state.duckIds.concat(state.newDucksToAdd),
        newDucksToAdd: [],
        newDucksAvailable: false,
      }
    default :
      return state
  }
}