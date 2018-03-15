import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  counter: number = 0;
  intervalID : number;
  @Output() intervalFired = new EventEmitter<number>();


  constructor() { }

  ngOnInit() {
  }

  onStartGame(){
    console.log('start game');
    this.intervalID = setInterval(() => {
      this.counter = this.counter + 1;
      this.intervalFired.emit(this.counter);
    }, 1000);
  }

  onStopGame(){
    console.log('end game');
    clearInterval(this.intervalID);
    this.counter = 0;
  }
}
