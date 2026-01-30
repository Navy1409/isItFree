import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-users',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css'
})
export class ViewUsersComponent implements OnInit {

  constructor(private adminService: AdminService) { }
  users: any[] = [];
  isLoading: boolean = false;
  isEditModalOpen = false;
  selectedUser: any = null;
  originalUser: any = null;
  editForm = {
    userName: '',
    firstName: '',
    lastName: '',
    emailId: ''
  };
  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.isLoading = true;
    this.adminService.getUsersByOrganisationId()
      .subscribe({
        next: (res) => {
          console.log("success");
          this.users = res;
          console.log("Users", this.users);
          this.isLoading = false;

        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  openEditUser(user: any) {
    this.selectedUser = { ...user };
    this.originalUser = {
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      emailId: user.emailId
    };

    this.editForm = { ...this.originalUser };

    this.isEditModalOpen = true;
  }

  getChangedFields(): any {
    const changes: any = {};
    Object.keys(this.editForm).forEach((key) => {
      const typedKey = key as keyof typeof this.editForm;

      if (this.editForm[typedKey] !== this.originalUser[typedKey]) {
        changes[typedKey] = this.editForm[typedKey];
      }
    });
    return changes;
  }
  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedUser = null;
  }

  saveUserChanges() {
    const changes = this.getChangedFields();
    if (Object.keys(changes).length === 0) {
      alert('No changes to save');
      return;
    }
    const payload = {
      ...changes
    };
    this.adminService.updateUser(this.selectedUser.userId, payload).subscribe({
      next: () => {
        alert('User updated successfully');
        this.closeEditModal();
        this.getUsers();
      },
      error: (err) => {
        alert(err?.error?.message || 'Update failed');
      }
    });
    this.isEditModalOpen = false;
    this.selectedUser = null;
    this.originalUser = null;
  }
}
