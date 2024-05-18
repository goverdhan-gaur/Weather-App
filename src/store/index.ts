/**
 * This module exports a Redux store instance which is created using the createStore function provided by redux.
 * The initial state of the store is an empty object with a data key.
 * @packageDocumentation
 */

import { createStore } from 'redux'
const initialState = {
  data: {},
}

/**
 * This function is the root reducer for the Redux store.
 * It takes two arguments: the current state of the store and an action object that describes the change to be made to the state.
 * If the action type is 'UPDATE_DATA', it returns a new state object with the updated data value.
 * Otherwise, it returns the current state unchanged.
 * @param state - The current state of the store.
 * @param action - An action object that describes the change to be made to the state.
 * @returns The new state of the store.
 */
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

/**
 * This constant exports a Redux store instance created using the createStore function provided by redux.
 */
export const store = createStore(rootReducer)
export type RootState = ReturnType<typeof rootReducer>;