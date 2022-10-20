import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name:'vensearch'
})
export class VensearchPipe implements PipeTransform {
    transform(value : any, searchInput: string): any[]{     


    if (value === 0 || searchInput === "" )
    {
      return value
    }
    const employee = []

    for(let emp of value)
    {
      if(emp['furniture'].toLowerCase().includes(searchInput.toLowerCase()))
      {
        employee.push(emp)
      }
      else if(emp['equipment'].toLowerCase().includes(searchInput.toLowerCase()))
      {
        employee.push(emp)
      }
 
    }
    return employee

     }
}