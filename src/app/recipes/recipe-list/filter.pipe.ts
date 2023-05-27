import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filteredString : string) {

    if (!value || !filteredString) {
      return value;
    }

    const filteredRecipes = value.filter(item => item.name.toLowerCase().includes(filteredString.toLowerCase()));

    if (filteredRecipes.length === 0) {
      return [];
    }

    return filteredRecipes; 
  }

}
