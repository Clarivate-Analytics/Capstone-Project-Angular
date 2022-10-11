import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServeService } from '../services/serve.service';

@Component({
  selector: 'app-rejected',
  templateUrl: './rejected.component.html',
  styleUrls: ['./rejected.component.css']
})
export class RejectedComponent implements OnInit {

  emp_ord : any
  rejected : Array<any> = []
  id : any
  p: number = 1;
  count: number = 5;
  searchInput = ""
  pg = true

  constructor(private serve : ServeService) { }

  ngOnInit(): void 
  {
    this.id = localStorage.getItem("EMPID")
    this.serve.get_all_orders().subscribe(res => //which are not responded
      {
        this.emp_ord = res
        console.log(this.emp_ord);
        for (let i of this.emp_ord)
        {
          if( i.response == -1)
          {
            this.rejected.push(i)
          }
        }
        console.log(this.rejected); 
        
        if(this.rejected.length <= this.count)
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
