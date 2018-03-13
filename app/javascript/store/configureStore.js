import rootReducer from 'reducers'
import {createStore, applyMiddleware} from 'redux'

function configureStore (initialState) {
  const store = createStore(
    rootReducer
  )
  return store
}

export const store = configureStore()
