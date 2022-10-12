import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServeService } from '../services/serve.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  order_table : any[] = []
  values : any
  id : any
  empty = false
  empid : any
  emp : any
  furn_disable = false
  eqp_disable = false

  furn = ['Chair', 'Desk', 'Sofa', 'Bookcases', 'Filing cabinets']
  itequp = ['Mouse', 'Keyboard', 'CPU', 'Monitor', 'Printer']

  furn_item : any
  equip_item : any

  constructor(private serve : ServeService, private route : Router) { }

  ngOnInit(): void 
  { 
    this.id = localStorage.getItem("EMPID")
    console.log(this.id);
    
    this.serve.get_single_employee_details(this.id).subscribe(res =>
      {
        console.log(res);
        this.emp = res
        this.empid = this.emp.empID

        this.serve.get_furniture(this.id).subscribe(res =>
          {
            console.log(res);
            this.furn_item = res

            this.furn = this.furn.filter(val => !this.furn_item.includes(val));
            console.log(this.furn);

            if (this.furn.length == 0)
            {
              this.furn_disable = true
            }
            else
            {
              this.furn_disable = false
            }
            
          })

          this.serve.get_equipment(this.id).subscribe(res =>
            {
              console.log(res);
              this.equip_item = res
  
              this.itequp = this.itequp.filter(val => !this.equip_item.includes(val));
              console.log(this.itequp);

              if (this.itequp.length == 0)
            {
              this.eqp_disable = true
            }
            else
            {
              this.eqp_disable = false
            }
              
            })


        this.getdata()
      })     
      this.refresh()
  }

  getdata()
  {
    this.serve.get_employee_orders(this.id).subscribe(res =>
      {
        this.order_table = res
        console.log(this.order_table.length)

        if (this.order_table.length == 0)
        {
          this.empty = true
        }

        else
        {
          this.values = this.order_table
          console.log(this.values); 
          this.empty = false
        }
      })  

      console.log(this.furn.length);
      console.log(this.itequp.length);

  }

  refresh()
  {
    window.location.reload
  }

  logout()
  {
    localStorage.clear()
    this.route.navigate([""])
  }
}