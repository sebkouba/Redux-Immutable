import { ref } from 'config/constants'

function saveToDucks (duck) {
  const newRef = ref.child('ducks').push()
  const duckId = newRef.key()
  const duckPromise = newRef.set({...duck, duckId})
  return {
    duckId,
    duckPromise
  }
}

function saveToUsersDucks (duck, duckId) {
  const endpoint = `usersDucks/${duck.uid}/${duckId}`
  return ref.child(endpoint).set({...duck, duckId})
}

function saveLikeAndReplyCount (duckId) {
  return ref.child(`likeAndReplyCount/${duckId}`).set({
    numberOfLikes: 0,
    numberOfReplies: 0,
  })
}

export function saveDuck (duck) {
  const { duckId, duckPromise } = saveToDucks(duck)

  return Promise.all([
    duckPromise,
    saveToUsersDucks(duck, duckId),
    saveLikeAndReplyCount(duckId)
  ]).then(() => ({...duck, duckId}))
}

export function listenToFeed (cb, errorCB) {
  return ref.child('ducks').on('value', (snapshot) => {
    cb(snapshot.val())
  }, errorCB)
}

export function removeFirebaseListener (cb) {
  ref.off('value', cb)
}

export function fetchUsersLikes (uid) {
  return ref.child(`usersLikes/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function saveToUsersLikes (uid, duckId) {
  return ref.child(`usersLikes/${uid}/${duckId}`).set(true)
}

export function deleteFromUsersLikes (uid, duckId) {
  return ref.child(`usersLikes/${uid}/${duckId}`).set(null)
}

export function fetchLikeAndReplyCount (duckId) {
  return ref.child(`likeAndReplyCount/${duckId}`).once('value')
    .then((snapshot) => snapshot.val() || {numberOfLikes: 0, numberOfReplies: 0})
}

export function incrementNumberOfLikes (duckId) {
  return ref.child(`likeAndReplyCount/${duckId}/numberOfLikes`)
    .transaction((currentValue = 0) => currentValue + 1)
}

export function decrementNumberOfLikes (duckId) {
  return ref.child(`likeAndReplyCount/${duckId}/numberOfLikes`)
    .transaction((currentValue = 0) => currentValue - 1)
}