import{combineReducers} from "redux"
import filterReducer from "./FilterReducer"
import stateReducer from "./StateReducer"
import tokenReducer from "./TokenReducer"
import idReducer from "./IdReducer"
import nameReducer from "./NameReducer"
const rootReducer = combineReducers({
    filter:filterReducer,
    state: stateReducer,
    token: tokenReducer,
    id:idReducer,
    name:nameReducer
})

export default rootReducer

export type filterState = ReturnType<typeof rootReducer>