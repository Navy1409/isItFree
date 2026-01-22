import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register-organisation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register-organisation.component.html',
  styleUrl: './register-organisation.component.css'
})
export class RegisterOrganisationComponent {
    showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    console.log('Register organisation submitted');
  }
}
