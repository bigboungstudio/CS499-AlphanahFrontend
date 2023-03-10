import * as types from "./actionTypes";
import * as orderApi from "../../api/order/orderApi";
import * as orderItemApi from "../../api/order/orderItemApi";

export function loadCartSuccess(cart) {
  return {
    type: types.LOAD_CART_SUCCESS,
    cart,
  };
}

export function saveCartProductSuccess(isAdded, cart) {
  return {
    type: isAdded
      ? types.UPDATE_CART_PRODUCT_SUCCESS
      : types.ADD_CART_PRODUCT_SUCCESS,
    cart,
  };
}

export function deleteCartProductSuccess(cart) {
  return {
    type: types.DELETE_CART_PRODUCT_SUCCESS,
    cart,
  };
}

export function loadPurchaseHistorySuccess(purchaseHistory) {
  return {
    type: types.LOAD_PURCHASE_HISTORY_SUCCESS,
    purchaseHistory,
  };
}

export function loadSalesOrderSuccess(salesOrder) {
  return {
    type: types.LOAD_CART_SUCCESS,
    salesOrder,
  };
}

export function loadCart(token) {
  return async function (dispatch) {
    function onSuccess(success) {
      dispatch(loadCartSuccess(success));
    }
    try {
      const success = await orderApi.getCart(token);
      return onSuccess(success);
    } catch (error) {
      throw error;
    }
  };
}

export function saveCartProduct(isAdded, product, token) {
  return async function (dispatch) {
    function onSuccess(success) {
      dispatch(saveCartProductSuccess(isAdded, success));
    }
    try {
      const success = await orderItemApi.saveProductToCart(
        isAdded,
        product,
        token
      );
      return onSuccess(success);
    } catch (error) {
      throw error;
    }
  };
}

export function deleteCartProduct(product, token) {
  return async function (dispatch) {
    function onSuccess(success) {
      dispatch(deleteCartProductSuccess(success));
    }
    try {
      const success = await orderItemApi.deleteProductInCart(product, token);
      return onSuccess(success);
    } catch (error) {
      throw error;
    }
  };
}

export function loadPurchaseHistory(token) {
  return async function (dispatch) {
    function onSuccess(success) {
      dispatch(loadPurchaseHistorySuccess(success));
    }
    try {
      const success = await orderApi.getPurchaseHistory(token);
      return onSuccess(success);
    } catch (error) {
      throw error;
    }
  };
}

export function loadSalesOrder(token) {
  return async function (dispatch) {
    function onSuccess(success) {
      dispatch(loadSalesOrderSuccess(success));
    }
    try {
      const success = await orderItemApi.getSalesOrder(token);
      return onSuccess(success);
    } catch (error) {
      throw error;
    }
  };
}
