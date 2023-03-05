import { handleResponse, handleError } from "../apiUtils";
import axios from "axios";
const baseUrl = "http://alphanah.com:8080";

export async function saveProductToCart(isAdded, product, token) {
  return isAdded
    ? await axios
        .put(
          baseUrl +
            `/cart/` +
            product.productUUID +
            `/option/` +
            product.optionUUID,
          { quantity: product.quantity },
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
          baseUrl +
            `/cart/` +
            product.productUUID +
            `/option/` +
            product.optionUUID,
          { quantity: product.quantity },
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

export async function deleteProductInCart(product, token) {
  return await axios
    .delete(
      baseUrl +
        `/cart/` +
        product.productUUID +
        `/option/` +
        product.optionUUID,
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

export async function getSalesOrder(token) {
  return await axios
    .get(baseUrl + `/sale_order`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token.tokenType} ${token.accessToken}`,
      },
    })
    .then(handleResponse)
    .catch(handleError);
}
export async function getSalesOrderById(order_item_uuid) {
  return await axios
    .get(baseUrl + `/sale_order/` + order_item_uuid)
    .then(handleResponse)
    .catch(handleError);
}
export async function updateSalesOrderStatus(order_item_uuid) {
  return await axios
    .put(baseUrl + `/sale_order/` + order_item_uuid)
    .then(handleResponse)
    .catch(handleError);
}
