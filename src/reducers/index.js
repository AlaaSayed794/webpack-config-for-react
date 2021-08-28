import { combineReducers } from "redux";
import listsReducer from './listsReducer'
import todosReducer from './todosReducer'

const rootReducer = combineReducers({
    listsReducer, todosReducer
})

export default rootReducer