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
  async getPostDirect(login: any): Promise<any> {
    //función que recibe el username y password del usuario y lo envía al backend para iniciar sesión
    try {
      const response: AxiosResponse = await instance.post('login', login); //envía el username y password al backend
      console.log('Axios direct response received');
      const token = response.data.token; //obtiene el token del backend
      if (token) {
        this.saveToken(token); //guarda el token en localStorage
      }
      return response.data;
    } catch (error) {
      console.error('Error obtaining data:', error);
      return undefined;
    }
  }
  async register(user: any): Promise<any> {
    //función que recibe el nombre, username, email y password del usuario y lo envía al backend para registrar al usuario
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

  async getEmail(verifyEmail: any): Promise<any> {
    //esta función será la que obtenga el email del usuario desde el backend y compruebe si ya existe.
    // En el caso de que exista envía un código de 6 dígitos. (Es para recuperar la contraseña)
    try {
      const response: AxiosResponse = await instance.post('get-email', verifyEmail);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error getting email:', error);
      return undefined;
    }
  }
  async getCode(checkCode: any): Promise<any> {
    //Esta función recibe el email para que lo compare con el código asignado
    try {
      const response: AxiosResponse = await instance.post('code-check', checkCode);
      return response.data;
    } catch (error: any) {
      console.error('Error getting code:', error);
      return undefined;
    }
  }
}
