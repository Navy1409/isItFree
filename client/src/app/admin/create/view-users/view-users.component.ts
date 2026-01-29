import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-users',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css'
})
export class ViewUsersComponent implements OnInit {

  constructor(private adminService: AdminService){}
  users:any[]=[];
  isLoading:boolean=false;
  ngOnInit(): void {    
    this.getUsers();
  }
  getUsers(){
    this.isLoading=true;
    this.adminService.getUsersByOrganisationId()
    .subscribe({
      next:(res)=>{
        console.log("success");
        this.users=res;
        console.log("Users",this.users);
        this.isLoading=false;
        
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
}
