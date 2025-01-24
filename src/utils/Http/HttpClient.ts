import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { axiosDateTransformer } from './axiosDateTransformer';

export class HttpClient {
  private readonly axios: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.axios = axios.create({
      ...config,
      transformResponse: [
        ...(Array.isArray(axios.defaults.transformResponse)
          ? axios.defaults.transformResponse
          : axios.defaults.transformResponse
            ? [axios.defaults.transformResponse]
            : []),
        ...(Array.isArray(config.transformResponse)
          ? config.transformResponse
          : config.transformResponse
            ? [config.transformResponse]
            : []),
        axiosDateTransformer,
      ],
    });
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axios.get<T>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axios.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axios.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axios.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axios.delete<T>(url, config);
    return response.data;
  }
}
