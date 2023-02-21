import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://alphanah.com:8080/product";

export function getProducts() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function getProductsByName(name) {
  return fetch(baseUrl + `?name=${name}`)
    .then(handleResponse)
    .catch(handleError);
}

export function getProductsByCategory(category) {
  return fetch(baseUrl + `?category=${category}`)
    .then(handleResponse)
    .catch(handleError);
}

export function getProductsByMerchant(merchant_uuid) {
  return fetch(baseUrl + `?merchant=${merchant_uuid}`)
    .then(handleResponse)
    .catch(handleError);
}

export function getProductById(product_uuid) {
  return fetch(baseUrl + `/${product_uuid}`)
    .then(handleResponse)
    .catch(handleError);
}

export function saveProduct(product) {
  return fetch(baseUrl + (`/${product.id}` || ""), {
    method: product.id ? "PUT" : "POST",
    body: JSON.stringify(product),
  })
    .then(handleResponse)
    .catch(handleError);
}
export function deleteProduct(productId) {
  return fetch(baseUrl + `/${productId}`, {
    method: "DELETE",
  })
    .then(handleResponse)
    .catch(handleError);
}
