// Users

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

const initialUsersState = {
  isFetching: false,
  error: '',
  isAuthed: false,
  authedId: '',
}

function users (state = initialState, action) {
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
// Modal
const initialModalState = {
  duck: '',
  isOpen: false
}

function modal (state = initialModalState, action) {
  const type = action.type
  switch (type) {
    case OPEN_MODAL :
      return {
        ...state,
        isOpen: true,
      }
    case CLOSE_MODAL :
      return {
        ...state,
        isOpen: false,
      }
    case UPDATE_DUCK :
      return {
        ...state,
        duck: actions.newDuckText
      }
    default :
      return state
  }
}

// All Ducks

function ducks (state = {}, action) {
  const type = action.type
  switch (action.type) {
    case 'ADD_DUCK' :
      return Object.assign({}, state, {
        [action.duck.duckId]: action.duck
      })
    case 'REMOVE_DUCK' :
      return Object.keys(state)
        .filter((key) => key !== action.duckIdToRemove)
        .reduce((prev, current) => {
          prev[current] = state[current]
          return prev
        }, {})
    default :
      return state
  }
}

//  User Ducks

const initialUserDucksState = {
  isFetching: false,
  error: false,
}

function userDucks (state  = initialUserDucksState, actions) {
  const type = action.type
  switch (action.type) {
    case 'FETCH_USERS_DUCKS' :
      return Object.assign({}, state, {
        isFetching: true,
      })
    case 'FETCH_USERS_DUCKS_FAILURE' :
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })
    case 'FETCH_USERS_DUCKS_SUCCESS' :
      return Object.assign({}, state, {
        isFetching: false,
        error: '',
        [action.uid]: {
          lastUpdated: action.timestamp,
          duckIds: action.duckIds
        }
      })
  }
}

// Replies

const initialReplyState = {
  name: '',
  reply: '',
  uid: '',
  timestamp: 0,
  avatar: ''
}

function reply (state, action) {
  const type = action.type
  switch (type) {
    case 'ADD_REPLY_SUCCESS' :
      return Object.assign({}, state, {
        [action.replyId]: action.reply
      })
    default :
      return state
  }
}

function replies (state = {}, action) {
  const type = action.type
  switch (type) {
    case 'FETCH_REPLIES' :
    case 'ADD_REPLY' :
      return Object.assign({}, state, {
        isLoading: true
      })
    case 'FETCH_REPLIES_FAILURE' :
    case 'ADD_REPLY_FAILURE' :
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      })
    case 'FETCH_REPLIES_SUCCESS' :
      return Object.assign({}, state, {
        isLoading: false,
        error: '',
        [action.duckId]: {
          lastUpdated: action.timestamp,
          replies: action.replies
        }
      })
    case 'ADD_REPLY_SUCCESS' :
      return Object.assign({}, state, {
        isLoading: false,
        error: '',
        [action.duckId]: reply(state[action.duckId], action)
      })
    default :
      return state
  }
}

// Feed

const initialFeedState = {
  newDucksAvailable: false,
  newDucksToAdd: [],
  isLoading: false,
  error: '',
  duckIds: []
}

function feed (state, action) {
  const type = action.type
  switch (type) {
    case 'SET_FEED_LISTENER' :
      return Object.assign({}, state, {
        isLoading: true,
      })
    case 'SET_FEED_LISTENER_ERROR' :
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      })
    case 'SET_FEED_LISTENER_SUCCESS' :
      return Object.assign({}, state, {
        isLoading: false,
        error: '',
        duckIds: action.duckIds
      })
    case 'NEW_DUCKS_AVAILABLE' :
      return Object.assign({}, state, {
        newDucksAvailable: true,
      })
    case 'RESET_NEW_DUCKS_AVAILABLE' :
      return Object.assign({}, state, {
        newDucksAvailable: false,
      })
    case 'NEW_DUCK' :
      return Object.assign({}, state, {
        newDucksToAdd: state.newDucksToAdd.concat([action.duckId])
      })
    case 'RESET_NEW_DUCKS_TO_ADD' :
      return Object.assign({}, state, {
        newDucksToAdd: []
      })
    default :
      return state
  }
}

// Notifications

const initialNotificationsState = {
  notifs: [],
  newNotificationsAvailable: false,
  newNotificationsToAdd: [],
  error: '',
  isLoading: false
}

function notifications (state = initialNotificationsState, action) {
  const type = action.type
  switch (type) {
    case 'SET_NOTIFICATIONS_LISTENER' :
      return Object.assign({}, state, {
        isLoading: true,
      })
    case 'SET_NOTIFICATIONS_LISTENER_ERROR' :
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error,
      })
    case 'SET_NOTIFICATIONS_LISTENER_SUCCESS' :
      return Object.assign({}, state, {
        isLoading: false,
        error: '',
        notifs: action.notifications,
      })
    case 'NEW_NOTIFICATIONS_AVAILABLE' :
      return Object.assign({}, state, {
        newNotificationsAvailable: true,
      })
    case 'RESET_NEW_NOTIFICATIONS_AVAILABLE' :
      return Object.assign({}, state, {
        newNotificationsAvailable: false,
      })
    case 'NEW_NOTIFICATION' :
      return Object.assign({}, state, {
        newNotificationsToAdd: state.newNotificationsToAdd.concat([action.newNotification]),
      })
    case 'RESET_NEW_NOTIFICATIONS_TO_ADD' :
      return Object.assign({}, state, {
        newNotifications: [],
      })
    default :
      return state
  }
}

// Listeners

function listeners (state = {}, action) {
  const type = action.type
  switch (type) {
    case 'ADD_LISTENER' :
      return Object.assign({}, state, {
        [action.listenerId]: action.listener
      })
    case 'REMOVE_LISTENER' :
      const listenersClone = Object.assign({}, state)
      delete listenersClone[action.listenerId]
      return listenersClone
    default :
      return state
  }
}