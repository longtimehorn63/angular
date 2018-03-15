import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user1Activated : boolean = false;
  user2Activated : boolean = false;

  constructor(private userService:UsersService){}

  ngOnInit(){
    // implementing the observer on the same object as the observable
    this.userService.userActivate.subscribe(
      (id:number) => {
        console.log('in subject subscription got:' + id);
        if (id === 1){
          this.user1Activated = true;
        }
        else if (id ===2){
          this.user2Activated = true;
        }
      }
    );
  }
}
