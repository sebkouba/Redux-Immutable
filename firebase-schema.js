/users
  uid
    name
    uid
    avatar
    email

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
    numberOfLikes
    numberOfReplies
    text
    timestamp
    uid (of duck author)

/usersDucks
  uid
    duckId
      avatar
      duckId
      name
      numberOfLikes
      numberOfReplies
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