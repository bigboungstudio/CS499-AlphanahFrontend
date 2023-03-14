import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function orderReducer(state = initialState.order, action) {
  switch (action.type) {
    case types.LOAD_CART_SUCCESS:
      return { ...state, cart: action.cart };
    case types.ADD_CART_PRODUCT_SUCCESS:
      return {
        ...state,
        cart: action.cart,
      };
    case types.UPDATE_CART_PRODUCT_SUCCESS:
      return {
        ...state,
        cart: action.cart,
      };
    case types.DELETE_CART_PRODUCT_SUCCESS:
      return {
        ...state,
        cart: action.cart,
      };
    case types.APPLY_COUPON_CART_SUCCESS:
      return {
        ...state,
        cart: action.cart,
      };
    case types.REMOVE_COUPON_CART_SUCCESS:
      return {
        ...state,
        cart: action.cart,
      };
    case types.LOAD_PURCHASE_HISTORY_SUCCESS:
      return { ...state, purchaseHistory: action.purchaseHistory };
    case types.LOAD_SALES_ORDER_SUCCESS:
      return { ...state, salesOrder: action.salesOrder };
    case types.UPDATE_SALES_ORDER_SUCCESS:
      return {
        ...state,
        salesOrder: {
          ...state.salesOrder,
          data: state.salesOrder.data.map((order) =>
            order.orderItemUUID === action.salesOrder.orderItemUUID
              ? action.salesOrder
              : order
          ),
        },
      };
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
