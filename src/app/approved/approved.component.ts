import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServeService } from '../services/serve.service';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css']
})
export class ApprovedComponent implements OnInit {

  emp_ord : any
  approved : Array<any> = []
  id : any
  p: number = 1;
  count: number = 5;
  searchInput = ""
  pg = true

  constructor(private serve : ServeService) { }

  ngOnInit(): void {
    this.id = localStorage.getItem("EMPID")
    this.serve.get_all_orders().subscribe(res =>
      {
        this.emp_ord = res
        console.log(this.emp_ord);
        for (let i of this.emp_ord)
        {
          if( i.response == 1)
          {
            this.approved.push(i)
          }
        }
        console.log(this.approved);  
        
        if(this.approved.length <= this.count)
        {
          this.pg = false
        }
        else
        {
          this.pg = true
        }
      });
  }

}
