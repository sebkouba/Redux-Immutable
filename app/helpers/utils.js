export function formatTimestamp (timestamp) {
  const date = new Date(timestamp)
  return (date.getMonth() + 1) + '/' + date.getFullYear()
}

export function formatUserInfo (name, avatar, uid) {
  return {
    name,
    avatar,
    uid,
  }
}

export function formatDuck (text, {name, uid, avatar}) {
  return {
    text,
    name,
    avatar,
    uid,
    timestamp: Date.now(),
  }
}
