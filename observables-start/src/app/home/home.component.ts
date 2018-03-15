import { Component, OnInit. OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/interval';
import { Observer } from 'rxjs/Observer';
import { setTimeout } from 'timers';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numberObSubscription : Subscription;
  customSubscription : Subscription;

  constructor() { }

  ngOnInit() {

    /*
     infinate observable
     will create a memory leak.  Because even if you navigate off the 
     home page, the subscription will continue on!  So should be 
     destroyed in the ngOnDestroy Method.
    */
    const myNumbers = Observable.interval(1000)
      // use map to transform the data (takes a function)
      .map(
        (data:number) => {return data * 2;} // return statement is important
      );
    this.numberObSubscription = myNumbers.subscribe(
      (number:number) =>{
        console.log("myNumbers - " + number);  
      }
    );

    /*
    create takes a function in the create that takes an Observer
    which will be the final observer which will make up the Obervable

      Note:  An error will stop everything
            in the code below if the error is uncommented the third package
            and the completed NEVER happen! 
    */
    const myObservable = Observable.create(
      (observer: Observer<string>) => {
        setTimeout(() =>{
          observer.next('first package'); // emits a normal data package
        },2000);
        setTimeout(() =>{
          observer.next('second package'); // emits a normal data package
        },4000);
        // setTimeout(() =>{
        //   observer.error('observable error'); // emits an error
        // },5000);
        setTimeout(() =>{
          observer.next('third package'); // emits a normal data package
        },6000);
        setTimeout(() =>{
          observer.complete(); // ends the obvservable
        },8000);
      }
    );
    this.customSubscription = myObservable.subscribe(
      // normal data argument (we know it will pass a string)
      (data: string) => {console.log('observable data: ' + data);}
      // error argument (we know it will pass a string)
      (error: string) => {console.log('observable error: ' + error);}
      // completed argument 
      () => {console.log('observable completed! ');}
    );
  }

  ngOnDestroy(){
    console.log('unsubscribing...');
    this.customSubscription.unsubscribe();
    this.numberObSubscription.unsubscribe();

  }

}
