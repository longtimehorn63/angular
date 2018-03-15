import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  signupForm : FormGroup;

  forbiddenProjects = ['Test'];

  statuses = ['Stable', 'Critical', 'Finished'];

  ngOnInit(){
    this.signupForm = new FormGroup({
      // 'project' : new FormControl(null, [Validators.required, this.regularValidator.bind(this)]),  // regular validator
      // 'project' : new FormControl(null, Validators.required, this.asyncValidator.bind(this)),    // async validator
      'project' : new FormControl(null, [Validators.required, CustomValidators.invalidProjectName], CustomValidators.asyncValidatorProjectName),    // validator in a separate class
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl('Critical')
    });
  }

  onSubmit(){
    console.log(this.signupForm);
  }

  regularValidator(control: FormControl): {[s:string]:boolean}{
    if (this.forbiddenProjects.indexOf(control.value) !== -1){
      return {'projectNameFobidden':true};
    }
    return null;
  }

  asyncValidator(control:FormControl): Promise<any> | Observable<any>{
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          if (this.forbiddenProjects.indexOf(control.value) !== -1){
            resolve({'projectNameFobidden':true});
          }
          else {
            resolve(null);
          };
        },2000);
      }
    );
    return promise;
  }
}
