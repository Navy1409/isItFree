import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';
import { AuthServiceService } from '../../services/auth-service.service';
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
  error = '';
  showPassword = false;
  constructor(private router: Router, private authService: AuthenticateService,
    private authHelper:AuthServiceService
  ) { }
  token: string | null = '';

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.router.navigate(['/']);
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
 
  login() {
    const payload = {
      emailId: this.email,
      password: this.password
    }
    this.authService.loginUser(payload).subscribe({
      next: (res: any) => {        
        this.authHelper.decodeToken(res.token);
        this.router.navigate(['/'])
      },
      error: err => {
        this.error = err?.error?.msg;
        console.log(this.error);
      }
    })
  }
}
