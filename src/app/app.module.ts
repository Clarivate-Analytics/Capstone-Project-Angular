import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { AdminComponent } from './admin/admin.component';
import { ApprovedComponent } from './approved/approved.component';
import { RejectedComponent } from './rejected/rejected.component';
import { VendorComponent } from './vendor/vendor.component';
import { SearchPipe } from './Pipes/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { FindPipe } from './Pipes/find.pipe';
import { ToastrModule } from 'ngx-toastr';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { TokenBindingInterceptor } from './interceptor/token-binding.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    EmployeeComponent,
    EmployeeFormComponent,
    AdminComponent,
    ApprovedComponent,
    RejectedComponent,
    VendorComponent,
    SearchPipe,
    FindPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    BackButtonDisableModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenBindingInterceptor,
    multi: true
  }],
  //providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
