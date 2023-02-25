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
    baseUrl + product_uuid + `/review` + (`/${review.reviewUUID}` || ""),
    {
      method: review.reviewUUID ? "PUT" : "POST",
      body: JSON.stringify({ message: review.message, rating: review.rating }),
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
