{
  users: {
    isFetching,
    error,
    [uid]: {
      lastUpdated,
      info: {
        name,
        uid,
        avatar,
        email
      }
    }
  },
  followers: {
    error,
    isFetching,
    [uid]: {
      lastUpdated,
      followerIds: [uid, uid, uid]
    }
  },
  following: {
    error,
    isFetching,
    [uid]: {
      lastUpdated,
      followingIds: [uid, uid, uid]
    }
  },
  ducks: {
    isFetching,
    error,
    [duckId]: {
      lastUpdated,
      info: {
        avatar,
        duckId,
        name,
        numberOfLikes,
        numberOfReplies,
        text,
        timestamp,
        uid,
      }
    }
  },
  usersDucks: {
    isFetching,
    error,
    [uid]: {
      lastUpdated,
      duckIds: [duckId, duckId, duckId]
    }
  },
  newDuck: {
    isPosting,
    error,
    info: {
      avatar,
      duckId,
      name,
      numberOfReplies,
      numberOfLikes,
      text,
      timestamp,
      uid
    }
  },
  replies: {
    [duckId]: {
      isFetching,
      error,
      lastUpdated,
      replies: {
        [replyId]: {
          name,
          reply,
          uid,
          timestamp,
          avatar
        }
      }
    }
  },
  newReply: {
    isPosting,
    error,
    info: {
      name,
      reply,
      uid,
      timestamp,
      avatar
    }
  }
  **feed: {
      ducks: [duckId, duckId, duckId],
      newDucksAvailable,
      newDucksToAdd,
      isFetching,
      error
  },
  **notifications: {
      notifs: [{
        [notificationId]: {
          type,
          author,
          authorAvatar,
          authorUid,
          duckId,
          timestamp
      }],
      newNotificationAvailable,
      newNotificationsToAdd
      error
  },
  listeners: {
    [listenerId]: true
  }
}

if undefined, show loading
if empty array, show no data
if not empty array, show data

** Real time. Set listener

Notes
  Every time you get anyones followers, throw them in users then reference those by id anywhere else.
  Every time you get a duck, throw it in ducks then reference those by id anywhere else.