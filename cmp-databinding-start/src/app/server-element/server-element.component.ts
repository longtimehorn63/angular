import { Component, OnInit, OnChanges, SimpleChanges, Input, DoCheck } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck {
  // In order to make the "element" public to parent components
  // (or to be seen/available to the parent component) the 
  // @Input() function is added to the property
  // the 'srvElement' is an alias of the property element
  @Input('srvElement') element: {type : string, name : string, content : string};

  constructor() {
    console.log('constructor called');
   }

  ngOnChanges(changes:SimpleChanges){
    console.log('ngOnChanges called');
  }
  ngDoCheck(){
    console.log('ngDoCheck called');
  }
  ngOnInit() {
    console.log('ngOnInit called');
  }

}
