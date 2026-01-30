import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RegisterOrganisationComponent } from './auth/register-organisation/register-organisation.component';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegisterOrganisationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'client';
  isAdmin = false;
  panel = '';
  inUserPanel = true;
  constructor(
    private authService: AuthServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.isAdmin = user.isAdmin;
        const pathName = window.location.pathname;
        if (pathName.includes('/admin')) {
          this.inUserPanel = false;
          this.panel = 'Go to User Dashboard';
        } else {
          this.inUserPanel = true;
          this.panel = 'Go to Admin Dashboard';
        }
      } else {
        this.isAdmin = false;
        this.panel = '';
      }
    });
    this.isAdmin = this.authService.getUser().isAdmin;
  }

  changePanel() {
    this.inUserPanel = !this.inUserPanel;
    if (this.inUserPanel) {
      this.panel = 'Go to Admin Dashboard';
      this.router.navigate(['/']);
    } else {
      this.panel = 'Go to User Dashboard';
      this.router.navigate(['/admin/dashboard']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
