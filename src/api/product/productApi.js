import { handleError, handleResponse } from "../apiUtils";
const baseUrl = "http://alphanah.com:8080/product";

export async function getProducts() {
  return await fetch(baseUrl).then(handleResponse).catch(handleError);
}

export async function getProductsByName(name) {
  return await fetch(baseUrl + `?name=${name}`)
    .then(handleResponse)
    .catch(handleError);
}

export async function getProductsByCategory(category) {
  return await fetch(baseUrl + `?category=${category}`)
    .then(handleResponse)
    .catch(handleError);
}

export async function getProductsByMerchant(merchant_uuid) {
  return await fetch(baseUrl + `?merchant=${merchant_uuid}`)
    .then(handleResponse)
    .catch(handleError);
}

export async function getProductById(product_uuid) {
  return await fetch(baseUrl + `/${product_uuid}`)
    .then(handleResponse)
    .catch(handleError);
}

export async function saveProduct(product) {
  return await fetch(baseUrl + (`/${product.productUUID}` || ""), {
    method: product.productUUID ? "PUT" : "POST",
    body: JSON.stringify({
      name: product.name,
      description: product.description,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}
export async function deleteProduct(productId) {
  return await fetch(baseUrl + `/${productId}`, {
    method: "DELETE",
  })
    .then(handleResponse)
    .catch(handleError);
}
