import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://alphanah.com:8080";

export function ApplyCouponToCart(coupon_code) {
  return fetch(baseUrl + `/cart/coupon/` + coupon_code, {
    method: "POST",
  })
    .then(handleResponse)
    .catch(handleError);
}

export function RemoveCouponFromCart() {
  return fetch(baseUrl + `/cart/coupon`, {
    method: "DELETE",
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getCart() {
  return fetch(baseUrl + `/cart`)
    .then(handleResponse)
    .catch(handleError);
}

export function getPurchaseHistory() {
  return fetch(baseUrl + `/purchase_order`)
    .then(handleResponse)
    .catch(handleError);
}

export function getPurchaseOrderById(order_uuid) {
  return fetch(baseUrl + `/purchase_order/` + order_uuid)
    .then(handleResponse)
    .catch(handleError);
}

// co with mic's code
export function CheckoutCart(cart) {
  return fetch(baseUrl + `/checkout`, {
    method: "POST",
    body: JSON.stringify(cart),
  })
    .then(handleResponse)
    .catch(handleError);
}
