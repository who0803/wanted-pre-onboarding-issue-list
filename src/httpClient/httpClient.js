import axios from 'axios';

export class HttpClient {
  constructor(baseURL, token) {
    this.baseURL = baseURL;
    this.token = token;
  }

  fetch(url, options = {}) {
    return axios({
      ...options,
      url: this.baseURL + url,
      headers: {
        "Content-Type": "application/json",
        Authorization: "token " + this.token,
        ...options.headers,
      },
    });
  }
}