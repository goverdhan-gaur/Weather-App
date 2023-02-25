// src/store/index.ts
import { createStore } from 'redux'

const initialState = {
  data: {},
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rootReducer(
  state = initialState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case 'UPDATE_DATA':
      return { ...state, data: action.payload }
    default:
      return state
  }
}

const store = createStore(rootReducer)

export default store
