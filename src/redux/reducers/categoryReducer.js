import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function categoryReducer(state = initialState.category, action) {
  switch (action.type) {
    case types.LOAD_CATEGORIES_SUCCESS:
      return action.categories;
    default:
      return state;
  }
}
