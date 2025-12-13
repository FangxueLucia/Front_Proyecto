import { Component, signal, OnInit } from '@angular/core';
import { ConnectService } from '../../../services/connect.services/connect.service';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-resset-password',
  imports: [FormsModule, RouterOutlet],
  templateUrl: './resset-password.component.html',
  styleUrl: './resset-password.component.css',
})

//------------ Recibe el email desde el componente CodeComponent--------------------------
export class RessetPasswordComponent implements OnInit {
  constructor(private connectService: ConnectService, private router: Router) {} //inyección de dependencias. Da un servicio para conectarse a internet y para navegar entre las páginas o componentes.
  email = signal('');
  password = signal('');
  confirmPassword = signal('');

  ngOnInit(): void {
    // hace lo mismo que el ngOnInit de CodeComponent
    const state = history.state;
    console.log(state);
    if (state && state['email']) {
      this.email.set(state['email']);
    } else {
      console.log('No se recibio email en el estado de la navegación o la pagina fue recargada');
    }
  }

  passwordChange($event: any) {
    this.password.set($event);
  }
  confirmPasswordChange($event: any) {
    this.confirmPassword.set($event);
  }

  async onSubmit() {
    if (this.password() === this.confirmPassword()) {
      // comprueba que las contraseñas coinciden
      console.log('Las contraseñas coinciden');
      const resetPassword = {
        email: this.email(),
        password: this.password(),
      };
      await this.connectService.resetPassword(resetPassword); // envía el email y la contraseña nueva al backend
      this.router.navigate(['/confirmed-new-password']); //redirige a la página de confirmación
    } else {
      console.log('Las contraseñas no coinciden');
    }
  }
}
