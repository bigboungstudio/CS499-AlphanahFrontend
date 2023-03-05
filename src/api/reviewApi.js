import { handleResponse, handleError } from "./apiUtils";
import axios from "axios";
const baseUrl = "http://alphanah.com:8080/product/";

export async function getReviews(product_uuid) {
  return await axios
    .get(baseUrl + product_uuid + `/review`)
    .then(handleResponse)
    .catch(handleError);
}

export async function getReviewById(product_uuid, review_uuid) {
  return await axios
    .get(baseUrl + product_uuid + `/review/` + review_uuid)
    .then(handleResponse)
    .catch(handleError);
}

export async function saveReview(isCreated, review, token) {
  return isCreated
    ? await axios
        .put(
          baseUrl + review.productUUID + `/review/${review.reviewUUID}`,
          {
            message: review.message,
            rating: review.rating,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token.tokenType} ${token.accessToken}`,
            },
          }
        )
        .then(handleResponse)
        .catch(handleError)
    : await axios
        .post(
          baseUrl + review.productUUID + `/review`,
          {
            message: review.message,
            rating: review.rating,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token.tokenType} ${token.accessToken}`,
            },
          }
        )
        .then(handleResponse)
        .catch(handleError);
}
export async function deleteReview(review, token) {
  return await axios
    .delete(baseUrl + review.productUUID + `/review/` + review.reviewUUID, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token.tokenType} ${token.accessToken}`,
      },
    })
    .then(handleResponse)
    .catch(handleError);
}
