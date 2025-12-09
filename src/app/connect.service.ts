import { Injectable, signal } from '@angular/core';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
});
instance.interceptors.request.use(
  //añade el token de autenticación a cada petición
  (config: any) => {
    const token = localStorage.getItem('token'); //obtiene el token guardado en localStorage
    console.log('interceptor');

    if (token) {
      // si existe el token, lo añade al encabezado 'Authorization'
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

@Injectable({
  providedIn: 'root',
})
export class ConnectService {
  saludo = signal('Hello world');
  private saveToken(token: string): void {
    if (token) {
      localStorage.setItem('token', token);
      console.log('Token saved');
    }
  }
  async getPostDirect(username: string, password: string): Promise<any> {
    try {
      const response: AxiosResponse = await instance.post('login', { username, password });
      console.log('Axios direct response received');
      const token = response.data.token;
      if (token) {
        this.saveToken(token);
      }
      return response.data;
    } catch (error) {
      console.error('Error obtaining data:', error);
      return undefined;
    }
  }

  async register(user: any): Promise<any> {
    try {
      const response: AxiosResponse = await instance.post('register', user);
      console.log('Register response received');
      const token = response.data.token;
      if (token) {
        this.saveToken(token);
      }
      return response.data;
    } catch (error) {
      console.error('Error registering:', error);
      return undefined;
    }
  }
}
