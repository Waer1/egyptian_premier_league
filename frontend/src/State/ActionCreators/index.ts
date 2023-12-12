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
export const ChangeState = (state:number) => {
    return (dispatch : Dispatch<Action>) => {
        dispatch({
            type: ActionType.CHANGE_STATE,
            payload: state,
        });
    }
}
export const ChangeToken = (state:string) => {
    return (dispatch : Dispatch<Action>) => {
        dispatch({
            type: ActionType.CHANGE_TOKEN,
            payload: state,
        });
    }
}
export const ChangeId = (state:number|null) => {
    return (dispatch : Dispatch<Action>) => {
        dispatch({
            type: ActionType.CHANGE_ID,
            payload: state,
        });
    }
}