import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-offices',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './view-offices.component.html',
  styleUrl: './view-offices.component.css'
})
export class ViewOfficesComponent implements OnInit {

  offices:any[]=[];
  constructor(private adminService:AdminService){}
  ngOnInit(): void {
    this.getOffices();
  }
  getOffices(){
    this.adminService.getOfficesByOrganisationId()
    .subscribe({
      next:(res)=>{
        console.log("Success");
        this.offices=res;
        console.log("Offices",this.offices);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
