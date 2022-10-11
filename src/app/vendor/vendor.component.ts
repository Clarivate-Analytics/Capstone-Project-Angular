import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { __values } from 'tslib';
import { ServeService } from '../services/serve.service';
import { ven } from './Ven-Interface/ven.module';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  orders : any
  deldate : any
  selectedOrder : any
  id : any
  emp : any
  empid : any
  updated = false

  vendor : ven = {
      Orders_ID : '',
      Emp_Id : '',
      Furniture : '',
      Equipment : '',
      Address : '',
      Date : '',
      Ven_Id : ''
  }
  p: number = 1;
  count: number = 4;
  t : any
  pg = true

  searchInput = ""
  current_date = new Date()

  formatted_date = this.current_date.getFullYear()+'-'+(this.current_date.getMonth()+1)+'-'+this.current_date.getDate()

  constructor(private serve : ServeService, private route : Router) { }

  ngOnInit(): void {
    this.id = localStorage.getItem("EMPID")
    console.log(this.id);

    this.t = localStorage.getItem("page")
    console.log(this.t);
    
    if(this.t == null)
    {
      this.p = 1
    }
    else
    {
      this.p = JSON.parse(this.t)
      console.log(this.p);
    }
    
    
    

    this.serve.get_single_employee_details(this.id).subscribe(res =>
      {
        this.emp = res
        console.log(this.emp); 
        this.empid = this.emp["empCode"]        
      })

    this.serve.get_all_approved().subscribe(res =>
      {
        this.orders = res
        console.log(this.orders);
        
        if(this.orders.length <= this.count)
        {
          this.pg = false
        }
        else
        {
          this.pg = true
        }
      });
  }

  Del_Date_Form = new FormGroup({
    del_date : new FormControl("",[Validators?.required])
  })

  enter_date(ID : any, page : any)
  {
    this.p = page
    console.log(ID);
    
    console.log(this.p);
    localStorage.setItem("page",JSON.stringify( this.p))

    this.deldate = this.del_date?.value
        
    for (let i of this.orders)
      {
        if(i.orders_ID === ID) 
        {
          this.selectedOrder = i
          console.log(this.selectedOrder)

          this.vendor.Emp_Id = this.selectedOrder.emp_ID
          this.vendor.Furniture = this.selectedOrder.furniture
          this.vendor.Equipment = this.selectedOrder.equipment
          this.vendor.Address = this.selectedOrder.address
          this.vendor.Date = this.deldate
          this.vendor.Orders_ID = this.selectedOrder.orders_ID
          this.vendor.Ven_Id = this.empid

          console.log(this.vendor);
          
          this.serve.update_delivery_date(this.vendor.Orders_ID, this.vendor).subscribe(res =>
            {
              console.log(res);
              this.send_email(this.selectedOrder.orders_ID, this.selectedOrder.date)
              window.location.reload()
            });

          break

        }
      }
    
  }


  send_email(ID : any, date : any)
  {
    if (date == '')
    {
      this.serve.send_email(ID).subscribe(res =>
        {
          console.log("email sent");
        })
    }
    else
    {
      this.serve.update_email(ID).subscribe(res =>
        {
          console.log("email sent");
        })
    }
    
  }



  get del_date()
  {
    return this.Del_Date_Form.get("del_date")
  }

  update(ID : any, page : any)
  {
    this.p = page
    console.log(this.p);
    localStorage.setItem("page",JSON.stringify( this.p))
    
    this.deldate = this.del_date?.value
    
    for (let i of this.orders)
      {
        if(i.orders_ID === ID) 
        {
          this.selectedOrder = i
          console.log(this.selectedOrder)

          this.vendor.Emp_Id = this.selectedOrder.emp_ID
          this.vendor.Furniture = this.selectedOrder.furniture
          this.vendor.Equipment = this.selectedOrder.equipment
          this.vendor.Address = this.selectedOrder.address
          this.vendor.Date = '0'
          this.vendor.Orders_ID = this.selectedOrder.orders_ID
          this.vendor.Ven_Id = ''

          console.log(this.vendor);
          
          this.serve.update_delivery_date(this.vendor.Orders_ID, this.vendor).subscribe(res =>
            {
              console.log(res);
              window.location.reload()
            });

          break

        }
      }
    
  }

  logout()
  {
    localStorage.clear()
    this.route.navigate([""])
  }
}