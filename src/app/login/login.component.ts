import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConnectService } from '../../../services/connect.services/connect.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterOutlet],
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
  usernameChange($event: any) {
    this.username.set($event);
  }
  passwordChange($event: any) {
    this.password.set($event);
  }
  async onSubmit() {
    const login = {
      //se crea un objeto con el username y password del usuario
      username: this.username(),
      password: this.password(),
    };
    await this.connectService.getPostDirect(login); //se llama al servicio para iniciar sesión
    this.router.navigate(['/home']); //se redirige a la página de inicio
  }
}
