import * as types from "./actionTypes";
import * as productApi from "../../api/product/productApi";

export function loadProductsSuccess(products) {
  return { type: types.LOAD_PRODUCTS_SUCCESS, products };
}

export function loadOneProductSuccess(product) {
  return { type: types.LOAD_PRODUCT_DETAIL_SUCCESS, product };
}

export function loadProducts() {
  return async function (dispatch) {
    function onSuccess(success) {
      dispatch(loadProductsSuccess(success));
    }
    try {
      const success = await productApi.getProducts();
      return onSuccess(success);
    } catch (error) {
      throw error;
    }
  };
}

export function loadProductById(productUUID) {
  return async function (dispatch) {
    function onSuccess(success) {
      dispatch(loadOneProductSuccess(success));
    }
    try {
      const success = await productApi.getProductById(productUUID);
      return onSuccess(success);
    } catch (error) {
      throw error;
    }
  };
}
