import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthFacadeService } from '@app/auth/services/auth-facade.service';
import { map } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {
  const authFacadeService: AuthFacadeService = inject(AuthFacadeService);
  const router: Router = inject(Router);
  const expectedRoles = route.data['roles'] as string[] | undefined;

  return authFacadeService.userData$.pipe(
    map((user) => {
      if (!user) {
        router.navigate(['/login']);
        return false;
      }
      if (!expectedRoles || expectedRoles.length === 0) {
        return true;
      }
      // Check if user has at least one of the expected roles
      const hasRole = expectedRoles.some((role) => user.userRole?.includes(role));
      if (!hasRole) {
        router.navigate(['/dashboard']); // or a forbidden page
      }
      return hasRole;
    }),
  );
};
