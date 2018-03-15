import { Observable } from "rxjs/Observable";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

export interface CanComponentDeactivate{

    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;

}

export class CanDeacitvateGuard implements CanDeactivate<CanComponentDeactivate>{
    canDeactivate(component: CanComponentDeactivate, 
                  currentRoute: ActivatedRouteSnapshot, 
                  currentState: RouterStateSnapshot, 
                  nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        console.log('in CanDeacitvateGuard.canDeactivate');
        return component.canDeactivate();
    }
    
}