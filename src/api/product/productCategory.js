import { handleResponse, handleError } from "../apiUtils";
import axios from "axios";
const baseUrl = "http://alphanah.com:8080/product/";

export async function createProductCategory(product_uuid, category_uuid) {
  return await axios
    .post(baseUrl + product_uuid + `/category/` + category_uuid)
    .then(handleResponse)
    .catch(handleError);
}
export async function deleteProductCategory(product_uuid, category_uuid) {
  return await axios
    .delete(baseUrl + product_uuid + `/category/` + category_uuid)
    .then(handleResponse)
    .catch(handleError);
}
