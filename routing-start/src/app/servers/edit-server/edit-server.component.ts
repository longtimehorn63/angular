import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit : boolean = false;
  changesSaved : boolean = false;

  constructor(private serversService: ServersService,
        private route:ActivatedRoute,
        private router:Router) { }

  ngOnInit() {
    console.log('query params: ' + this.route.snapshot.queryParams);
    console.log('query fragment: ' + this.route.snapshot.fragment);
    /*
      can subscribe to changes using 
      this.route.queryParams.subscribe()
      this.route.fragment.subscribe()  
    */
    this.route.queryParams.subscribe(
      (queryParams : Params) => {
        const sAllowEdit = queryParams['allowEdit'];
        console.log('   allowEdit = ' + sAllowEdit) ;
        this.allowEdit = queryParams['allowEdit'] === '1' ? true: false;
      }
    );
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.route.params.subscribe(
      (params : Params) => {
        this.server = this.serversService.getServer(+params['id']);
      }
    );
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../',{relativeTo: this.route}]);
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    console.log('in can deactivate');
    if (!this.allowEdit){
      return true;
    }
    console.log('this.serverName: ' + this.serverName);
    console.log('this.server.name: ' + this.server.name);
    console.log('this.serverStatus: ' + this.serverStatus);
    console.log('this.server.status: ' + this.server.status);
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status)
       && !this.changesSaved){
       return confirm('Do you want to discard the changes?');
    }
    return true;
  }

}
