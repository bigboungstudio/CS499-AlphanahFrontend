import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function productReducer(state = initialState.products, action) {
  switch (action.type) {
    case types.LOAD_PRODUCTS_SUCCESS:
      return { ...state, allProducts: action.products };
    case types.LOAD_PRODUCT_DETAIL_SUCCESS:
      return { ...state, oneProduct: action.product };
    case types.ADD_PRODUCT_SUCCESS:
      return state;
    case types.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        merchantProducts: {
          ...state.merchantProducts,
          data: state.merchantProducts.data.filter(
            (product) => product.productUUID !== action.productUUID
          ),
        },
      };
    case types.UPDATE_PRODUCT_SUCCESS:
      return state;
    case types.LOAD_MERCHANT_PRODUCTS_SUCCESS:
      return { ...state, merchantProducts: action.products };
    case types.LOAD_MERCHANT_DETAIL_SUCCESS:
      return { ...state, merchantDetail: action.user };
    case types.CREATE_REVIEW_SUCCESS:
      return state;
    case types.DELETE_REVIEW_SUCCESS:
      return state;
    default:
      return state;
  }
}
