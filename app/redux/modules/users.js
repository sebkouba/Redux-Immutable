import auth, { logout, saveUser } from 'helpers/auth'
import { fetchUser } from 'helpers/api'
import { formatUserInfo } from 'helpers/utils'
import { Map, fromJS } from 'immutable'

const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'

export function authUser (uid) {
  return {
    type: AUTH_USER,
    uid,
  }
}

function unauthUser () {
  return {
    type: UNAUTH_USER,
  }
}

export function logoutAndUnauth () {
  return function (dispatch) {
    logout()
    dispatch(unauthUser())
  }
}

function fetchingUser () {
  return {
    type: FETCHING_USER,
  }
}

function fetchingUserFailure (error) {
  console.warn(error)
  return {
    type: FETCHING_USER_FAILURE,
    error: 'Error fetching user.',
  }
}

export function fetchingUserSuccess (uid, user, timestamp) {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp,
  }
}

export function fetchAndHandleUser (uid) {
  return function (dispatch) {
    dispatch(fetchingUser())

    return fetchUser(uid)
      .then((user) => dispatch(fetchingUserSuccess(uid, user, Date.now())))
      .catch((error) => dispatch(fetchingUserFailure(error)))
  }
}

export function fetchAndHandleAuthedUser () {
  return function (dispatch) {
    dispatch(fetchingUser())
    return auth()
      .then(({uid, facebook}) => {
        const userInfo = formatUserInfo(facebook.displayName, facebook.profileImageURL, uid)
        return dispatch(fetchingUserSuccess(uid, userInfo, Date.now()))
      })
      .then(({user}) => saveUser(user))
      .then((user) => dispatch(authUser(user.uid)))
      .catch((error) => dispatch(fetchingUserFailure(error)))
  }
}

const initialUserState = fromJS({
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
    avatar: '',
  },
})

function user (state = initialUserState, action) {
  switch (action.type) {
    case FETCHING_USER_SUCCESS :
      return state.merge({
        info: action.user,
        lastUpdated: action.timestamp,
      })
    default :
      return state
  }
}

const initialState = Map({
  isFetching: false,
  error: '',
  isAuthed: false,
  authedId: '',
})

export default function users (state = initialState, action) {
  switch (action.type) {
    case AUTH_USER :
      return state.merge({
        isAuthed: true,
        authedId: action.uid,
      })
    case UNAUTH_USER :
      return state.merge({
        isAuthed: false,
        authedId: '',
      })
    case FETCHING_USER:
      return state.set('isFetching', true)
    case FETCHING_USER_FAILURE:
      return state.merge({
        isFetching: false,
        error: action.error,
      })
    case FETCHING_USER_SUCCESS:
      return action.user === null
        ? state.merge({
          isFetching: false,
          error: '',
        })
        : state.merge({
          isFetching: false,
          error: '',
          [action.uid]: user(state.get(action.uid), action),
        })
    default :
      return state
  }
}
