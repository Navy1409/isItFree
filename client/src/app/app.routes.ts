import { Routes } from '@angular/router';
import { RegisterOrganisationComponent } from './auth/register-organisation/register-organisation.component';

import { LoginComponent } from './auth/login/login.component';
import { AllOfficeComponent } from './all-office/all-office.component';
import { OfficeAvailabilityComponent } from './office-availability/office-availability.component';
import { CabinSeatBookingComponent } from './cabin-seat-booking/cabin-seat-booking.component';
import { CreateComponent } from './admin/create/create.component';
import { CreateUserComponent } from './admin/create/create-user/create-user.component';
import { CreateOfficeComponent } from './admin/create/create-office/create-office.component';
import { ViewUsersComponent } from './admin/create/view-users/view-users.component';
import { ViewOfficesComponent } from './admin/create/view-offices/view-offices.component';
import { authGuardGuard } from './guard/auth-guard.guard';

export const routes: Routes = [
    {
        path:'',
        component:AllOfficeComponent
    },
    {
        path: 'register',
        component:RegisterOrganisationComponent,
    },
    {
        path: 'login',
        component:LoginComponent
    },
    {
        path:'office/:officeId/:date',
        component:CabinSeatBookingComponent
    },
    {
        path:'office/:officeId/:date/book',
        component:OfficeAvailabilityComponent
    },
    {
        path:'admin/dashboard',
        component:CreateComponent,
        canActivate:[authGuardGuard],
        children:[
            {
                path:'create-user',
                component:CreateUserComponent
            },
            {
                path:'create-office',
                component:CreateOfficeComponent
            },
            {
                path:'view-users',
                component:ViewUsersComponent
            },
            {
                path:'view-offices',
                component:ViewOfficesComponent
            },
            {
                path:'',
                redirectTo:'create-user',
                pathMatch:'full'
            }
        ]
    }

];
