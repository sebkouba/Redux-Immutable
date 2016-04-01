// Users

{
  type: AUTH_USER,
  uid
}

{
  type: UNAUTH_USER
}

{
  type: 'FETCH_USER'
}

{
  type: 'FETCH_USER_FAILURE',
  error
}

{
  type: 'FETCH_USER_SUCCESS',
  uid,
  user,
  timestamp
}

// Modal

{
  type: 'OPEN_MODAL'
}

{
  type: 'CLOSE_MODAL'
}

{
  type: UPDATE_DUCK,
  newDuckText
}

// All Ducks

{
  type: 'ADD_DUCK',
  duck,
  duckId
}


// Users Ducks

{
  type: 'FETCH_USERS_DUCKS',
  uid
}

{
  type: 'FETCH_USERS_DUCKS_FAILURE',
  error
}

{
  type: 'FETCH_USERS_DUCKS_SUCCESS',
  uid,
  duckIds,
  lastUpdated
}

{
  type: 'ADD_SINGLE_USER_DUCK',
  uid,
  duckId,
}

// Replies

{
  type: 'FETCH_REPLIES',
  duckId
}

{
  type: 'FETCH_REPLIES_FAILURE',
  error
}

{
  type: 'FETCH_REPLIES_SUCCESS',
  duckId,
  replies,
  timestamp
}

{
  type: 'ADD_REPLY'
}

{
  type: 'ADD_REPLY_FAILURE',
  error
}

{
  type: 'ADD_REPLY_SUCCESS',
  duckId,
  reply,
  replyId,
}

// Feed

{
  type: 'SET_FEED_LISTENER',
  uid
}

{
  type: 'SET_FEED_LISTENER_ERROR',
  error
}

{
  type: 'SET_FEED_LISTENER_SUCCESS',
  duckIds
}

{
  type: 'RESET_NEW_DUCKS_AVAILABLE'
}

{
  type: 'RESET_NEW_DUCKS_TO_ADD'
}

// Notifications

{
  type: 'SET_NOTIIFCATIONS_LISTENER',
  uid
}

{
  type: 'SET_NOTIIFCATIONS_LISTENER_ERROR',
  error
}

{
  type: 'SET_NOTIIFCATIONS_LISTENER_SUCCESS',
  notifications
}

{
  type: 'NEW_NOTIFICATIONS_AVAILABLE'
}

{
  type: 'RESET_NEW_NOTIFICATIONS_AVAILABLE'
}

{
  type: 'NEW_NOTIFICATION',
  notification
}

{
  type: 'RESET_NEW_NOTIFICATIONS_TO_ADD'
}

// Listeners

{
  type: 'ADD_LISTENER',
  listenerId,
  off
}

{
  type: 'REMOVE_LISTENER',
  listenerId
}