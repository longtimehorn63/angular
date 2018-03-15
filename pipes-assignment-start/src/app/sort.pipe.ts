import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, propertyName:string): any {
    if (value.length === 0){
      return value;
    }
    return value.sort((a, b)=>{
      if (a[propertyName] > b[propertyName]){
        return 1
      }
      else if (a[propertyName] < b[propertyName]){
        return -1
      }
      else {
        return 0;
      }
    });
  }

}
