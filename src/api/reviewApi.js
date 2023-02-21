import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://alphanah.com:8080/product/";

export function getReviews(product_uuid) {
  return fetch(baseUrl + product_uuid + `/review`)
    .then(handleResponse)
    .catch(handleError);
}

export function getReviewById(product_uuid, review_uuid) {
  return fetch(baseUrl + product_uuid + `/review/` + review_uuid)
    .then(handleResponse)
    .catch(handleError);
}

export function saveReview(product_uuid, review) {
  return fetch(
    baseUrl + product_uuid + `/review` + (`/${review.review_uuid}` || ""),
    {
      method: review.review_uuid ? "PUT" : "POST",
      body: JSON.stringify(review),
    }
  )
    .then(handleResponse)
    .catch(handleError);
}
export function deleteReview(product_uuid, review_uuid) {
  return fetch(baseUrl + product_uuid + `/review/` + review_uuid, {
    method: "DELETE",
  })
    .then(handleResponse)
    .catch(handleError);
}
