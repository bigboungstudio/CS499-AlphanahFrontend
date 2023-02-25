import { handleResponse, handleError } from "../apiUtils";
const baseUrl = "http://alphanah.com:8080/product/";

export function getProductOptions(product_uuid) {
  return fetch(baseUrl + product_uuid + `/option`)
    .then(handleResponse)
    .catch(handleError);
}

export function getProductOptionById(product_uuid, product_option_uuid) {
  return fetch(baseUrl + product_uuid + `/option/` + product_option_uuid)
    .then(handleResponse)
    .catch(handleError);
}

export function saveProductOption(product_uuid, option) {
  return fetch(
    baseUrl + product_uuid + `/option` + (`/${option.optionUUID}` || ""),
    {
      method: option.optionUUID ? "PUT" : "POST",
      body: JSON.stringify({
        name: option.name,
        price: option.price,
        quantity: option.quantity,
      }),
    }
  )
    .then(handleResponse)
    .catch(handleError);
}
export function deleteProductOption(product_uuid, product_option_uuid) {
  return fetch(baseUrl + product_uuid + `/option/` + product_option_uuid, {
    method: "DELETE",
  })
    .then(handleResponse)
    .catch(handleError);
}
