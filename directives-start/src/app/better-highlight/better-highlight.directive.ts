import { Directive,
  Renderer2,
  OnInit,
  ElementRef,
  HostListener,
  HostBinding,
  Input
 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
/*
   this class/directive is used to change the background color of the
   element that has this directive on it
*/
export class BetterHighlightDirective implements OnInit{
  // to allow for outside input of the colors being used
  @Input() defaultColor : string = 'transparent';
  @Input() highlightColor : string = 'blue';

  // use the renderer
  constructor(private elRef: ElementRef,private renderer: Renderer2) { }

  ngOnInit(){
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color','blue');

    // when using the passed in colors (binding) before it is rendered 
    // set the default color
    this.backgroundColor = this.defaultColor;
  }

  //HostBinding  - doesn't need the renderer
  // binding to the host element we want to bind DOM property
  // obviously on the element with this directive on it
  // @HostBinding('style.backgroundColor')  backgroundColor : string = 'transparent';

  // host binding using input colors

  @HostBinding('style.backgroundColor')  backgroundColor : string = this.defaultColor;


  // listening to the mouseenter event
  @HostListener('mouseenter') mouseover(eventData: Event){
    // using the renderer
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color','blue');

    // using the HostBinding element
    // this.backgroundColor = 'blue';

    // using the input colors
    this.backgroundColor = this.highlightColor;
  }

  // listening to the mouseleave event
  @HostListener('mouseleave') mouseleaving(eventData: Event){
    // using the renderer
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color','transparent');

    // using the HostBinding element
    // this.backgroundColor = 'transparent';

    // using the input colors
    this.backgroundColor = this.defaultColor;
  }

}
