import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ord } from '../employee/Ord-Interface/ord.module';
import { ordvm } from '../employee/Ord-Interface/ordvm.module';
import { regs } from '../register/Reg-Interface/regs.module';
import { ven } from '../vendor/Ven-Interface/ven.module';

@Injectable({
  providedIn: 'root'
})
export class ServeService {

  registerUrl = 'https://localhost:7191/api/Registration'
  ordersUrl = 'https://localhost:7191/api/Orders'
  vendorUrl = 'https://localhost:7191/api/Vendor'
  emailUrl = 'https://localhost:7191/api/Email'

  constructor(private http : HttpClient) { }


  //TO GET ALL EMPLOYEES DETAILS
  get_employee_details() : Observable<regs[]> 
  {
    return this.http.get<regs[]>(this.registerUrl);
  }

  //TO GET SINGLE EMPLOYEE DETAILS
  get_single_employee_details(id : any) : Observable<regs[]> 
  {
    return this.http.get<regs[]>(this.registerUrl+'/'+id);
  }

  //TO INSERT EMPLOYEE DETAILS
  insert_employee_details(details : regs)
  {
    return this.http.post(this.registerUrl, details)
  }


  //TO LOGIN
  login(data : Array<string>)
  {
    console.log(data);
    
    return this.http.post(this.registerUrl+'/login', data);
  }

//====================================================================================================================

//TO GET ALL ORDERS
get_all_orders() : Observable<ordvm[]> 
{
  return this.http.get<ordvm[]>(this.ordersUrl);
}

//TO INSERT ORDER DETAILS
insert_orders(data : ord)
{
  return this.http.post(this.ordersUrl, data)
}

//TO GET SINGLE EMPLOYEE ORDER DETAILS
get_employee_orders(id : any) : Observable<ord[]> 
{
  return this.http.get<ord[]>(this.ordersUrl+'/emp_orders/'+id);
}

//TO UPDATE ADMIN ID AND RESPONSE
update_orders(id: any, data : ord) : Observable<ord[]> 
{
  return this.http.put<ord[]>(this.ordersUrl+'/'+id, data)
}

//TO GET EMPLOYEE ORDERED FURNITURES
get_furniture(id: any) : Observable<ord[]> 
{
  return this.http.get<ord[]>(this.ordersUrl+'/furniture/'+id);
}

//TO GET EMPLOYEE ORDERED IT EQUIPMENTS
get_equipment(id: any) : Observable<ord[]> 
{
  return this.http.get<ord[]>(this.ordersUrl+'/equipment/'+id);
}


//====================================================================================


    //TO GET DETAILS OF ALL APPROVED ORDERS
    get_all_approved() : Observable<ven[]> 
    {
      return this.http.get<ven[]>(this.vendorUrl);
    }

    //TO INSERT DATA FROM ORDERS TO VENDORS
    insert_from_orders(copy : ven) : Observable<ven[]> 
    {
      return this.http.post<ven[]>(this.vendorUrl, copy);
    }
  
    //TO UPDATE VENDOR WITH DELIVERY DATE
    update_delivery_date(id: any, data : ven) : Observable<ven[]> 
    {
      return this.http.put<ven[]>(this.vendorUrl+'/'+id, data)
    }

//=====================================================================================================

// //TO SEND INITIAL EMAIL
send_email(id : any) : Observable<ven[]> 
{
  return this.http.get<ven[]>(this.emailUrl+'/'+id);
}

//TO SEND UPDATED EMAIL
update_email(id : any) : Observable<ven[]> 
{
  return this.http.get<ven[]>(this.emailUrl+'/update/'+id);
}


}
