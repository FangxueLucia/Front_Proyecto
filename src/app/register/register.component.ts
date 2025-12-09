import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConnectService } from '../connect.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private connectService: ConnectService) {}

  name = signal('');
  username = signal('');
  email = signal('');
  password = signal('');

  nameChange($event: any) {
    this.name.set($event);
  }

  usernameChange($event: any) {
    this.username.set($event);
  }

  emailChange($event: any) {
    this.email.set($event);
  }

  passwordChange($event: any) {
    this.password.set($event);
  }

  async onSubmit() {
    const user = {
      name: this.name(),
      username: this.username(),
      email: this.email(),
      password: this.password(),
    };
    console.log('Register submitted', user);
    await this.connectService.register(user);
  }
}
