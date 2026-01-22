import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterOrganisationComponent } from './auth/register-organisation/register-organisation.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RegisterOrganisationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
