import { Pipe, PipeTransform } from '@angular/core';
import { Driver } from '../models/driver';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(drivers: Driver[], searchTerm?: any) {

    if(!searchTerm) {
      return drivers;
    }
    if(typeof searchTerm === 'number') {
      searchTerm = searchTerm.toString();
      return drivers.filter(driver => 
        driver.age.toString().indexOf(searchTerm) !== -1
      );
    }
    if(typeof searchTerm === 'string') {
      return drivers.filter(driver =>
        driver.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
        );
    }
  }

}
