import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ord } from '../employee/Ord-Interface/ord.module';
import { ServeService } from '../services/serve.service';
import { ven } from '../vendor/Ven-Interface/ven.module';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  emp_ord : any
  selectedOrder : any
  id : any
  unresponded : Array<any> = []
  empid : any
  emp : any
  empty = false

  sel_prop : ven = {
    Orders_ID: '',
    Emp_Id : '',
    Furniture : '',
    Equipment : '',
    Address : '',
    Date : '',
    Ven_Id : ''
  }

  upd : ord = {
    Furniture : '',
    Equipment : '',
    Address : '',
    Emp_ID : '00000000-0000-0000-0000-000000000000',
    Response : 0,
    Adm_ID : ''
  }

  searchInput = ""
  p: number = 1;
  count: number = 3;
  pg = true

  constructor(public serve : ServeService, private toastr: ToastrService, private route : Router) { }

  ngOnInit(): void {
    this.id = localStorage.getItem("EMPID")
    console.log(this.id);

    let oid = sessionStorage.getItem("id")
    let resp = sessionStorage.getItem("response")

    if (oid && resp=="A")
    {
      this.toastr.info("Order No.:" +oid+ " has been approved")
    }
    else if(oid && resp=="R")
    {
      this.toastr.info("Order No.:" +oid+ " has been rejected")
    }

    sessionStorage.clear()

    this.serve.get_single_employee_details(this.id).subscribe(res =>
      {
        this.emp = res
        console.log(this.emp); 
        this.empid = this.emp["empCode"]        
      })


    this.serve.get_all_orders().subscribe(res =>
      {
        this.emp_ord = res
        console.log(this.emp_ord);
        for (let i of this.emp_ord)
        {
          if( i.response == 0)
          {
            this.unresponded.push(i)
          }
        }
        console.log(this.unresponded);
        if (this.unresponded.length == 0)
        {
          this.empty = true
        }
        else
        {
          this.empty = false
        }
        
        if(this.unresponded.length <= this.count)
        {
          this.pg = false
        }
        else
        {
          this.pg = true
        }

      });
  }


  approved(oid : any)
  {
    console.log(oid);
    
    for (let i of this.unresponded)
    {        
      if(i.orderId === oid)
        {
          this.selectedOrder = i
          console.log(this.selectedOrder);
          

          this.upd.Response = 1
          this.upd.Adm_ID = this.empid

          console.log(this.upd);

          this.serve.update_orders(oid,this.upd).subscribe(res =>
            {
              console.log(res);   
            })
          
          this.sel_prop.Orders_ID = this.selectedOrder.orderId
          this.sel_prop.Emp_Id = this.selectedOrder.emp_ID
          this.sel_prop.Furniture = this.selectedOrder.furniture
          this.sel_prop.Equipment = this.selectedOrder.equipment
          this.sel_prop.Address = this.selectedOrder.address
          this.sel_prop.Date = ''
          this.sel_prop.Ven_Id = ''

          console.log(this.sel_prop);
          

          this.serve.insert_from_orders(this.sel_prop).subscribe(res =>
            {
              console.log(res);
            })
          break
        }  
      }

      this.toastr.info("Order No.:" +oid+ " has been approved")
      sessionStorage.setItem("id",oid)
      sessionStorage.setItem("response","A")
      window.location.reload()

  }

  rejected(id : any) {

    this.upd.Response = -1
    this.upd.Adm_ID = this.empid

    this.serve.update_orders(id,this.upd).subscribe(res =>
    {
      console.log(res);
    }) 
    
    sessionStorage.setItem("id",id)
    sessionStorage.setItem("response","R")
    window.location.reload()
  }


  refresh()
  {
    window.location.reload()
  }

  logout()
  {
    localStorage.clear()
    this.route.navigate([""])
  }


}