import { ActionType } from "../ActionType";
import{Dispatch} from "redux";
import { Action } from "../Actions";


export const changeFilter = (filter:boolean[]) => {
    return (dispatch : Dispatch<Action>) => {
        dispatch({
            type: ActionType.CHANGE_FILTER,
            payload: filter,
        });
    }
};