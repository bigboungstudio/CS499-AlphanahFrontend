import * as types from "./actionTypes";
import * as couponApi from "../../api/couponApi";

export function loadCouponsSuccess(coupons) {
  return { type: types.LOAD_COUPONS_SUCCESS, coupons };
}
export function addCouponSuccess() {
  return { type: types.ADD_COUPON_SUCCESS };
}
export function deleteCouponSuccess(couponCode) {
  return { type: types.DELETE_COUPON_SUCCESS, couponCode };
}

export function loadCouponsByValue(type, type2, accountUUID, token) {
  return async function (dispatch) {
    function onSuccess(success) {
      dispatch(loadCouponsSuccess(success));
    }
    try {
      const success = await couponApi.getCouponsBySort(
        type,
        type2,
        accountUUID,
        token
      );
      return onSuccess(success);
    } catch (error) {
      throw error;
    }
  };
}

export function addCoupon(coupon, token, navigate) {
  return async function (dispatch) {
    function onSuccess(success) {
      dispatch(addCouponSuccess());
      navigate();
    }
    try {
      const success = await couponApi.createCoupon(coupon, token);
      return onSuccess(success);
    } catch (error) {
      window.alert("สร้างคูปองไม่สำเร็จ รหัสคูปองอาจจะซ้ำ");
      throw error;
    }
  };
}

export function deleteCoupon(couponCode, token) {
  return async function (dispatch) {
    function onSuccess(success) {
      dispatch(deleteCouponSuccess(couponCode));
    }
    try {
      const success = await couponApi.deleteCoupon(couponCode, token);
      return onSuccess(success);
    } catch (error) {
      throw error;
    }
  };
}
