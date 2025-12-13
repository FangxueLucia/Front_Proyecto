import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RetrievePasswordComponent } from './retrieve-password/retrieve-password.component';
import { CodeComponent } from './code/code.component';
import { RessetPasswordComponent } from './resset-password/resset-password.component';
import { ConfirmedNewPasswordComponent } from './confirmed-new-password/confirmed-new-password.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full', // Indica a Angular que esta ruta debe coincidir con la URL raíz
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'retrievePassword',
    component: RetrievePasswordComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'code',
    component: CodeComponent,
  },
  {
    path: 'reset-password',
    component: RessetPasswordComponent,
  },
  {
    path: 'confirmed-new-password',
    component: ConfirmedNewPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
