// Users

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

// Followers

{
  type: 'FETCH_FOLLOWERS',
}

{
  type: 'FETCH_FOLLOWERS_FAILURE',
  error
}

{
  type: 'FETCH_FOLLOWERS_SUCCESS',
  uid,
  followerIds,
  timestamp
}

{
  type: 'ADD_FOLLOWER',
}

{
  type: 'ADD_FOLLOWER_FAILURE',
  error
}

{
  type: 'ADD_FOLLOWER_SUCCESS',
  otherUid,
  authedUid,
  timestamp
}

{
  type: 'REMOVE_FOLLOWER',
}

{
  type: 'REMOVE_FOLLOWER_FAILURE',
  error
}

{
  type: 'REMOVE_FOLLOWER_SUCCESS',
  otherUid,
  authedUid,
  timestamp
}

// Following

{
  type: 'FETCH_FOLLOWING',
}

{
  type: 'FETCH_FOLLOWING_FAILURE',
  error
}

{
  type: 'FETCH_FOLLOWING_SUCCESS',
  uid,
  followingIds,
  timestamp
}

{
  type: 'ADD_FOLLOWING',
}

{
  type: 'ADD_FOLLOWING_FAILURE',
  error
}

{
  type: 'ADD_FOLLOWING_SUCCESS',
  uid,
  otherUid
}

{
  type: 'REMOVE_FOLLOWING',
}

{
  type: 'REMOVE_FOLLOWING_FAILURE',
  error
}

{
  type: 'REMOVE_FOLLOWING_SUCCESS',
  uidToRemove
}

// All Ducks

{
  type: 'FETCH_DUCK',
}

{
  type: 'FETCH_DUCK_FAILURE',
  error
}

{
  type: 'FETCH_DUCK_SUCCESS',
  duckId,
  duck
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
  timestamp
}

// New Duck

{
  type: 'ADD_DUCK',
  duck
}

{
  type: 'ADD_DUCK_FAILURE',
  error
}

{
  type: 'ADD_DUCK_SUCCESS'
}

{
  type: 'UPDATE_DUCK_TEXT',
  text
}

{
  type: 'RESET_DUCK'
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
  replies,
  timestamp
}

// New Reply

{
  type: 'UPDATE_REPLY_TEXT',
  text
}

{
  type: 'ADD_REPLY',
  reply
}

{
  type: 'ADD_REPLY_FAILURE',
  error
}

{
  type: 'ADD_REPLY_SUCCESS'
}

{
  type: 'RESET_REPLY'
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
  feed
}

{
  type: 'NEW_DUCKS_AVAILABLE'
}

{
  type: 'RESET_NEW_DUCKS_AVAILABLE'
}

{
  type: 'NEW_DUCK',
  duck
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
  listener
}

{
  type: 'REMOVE_LISTENER',
  listenerId
}