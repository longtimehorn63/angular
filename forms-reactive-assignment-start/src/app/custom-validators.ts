import { FormControl } from "@angular/forms";
import { Observable } from "rxjs/Observable";

export class CustomValidators {
    static forbiddenProjectNames = ['Test', 'Blah'];
    static aSyncForbiddenProjectNames = ['Test1', 'Blah1'];

    static invalidProjectName(control: FormControl):{[s:string]:boolean} {

        if (CustomValidators.forbiddenProjectNames.indexOf(control.value) !== -1){
            return {'projectNameFobidden':true};
        }
        return null;
    }  

    
    static asyncValidatorProjectName(control:FormControl): Promise<any> | Observable<any> {
        const promise = new Promise(
          (resolve, reject) => {
            setTimeout(() => {
              if (CustomValidators.aSyncForbiddenProjectNames.indexOf(control.value) !== -1){
                resolve({'aSyncProjectNameFobidden':true});
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