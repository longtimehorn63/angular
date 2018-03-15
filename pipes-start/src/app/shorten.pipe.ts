import { PipeTransform, Pipe } from '@angular/core';
/*
   manual pipe must implement the PipeTransform
     - must be added to the declarations to the app module
     - must have the @Pipe decorator

*/
@Pipe({
    name:'shorten'
})
export class ShortenPipe implements PipeTransform {

    transform(value: any, limit:number){
        if (value.length > limit){
            return value.substr(0, limit) + ' ...';
        }
        return value;

    }



}