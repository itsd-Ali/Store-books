import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = !!localStorage.getItem('token'); // أو أي قيمة لتحديد الدخول
  if (!isLoggedIn) {
    inject(Router).navigate(['/login']);
    return false;
  }
  return true;
};
