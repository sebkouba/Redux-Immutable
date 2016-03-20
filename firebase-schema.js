/users
  uid
    name
    uid
    avatar
    email

/feed
  uid
    duckId
      avatar
      name
      text
      timestamp
      uid (of author)
      duckId

/notifications
  uid
    notificationId
      type
      author
      authorAvatar
      uid (of author)
      duckId
      timestamp

/followers
  uid
    follower uid
      avatar
      name
      uid (of follower)

/following
  uid
    user following uid
      avatar
      name
      uid (of user following)

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