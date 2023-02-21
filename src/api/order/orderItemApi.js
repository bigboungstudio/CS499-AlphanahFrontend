import { handleResponse, handleError } from "../apiUtils";
const baseUrl = "http://alphanah.com:8080";

export function saveProductToCart(product_uuid, product_option_uuid, product) {
  return fetch(
    baseUrl + `/cart/` + product_uuid + `/option/` + product_option_uuid,
    {
      method: product.quantity ? "PUT" : "POST",
      body: JSON.stringify(product),
    }
  )
    .then(handleResponse)
    .catch(handleError);
}
export function deleteProductInCart(product_uuid, product_option_uuid) {
  return fetch(
    baseUrl + `/cart/` + product_uuid + `/option/` + product_option_uuid,
    {
      method: "DELETE",
    }
  )
    .then(handleResponse)
    .catch(handleError);
}

export function getSalesOrder() {
  return fetch(baseUrl + `/sale_order`)
    .then(handleResponse)
    .catch(handleError);
}
export function getSalesOrderById(order_item_uuid) {
  return fetch(baseUrl + `/sale_order/` + order_item_uuid)
    .then(handleResponse)
    .catch(handleError);
}
export function updateSalesOrderStatus(order_item_uuid) {
  return fetch(baseUrl + `/sale_order/` + order_item_uuid, { method: "PUT" })
    .then(handleResponse)
    .catch(handleError);
}
