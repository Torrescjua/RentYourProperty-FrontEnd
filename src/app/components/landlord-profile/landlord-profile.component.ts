import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropertyCreateComponent } from '../property/property-create/property-create.component';
import { PropertyEditComponent } from '../property/property-edit/property-edit.component';
import { LandlordPropertiesComponent } from '../property/landlord-properties/landlord-properties.component';
import { RentalRequestListComponent } from '../rental-request/rental-request-list/rental-request-list.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-landlord-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PropertyCreateComponent,
    PropertyEditComponent,
    LandlordPropertiesComponent,
    RentalRequestListComponent,
  ],
  templateUrl: './landlord-profile.component.html',
  styleUrls: ['./landlord-profile.component.css'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '0.5s ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '0.5s ease-out',
          style({ opacity: 0, transform: 'translateY(20px)' })
        ),
      ]),
    ]),
  ],
})
export class LandlordProfileComponent implements OnInit {
  activeSection: string = 'dashboard';
  userName$: Observable<string> = of(''); // Initialize with an empty observable

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    // Subscribe to the user state to get the user's name reactively
    this.userName$ = this.userService.userState$.pipe(
      map((user) => (user ? user.name : ''))
    );

    // If there's no user, redirect to the login page
    this.userService.userState$.subscribe((user) => {
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  setActiveSection(section: string) {
    this.activeSection = section;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']); // Redirect to home page after logout
  }
}
