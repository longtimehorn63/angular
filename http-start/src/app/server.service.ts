import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
// import for map
import 'rxjs/Rx'
import { Observable } from "rxjs/Observable";

@Injectable()
export class ServerService{
    constructor(private http:Http){}

    /*
      Note: this method is returning an observable, not actually sending the message at this time
    */
    storeServers(servers: any[]){
        const headers = new Headers({
          'Content-Type':'application/json'
        });
        // return this.http.post('https://udemy-ug-http.firebaseio.com/data.json', 
        //     servers); 
        // post on firebase appends
        // return this.http.post('https://udemy-ug-http.firebaseio.com/data.json', 
        //     servers,
        //     {headers: headers});  // if you wanted to send headers - not required

        // put on firebase replaces
        return this.http.put('https://udemy-ug-http.firebaseio.com/data.json', 
                servers,
                {headers: headers});  // if you wanted to send headers - not required
    }

    getServers(){
        // standard get observable
        // return this.http.get('https://udemy-ug-http.firebaseio.com/data.json');

        // observable with map that gets the response data out of the response
        return this.http.get('https://udemy-ug-http.firebaseio.com/data.json').map(
        //    return this.http.get('https://udemy-ug-http.firebaseio.com/data').map( // forces error
            (response:Response)=>{
                const data = response.json();
                for (const server of data){
                    server.name = 'FETCHED_' + server.name;
                    console.log('servername: ' + server.name);
                }
                return data;
            }
        )
        .catch(
            (error:Response) => {
                console.log('error: ' + error);
                // the catch forces you to create a new objservable
                // which you can transform to anything
                return Observable.throw('something went wrong');
            }
        );
    }


  getAppName(){
     return this.http.get('https://udemy-ug-http.firebaseio.com/data/appName.json')
        .map(
            (response:Response) => {
                return response.json();
            }
        );
  }

}