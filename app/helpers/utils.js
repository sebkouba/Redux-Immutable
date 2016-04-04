import { repliesExpirationLength } from 'config/constants'

export function formatTimestamp (timestamp) {
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
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

export function formatReply ({name, uid, avatar}, reply) {
  return {
    name,
    reply,
    uid,
    timestamp: Date.now(),
    avatar,
  }
}

export function staleReplies (timestamp) {
  return new Date().getTime() - new Date(timestamp).getTime() > repliesExpirationLength
}