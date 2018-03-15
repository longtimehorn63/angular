import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { resolve } from 'url';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];

  // holder for the form
  signupForm : FormGroup;

  forbiddenUserNames = ['Test','Wade'];

  ngOnInit(){
    //initialzing the form with default values
    // this.signupForm = new FormGroup({
    //   'username': new FormControl(null),
    //   'email': new FormControl(null),
    //   'gender' : new FormControl('male')  // setting the initial value
    // });  
    //initialzing the form with default values and validators
    this.signupForm = new FormGroup({
      'userData' : new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),  // just a reference to the method -> no () but bind the class to it
        'email': new FormControl(null, [Validators.required, Validators.email],this.forbiddenEmails) // using the third parameter for async 
      }),
      'gender' : new FormControl('male'),  // setting the initial value
      'hobbies': new FormArray([])    // empty array 
    });  

    // listening to status or value changes
    // this.signupForm.valueChanges.subscribe(
    //   (value)=>{console.log('value change: ' + value);}
    // );
    // this.signupForm.statusChanges.subscribe(
    //   (value)=>{console.log('status change: ' + value);}
    // );
 
    // to initialize the whole form
    this.signupForm.setValue({
      'userData':{
        'username':'Max',
        'email':'max@test.com'
      }
      'gender':'female',
      'hobbies': []
    });

    // to initialize partial form
    this.signupForm.patchValue({
      'userData':{
        'username':'Bob',
      }
    });
  }

  onSubmit(){
    console.log(this.signupForm);

    // clear the form
    this.signupForm.reset();
  }

  addHobby(){
    const control = new FormControl(null,Validators.required);
    (<FormArray> this.signupForm.get('hobbies')).push(control);
  }

  /*
    Custom Validator  
    -- must return a javascript object any key (in this case a string) and a boolean
    like {'nameIsFobidden':true} or null
  */
  forbiddenNames(control:FormControl): {[s:string]:boolean}{
     if (this.forbiddenUserNames.indexOf(control.value) !== -1){
        return {'nameIsFobidden':true};
     }
     return null;  // or omit the return statement to tell angular it is valid
  }

  /*
    Asynchronous validator - because sometimes you will have to call the server to validate something.  
    This could take some time.  So you don't want the form to be waiting for that.

    The Promise and Observable are things that allow for asynchronous communication
  */
  forbiddenEmails(control:FormControl): Promise<any> | Observable<any>{

    const promise = new Promise<any>(
      (resolve, reject) => {
         setTimeout(() => {
            if (control.value === 'test@test.com'){
               resolve({'emailIsForbidden':true});  // resolving that it is an invalid email
            }
            else {
              resolve(null);   // resolving that it is valid
            }
         },1500);  // execute the inner function after 1 1/2 seconds
      }
    );
    return promise;
  }
}
