import { Component } from '@angular/core';
import { AuthApiServiceService } from '../../services/auth-api-service.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-set-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.css'
})
export class SetPasswordComponent {

  password='';
  emailId='';
  showPassword = false;
  constructor(private authAPIService: AuthApiServiceService, private router:Router){}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  setPassword(){
    const emailId=this.emailId;
    const password=this.password;
    this.authAPIService.setPassword({emailId,password})
    .subscribe({
      next:()=>{
        console.log("Success")
        this.router.navigate(['/login'])
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
