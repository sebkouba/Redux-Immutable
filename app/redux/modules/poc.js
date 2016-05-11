// action creator
export function handleInputChange (input) {
  return {
    type: 'HANDLE_INPUT_CHANGE',
    input
  }
}

// reducer
const initialState = {
  inputText: ''
}

export default function pocReducer (state = initialState, action) {
  switch (action.type) {
    case 'HANDLE_INPUT_CHANGE':
      return {
        ...state,
        inputText: action.input
      }
    default :
      return state
  }
}
