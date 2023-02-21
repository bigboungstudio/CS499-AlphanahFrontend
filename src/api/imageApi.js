import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://alphanah.com:8080/product/";

export function createProductMainImage(product_uuid, image) {
  return fetch(baseUrl + product_uuid + `/main_image`, {
    method: "POST",
    body: JSON.stringify(image),
  })
    .then(handleResponse)
    .catch(handleError);
}
export function getProductImages(product_uuid) {
  return fetch(baseUrl + product_uuid + `/image`)
    .then(handleResponse)
    .catch(handleError);
}
export function createProductImage(product_uuid, image) {
  return fetch(baseUrl + product_uuid + `/image`, {
    method: "POST",
    body: JSON.stringify(image),
  })
    .then(handleResponse)
    .catch(handleError);
}
export function deleteProductImage(product_uuid, image_uuid) {
  return fetch(baseUrl + product_uuid + `/image/` + image_uuid, {
    method: "DELETE",
  })
    .then(handleResponse)
    .catch(handleError);
}
export function getReviewImages(product_uuid, review_uuid) {
  return fetch(baseUrl + product_uuid + `/review/` + review_uuid + `/image`)
    .then(handleResponse)
    .catch(handleError);
}

export function createReviewImage(product_uuid, review_uuid, image) {
  return fetch(baseUrl + product_uuid + `/review/` + review_uuid + `/image`, {
    method: "POST",
    body: JSON.stringify(image),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteReviewImage(product_uuid, review_uuid, image_uuid) {
  return fetch(
    baseUrl + product_uuid + `/review/` + review_uuid + `/image/` + image_uuid,
    {
      method: "DELETE",
    }
  )
    .then(handleResponse)
    .catch(handleError);
}
