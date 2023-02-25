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
    body: JSON.stringify({
      firstname: account.firstname,
      lastname: account.lastname,
      address: account.address,
      phone: account.phone,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function updateCurrentAccountImage(image) {
  let formData = new FormData();

  formData.append("image", image.file);

  return fetch(baseUrl + `/image`, {
    method: "PUT",
    headers: { "content-type": "multipart/form-data" },
    body: formData,
  })
    .then(handleResponse)
    .catch(handleError);
}
