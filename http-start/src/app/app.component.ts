import { Component } from '@angular/core';
import { ServerService } from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appName = this.serverServ.getAppName();

  constructor(private serverServ: ServerService){}

  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];
  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }
  private generateId() {
    return Math.round(Math.random() * 10000);
  }


  /*
    this is what is really sending the request with the subscription
  */
  onSave(){
    this.serverServ.storeServers(this.servers).subscribe(
      (response) =>{console.log('reponse: ' + response)},
      (error) =>{console.log('error: ' + error)},
    );
  }

  onGet(){
    this.serverServ.getServers().subscribe(
      // with standard observable
      // (response: Response) =>{
      //   console.log('reponse: ' + response;
      //   const data = response.json();
      //   console.log('  data: ' + data);

      // },
      // with data map observable
      (servers: any[]) =>{
        console.log('  servers: ' + servers);
        this.servers = servers;
      },
      (error) =>{console.log('onGet error: ' + error)},
    );
  }

}
