import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticateService } from '../../../services/authenticate.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
 email = '';
  password = '';
  error='';
  showPassword = false;
  constructor(private router:Router,private authService:AuthenticateService){}
  token:string|null= '';

  ngOnInit(): void {
     this.token= localStorage.getItem('token');
     if(this.token){
    this.router.navigate(['/']);
  }
  }
  
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  login() {
    const payload={
      emailId:this.email,
      password: this.password
    }
    this.authService.loginUser(payload).subscribe({
      next: (res:any)=>{
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.userId);
        localStorage.setItem('organisationId', res.organisationId);
        localStorage.setItem('emailId',res.emailId);
        this.router.navigate(['/']);

      },
      error:err=>{
        this.error=err?.error?.message;
        console.log(this.error);
        
      }
    })
  }
}
