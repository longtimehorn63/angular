import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { ElementRef } from '@angular/core/src/linker/element_ref';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  // declaring new events to be emitted from this component
  // the @Output() declares this event will be published outside
  // our component
  @Output() serverCreated = new EventEmitter<{serverName:string,serverContent:string}>();
  @Output('bpCreated') bluePrintCreated = new EventEmitter<{serverName:string,serverContent:string}>();


  // newServerName = '';  // only needed when using two way binding
  // newServerContent = '';

  // to use decorator to pull the input
  // use @ViewChild('selector name')
  @ViewChild('serverContentInput') serverContentInput : ElementRef;

  constructor() { }
// lifecycle hook
//  ngOnChanges - Called after a bound input property changes 
//       (properties with @Input)
//  ngOnInit - called once the component is initialized
//    not displayed or on the DOM yet, but Angular has created the object
//  ngDoCheck - called during every change detection run
//  ngAfterContentInit - called after content (ng-content) has been
//      projected into view
//  ngAfterContentChecked - called every time the projected
//      content has been checked
//  ngAfterViewInit - called after the component's view (and child views)
//      has been initialized
//  ngAfterViewChecked - called every time the view (and child)
//      has been checked
//  ngOnDestroy - called once the component is about to be destroyed
  ngOnInit() {
  }
// using the two way data binding 
  // onAddServer() {
  //   // emitting the new event with the content we defined
  //   this.serverCreated.emit({
  //     serverName: this.newServerName, 
  //     serverContent:this.newServerContent});
  // }
// using the property
  onAddServer(serverNameInput: HTMLInputElement) {
    // emitting the new event with the content we defined
    this.serverCreated.emit({
      serverName: serverNameInput.value, 
      serverContent:this.serverContentInput.nativeElement.value});
  }

// using the two way data binding 
  // onAddBlueprint() {
  //   // emitting the new event with the content we defined
  //   this.bluePrintCreated.emit({
  //     serverName: this.newServerName, 
  //     serverContent:this.newServerContent});
  // }
  // using the property
  onAddBlueprint(serverNameInput: HTMLInputElement) {
    // emitting the new event with the content we defined
    this.bluePrintCreated.emit({
      serverName: serverNameInput.value, 
      serverContent:this.serverContentInput.nativeElement.value});
  }
}
