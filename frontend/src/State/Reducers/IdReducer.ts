import { Action } from "../Actions/index";
import { ActionType } from "../ActionType";
const initialState: number | null = null; // Define initial state explicitly

const reducer = (state: number | null=initialState , action: Action): any => {
  switch (action.type) {
    case ActionType.CHANGE_ID:
      return action.payload
    default:
      return state;
  }
};
export default reducer;