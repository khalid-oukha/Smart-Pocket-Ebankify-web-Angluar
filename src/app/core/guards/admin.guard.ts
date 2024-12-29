import {CanActivateFn, Router} from '@angular/router';
import {UserService} from "../services/user.service";
import {inject} from "@angular/core";
import {AuthService} from "../../auth/services/auth.service";
import {firstValueFrom} from "rxjs";

export const adminGuard: CanActivateFn = async (route, state) => {
  const userService = inject(UserService);
  const authService = inject(AuthService);
  const router = inject(Router);

  const email = authService.getLoggedInUserEmail();

  if (!email) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const user = await firstValueFrom(userService.getUserByEmail(email));
    if (user.role === 'ADMIN') {
      return true;
    } else {
      router.navigate(['/register']);
      return false;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    router.navigate(['/login']);
    return false;
  }
};
