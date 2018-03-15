import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { Router } from '@angular/router/';
import { ActivatedRoute } from '@angular/router/';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  private servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService,
              private router : Router,
              private route : ActivatedRoute) {  // go get the route we are navigating from

               }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload(){
    // relative path, relative to
    // this.router.navigate(['servers'], {relativeTo: this.route});  // would navigate to /servers/servers

    this.router.navigate(['/servers'], {relativeTo: this.route});  // would navigate to /servers/
  }

}
