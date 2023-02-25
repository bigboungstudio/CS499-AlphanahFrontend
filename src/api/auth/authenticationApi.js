import { handleResponse, handleError } from "../apiUtils";
const baseUrl = "http://alphanah.com:8080";

export function RegisterAsCustomer(customer) {
  return fetch(baseUrl + `/register?role=CUSTOMER`, {
    method: "POST",
    body: JSON.stringify({
      email: customer.email,
      password: customer.password,
      confirmPassword: customer.confirmPassword,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function RegisterAsMerchant(merchant) {
  return fetch(baseUrl + `/register?role=MERCHANT`, {
    method: "POST",
    body: JSON.stringify({
      email: merchant.email,
      password: merchant.password,
      confirmPassword: merchant.confirmPassword,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}
export function Login(user) {
  return fetch(baseUrl + `/login`, {
    method: "POST",
    body: JSON.stringify({ email: user.email, password: user.password }),
  })
    .then(handleResponse)
    .catch(handleError);
}
