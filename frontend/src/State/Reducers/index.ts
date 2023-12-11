import{combineReducers} from "redux"
import filterReducer from "./FilterReducer"
import stateReducer from "./StateReducer"
import tokenReducer from "./TokenReducer"

const rootReducer = combineReducers({
    filter:filterReducer,
    state: stateReducer,
    token: tokenReducer
})

export default rootReducer

export type filterState = ReturnType<typeof rootReducer>