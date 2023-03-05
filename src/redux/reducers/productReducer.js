import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function productReducer(state = initialState.products, action) {
  switch (action.type) {
    case types.LOAD_PRODUCTS_SUCCESS:
      return { ...state, allProducts: action.products };
    case types.LOAD_PRODUCT_DETAIL_SUCCESS:
      return { ...state, oneProduct: action.product };
    case types.CREATE_REVIEW_SUCCESS:
      return state;
    case types.DELETE_REVIEW_SUCCESS:
      return state;
    default:
      return state;
  }
}
