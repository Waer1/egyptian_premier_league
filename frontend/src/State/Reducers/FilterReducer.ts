import { Action } from "../Actions/index";
import { ActionType } from "../ActionType";

const reducer = (state: boolean[] =[true,false,false,false] , action: Action): object => {
  switch (action.type) {
    case ActionType.CHANGE_FILTER:
      return action.payload
    default:
      return state;
  }
};
export default reducer;