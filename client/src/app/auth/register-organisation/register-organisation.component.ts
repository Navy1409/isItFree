import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthApiServiceService } from '../../services/auth-api-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-register-organisation',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register-organisation.component.html',
  styleUrl: './register-organisation.component.css',
})
export class RegisterOrganisationComponent {
  showPassword = false;
  form: FormGroup;
  constructor(
    private authApi: AuthApiServiceService,
    private fb: FormBuilder,
    private authService: AuthServiceService,
  ) {
    this.form = this.fb.group({
      organisationName: ['', Validators.required],
      adminName: ['', Validators.required],
      adminEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    });
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
        this.authService.setUser(res);
      },
      error: (err) => {
        console.error('registration failed', err);
      },
    });
  }
}
