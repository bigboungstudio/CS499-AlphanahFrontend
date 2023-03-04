import * as types from "./actionTypes";
import * as authenticationApi from "../../api/auth/authenticationApi";
import * as accountApi from "../../api/auth/accountApi";

export function loadUserDetailSuccess(userType, user) {
  return {
    type:
      userType === "buyer"
        ? types.LOAD_BUYER_DETAIL_SUCCESS
        : types.LOAD_SELLER_DETAIL_SUCCESS,
    user,
  };
}
export function updateUserDetailSuccess() {
  return {
    type: types.UPDATE_USER_DETAIL_SUCCESS,
  };
}
export function updateUserImageSuccess() {
  return {
    type: types.UPDATE_USER_IMAGE_SUCCESS,
  };
}
export function buyerRegisterSuccess() {
  return { type: types.BUYER_REGISTER_SUCCESS };
}
export function sellerRegisterSuccess() {
  return { type: types.SELLER_REGISTER_SUCCESS };
}
export function buyerLoginSuccess(token) {
  return { type: types.BUYER_LOGIN_SUCCESS, token: token };
}
export function sellerLoginSuccess(token) {
  return { type: types.SELLER_LOGIN_SUCCESS, token: token };
}
export function buyerLogoutSuccess() {
  return { type: types.BUYER_LOGOUT_SUCCESS };
}
export function sellerLogoutSuccess() {
  return { type: types.SELLER_LOGOUT_SUCCESS };
}

export function loadUserDetail(userType, token) {
  return async function (dispatch) {
    function onSuccess(success) {
      dispatch(loadUserDetailSuccess(userType, success));
    }
    try {
      const success = await accountApi.getCurrentAccount(token);
      return onSuccess(success);
    } catch (error) {
      throw error;
    }
  };
}

export function updateUserDetail(user, token) {
  return async function (dispatch) {
    function onSuccess(success) {
      dispatch(updateUserDetailSuccess());
    }
    try {
      const success = await accountApi.updateCurrentAccount(user, token);
      return onSuccess(success);
    } catch (error) {
      throw error;
    }
  };
}

export function updateUserImage(file, token) {
  return async function (dispatch) {
    function onSuccess(success) {
      dispatch(updateUserImageSuccess());
    }
    try {
      const success = await accountApi.updateCurrentAccountImage(file, token);
      return onSuccess(success);
    } catch (error) {
      throw error;
    }
  };
}

export function buyerRegister(customer) {
  return async function (dispatch) {
    function onSuccess(success) {
      dispatch(buyerRegisterSuccess());
      buyerLogin(customer);
    }
    try {
      const success = await authenticationApi.RegisterAsCustomer(customer);
      return onSuccess(success);
    } catch (error) {
      throw error;
    }
  };
}
export function buyerLogin(customer) {
  return async function (dispatch) {
    function onSuccess(success) {
      dispatch(buyerLoginSuccess(success));
    }
    try {
      const success = await authenticationApi.Login(customer);
      return onSuccess(success);
    } catch (error) {
      throw error;
    }
  };
}

export function sellerRegister(merchant) {
  return async function (dispatch) {
    function onSuccess(success) {
      dispatch(sellerRegisterSuccess());
      sellerLogin(merchant);
    }
    try {
      const success = await authenticationApi.RegisterAsMerchant(merchant);
      return onSuccess(success);
    } catch (error) {
      throw error;
    }
  };
}
export function sellerLogin(merchant) {
  return async function (dispatch) {
    function onSuccess(success) {
      dispatch(sellerLoginSuccess(success));
    }
    try {
      const success = await authenticationApi.Login(merchant);
      return onSuccess(success);
    } catch (error) {
      throw error;
    }
  };
}

export function logout(userType) {
  return async function (dispatch) {
    function onSuccess() {
      dispatch(
        userType === "buyer" ? buyerLogoutSuccess() : sellerLogoutSuccess()
      );
    }
    return onSuccess();
  };
}
