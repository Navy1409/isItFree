import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-office',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './create-office.component.html',
  styleUrl: './create-office.component.css'
})
export class CreateOfficeComponent {

  createOfficeForm:FormGroup;
  constructor(private fb:FormBuilder, private adminService: AdminService, private router: Router){
    this.createOfficeForm=fb.group({
      officeName:['', Validators.required],
      location:['',Validators.required],
      capacity:['',Validators.required],
      isGroup:['',Validators.required],
      row:['',Validators.required],
      column:['',Validators.required]
    })
  }

  onSubmit(){
    if(this.createOfficeForm.invalid){
      this.createOfficeForm.markAllAsTouched()
      return
    }
    const payload=this.createOfficeForm.value;

    this.adminService.createOffice(payload)
    .subscribe({
      next:()=>{
        console.log("Office Created");
        this.router.navigate(['/admin/dashboard/view-offices'])
      },
      error: (err) => {
        alert(err?.error|| 'Update failed');
      }
    })
  }
}
