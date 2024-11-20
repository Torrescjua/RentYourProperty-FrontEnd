import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropertyCreateComponent } from '../property/property-create/property-create.component';
import { PropertyEditComponent } from '../property/property-edit/property-edit.component';
import { LandlordPropertiesComponent } from '../property/landlord-properties/landlord-properties.component';
import { RentalRequestListComponent } from '../rental-request/rental-request-list/rental-request-list.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landlord-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PropertyCreateComponent,
    PropertyEditComponent,
    LandlordPropertiesComponent,
    RentalRequestListComponent
  ],
  templateUrl: './landlord-profile.component.html',
  styleUrls: ['./landlord-profile.component.css'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({ opacity: 0, transform: 'translateY(20px)' })),
      ]),
    ]),
  ],
})
export class LandlordProfileComponent implements OnInit {
  activeSection: string = 'dashboard';
  userName: string = ''; // Nombre del usuario logueado
  isLoggedIn: boolean = false; // Estado de autenticación

  constructor(private router: Router) {}

  ngOnInit() {
    if (this.isBrowser()) {
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        this.userName = user.name; // Asignar el nombre del usuario
        this.isLoggedIn = true; // Establecer estado de autenticación
      } else {
        // Redirige al login si no hay usuario autenticado
        this.router.navigate(['/login']);
      }
    }
  }

  setActiveSection(section: string) {
    this.activeSection = section;
  }

  logout() {
    if (this.isBrowser()) {
      // Eliminar datos de sesión y redirigir al inicio
      localStorage.removeItem('loggedInUser');
    }
    this.isLoggedIn = false;
    this.userName = '';
    this.router.navigate(['/']); // Redirigir al inicio
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
