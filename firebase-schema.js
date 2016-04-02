/users
  uid
    name
    uid
    avatar

/notifications
  uid
    notificationId
      type
      author
      authorAvatar
      uid (of author)
      duckId
      timestamp

/ducks
  duckId
    avatar
    duckId
    name
    text
    timestamp
    uid (of duck author)

/likeAndReplyCount
  duckId
    numberOfLikes
    numberOfReplies

/usersDucks
  uid
    duckId
      avatar
      duckId
      name
      text
      timestamp
      uid (of duck author)

/replies
  duckId
    name
    comment
    uid
    timestamp
    avatar

/usersLikes
  uid
    duckId: true