import * as types from "./actionTypes";
import * as productApi from "../../api/product/productApi";
import * as reviewApi from "../../api/reviewApi";
import * as imageApi from "../../api/imageApi";

export function loadProductsSuccess(products) {
  return { type: types.LOAD_PRODUCTS_SUCCESS, products };
}

export function loadOneProductSuccess(product) {
  return { type: types.LOAD_PRODUCT_DETAIL_SUCCESS, product };
}

export function createReviewSuccess() {
  return { type: types.CREATE_REVIEW_SUCCESS };
}

export function deleteReviewSuccess() {
  return { type: types.DELETE_REVIEW_SUCCESS };
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

export function createReview(review, token) {
  return async function (dispatch) {
    // async function addImage() {
    //   try {
    //     const success = await imageApi.createReviewImage(review);
    //     return onSuccess(success);
    //   } catch (error) {
    //     throw error;
    //   }
    // }
    function onSuccess(success) {
      dispatch(createReviewSuccess());
    }
    try {
      const success = await reviewApi.saveReview(false, review, token);
      return onSuccess(success);
      // return await addImage();
    } catch (error) {
      throw error;
    }
  };
}

export function deleteReview(review, token) {
  return async function (dispatch) {
    function onSuccess(success) {
      dispatch(deleteReviewSuccess());
    }
    try {
      const success = await reviewApi.deleteReview(review, token);
      return onSuccess(success);
    } catch (error) {
      throw error;
    }
  };
}
