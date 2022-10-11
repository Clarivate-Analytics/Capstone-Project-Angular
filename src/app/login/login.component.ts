import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthGuard } from '../Guards/auth.guard';
import { ServeService } from '../services/serve.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router, private serve : ServeService, private toastr: ToastrService,private url : ActivatedRoute) { }

  details : any
  selectedemp : any
  flag = false
  cred : Array<string> = []
  result : any

  ngOnInit(): void {
    this.serve.get_employee_details().subscribe(res =>
      {
        this.details = res
        console.log(this.details);
        
      })

  }

  onLogin(data : NgForm)
  {
    console.log(data.value);
    this.cred.push(data.value.email)
    this.cred.push(data.value.password)
    console.log(this.cred);
    
      this.serve.login(this.cred).subscribe((res : any) =>
        {
          this.result = res

          if(res.error)
          {
            alert(res.message)
          }
          else
          {
            console.log(this.result);
            console.log(this.result.role);
            localStorage.setItem("Token", this.result.jwtToken)
            this.enter(this.result.empId, this.result.role)
          }     
        })
  }

  
  enter(id : any, role : any)
  {
    console.log(id);
    this.toastr.success("Loggin successful")
    localStorage.setItem("EMPID", id)
    localStorage.setItem("role", role)
    
    if(role == 'Admin')
    {
      console.log("Admin page");  
      this.router.navigate(['/admin'])
    }
    else if(role == 'Employee')
    {
      console.log("Employee Page");
      this.router.navigate(['/employee']) 
    }
    else 
    {
      console.log("Vendor Page");
      this.router.navigate(['/vendor'])  
    }
  }

}
