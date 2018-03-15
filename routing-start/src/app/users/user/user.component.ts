import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramSubscription : Subscription;

  constructor(private route : ActivatedRoute) { }  // access to currently loaded route

  ngOnInit() {
    // access route parameters
    this.user = {
      id: this.route.snapshot.params['id'], 
      name: this.route.snapshot.params['name']
    };

    /*
      subscribing to the event that the parameters have changed for any
      subsequent changes.  the subscribe can take 3 functions
      1rst function - whenever parameters have changed
      2nd function - whenever there was an error
      3rd function - when it completes


      makes sure the component is notified about changes in route parameters
    */
    this.paramSubscription = this.route.params.subscribe(
      (params : Params) => {
        this.user.id = params['id']; 
        this.user.name = params['name'];
      }
    );
  }

  /*
    May not be necessary, but this assures that the subscription will 
    not live on in memory after the component is destroyed
  */
  ngOnDestroy(){
    this.paramSubscription.unsubscribe();
  }
}
