import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false   // default is true and will cause the pipe to be executed whenever the data changes could effect performance
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filter: string, propertyName: string): any {
    console.log ('filter: "' + filter + '"');
    if (value.length === 0 || filter === ''){
      return value;
    }
    const resultArray = [];
    for (const item of value){
      if (item[propertyName] === filter){
         resultArray.push(item);
      }
    }
    return resultArray;
  }

}
