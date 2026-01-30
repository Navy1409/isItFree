import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {

  createUserForm:FormGroup;
  constructor(private fb:FormBuilder, private adminService: AdminService, private router:Router){
    this.createUserForm= fb.group({
      userName:['',Validators.required],
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      emailId:['',Validators.required]
    })
  }

  discardChanges(){
    this.createUserForm.reset();
  }
  onSubmit(){
    if (this.createUserForm.invalid) {
      this.createUserForm.markAllAsTouched();
      return;
    }
    const payload= this.createUserForm.value;
    console.log("**********",payload);
    console.log("^^^^^^^^^^",localStorage.getItem('user'));
    
    this.adminService.createUser(payload)
    .subscribe({
      next:()=>{
        console.log("User Created")
        this.router.navigate(['/admin/dashboard/view-users'])
      },
     error: (err) => {
        alert(err?.error?.msg || 'Update failed');
      }
    })
  }
}
