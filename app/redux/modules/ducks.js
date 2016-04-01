import { saveDuck } from 'helpers/api'
import { closeModal } from './modal'
import { addSigleUsersDuck } from './usersDucks'

const ADD_DUCK = 'ADD_DUCK'
const REMOVE_DUCK = 'REMOVE_DUCK'
const ADD_MULTIPLE_DUCKS = 'ADD_MULTIPLE_DUCKS'

function addDuck (duck, duckId) {
  return {
    type: ADD_DUCK,
    duck,
    duckId,
  }
}

export function addMultipleDucks (ducks) {
  return {
    type: ADD_MULTIPLE_DUCKS,
    ducks,
  }
}

export function duckFanout (duck) {
  return function (dispatch) {
    saveDuck(duck)
      .then((duckId) => {
        dispatch(addDuck(duck, duckId))
        dispatch(closeModal())
        dispatch(addSigleUsersDuck(duck, duckId))
      })
      .catch((err) => {
        console.warn('Error in duckFanout', err)
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
    case ADD_MULTIPLE_DUCKS :
      return {
        ...state,
        ...action.ducks
      }
    default :
      return state
  }
}