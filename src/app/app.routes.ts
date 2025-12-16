import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RetrievePasswordComponent } from './retrieve-password/retrieve-password.component';
import { CodeComponent } from './code/code.component';
import { RessetPasswordComponent } from './resset-password/resset-password.component';
import { ConfirmedNewPasswordComponent } from './confirmed-new-password/confirmed-new-password.component';
import { BlogComponent } from './blog/blog.component';
import { StoreComponent } from './store/store.component';
import { ArteHastaSXIXComponent } from './arte-hasta-s-xix/arte-hasta-s-xix.component';
import { ArteContemporaneoComponent } from './arte-contemporaneo/arte-contemporaneo.component';
import { VanguardiasComponent } from './vanguardias/vanguardias.component';

// ✅ Import correcto según tu archivo real:
import { StoreDetailComponent } from './store-detail/store-detail';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },

  { path: 'blog', component: BlogComponent },

  // Marketplace
  { path: 'store', component: StoreComponent },
  { path: 'store/:id', component: StoreDetailComponent },

  // Arte
  { path: 'arte-hasta-s-xix', component: ArteHastaSXIXComponent },
  { path: 'vanguardias', component: VanguardiasComponent },
  { path: 'arte-contemporaneo', component: ArteContemporaneoComponent },

  // Auth
  { path: 'login', component: LoginComponent },
  { path: 'retrievePassword', component: RetrievePasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'code', component: CodeComponent },
  { path: 'reset-password', component: RessetPasswordComponent },
  { path: 'confirmed-new-password', component: ConfirmedNewPasswordComponent },
];