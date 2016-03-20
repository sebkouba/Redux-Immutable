// Users

const initialUserState = {
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
    avatar: '',
    email: ''
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
  error: ''
}

function users (state = {}, action) {
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

// Followers

function follower (state = {}, action) {
  const type = action.type
  switch (type) {
    case 'FETCH_FOLLOWERS_SUCCESS' :
      return Object.assign({}, state, {
        followerIds: action.followerIds,
        lastUpdated: action.timestamp
      })
    case 'ADD_FOLLOWER_SUCCESS' :
      return Object.assign({}, state, {
        followerIds: action.followerIds.concat([action.authedUid]),
      })
    case 'REMOVE_FOLLOWER_SUCCESS' :
      return Object.assign({}, state, {
        followerIds: state.followerIds.filter((uid) => uid !== action.authedUid)
      })
    default :
      return state
  }
}

const initialFollowersState = {
  isFetching: false,
  error: ''
}

function followers (state  = initialFollowersState, action) {
  const type = action.type
  switch (type) {
    case 'FETCH_FOLLOWERS' :
    case 'ADD_FOLLOWER' :
    case 'REMOVE_FOLLOWER' :
      return Object.assign({}, state, {
        isFetching: true,
        error: '',
      })
    case 'FETCH_FOLLOWERS_FAILURE' :
    case 'ADD_FOLLOWER_FAILURE' :
    case 'REMOVE_FOLLOWER_FAILURE' :
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      })
    case 'FETCH_FOLLOWERS_SUCCESS' :
      return Object.assign({}, state, {
        isFetching: false,
        error: '',
        [action.uid]: follower(state[action.uid], action),
      })
    case 'ADD_FOLLOWER_SUCCESS' :
    case 'REMOVE_FOLLOWER_SUCCESS' :
      return typeof state[action.otherUid] === 'undefined'
        ? state
        : Object.assign({}, state, {
            isFetching: false,
            error: '',
            [action.otherUid]: follower(state[action.otherUid], action),
          })
    default :
      return state
  }
}

// Following

function following (state = {}, action) {
  const type = action.type
  switch (type) {
    case 'FETCH_FOLLOWING_SUCCESS' :
      return Object.assign({}, state, {
        followingIds: action.followingIds,
        lastUpdated: action.timestamp
      })
    case 'ADD_FOLLOWING_SUCCESS' :
      return Object.assign({}, state, {
        followingIds: state.followingIds.concat([action.otherUid])
      })
    case 'REMOVE_FOLLOWING_SUCCESS' :
      return Object.assign({}, state, {
        followingIds: state.followingIds.filter((uid) => uid !== action.otherUid)
      })
    default :
      return state
  }
}

const initialFollowingState = {
  isFetching: false,
  error: '',
}

function followings (state  = initialFollowingState, action) {
  const type = action.type
  switch (type) {
    case 'FETCH_FOLLOWING' :
    case 'REMOVE_FOLLOWING' :
      return Object.assign({}, state, {
        isFetching: true,
        error: '',
      })
    case 'FETCH_FOLLOWING_FAILURE' :
    case 'REMOVE_FOLLOWING_FAILURE' :
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      })
    case 'FETCH_FOLLOWING_SUCCESS' :
    case 'ADD_FOLLOWING_SUCCESS' :
    case 'REMOVE_FOLLOWING_SUCCESS'
      return Object.assign({}, state, {
        isFetching: false,
        error: '',
        [action.uid]: following(state[action.uid], action)
      })
    default :
      return state
  }
}

// All Ducks

const initialDuckState = {
  error: false,
  isFetching: false,
}

function ducks (state = initialDuckState, action) {
  const type = action.type
  switch (action.type) {
    case 'FETCH_DUCK' :
      return Object.assign({}, state, {
        isFetching: true,
      })
    case 'FETCH_DUCK_FAILURE' :
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })
    case 'FETCH_DUCK_SUCCESS' :
      return Object.assign({}, state, {
        isFetching: false,
        error: '',
        [action.duckId]: action.duck
      })
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

// New Duck

const initialNewDuckState = {
  isPosting: false,
  error: '',
  info: {
    avatar: '',
    duckId: '',
    name: '',
    numberOfReplies: '',
    numberOfLikes: '',
    text: '',
    timestamp: 0,
    uid: ''
  }
}

function newDuck (state = initialNewDuckState, action) {
  const type = action.type
  switch (type) {
    type: 'ADD_DUCK'
    mehhhhhh
    default :
      return state
  }
}
