import { ActionType } from "../ActionType";
interface Filer{
    type: ActionType.CHANGE_FILTER; 
    payload: boolean[]; 
}
interface State{
    type: ActionType.CHANGE_STATE; 
    payload: number; 
}
interface Token{
    type: ActionType.CHANGE_TOKEN; 
    payload: string; 
}
interface ID{
    type: ActionType.CHANGE_ID; 
    payload: number|null; 
}

export type Action = Filer|State|Token|ID;