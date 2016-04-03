import { removeFirebaseListener } from 'helpers/api'

const ADD_LISTENER = 'ADD_LISTENER'
const REMOVE_LISTENER = 'REMOVE_LISTENER'

export function addListener (listenerId, off) {
  return {
    type: ADD_LISTENER,
    listenerId,
    off,
  }
}

export function removeListener (listenerId, off) {
  removeFirebaseListener(off)
  return {
    type: REMOVE_LISTENER,
    listenerId,
  }
}

export default function listeners (state = {}, action) {
  const type = action.type
  switch (type) {
    case ADD_LISTENER :
      return {
        ...state,
        [action.listenerId]: action.off
      }
    case REMOVE_LISTENER :
      return Object.keys(state)
        .filter((listenerId) => action.listenerId !== listenerId)
        .reduce((prev, current) => {
          prev[current] = state[current]
          return prev
        }, {})
    default :
      return state
  }
}
