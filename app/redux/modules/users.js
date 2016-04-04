import auth, { logout, saveUser } from 'helpers/auth'
import { formatUserInfo } from 'helpers/utils'

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
    error: 'Error authenticating.',
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

export function fetchAndHandleUser () {
  return function (dispatch) {
    dispatch(fetchingUser())
    return auth()
      .then(({uid, facebook}) => {
        const userInfo = formatUserInfo(facebook.displayName, facebook.profileImageURL, uid)
        return dispatch(fetchingUserSuccess(uid, userInfo, Date.now()))
      })
      .then(({user}) => saveUser(user))
      .then(() => dispatch(authUser()))
      .catch((error) => dispatch(fetchingUserFailure(error)))
  }
}

const initialUserState = {
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
    avatar: '',
  },
}

function user (state = initialUserState, action) {
  const type = action.type
  switch (type) {
    case 'FETCHING_USER_SUCCESS' :
      return Object.assign({}, state, {
        info: action.user,
        lastUpdated: action.timestamp,
      })
    default :
      return state
  }
}

const initialState = {
  isFetching: false,
  error: '',
  isAuthed: false,
  authedId: '',
}

export default function users (state = initialState, action) {
  const type = action.type
  switch (type) {
    case AUTH_USER :
      return Object.assign({}, state, {
        isAuthed: true,
        authedId: action.uid,
      })
    case UNAUTH_USER :
      return Object.assign({}, state, {
        isAuthed: false,
        authedId: '',
      })
    case FETCHING_USER:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case FETCHING_USER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      })
    case FETCHING_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: '',
        [action.uid]: user(state[action.uid], action),
      })
    default :
      return state
  }
}
