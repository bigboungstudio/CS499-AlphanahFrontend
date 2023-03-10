import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://alphanah.com:8080/product/";

export async function getProductImages(product_uuid) {
  return await axios
    .get(baseUrl + product_uuid + `/image`)
    .then(handleResponse)
    .catch(handleError);
}
export async function createProductMainImage(product_uuid, image, token) {
  let formData = new FormData();
  formData.append("image", image);
  return await axios({
    method: "post",
    url: baseUrl + product_uuid + `/main_image`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `${token.tokenType} ${token.accessToken}`,
    },
  })
    .then(handleResponse)
    .catch(handleError);
}
export async function createProductImage(product_uuid, image, token) {
  let formData = new FormData();
  formData.append("image", image);
  return await axios({
    method: "post",
    url: baseUrl + product_uuid + `/image`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `${token.tokenType} ${token.accessToken}`,
    },
  })
    .then(handleResponse)
    .catch(handleError);
}
export async function deleteProductImage(product_uuid, image_uuid, token) {
  return await axios
    .delete(baseUrl + product_uuid + `/image/` + image_uuid, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token.tokenType} ${token.accessToken}`,
      },
    })
    .then(handleResponse)
    .catch(handleError);
}
export async function getReviewImages(product_uuid, review_uuid) {
  return await axios
    .get(baseUrl + product_uuid + `/review/` + review_uuid + `/image`)
    .then(handleResponse)
    .catch(handleError);
}

export async function createReviewImage(image, review, token) {
  let formData = new FormData();
  formData.append("image", image);
  return await axios({
    method: "post",
    url:
      baseUrl + review.productUUID + `/review/` + review.reviewUUID + `/image`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `${token.tokenType} ${token.accessToken}`,
    },
  })
    .then(handleResponse)
    .catch(handleError);
}

export async function deleteReviewImage(product_uuid, review_uuid, image_uuid) {
  return await axios
    .delete(
      baseUrl + product_uuid + `/review/` + review_uuid + `/image/` + image_uuid
    )
    .then(handleResponse)
    .catch(handleError);
}
