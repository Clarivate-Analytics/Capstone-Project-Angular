import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ord } from '../employee/Ord-Interface/ord.module';
import { ServeService } from '../services/serve.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  id : any
  mailid : any
  obj : any
  empid : any
  orders : ord = {
    Furniture : '',
    Equipment : '',
    Address : '',
    Emp_ID : '',
    Response : 0,
    Adm_ID : ''
  }

  furn = ['Chair', 'Desk', 'Sofa', 'Bookcases', 'Filing cabinets']
  itequp = ['Mouse', 'Keyboard', 'CPU', 'Monitor', 'Printer']

  furn_item : any
  equip_item : any

 

  constructor(private router : Router, private serve : ServeService) { }

  ngOnInit(): void 
  {
    this.id = localStorage.getItem("EMPID")

    this.serve.get_single_employee_details(this.id).subscribe(res =>
      {
        console.log(res);
        this.obj = res
        this.mailid = this.obj.email
        console.log(this.mailid);
        this.empid = this.obj.empCode
        console.log(this.empid);  
        
        this.serve.get_furniture(this.id).subscribe(res =>
          {
            console.log(res);
            this.furn_item = res

            this.furn = this.furn.filter(val => !this.furn_item.includes(val));
            console.log(this.furn);
            
          })

          this.serve.get_equipment(this.id).subscribe(res =>
            {
              console.log(res);
              this.equip_item = res
  
              this.itequp = this.itequp.filter(val => !this.equip_item.includes(val));
              console.log(this.itequp);
              
            })

      })
      
  }

  EmployeeForm = new FormGroup({
    empID : new FormControl(),
    email: new FormControl(),
    equipment : new FormControl(),
    furniture: new FormControl(),
    address: new FormControl("",[Validators?.required]),
  })


  place_order()
  {

  console.log("order placed");
  this.orders.Emp_ID = this.id

  console.log(this.orders);
  
    this.serve.insert_orders(this.orders).subscribe(res =>
    {
      console.log(res);       
    })

    this.router.navigate(['employee'])
  
  }


  get empID()
  {
    return this.EmployeeForm.get(this.empid)
  }

  get email()
  {
    return this.EmployeeForm.get(this.mailid)
  }

  get furniture()
  {
    return this.EmployeeForm.get('furniture')
  }

  get equipment()
  {
    return this.EmployeeForm.get('equipment')
  }

  get address()
  {
    return this.EmployeeForm.get('address')
  }


}
