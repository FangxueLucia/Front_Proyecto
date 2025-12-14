import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConnectService } from '../../../services/connect.services/connect.service';
import { CommonModule } from '@angular/common';

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
  constructor(private connectService: ConnectService, private router: Router) {}
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
        this.router.navigate(['/home']); //si  la contraseña está bien se redirige a la página de inicio
      } else {
        this.loginError.set(true); //si la contraseña no está bien se muestra un mensaje de error
      }
    } catch (error) {
      console.error('Error logging in:', error);
      this.loginError.set(true); //se muestra un mensaje de error
    }
  }
}
