import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RentalRequestService } from '../../../services/rental-request/rental-request.service';
import { UserService } from '../../../services/user/user.service';
import { PropertyService } from '../../../services/property/property.service';
import { RentalRequest } from '../../../models/rental-request.model';
import { Property } from '../../../models/property.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-request-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css'],
})
export class RequestCreateComponent implements OnInit {
  rentalRequest: RentalRequest = {
    propertyId: 0,
    userId: 0,
    requestDate: '',
    requestStatus: 'PENDING',
  };

  properties: Property[] = [];
  searchResults: Property[] = [];
  message: string = '';
  searchQuery: string = '';
  isMunicipalitySearch: boolean = false;
  isResultsVisible: boolean = false;
  currentUserId: number | null | undefined = undefined;
  currentUserName: string | null | undefined = undefined;

  constructor(
    private rentalRequestService: RentalRequestService,
    private propertyService: PropertyService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Retrieve the current user using getCurrentUser()
    const currentUser = this.userService.getCurrentUser();

    if (currentUser) {
      // If currentUser is not null, set currentUserId
      this.currentUserId = currentUser.id;
      this.currentUserName = currentUser.name;
      this.rentalRequest.userId = this.currentUserId!; // Set userId for rentalRequest
    } else {
      // Handle the case where the user is null
      console.error('No current user found');
    }

    // Load available properties for a specific municipality
    this.propertyService.getPropertiesByMunicipality('Barranquilla').subscribe(
      (data) => {
        this.properties = data;
      },
      (error) => {
        console.error('Error loading properties', error);
      }
    );
  }

  searchProperties(): void {
    if (this.isMunicipalitySearch) {
      this.propertyService
        .getPropertiesByMunicipality(this.searchQuery)
        .subscribe(
          (data) => {
            this.searchResults = data;
            this.isResultsVisible = true;
          },
          (error) => {
            console.error('Error fetching properties by municipality', error);
          }
        );
    } else {
      this.propertyService.getPropertyByName(this.searchQuery).subscribe(
        (data) => {
          this.searchResults = data;
          this.isResultsVisible = true;
        },
        (error) => {
          console.error('Error fetching property by name', error);
        }
      );
    }
  }

  selectProperty(property: Property): void {
    if (property.id !== undefined) {
      this.rentalRequest.propertyId = property.id; // Assign if the id is defined
    } else {
      console.error('Property ID is undefined');
    }
    this.isResultsVisible = false; // Hide the search results once a property is selected
  }

  onSubmit(): void {
    // Validate propertyId and userId
    if (
      this.rentalRequest.propertyId === 0 ||
      this.rentalRequest.userId === 0
    ) {
      this.message = 'Please select a valid property and user.';
      return;
    }

    // Set the request date to the current date
    this.rentalRequest.requestDate = new Date().toISOString().split('T')[0];

    // Log rentalRequest for debugging purposes
    console.log('Rental Request Data:', this.rentalRequest);

    // Submit the rental request to the backend using userId and propertyId
    this.rentalRequestService
      .createRentalRequest(
        this.rentalRequest.userId, // Use currentUserId here
        this.rentalRequest.propertyId
      )
      .subscribe(
        (response) => {
          this.message = 'Solicitud de renta creada exitosamente'; // Fixed typo
          console.log('Response:', response);
        },
        (error) => {
          this.message = 'Error al crear la solicitud de renta';
          console.error('Error:', error);
        }
      );
  }
}
