import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function couponReducer(state = initialState.coupons, action) {
  switch (action.type) {
    case types.LOAD_COUPONS_SUCCESS:
      return action.coupons;
    case types.ADD_COUPON_SUCCESS:
      return state;
    case types.DELETE_COUPON_SUCCESS:
      return {
        ...state,
        data: state.data.filter(
          (coupon) => coupon.couponCode !== action.couponCode
        ),
      };
    default:
      return state;
  }
}
