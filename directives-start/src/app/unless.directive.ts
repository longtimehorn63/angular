import { Directive, Input,TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})

/*
   this directive is meant to be the opposite of ngIf.  Instead of doing
   something when something is true, it will do something unless something
   is true.
*/
export class UnlessDirective {
  /*
    using the 'set' turns the 'property' into a method.  Basically
    a setter method of the property whenever something changes.

    the property shares the name of the directive selector so the 
    property will be found.
  */
  @Input() set appUnless(condition : boolean){
    if (!condition){
      // creating a view within the view container
      this.vcRef.createEmbeddedView(this.templateRef);
    }
    else {
      // clearing the view within the view container
      this.vcRef.clear();
    }

  }

  /*
    TemplateRef is 'what' we rendering  
      (for example the ng-template the directive is put on)
    ViewContainerRef is 'where' we are rendering
  */
  constructor(private templateRef : TemplateRef<any>, private vcRef: ViewContainerRef ) { }

}
