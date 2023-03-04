import { handleResponse, handleError } from "../apiUtils";
import axios from "axios";
const baseUrl = "http://alphanah.com:8080/product/";

export async function getProductOptions(product_uuid) {
  return await axios
    .get(baseUrl + product_uuid + `/option`)
    .then(handleResponse)
    .catch(handleError);
}

export async function getProductOptionById(product_uuid, product_option_uuid) {
  return await axios
    .get(baseUrl + product_uuid + `/option/` + product_option_uuid)
    .then(handleResponse)
    .catch(handleError);
}

export async function saveProductOption(product_uuid, option) {
  return option.optionUUID
    ? await axios
        .put(baseUrl + product_uuid + `/option/${option.optionUUID}`, {
          name: option.name,
          price: option.price,
          quantity: option.quantity,
        })
        .then(handleResponse)
        .catch(handleError)
    : await axios
        .post(baseUrl, {
          name: option.name,
          price: option.price,
          quantity: option.quantity,
        })
        .then(handleResponse)
        .catch(handleError);
}
export async function deleteProductOption(product_uuid, product_option_uuid) {
  return await axios
    .delete(baseUrl + product_uuid + `/option/` + product_option_uuid)
    .then(handleResponse)
    .catch(handleError);
}
