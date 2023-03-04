import { handleResponse, handleError } from "../apiUtils";
import axios from "axios";
const baseUrl = "http://alphanah.com:8080";

export async function saveProductToCart(
  product_uuid,
  product_option_uuid,
  product
) {
  return product.quantity
    ? await axios
        .put(
          baseUrl + `/cart/` + product_uuid + `/option/` + product_option_uuid,
          { quantity: product.quantity }
        )
        .then(handleResponse)
        .catch(handleError)
    : await axios
        .post(
          baseUrl + `/cart/` + product_uuid + `/option/` + product_option_uuid,
          { quantity: product.quantity }
        )
        .then(handleResponse)
        .catch(handleError);
}

export async function deleteProductInCart(product_uuid, product_option_uuid) {
  return await axios
    .delete(
      baseUrl + `/cart/` + product_uuid + `/option/` + product_option_uuid
    )
    .then(handleResponse)
    .catch(handleError);
}

export async function getSalesOrder() {
  return await axios
    .get(baseUrl + `/sale_order`)
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
