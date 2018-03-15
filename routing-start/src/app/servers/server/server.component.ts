import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router/';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private route : ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    console.log('in server component ngOnInit');
    this.route.data.subscribe(
      (data:Data) => {this.server = data['server'];}  // 'server' was defined in the routing module
    );
    // by adding '+' your converting the string id to a number
    // const serverID = +this.route.snapshot.params['id'];
    // console.log('retrieving server with id: ' + serverID);
    // this.server = this.serversService.getServer(serverID);
    // console.log('retrieved server with name: ' + this.server.name);
    // console.log('retrieved server with status : ' + this.server.status);
    // // subscribe to the change
    // this.route.params.subscribe(
    //   (params : Params) => {
    //     this.server = this.serversService.getServer(+params['id']);
    //   }
    // );
  }

  onEdit(){
    /*
      relativeTo - maintains the relative path
      queryParamsHandling - 
        'merge' - merge old query params with the new
        'preserve' - maintain existing
    */
     this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling : 'preserve'});
  }

}
