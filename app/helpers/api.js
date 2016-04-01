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

export function saveDuck (duck) {
  const { duckId, duckPromise } = saveToDucks(duck)

  return Promise.all([
    duckPromise,
    saveToUsersDucks(duck, duckId),
  ]).then(() => duckId)
}

export function listenToFeed (cb, errorCB) {
  return ref.child('ducks').on('value', (snapshot) => {
    cb(snapshot.val())
  }, errorCB)
}

export function removeFirebaseListener (cb) {
  ref.off('value', cb)
}