import{combineReducers} from "redux"
import filterReducer from "./FilterReducer"

const rootReducer = combineReducers({
    filter:filterReducer,
})

export default rootReducer

export type filterState = ReturnType<typeof rootReducer>