import { handleError, handleResponse } from "../apiUtils";
import axios from "axios";
const baseUrl = "http://alphanah.com:8080/product";

export async function getProducts() {
  return await axios.get(baseUrl).then(handleResponse).catch(handleError);
}

export async function getProductsByName(name) {
  return await axios
    .get(baseUrl + `?name=${name}`)
    .then(handleResponse)
    .catch(handleError);
}

export async function getProductsByCategory(category) {
  return await axios
    .get(baseUrl + `?category=${category}`)
    .then(handleResponse)
    .catch(handleError);
}

export async function getProductsByMerchant(accountUUID) {
  return await axios
    .get(baseUrl + `?merchant=${accountUUID}`)
    .then(handleResponse)
    .catch(handleError);
}

export async function getProductById(product_uuid) {
  return await axios
    .get(baseUrl + `/${product_uuid}`)
    .then(handleResponse)
    .catch(handleError);
}

export async function saveProduct(product, token) {
  return product.productUUID
    ? await axios
        .put(
          baseUrl + `/${product.productUUID}`,
          {
            name: product.name,
            description: product.description,
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
          baseUrl,
          {
            name: product.name,
            description: product.description,
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
export async function deleteProduct(productUUID, token) {
  return await axios
    .delete(baseUrl + `/${productUUID}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token.tokenType} ${token.accessToken}`,
      },
    })
    .then(handleResponse)
    .catch(handleError);
}
