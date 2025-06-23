import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if(!localStorage.getItem("response")){
    const router = inject(Router);
    router.navigateByUrl("/");
    return false;
  }

  return true;
};
