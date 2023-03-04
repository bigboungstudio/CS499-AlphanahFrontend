import { handleResponse, handleError } from "../apiUtils";
import axios from "axios";
const baseUrl = "http://alphanah.com:8080";

export async function RegisterAsCustomer(customer) {
  return await axios
    .post(baseUrl + `/register?role=CUSTOMER`, {
      email: customer.email,
      password: customer.password,
      confirmPassword: customer.confirmPassword,
    })
    .then(handleResponse)
    .catch(handleError);
}

export async function RegisterAsMerchant(merchant) {
  return await axios
    .post(baseUrl + `/register?role=MERCHANT`, {
      email: merchant.email,
      password: merchant.password,
      confirmPassword: merchant.confirmPassword,
    })
    .then(handleResponse)
    .catch(handleError);
}
export async function Login(user) {
  return await axios
    .post(baseUrl + `/login`, { email: user.email, password: user.password })
    .then(handleResponse)
    .catch(handleError);
}
