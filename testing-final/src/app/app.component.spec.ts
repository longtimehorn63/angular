/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

// ng test will run the tests

describe('App: CompleteGuideFinalWebpack',   
  () => {  
  beforeEach(() => {                                // executed before each of the blocks below
    TestBed.configureTestingModule({
      declarations: [
        AppComponent   // matches the app.module
      ],
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);  // creating the component
    let app = fixture.debugElement.componentInstance;     // getting the instance of the component
    expect(app).toBeTruthy();                             //
  }));

  it(`should have as title 'app works!'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();                                  // triggers change detection so the template gets rendered
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');  // using javascript query selector
  }));
});
