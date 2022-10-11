import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ApprovedComponent } from './approved/approved.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeComponent } from './employee/employee.component';
import { AuthGuard } from './Guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RejectedComponent } from './rejected/rejected.component';
import { VendorComponent } from './vendor/vendor.component';

const routes: Routes = [
  { path:"", redirectTo:'login', pathMatch: 'full'},
  { path:"login", component:LoginComponent },
  { path:"register", component:RegisterComponent },
  { path:"employee", component:EmployeeComponent, data:{role : ['Employee'],}, canActivate:[AuthGuard] },
  { path:"employee_form", component:EmployeeFormComponent, data:{role : ['Employee'],}, canActivate:[AuthGuard] },
  { path:"admin", component:AdminComponent, data:{role : ['Admin'],}, canActivate:[AuthGuard] },
  { path:"approved", component:ApprovedComponent, data:{role : ['Admin'],}, canActivate:[AuthGuard] },
  { path:"rejected", component:RejectedComponent, data:{role : ['Admin'],}, canActivate:[AuthGuard] },
  { path:"vendor", component:VendorComponent, data:{role : ['Vendor'],}, canActivate:[AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
