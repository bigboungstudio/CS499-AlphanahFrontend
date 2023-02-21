import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://alphanah.com:8080/account";

export function getCurrentAccount() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function getAccountById(account_uuid) {
  return fetch(baseUrl + `/${account_uuid}`)
    .then(handleResponse)
    .catch(handleError);
}

export function updateCurrentAccount(account) {
  return fetch(baseUrl, {
    method: "PUT",
    body: JSON.stringify(account),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function updateCurrentAccountImage(image) {
  return fetch(baseUrl + `/image`, {
    method: "PUT",
    body: JSON.stringify(image),
  })
    .then(handleResponse)
    .catch(handleError);
}
