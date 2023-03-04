import { handleResponse, handleError } from "../apiUtils";
import axios from "axios";
const baseUrl = "http://alphanah.com:8080/account";

export async function getCurrentAccount(token) {
  return await axios
    .get(baseUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token.tokenType} ${token.accessToken}`,
      },
    })
    .then(handleResponse)
    .catch(handleError);
}

export async function getAccountById(account_uuid) {
  return await axios
    .get(baseUrl + `/${account_uuid}`)
    .then(handleResponse)
    .catch(handleError);
}

export async function updateCurrentAccount(account, token) {
  var postData = {
    firstname: account.firstname,
    lastname: account.lastname,
    address: account.address,
    phone: account.phone,
  };
  return await axios
    .put(baseUrl, postData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token.tokenType} ${token.accessToken}`,
      },
    })
    .then(handleResponse)
    .catch(handleError);
}

export async function updateCurrentAccountImage(image, token) {
  let formData = new FormData();
  formData.append("image", image);

  return await axios({
    method: "put",
    url: baseUrl + `/image`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `${token.tokenType} ${token.accessToken}`,
    },
  })
    .then(handleResponse)
    .catch(handleError);
}
