import { Action } from "../Actions/index";
import { ActionType } from "../ActionType";

const reducer = (state: 0 , action: Action): any => {
  switch (action.type) {
    case ActionType.CHANGE_ID:
      return action.payload
    default:
      return state;
  }
};
export default reducer;