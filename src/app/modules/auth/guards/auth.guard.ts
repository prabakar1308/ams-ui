import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { AuthFacadeService } from '../services/auth-facade.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authFacadeService: AuthFacadeService = inject(AuthFacadeService);
  const router: Router = inject(Router);

  return authFacadeService.userSubject.pipe(
    map((response) => {
      if (response) {
        return true;
      }
      router.navigate(['/login']);
      return false;
    }),
    catchError((error) => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
