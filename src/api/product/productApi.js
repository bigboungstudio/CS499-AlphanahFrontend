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

export async function getProductsByMerchant(merchant_uuid) {
  return await axios
    .get(baseUrl + `?merchant=${merchant_uuid}`)
    .then(handleResponse)
    .catch(handleError);
}

export async function getProductById(product_uuid) {
  return await axios
    .get(baseUrl + `/${product_uuid}`)
    .then(handleResponse)
    .catch(handleError);
}

export async function saveProduct(product) {
  return product.productUUID
    ? await axios
        .put(baseUrl + `/${product.productUUID}`, {
          name: product.name,
          description: product.description,
        })
        .then(handleResponse)
        .catch(handleError)
    : await axios
        .post(baseUrl, {
          name: product.name,
          description: product.description,
        })
        .then(handleResponse)
        .catch(handleError);
}
export async function deleteProduct(productId) {
  return await axios
    .delete(baseUrl + `/${productId}`)
    .then(handleResponse)
    .catch(handleError);
}
