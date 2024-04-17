import axios from "axios";
import { DOMAIN, USER_TOKEN } from "../util/settings/settings";

export class BaseService {
  constructor() {}

  get(api) {
    return axios({
      method: "GET",
      url: `${DOMAIN}${api}`,
      headers: { Authorization: "Bearer " + localStorage.getItem(USER_TOKEN) },
    });
  }

  delete(api, data) {
    return axios({
      method: "DELETE",
      url: `${DOMAIN}${api}`,
      data: data,
      headers: { Authorization: "Bearer " + localStorage.getItem(USER_TOKEN) },
    });
  }

  put(api, data) {
    return axios({
      method: "PUT",
      url: `${DOMAIN}${api}`,
      data: data,
      headers: { Authorization: "Bearer " + localStorage.getItem(USER_TOKEN) },
    });
  }

  post(api, data) {
    return axios({
      method: "POST",
      url: `${DOMAIN}${api}`,
      data: data,
      headers: { Authorization: "Bearer " + localStorage.getItem(USER_TOKEN) },
    });
  }
}
