import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function orderReducer(state = initialState.order, action) {
  switch (action.type) {
    case types.LOAD_CART_SUCCESS:
      return { ...state, cart: action.cart };
    case types.ADD_CART_PRODUCT_SUCCESS:
      return state;
    case types.UPDATE_CART_PRODUCT_SUCCESS:
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: state.cart.cartItems.map((item) =>
            item.orderItemUUID === action.product.orderItemUUID
              ? { ...item, quantity: action.product.quantity }
              : item
          ),
        },
      };
    case types.DELETE_CART_PRODUCT_SUCCESS:
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: state.cart.cartItems.filter(
            (item) =>
              action.product.productUUID !== item.product.productUUID &&
              action.product.optionUUID !== item.option.optionUUID
          ),
        },
      };
    case types.LOAD_PURCHASE_HISTORY_SUCCESS:
      return { ...state, purchaseHistory: action.purchaseHistory };
    case types.LOAD_SALES_ORDER_SUCCESS:
      return { ...state, salesOrder: action.salesOrder };
    case types.RESET_BUYER_ORDER_SUCCESS:
      return {
        ...state,
        cart: {},
        purchaseHistory: {},
      };
    case types.RESET_SELLER_ORDER_SUCCESS:
      return { ...state, salesOrder: {} };
    default:
      return state;
  }
}
