import { Routes } from '@angular/router';
import { RegisterOrganisationComponent } from './auth/register-organisation/register-organisation.component';

export const routes: Routes = [
  { path: 'register', component: RegisterOrganisationComponent },
  { path: '', redirectTo:'register', pathMatch:'full' }
];
