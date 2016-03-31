const ADD_LISTENER = 'ADD_LISTENER'
const REMOVE_LISTENER = 'REMOVE_LISTENER'

function addListener (listenerId, listener) {
  return {
    type: ADD_LISTENER,
    listenerId,
    listener,
  }
}

function removeListener (listenerId) {
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
        [action.listenerId]: action.listener
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