import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";
import {inject} from "@angular/core";

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    return true;
  } else {
    console.error('Unauthorized access to admin route');
    router.navigate(['/']);
    return false;
  }
};
