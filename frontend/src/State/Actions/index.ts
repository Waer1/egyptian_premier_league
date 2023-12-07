import { ActionType } from "../ActionType";
interface Filer{
    type: ActionType.CHANGE_FILTER; 
    payload: boolean[]; 
}
export type Action = Filer;