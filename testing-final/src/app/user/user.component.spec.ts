/* tslint:disable:no-unused-variable */

import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { UserService } from "./user.service";
import { DataService } from "../shared/data.service";

describe('Component: User', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent]
    });
  });

  it('should create the user component', () => {
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should use the user name from the service', () => {
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    let userService = fixture.debugElement.injector.get(UserService);       //gets an instance of the user service and injects it to the component
    fixture.detectChanges();                                                // must run change detection to update the properties
    expect(userService.user.name).toEqual(app.user.name);
  });

  it('should display the user name if user is logged in', () => {
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    app.isLoggedIn = true;                                                 // setting a property on the component to effect the change
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;                     // get the compiled template
    expect(compiled.querySelector('p').textContent).toContain(app.user.name);
  });

  it('shouldn\'t display the user name if user is not logged in', () => {
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).not.toContain(app.user.name);  // this test does not contain...
  });

  it('shouldn\'t fetch data successfully if not called asynchronously', () => {   // not wrapped in a async like below
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);   // injecting the DataService
    let spy = spyOn(dataService, 'getDetails')           //Mocks the dataservcie  spyOn says when GetDetails is called 
      .and.returnValue(Promise.resolve('Data'));         // will call async mode, but will only use the data provided
    fixture.detectChanges();
    expect(app.data).toBe(undefined);                    // will be undefined before 
  });

  it('should fetch data successfully if called asynchronously', async(() => {  // wrapping in async block 
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);  
    let spy = spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {                                     // react/wait when async tasks are done
      expect(app.data).toBe('Data');                                      // now the data is defined
    });
  }));

  it('should fetch data successfully if called asynchronously', fakeAsync(() => {   // allows to get rid of whenStable
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    tick();                                                                        // saying async tasks in fake environment are done 
    expect(app.data).toBe('Data');

  }));
});
