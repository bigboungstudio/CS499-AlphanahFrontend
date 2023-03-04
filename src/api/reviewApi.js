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

export async function saveReview(product_uuid, review) {
  return review.reviewUUID
    ? await axios
        .put(baseUrl + product_uuid + `/review/${review.reviewUUID}`, {
          message: review.message,
          rating: review.rating,
        })
        .then(handleResponse)
        .catch(handleError)
    : await axios
        .post(baseUrl, { message: review.message, rating: review.rating })
        .then(handleResponse)
        .catch(handleError);
}
export async function deleteReview(product_uuid, review_uuid) {
  return await axios
    .delete(baseUrl + product_uuid + `/review/` + review_uuid)
    .then(handleResponse)
    .catch(handleError);
}
