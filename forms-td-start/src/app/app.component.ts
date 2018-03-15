import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // can be used when the form isn't passed to the method
  @ViewChild('f') signupForm: NgForm; 
  defaultQuestion: string = 'pet';
  answer: string = '';
  defaultGender = 'male';
  genders = ['male', 'female'];
  submitted = false;

  // javascript object to represent the form data
  user = {
    username: '',
    email: '',
    secretQuestion : '', 
    answer : '',
    gender : ''
  }

  suggestUserName() {
    const suggestedName = 'Superuser';
    /*
      accessing the form to set a value.  Must pass a javascript object EXACTLY representing the form
      but will wipe out all other data entered
    */
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: '';
    //   },
    //   secret: 'pet',
    //   questionAnswer:  '',
    //   gender: 'male'
    // });

    /*
        accessing the form, but only sending the javascript object for the value we are effecting
    */
     this.signupForm.form.patchValue({
        userData: {
          username: suggestedName
        }
    });
  }

  // should be used when the form is submitted
  // this method has the "f" passed to the submit method
  // onSubmit(form: NgForm){
  //   console.log("form sumitted!");
  //   console.log(form);
  // }

  onSubmit(form: NgForm){
    console.log("form sumitted!");
    console.log(this.signupForm);

    // setting the java object to contain the values of the form
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;
    this.submitted = true;

    // to reset the form  for use the setValue sending the entire object if you want to set specific values
    this.signupForm.reset();
  }
}
