import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Observable, map, tap } from "rxjs";
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";

const checkAuthStatus = (): boolean | Observable<boolean> => {

  const authService: AuthService = inject(AuthService)
  const router: Router = inject(Router)

  return authService.checkAuthentication().pipe(
    tap(( isAuthenticated) => {
      if ( isAuthenticated ) {
        router.navigate(['./'])
      }
    }),
    map( isAuthenticated => !isAuthenticated)
  )
}

export const canActivateGuardToPrinciple: CanActivateFn = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return checkAuthStatus()
}

export const canMatchGuardPrinciple: CanMatchFn = ( route: Route, state: UrlSegment[]) => {
  return checkAuthStatus()
}
