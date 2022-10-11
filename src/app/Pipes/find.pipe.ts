import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name:'find'
})
export class FindPipe implements PipeTransform {
    transform(value : any, searchInput: string): any[]{     


    if (value === 0 || searchInput === "" )
    {
      return value
    }
    const employee = []

    for(let emp of value)
    {
      if((emp['emp_ID']).toLowerCase().startsWith(searchInput.toLowerCase()))
      {
        employee.push(emp)
      }
      else if((emp['furniture']).toLowerCase().includes(searchInput.toLowerCase()))
      {
        employee.push(emp)
      }
      else if((emp['equipment']).toLowerCase().includes(searchInput.toLowerCase()))
      {
        employee.push(emp)
      }
      else if((emp['adm_ID']).toLowerCase().startsWith(searchInput.toLowerCase()))
      {
        employee.push(emp)
      }
 
    }
    return employee

     }
}