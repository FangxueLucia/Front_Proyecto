import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConnectService } from '../connect.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private connectService: ConnectService) {}
  username = signal('');
  password = signal('');
  usernameChange($event: any) {
    this.username.set($event);
  }
  passwordChange($event: any) {
    this.password.set($event);
  }
  async onSubmit() {
    const res = await this.connectService.getPostDirect(this.username(), this.password());
    console.log(res);
  }
}
