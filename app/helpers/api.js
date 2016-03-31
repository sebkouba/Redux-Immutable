import { ref } from 'config/constants'

function saveToDucks (duck) {
  return ref.child('ducks').push(duck)
}

function saveToUsersDucks (duck, duckId) {
  const endpoint = `usersDucks/${duck.uid}/${duckId}`
  return ref.child(endpoint).set({...duck, duckId})
}

function saveToDucksId (duckId) {
  return ref.child(`ducks/${duckId}/duckId`).set(duckId)
}

export function saveDuck (duck) {
  const ducksRef = saveToDucks(duck)
  const duckId = ducksRef.key()

  return Promise.all([
    ducksRef,
    saveToUsersDucks(duck, duckId),
    saveToDucksId(duckId)
  ]).then(() => duckId)
}