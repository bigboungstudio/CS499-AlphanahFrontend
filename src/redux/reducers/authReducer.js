import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.BUYER_REGISTER_SUCCESS:
      return state;
    case types.BUYER_LOGIN_SUCCESS:
      return {
        ...state,
        buyer: { ...state.buyer, isAuthentication: true, token: action.token },
      };
    case types.BUYER_LOGOUT_SUCCESS:
      return {
        ...state,
        buyer: {
          isAuthentication: false,
          currentUser: {},
          token: {},
        },
      };
    case types.SELLER_REGISTER_SUCCESS:
      return state;
    case types.SELLER_LOGIN_SUCCESS:
      return {
        ...state,
        seller: {
          ...state.seller,
          isAuthentication: true,
          token: action.token,
        },
      };
    case types.SELLER_LOGOUT_SUCCESS:
      return {
        ...state,
        seller: {
          isAuthentication: false,
          currentUser: {},
          token: {},
        },
      };
    case types.LOAD_BUYER_DETAIL_SUCCESS:
      return { ...state, buyer: { ...state.buyer, currentUser: action.user } };
    case types.LOAD_SELLER_DETAIL_SUCCESS:
      return {
        ...state,
        seller: { ...state.seller, currentUser: action.user },
      };
    case types.UPDATE_BUYER_DETAIL_SUCCESS:
      return { ...state, buyer: { ...state.buyer, currentUser: action.user } };
    case types.UPDATE_SELLER_DETAIL_SUCCESS:
      return {
        ...state,
        seller: { ...state.seller, currentUser: action.user },
      };
    default:
      return state;
  }
}
