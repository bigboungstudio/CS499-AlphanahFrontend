import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function productReducer(state = initialState.products, action) {
  switch (action.type) {
    case types.LOAD_PRODUCTS_SUCCESS:
      return { ...state, allProducts: action.products };
    case types.LOAD_PRODUCT_DETAIL_SUCCESS:
      return { ...state, oneProduct: action.product };
    default:
      return state;
  }
}
