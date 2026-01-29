import { Routes } from '@angular/router';
import { RegisterOrganisationComponent } from './auth/register-organisation/register-organisation.component';

import { LoginComponent } from './auth/login/login.component';
import { AllOfficeComponent } from './all-office/all-office.component';
import { OfficeAvailabilityComponent } from './office-availability/office-availability.component';
import { CabinSeatBookingComponent } from './cabin-seat-booking/cabin-seat-booking.component';

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
    }

];
