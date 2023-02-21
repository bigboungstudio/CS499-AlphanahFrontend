import { handleResponse, handleError } from "../apiUtils";
const baseUrl = "http://alphanah.com:8080";

export function RegisterAsCustomer(customer) {
  return fetch(baseUrl + `/register?role=CUSTOMER`, {
    method: "POST",
    body: JSON.stringify(customer),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function RegisterAsMerchant(merchant) {
  return fetch(baseUrl + `/register?role=MERCHANT`, {
    method: "POST",
    body: JSON.stringify(merchant),
  })
    .then(handleResponse)
    .catch(handleError);
}
export function Login(user) {
  return fetch(baseUrl + `/login`, {
    method: "POST",
    body: JSON.stringify(user),
  })
    .then(handleResponse)
    .catch(handleError);
}
