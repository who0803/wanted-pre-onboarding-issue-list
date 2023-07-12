export class IssueService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async get(url) {
    const response = await this.httpClient.fetch(url);
    return response;
  }
  
  async getList(url) {
    const response = await this.httpClient.fetch(url);
    return response;
  }
}