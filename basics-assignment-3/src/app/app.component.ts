import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    displayDetails = true;
    buttonClicks: string[] = [];
    numberOfClicks = 0;


    onDetailsClick(){
      this.displayDetails = this.displayDetails ? false : true; 
      var timeStamp = Date.now();
      var sTimeStamp = timeStamp.toString();
      this.buttonClicks.push(sTimeStamp);
      this.numberOfClicks = this.numberOfClicks + 1;
    }
    
    getColor(){
      return this.numberOfClicks > 4 ? 'white' : 'blue';
    }
  }
