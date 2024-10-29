import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropertyCreateComponent } from '../property/property-create/property-create.component';
import { PropertyEditComponent } from '../property/property-edit/property-edit.component';
import { LandlordPropertiesComponent } from '../property/landlord-properties/landlord-properties.component';
import { RentalRequestListComponent } from '../rental-request/rental-request-list/rental-request-list.component';
import { trigger, transition, style, animate } from '@angular/animations';

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
export class LandlordProfileComponent {
  activeSection: string = 'dashboard';

  setActiveSection(section: string) {
    this.activeSection = section;
  }
}
