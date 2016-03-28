import auth, { logout, saveUser } from 'helpers/auth'

const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCH_USER = 'FETCH_USER'
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE'
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'

function authUser () {
  return {
    type: AUTH_USER
  }
}

function unauthUser () {
  return {
    type: UNAUTH_USER
  }
}

export function logoutAndUnauth () {
  return function (dispatch) {
    logout()
    dispatch(unauthUser())
  }
}

function fetchUser () {
  return {
    type: 'FETCH_USER'
  }
}

function fetchUserFailure (error) {
  return {
    type: 'FETCH_USER_FAILURE',
    error
  }
}

function fetchUserSuccess (uid, user, timestamp) {
  return {
    type: 'FETCH_USER_SUCCESS',
    uid,
    user,
    timestamp
  }
}

export function fetchAndHandleUser () {
  return function (dispatch) {
    dispatch(fetchUser())
    return auth()
      .then(({uid, facebook}) => {
        const userInfo = {
          name: facebook.displayName,
          avatar: facebook.profileImageURL,
          uid,
        }
        return dispatch(fetchUserSuccess(uid, userInfo, Date.now()))
      })
      .then(({user}) => {
        saveUser(user)
      })
      .then(() => {
        dispatch(authUser())
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error))
      })
  }
}

const initialUserState = {
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
    avatar: '',
  }
}

function user (state = initialUserState, action) {
  const type = action.type
  switch (type) {
    case 'FETCH_USER_SUCCESS' :
      return Object.assign({}, state, {
        info: action.user,
        lastUpdated: action.timestamp
      })
    default :
      return state
  }
}

const initialState = {
  isFetching: false,
  error: '',
  isAuthed: false,
}

export default function users (state = initialState, action) {
  const type = action.type
  switch (type) {
    case AUTH_USER :
      return Object.assign({}, state, {
        isAuthed: true,
      })
    case UNAUTH_USER :
      return Object.assign({}, state, {
        isAuthed: false,
      })
    case FETCH_USER:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case FETCH_USER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      })
    case FETCH_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: '',
        [action.uid]: user(state[action.uid], action)
      })
    default :
      return state
  }
}
