import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServeService } from '../services/serve.service';
import { regs } from './Reg-Interface/regs.module';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router : Router, private serve: ServeService, private toastr: ToastrService) { }


  empty = true
  lowercase = true
  uppercase = true
  spclcase = true
  number = true
  length = true
  pswd : any
  elength = true
  mailid : any

  correct = 'green'
  wrong = 'red'

  employee : any
  email_flag = false
  id_flag = false
  details : regs = {
    EmpCode: '',
    FirstName : '',
    LastName : '',
    Role : '',
    Email : '',
    Password : ''
  }


  ngOnInit(): void {
    this.email_flag = false
    this.id_flag = false
    this.serve.get_employee_details().subscribe(res => {
      this.employee = res
      console.log(this.employee);
      
    })
  }

  registrationForm = new FormGroup({
    empID : new FormControl("",[Validators?.required]),
    firstName: new FormControl("",[Validators?.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('[a-z,A-z]+$')]),
    lastName: new FormControl("",[Validators?.required, Validators.minLength(1), Validators.pattern('[a-z,A-z]+$')]),
    role: new FormControl("",[Validators?.required]),
    email: new FormControl("",[Validators?.required, Validators.pattern("^[A-Z,a-z,0-9,.,_,%,*]+@[a-z,A-Z]+.[a-z]{2,4}$")]),
    password: new FormControl("",[Validators?.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Z,a-z,0-9,$@$!%*?&+-]{4,10}$")])
  }) 

  register()
  {

    for (let emp of this.employee)
      {
        if(emp.empID == this.details.EmpCode)
        {
          this.id_flag = true
          break
        }
        else if(emp.email == this.details.Email)
        {
          this.email_flag = true
          break
        }
      }

      if (this.id_flag == true)
      {
        this.toastr.warning("Employee ID already exist")
        this.id_flag = false
      }
      else if (this.email_flag == true)
      {
        this.toastr.warning("Email ID already exist")
        this.email_flag = false
      }
      else
      {
        this.toastr.success("Successfully Registered")
        this.serve.insert_employee_details(this.details).subscribe(res =>
          {
            console.log(res);
          });
          this.router.navigate([""])
      }
      
  }
  
  get empID()
  {
    return this.registrationForm.get('empID')
  }

  get firstName()
  {
    return this.registrationForm.get('firstName')
  }

  get lastName()
  {
    return this.registrationForm.get('lastName')
  }

  get role()
  {
    return this.registrationForm.get('role')
  }

  get email()
  {
    return this.registrationForm.get('email')
  }

  get password()
  {
    return this.registrationForm.get('password')
  }

 pass()
 {
  this.empty = true
  this.lowercase = true
  this.uppercase = true
  this.spclcase = true
  this.number = true
  this.length = true


  console.log("clicked");
  this.pswd = this.password?.value 
  console.log(this.pswd);

  if(this.pswd != '')
  {
    this.empty = false  
  }
  if(/[a-z]/.test(this.pswd))
  {
    this.lowercase = false
  }
  if(/[A-Z]/.test(this.pswd))
  {
    this.uppercase = false
  }
  if(/[0-9]/.test(this.pswd))
  {
    this.number = false
  }
  if(/[$@$!%*?&+-]/.test(this.pswd))
  {
    this.spclcase = false
  }
  if(this.pswd.length >= 4 && this.pswd.length <= 10)
  {
    this.length = false
  }

 }

 epass()
 {
  this.elength = true
  this.mailid = this.email?.value

  if(this.mailid != '')
  {
    this.elength = false  
  }
 }
}
