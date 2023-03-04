import { handleResponse, handleError } from "../apiUtils";
import axios from "axios";
const baseUrl = "http://alphanah.com:8080";

export async function ApplyCouponToCart(coupon_code) {
  return await axios
    .post(baseUrl + `/cart/coupon/` + coupon_code)
    .then(handleResponse)
    .catch(handleError);
}

export async function RemoveCouponFromCart() {
  return await axios
    .delete(baseUrl + `/cart/coupon`)
    .then(handleResponse)
    .catch(handleError);
}

export async function getCart() {
  return await axios
    .get(baseUrl + `/cart`)
    .then(handleResponse)
    .catch(handleError);
}

export async function getPurchaseHistory() {
  return await axios
    .get(baseUrl + `/purchase_order`)
    .then(handleResponse)
    .catch(handleError);
}

export async function getPurchaseOrderById(order_uuid) {
  return await axios
    .get(baseUrl + `/purchase_order/` + order_uuid)
    .then(handleResponse)
    .catch(handleError);
}

// co with mic's code
export async function CheckoutCart(cart) {
  return await axios
    .post(baseUrl + `/checkout`, {
      cart,
    })
    .then(handleResponse)
    .catch(handleError);
}
