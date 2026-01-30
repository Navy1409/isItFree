import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService= inject(AuthServiceService)
  const router= inject(Router);
  if(authService.loggedInChanges()){
    return true;
  }
  return router.createUrlTree(['/login'])
};
