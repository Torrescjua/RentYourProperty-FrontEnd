import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { RentalRequestListComponent } from '../rental-request/rental-request-list/rental-request-list.component';
import { RequestCreateComponent } from '../rental-request/request-create/request-create.component';
import { ActivePropertiesComponent } from '../property/active-properties/active-properties.component';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router'; // Import Router
import { trigger, transition, style, animate } from '@angular/animations';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tenant-profile',
  templateUrl: './tenant-profile.component.html',
  styleUrls: ['./tenant-profile.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RentalRequestListComponent,
    RequestCreateComponent,
    ActivePropertiesComponent,
  ],
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
export class TenantProfileComponent implements OnInit {
  activeSection: string = 'dashboard'; // Inicia con el dashboard como sección activa
  userName$: Observable<string> = of(''); // Initialize with an empty observable
  userRole$: Observable<string> = of(''); // To store user role

  constructor(
    private userService: UserService,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    // Fetch user info
    this.userName$ = this.userService.userState$.pipe(
      map((user) => {
        console.log(user); // Log the user object to check its structure
        return user ? user.name : '';
      })
    );

    // Fetch user role and check if the user is a landlord (ARRENDATARIO)
    this.userRole$ = this.userService.userState$.pipe(
      map((user) => (user ? user.role : ''))
    );

    // If user is a landlord, navigate to 'Arrendador'
    this.userRole$.subscribe((role) => {
      if (role === 'ARRENDATARIO') {
        this.router.navigate(['/arrendatario']); // Navigate to landlord route
      }
    });
  }

  setActiveSection(section: string): void {
    this.activeSection = section; // Cambia la sección activa al hacer clic
  }
}
