import {Directive,ElementRef,OnInit} from '@angular/core';

@Directive({
    // selector is required
    // should be unique
    //    'appBasicHighlight'  would select by element 
    //    '[appBasicHighlight]'  would select by attribute style
    //        by adding appBasicHighlight to an element
    selector : '[appBasicHighlight]' 
})

export class BasicHighlightDirective implements OnInit{

    // private adds a property to the class
    constructor(private elementRef : ElementRef){

    }

    ngOnInit(){
        this.elementRef.nativeElement.style.backgroundColor = 'green';
    }
}