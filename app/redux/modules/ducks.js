import { saveDuck } from 'helpers/api'
import { closeModal } from './modal'

const ADD_DUCK = 'ADD_DUCK'
const REMOVE_DUCK = 'REMOVE_DUCK'

function addDuck (duck, duckId) {
  return {
    type: ADD_DUCK,
    duck,
    duckId,
  }
}

function removeDuck (duckIdToRemove) {
  return {
    type: REMOVE_DUCK,
    duckIdToRemove
  }
}

export function duckFanout (duck) {
  return function (dispatch) {
    saveDuck(duck)
      .then((duckId) => {
        dispatch(addDuck(duck, duckId))
        dispatch(closeModal())
        // dispatch(addUserDuck(duck))
        // dispatch(addDuckToFeed(duck))
      })
  }
}

export default function ducks (state = {}, action) {
  const type = action.type
  switch (type) {
    case ADD_DUCK :
      return {
        ...state,
        [action.duckId]: action.duck
      }
    case REMOVE_DUCK :
      return Object.keys(state)
        .filter((key) => key !== action.duckIdToRemove)
        .reduce((prev, current) => {
          prev[current] = state[current]
          return prev
        }, {})
    default :
      return state
  }
}