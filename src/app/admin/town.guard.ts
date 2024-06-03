import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../core/user.service';

export const townGuard: CanActivateFn = (route, state) => {
    const townID = route.params['id'];
    const userService = inject(UserService);
    const router = inject(Router);

    if (userService.getUser().role === 'admin') {
        return true;
    } else if (userService.getUser().townID == townID) {
        return true;
    } else {
        router.navigate(['/admin']);
        return false;
    }
};
