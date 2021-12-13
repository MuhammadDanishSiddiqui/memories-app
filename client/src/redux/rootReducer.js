import { combineReducers } from 'redux'
import userReducer from "./reducers/UserReducer"
import postReducer from "./reducers/PostReducer"

const appReducer = combineReducers({
  user: userReducer,
  posts: postReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

export default rootReducer