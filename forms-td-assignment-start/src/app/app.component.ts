import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f') form : NgForm;
  submitted = false;
  
  defaultLevel = 'Advanced';

  subscriptions = ['Basic',  'Advanced', 'Pro'];


  // javascript object to represent the form data
  user = {
    email: '',
    level : '', 
    password : ''
  }


  OnSubmit(form: NgForm){

    console.log('form submiitted');
    this.submitted = true;
    var value = this.form.value.email;
    this.user.email = value;
    console.log('email: ' + value);


    value = this.form.value.level;
    this.user.level = value;
    console.log('level: ' + value);

    value = this.form.value.password;
    this.user.password = value;
    console.log('password: ' + value);
  }
}
