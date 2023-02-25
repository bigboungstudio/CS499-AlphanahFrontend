import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://alphanah.com:8080/coupon";

export function getCoupons() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function getCouponsByType(type) {
  return fetch(baseUrl + `?type=${type}`)
    .then(handleResponse)
    .catch(handleError);
}

export function getCouponsByStarted(started) {
  return fetch(baseUrl + `?started=${started}`)
    .then(handleResponse)
    .catch(handleError);
}
export function getCouponsByExpired(expired) {
  return fetch(baseUrl + `?expired=${expired}`)
    .then(handleResponse)
    .catch(handleError);
}

export function getCouponsByRunOut(runout) {
  return fetch(baseUrl + `?runout=${runout}`)
    .then(handleResponse)
    .catch(handleError);
}

export function getCouponsByMerchant(merchant_uuid) {
  return fetch(baseUrl + `?merchant=${merchant_uuid}`)
    .then(handleResponse)
    .catch(handleError);
}

export function getCouponByCode(coupon_code) {
  return fetch(baseUrl + `/${coupon_code}`)
    .then(handleResponse)
    .catch(handleError);
}

export function createCoupon(coupon) {
  return fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      startDate: coupon.startDate,
      endDate: coupon.endDate,
      maxUse: coupon.maxUse,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCoupon(coupon_code) {
  return fetch(baseUrl + `/${coupon_code}`, {
    method: "DELETE",
  })
    .then(handleResponse)
    .catch(handleError);
}
