import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated()) {
        if (authService.isAdmin()) {
            return true;
        } else {
            router.navigate(['/admin/towns']);
            return false;
        }
    } else {
        router.navigate(['/login']);
        return false;
    }
};
