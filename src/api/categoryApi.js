import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://alphanah.com:8080/category";

export function getCategories() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function getCategoryById(category_uuid) {
  return fetch(baseUrl + `/${category_uuid}`)
    .then(handleResponse)
    .catch(handleError);
}
export function createCategory(category) {
  return fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(category),
  })
    .then(handleResponse)
    .catch(handleError);
}
export function createSubcategory(parent_category_uuid, subcategory) {
  return fetch(baseUrl + `/${parent_category_uuid}`, {
    method: "POST",
    body: JSON.stringify(subcategory),
  })
    .then(handleResponse)
    .catch(handleError);
}
