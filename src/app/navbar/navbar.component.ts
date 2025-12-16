import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para usar *ngIf en el HTML
import { AuthService } from '../../../services/connect.services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  user: any = null; // Variable para guardar la información del usuario logueado

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Sirve para saber cuándo el usuario inicia o cierra sesión
    this.authService.currentUser.subscribe((user) => {
      this.user = user;
    });
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout();
  }
}
