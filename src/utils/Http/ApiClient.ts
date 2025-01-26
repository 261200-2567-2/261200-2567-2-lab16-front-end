import { HttpClient } from './HttpClient';

export class ApiClient extends HttpClient {
  constructor() {
    super({
      baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080',
    });
  }
}
