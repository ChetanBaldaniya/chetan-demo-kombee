import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://interview.optimavaluepro.com/api/v1',
  headers: {
    // 'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
  },
  timeout: 10000, 
});

interface ApiRequestConfig extends AxiosRequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: Record<string, any>;
}

export const apiRequest = async <T = any>({ url, method = 'GET', data }: ApiRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient({
      url,
      method,
      data,
    });
    return response.data;
  } catch (error: any) {
    console.error('API Error:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};