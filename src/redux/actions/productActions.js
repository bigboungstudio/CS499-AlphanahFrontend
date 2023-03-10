import * as types from "./actionTypes";
import * as productApi from "../../api/product/productApi";
import * as reviewApi from "../../api/reviewApi";
import * as accountApi from "../../api/auth/accountApi";
import * as productCategoryApi from "../../api/product/productCategoryApi";
import * as productOptionApi from "../../api/product/productOptionApi";
import * as imageApi from "../../api/imageApi";

export function loadProductsSuccess(products) {
  return { type: types.LOAD_PRODUCTS_SUCCESS, products };
}

export function loadOneProductSuccess(product) {
  return { type: types.LOAD_PRODUCT_DETAIL_SUCCESS, product };
}

export function addProductSuccess() {
  return { type: types.ADD_PRODUCT_SUCCESS };
}

export function deleteProductSuccess(productUUID) {
  return { type: types.DELETE_PRODUCT_SUCCESS, productUUID };
}
export function updateProductSuccess() {
  return { type: types.UPDATE_PRODUCT_SUCCESS };
}

export function loadMerchantProductsSuccess(products) {
  return { type: types.LOAD_MERCHANT_PRODUCTS_SUCCESS, products };
}

export function loadMerchantDetailSuccess(user) {
  return { type: types.LOAD_MERCHANT_DETAIL_SUCCESS, user };
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

export function addProduct(product, token, navigate) {
  return async function (dispatch) {
    async function onSuccess(success) {
      const productUUID = success.productUUID;
      await productCategoryApi.createProductCategory(
        productUUID,
        product.category.categoryUUID,
        token
      );
      product.options.map(
        async (option) =>
          await productOptionApi.saveProductOption(productUUID, option, token)
      );
      await imageApi.createProductMainImage(
        productUUID,
        product.mainImage.file,
        token
      );
      product.images.map(
        async (image) =>
          await imageApi.createProductImage(productUUID, image.file, token)
      );
      dispatch(addProductSuccess());
      navigate();
    }
    try {
      const success = await productApi.saveProduct(product, token);
      return onSuccess(success);
    } catch (error) {
      throw error;
    }
  };
}

export function deleteProduct(productUUID, token) {
  return async function (dispatch) {
    async function onSuccess(success) {
      dispatch(deleteProductSuccess(productUUID));
    }
    try {
      const success = await productApi.deleteProduct(productUUID, token);
      return onSuccess(success);
    } catch (error) {
      throw error;
    }
  };
}

export function updateProduct(newProduct, deleteProduct, token, navigate) {
  const productUUID = newProduct.productUUID;
  return async function (dispatch) {
    async function onSuccess(success) {
      if (Object.keys(deleteProduct.category).length !== 0) {
        await productCategoryApi.deleteProductCategory(
          productUUID,
          deleteProduct.category.categoryUUID,
          token
        );

        await productCategoryApi.createProductCategory(
          productUUID,
          newProduct.category.categoryUUID,
          token
        );
      }
      deleteProduct.options.length !== 0 &&
        deleteProduct.options.map(
          async (option) =>
            await productOptionApi.deleteProductOption(
              productUUID,
              option.optionUUID,
              token
            )
        );
      if (Object.keys(deleteProduct.mainImage).length !== 0) {
        await imageApi.createProductMainImage(
          productUUID,
          newProduct.mainImage.file,
          token
        );
      }
      deleteProduct.images.length !== 0 &&
        deleteProduct.images.map(
          async (image) =>
            await imageApi.deleteProductImage(
              productUUID,
              image.imageUUID,
              token
            )
        );

      newProduct.options.map(
        async (option) =>
          await productOptionApi.saveProductOption(productUUID, option, token)
      );

      newProduct.images.map(
        async (image) =>
          !image.imageUUID &&
          (await imageApi.createProductImage(productUUID, image.file, token))
      );
      dispatch(updateProductSuccess());
      navigate();
    }
    try {
      const success = await productApi.saveProduct(newProduct, token);
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

export function loadProductByMerchant(accountUUID) {
  return async function (dispatch) {
    function onSuccess(success) {
      dispatch(loadMerchantProductsSuccess(success));
    }
    try {
      const success = await productApi.getProductsByMerchant(accountUUID);
      return onSuccess(success);
    } catch (error) {
      throw error;
    }
  };
}

export function loadMerchantDetail(accountUUID) {
  return async function (dispatch) {
    function onSuccess(success) {
      dispatch(loadMerchantDetailSuccess(success));
    }
    try {
      const success = await accountApi.getAccountById(accountUUID);
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
