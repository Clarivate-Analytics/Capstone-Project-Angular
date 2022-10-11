import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { ServeService } from '../services/serve.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private serve : ServeService, private router : Router, private toastr: ToastrService) {}

  userDetails : any
  flag : any
  token : any
  role : any

  canActivate(route : ActivatedRouteSnapshot): boolean
    { 
      console.log("hellooo");
      this.token = localStorage.getItem("Token");
      this.role = localStorage.getItem("role")
      const roles :string = route.data['role']

      if (this.token && roles.includes(this.role))
      {
        return true
      }
      else
      {
        this.router.navigate([""])
        return false
      }

    }


  
}
