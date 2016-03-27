import auth from 'helpers/auth'

const FETCH_USER = 'FETCH_USER'
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE'
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'

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
    auth().then((user) => {
      dispatch(fetchUserSuccess(user.uid, user, Date.now))
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
  error: ''
}

export default function users (state = initialState, action) {
  const type = action.type
  switch (type) {
    case 'FETCH_USER':
      return Object.assign({}, state, {
        isFetching: true,
      })
    case 'FETCH_USER_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      })
    case 'FETCH_USER_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        error: '',
        [action.uid]: user(state[action.uid], action)
      })
    default :
      return state
  }
}
