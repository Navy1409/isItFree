import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RegisterOrganisationComponent } from './auth/register-organisation/register-organisation.component';
import { AuthServiceService } from './services/auth-service.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RegisterOrganisationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'client';
  isAdmin=false;
  panel="Admin Panel"
  inUserPanel=true;
  isLoggedIn=false;
  constructor(private authService:AuthServiceService, private router:Router){}

  ngOnInit(): void {
    this.authService.loggedInChanges().subscribe(
      status => this.isLoggedIn = status
    );

    this.authService.adminChanges().subscribe(
      isAdmin => this.isAdmin = isAdmin
    );
  }

  changePanel(){
    this.inUserPanel=!this.inUserPanel;
    if(this.inUserPanel){
      this.panel="Admin Panel"
      this.router.navigate(['/'])
    }
    else{
      this.panel="User Panel"
      this.router.navigate(['/admin/dashboard'])
    }
  }


  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
