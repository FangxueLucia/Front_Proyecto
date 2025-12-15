import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RetrievePasswordComponent } from './retrieve-password/retrieve-password.component';
import { CodeComponent } from './code/code.component';
import { RessetPasswordComponent } from './resset-password/resset-password.component';
import { ConfirmedNewPasswordComponent } from './confirmed-new-password/confirmed-new-password.component';
import { BlogComponent } from './blog/blog.component';
import { StoreComponent } from './store/store.component';
import { ArteAntiguoComponent } from './arte-antiguo/arte-antiguo.component';
import { OldMastersComponent } from './old-masters/old-masters.component';
import { ArteContemporaneoComponent } from './arte-contemporaneo/arte-contemporaneo.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full', // Indica a Angular que esta ruta debe coincidir con la URL raíz
  },
  // ------------------------ Rutas de lo que ofrece la web ------------------------
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'store',
    component: StoreComponent,
  },
  // ------------------------ Rutas de Arte ------------------------
  {
    path: 'arte-antiguo',
    component: ArteAntiguoComponent,
  },
  {
    path: 'old-masters',
    component: OldMastersComponent,
  },
  {
    path: 'arte-contemporaneo',
    component: ArteContemporaneoComponent,
  },
  // ------------------------ Rutas de autenticación ------------------------
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
