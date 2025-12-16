import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConnectService } from '../../../services/connect.services/connect.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/connect.services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterOutlet],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

//Incia el componente de inicio de sesión
//Recibe el username y password del usuario y lo envía al backend para iniciar sesión
//Si el usuario es correcto, se redirige a la página de inicio
//Si el usuario no es correcto, se muestra un mensaje de error
export class LoginComponent {
  constructor(
    private connectService: ConnectService,
    private router: Router,
    private authService: AuthService
  ) {}
  username = signal('');
  password = signal('');
  loginError = signal(false); // para que pueda aparecer un mensaje de error
  usernameChange($event: any) {
    this.username.set($event);
  }
  passwordChange($event: any) {
    this.password.set($event);
  }
  async onSubmit() {
    this.loginError.set(false); //rastrea si hay un error antes de intentar el login
    const login = {
      //se crea un objeto con el username y password del usuario
      username: this.username(),
      password: this.password(),
    };
    try {
      const response = await this.connectService.getPostDirect(login); //se llama al servicio para iniciar sesión
      if (response) {
        const userData = {
          //almacena en un objero los datos del usuario
          name: this.username(), //es el valor que el usuario ingresa en el formulario
          username: this.username(), //es el valor que el usuario ingresa en el formulario
          image:
            response.profilePicture || //obtiene la imagen de perfil del usuario. Si no hay, se pone la url de la imagen del gatito
            'https://cdn.pixabay.com/photo/2016/03/28/10/05/kitten-1285341_640.jpg',
        };
        this.authService.login(userData);
        this.router.navigate(['/']); //si  la contraseña está bien se redirige a la página de inicio
      } else {
        this.loginError.set(true); //si la contraseña no está bien se muestra un mensaje de error
      }
    } catch (error) {
      console.error('Error logging in:', error);
      this.loginError.set(true);
    }
  }
}
