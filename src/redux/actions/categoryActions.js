import * as types from "./actionTypes";
import * as categoryApi from "../../api/categoryApi";

export function loadCategoriesSuccess(categories) {
  return { type: types.LOAD_CATEGORIES_SUCCESS, categories };
}

export function loadCategories() {
  return async function (dispatch) {
    function onSuccess(success) {
      dispatch(loadCategoriesSuccess(success));
    }
    try {
      const success = await categoryApi.getCategories();
      return onSuccess(success);
    } catch (error) {
      throw error;
    }
  };
}
