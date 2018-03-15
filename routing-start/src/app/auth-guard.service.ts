import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router/";
import { Observable } from "rxjs/Observable";
import { Injectable} from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild{
    
    constructor(private authService:AuthService,
                private router : Router){}

    canActivate(route: ActivatedRouteSnapshot, 
               state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.authService.isAuthenticated()
                .then(
                    (authenticated: boolean ) => {
                        if (authenticated){
                            return true;
                        }
                        else {
                            this.router.navigate(['/']);  // go to root page
                        }
                    }
                );
    }


    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.canActivate(childRoute, state);    
    }
    
}