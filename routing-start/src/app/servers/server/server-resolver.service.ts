import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ServersService } from "../servers.service";
import { Injectable } from "@angular/core";

/*
  This class is mean to be something that is called BEFORE the component
  is rendered.
*/

// just a dummy, should be defined in its own file as a model
interface Server {
    id:number;
    name:string;
    status:string;
}

@Injectable()
export class ServerResolver implements Resolve<Server>{

    constructor(private serverService:ServersService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
            Server | 
            Observable<Server> | 
            Promise<Server> {
        console.log('in Server Resolver');
        return this.serverService.getServer(+route.params['id']);
    }

}