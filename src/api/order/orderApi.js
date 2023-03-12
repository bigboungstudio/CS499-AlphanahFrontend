import { handleResponse, handleError } from "../apiUtils";
import axios from "axios";
const baseUrl = "http://alphanah.com:8080";

export async function ApplyCouponToCart(coupon_code, token) {
  return await axios
    .post(
      baseUrl + `/cart/coupon/` + coupon_code,
      {},
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

export async function RemoveCouponFromCart(token) {
  return await axios
    .delete(baseUrl + `/cart/coupon`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token.tokenType} ${token.accessToken}`,
      },
    })
    .then(handleResponse)
    .catch(handleError);
}

export async function getCart(token) {
  return await axios
    .get(baseUrl + `/cart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token.tokenType} ${token.accessToken}`,
      },
    })
    .then(handleResponse)
    .catch(handleError);
}

export async function getPurchaseHistory(token) {
  return await axios
    .get(baseUrl + `/purchase_order`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token.tokenType} ${token.accessToken}`,
      },
    })
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
