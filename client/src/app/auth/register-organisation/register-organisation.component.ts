import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthApiServiceService } from '../../services/auth-api-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router, RouterLink } from '@angular/router';
import { timeRangeValidator } from '../../custom-validators/timeRangeValidator';

@Component({
  selector: 'app-register-organisation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register-organisation.component.html',
  styleUrl: './register-organisation.component.css',
})
export class RegisterOrganisationComponent implements OnInit {
  showPassword = false;
  form: FormGroup;
  token: string | null = '';
  constructor(
    private authApi: AuthApiServiceService,
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
    private timeRangeValidator: timeRangeValidator
  ) {
    this.form = this.fb.group({
      organisationName: ['', Validators.required],
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      openTime: ['', Validators.required],
      closeTime: ['', Validators.required],
      breakTime: ['', Validators.required]
    },{
      validators: timeRangeValidator.validateOrganisationTime
    });
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('user')
    if (this.token) {
      this.router.navigate(['/'])
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const { confirmPassword, ...payload } = this.form.value;
    if (payload.password !== confirmPassword) {
      alert("password don't match...");
      return;
    }
    this.authApi.register(payload).subscribe({
      next: (res) => {
        this.authService.decodeToken(res.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('registration failed', err);
      },
    });
  }
}
