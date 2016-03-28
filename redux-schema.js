{
  users: {
    isAuthed,
    isFetching,
    error,
    [uid]: {
      lastUpdated,
      info: {
        name,
        uid,
        avatar,
      }
    }
  },
  followers: {
    error,
    isLoading,
    [uid]: {
      lastUpdated,
      followerIds: [uid, uid, uid]
    }
  },
  following: {
    error,
    isLoading,
    [uid]: {
      lastUpdated,
      followingIds: [uid, uid, uid]
    }
  },
  ducks: {
    isLoading,
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
  replies: {
    isLoading,
    error,
    [duckId]: {
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
  **feed: {
      duckIds: [duckId, duckId, duckId],
      newDucksAvailable,
      newDucksToAdd,
      isLoading,
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
      newNotificationsToAdd,
      error,
      isLoading,
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