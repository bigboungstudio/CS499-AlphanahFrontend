import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://alphanah.com:8080/product/";

export function createProductCategory(product_uuid, category_uuid) {
  return fetch(baseUrl + product_uuid + `/category/` + category_uuid, {
    method: "POST",
  })
    .then(handleResponse)
    .catch(handleError);
}
export function deleteProductCategory(product_uuid, category_uuid) {
  return fetch(baseUrl + product_uuid + `/category/` + category_uuid, {
    method: "DELETE",
  })
    .then(handleResponse)
    .catch(handleError);
}
