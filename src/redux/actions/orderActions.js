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

export function applyCouponToCartSuccess(cart) {
  return {
    type: types.APPLY_COUPON_CART_SUCCESS,
    cart,
  };
}

export function removeCouponFromCartSuccess(cart) {
  return {
    type: types.REMOVE_COUPON_CART_SUCCESS,
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
    type: types.LOAD_SALES_ORDER_SUCCESS,
    salesOrder,
  };
}

export function updateSalesOrderSuccess(salesOrder) {
  return {
    type: types.UPDATE_SALES_ORDER_SUCCESS,
    salesOrder,
  };
}

export function resetBuyerOrderSuccess() {
  return { type: types.RESET_BUYER_ORDER_SUCCESS };
}

export function resetSellerOrderSuccess() {
  return { type: types.RESET_SELLER_ORDER_SUCCESS };
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

export function applyCouponToCart(couponCode, token) {
  return async function (dispatch) {
    function onSuccess(success) {
      dispatch(applyCouponToCartSuccess(success));
    }
    try {
      const success = await orderApi.ApplyCouponToCart(couponCode, token);
      return onSuccess(success);
    } catch (error) {
      window.alert("ไม่สามารถใช้คูปองนี้ได้");
      throw error;
    }
  };
}

export function removeCouponFromCart(token, reset) {
  return async function (dispatch) {
    function onSuccess(success) {
      dispatch(removeCouponFromCartSuccess(success));
      reset();
    }
    try {
      const success = await orderApi.RemoveCouponFromCart(token);
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

export function updateSalesOrder(orderItemUUID, token, setLoading) {
  return async function (dispatch) {
    function onSuccess(success) {
      dispatch(updateSalesOrderSuccess(success));
      setLoading();
    }
    try {
      const success = await orderItemApi.updateSalesOrderStatus(
        orderItemUUID,
        token
      );
      return onSuccess(success);
    } catch (error) {
      setLoading();
      window.alert("เปลี่ยนสถานะไม่สำเร็จ");
      throw error;
    }
  };
}
