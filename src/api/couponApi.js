import { handleResponse, handleError } from "./apiUtils";
import axios from "axios";
const baseUrl = "http://alphanah.com:8080/coupon";

export async function getCoupons() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export async function getCouponsByType(type) {
  return await axios
    .get(baseUrl + `?type=${type}`)
    .then(handleResponse)
    .catch(handleError);
}

export async function getCouponsByStarted(started) {
  return await axios
    .get(baseUrl + `?started=${started}`)
    .then(handleResponse)
    .catch(handleError);
}
export async function getCouponsByExpired(expired) {
  return await axios
    .get(baseUrl + `?expired=${expired}`)
    .then(handleResponse)
    .catch(handleError);
}

export async function getCouponsByRunOut(runout) {
  return await axios
    .get(baseUrl + `?runout=${runout}`)
    .then(handleResponse)
    .catch(handleError);
}

export async function getCouponsByMerchant(merchant_uuid) {
  return await axios
    .get(baseUrl + `?merchant=${merchant_uuid}`)
    .then(handleResponse)
    .catch(handleError);
}

export async function getCouponByCode(coupon_code) {
  return await axios
    .get(baseUrl + `/${coupon_code}`)
    .then(handleResponse)
    .catch(handleError);
}

export async function createCoupon(coupon) {
  return await axios
    .post(baseUrl, {
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      startDate: coupon.startDate,
      endDate: coupon.endDate,
      maxUse: coupon.maxUse,
    })
    .then(handleResponse)
    .catch(handleError);
}

export async function deleteCoupon(coupon_code) {
  return await axios
    .delete(baseUrl + `/${coupon_code}`)
    .then(handleResponse)
    .catch(handleError);
}
