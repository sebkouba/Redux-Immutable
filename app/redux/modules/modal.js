const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'
const UPDATE_DUCK = 'UPDATE_DUCK'

export function openModal () {
  return {
    type: OPEN_MODAL,
  }
}

export function closeModal () {
  return {
    type: CLOSE_MODAL,
  }
}

export function updateDuck (newDuckText) {
  return {
    type: UPDATE_DUCK,
    newDuckText,
  }
}

const initialState = {
  duck: '',
  isOpen: false,
}

export default function modal (state = initialState, action) {
  const type = action.type
  switch (type) {
    case OPEN_MODAL :
      return {
        ...state,
        isOpen: true,
      }
    case CLOSE_MODAL :
      return {
        duck: '',
        isOpen: false,
      }
    case UPDATE_DUCK :
      return {
        ...state,
        duck: action.newDuckText
      }
    default :
      return state
  }
}
