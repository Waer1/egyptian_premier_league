import { Action } from "../Actions/index";
import { ActionType } from "../ActionType";

const reducer = (state: string="" , action: Action): any => {
  switch (action.type) {
    case ActionType.CHANGE_NAME:
      return action.payload
    default:
      return state;
  }
};
export default reducer;