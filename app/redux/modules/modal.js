const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'

export function openModal () {
  return {
    type: OPEN_MODAL
  }
}

export function closeModal () {
  return {
    type: CLOSE_MODAL
  }
}

const initialModalState = {
  isOpen: false
}

export default function modal (state = initialModalState, action) {
  const type = action.type
  switch (type) {
    case OPEN_MODAL :
      return {
        isOpen: true,
      }
    case CLOSE_MODAL :
      return {
        isOpen: false,
      }
    default :
      return state
  }
}