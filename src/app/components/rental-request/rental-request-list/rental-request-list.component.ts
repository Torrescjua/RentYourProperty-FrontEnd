import { Component, OnInit } from '@angular/core';
import { RentalRequestService } from '../../../services/rental-request/rental-request.service';
import { PropertyService } from '../../../services/property/property.service';
import { UserService } from '../../../services/user/user.service'; // Import UserService
import { RentalRequest } from '../../../models/rental-request.model';
import { Property } from '../../../models/property.model';
import { User } from '../../../models/user.model'; // Import User model
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rental-request-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rental-request-list.component.html',
  styleUrls: ['./rental-request-list.component.css'],
})
export class RentalRequestListComponent implements OnInit {
  rentalRequests: RentalRequest[] = [];
  propertyNames: { [key: number]: string } = {};
  applicantNames: { [key: number]: string } = {}; // Add this property
  isLandlord: boolean = false;
  currentUserId: number | null | undefined = undefined;

  constructor(
    private rentalRequestService: RentalRequestService,
    private propertyService: PropertyService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.userService.getCurrentUser(); // No need for subscribe
    if (currentUser) {
      this.currentUserId = currentUser.id; // Set the current user's ID
      if (this.currentUserId !== undefined && this.currentUserId !== null) {
        this.checkUserType(this.currentUserId);
        this.loadRentalRequests(this.currentUserId);
      } else {
        console.error('User ID is undefined or null');
      }
    } else {
      console.error('No user is logged in');
      this.router.navigate(['/login']); // Redirect to login if no user is found
    }
  }

  checkUserType(userId: number): void {
    this.userService.isUserLandlord(userId).subscribe(
      (isLandlord) => {
        this.isLandlord = isLandlord;
      },
      (error) => {
        console.error('Error checking user type:', error);
      }
    );
  }

  loadRentalRequests(userId: number): void {
    console.log(`Loading rental requests for user ID: ${userId}`); // Add log here
    this.rentalRequestService.getRentalRequestsByUserId(userId).subscribe(
      (requests) => {
        console.log('Rental requests loaded successfully:', requests); // Add log here
        this.rentalRequests = requests;
        this.fetchPropertyNames();
        if (this.isLandlord) {
          this.fetchApplicantNames(); // Fetch applicant names if the user is a landlord
        }
      },
      (error) => {
        console.error('Error loading rental requests:', error); // Log the error
      }
    );
  }

  fetchPropertyNames(): void {
    console.log('Fetching property names for rental requests...');
    for (const request of this.rentalRequests) {
      if (request.propertyId) {
        this.propertyService.getPropertyById(request.propertyId).subscribe(
          (property: Property) => {
            if (property) {
              this.propertyNames[request.propertyId] = property.name; // Directly assign the property name
              console.log(
                `Property name for request ID ${request.id}: ${property.name}`
              );
            } else {
              console.warn(
                `No property found for property ID: ${request.propertyId}`
              );
            }
          },
          (error) => {
            console.error('Error fetching property name:', error);
          }
        );
      } else {
        console.warn(
          `Invalid propertyId for request ID ${request.id}:`,
          request.propertyId
        );
      }
    }
  }

  fetchApplicantNames(): void {
    console.log('Fetching applicant names for rental requests...');
    for (const request of this.rentalRequests) {
      if (request.userId) {
        this.userService.getUserById(request.userId).subscribe(
          (user: User) => {
            if (user) {
              this.applicantNames[request.userId] = user.name; // Directly assign the user name
              console.log(
                `Applicant name for request ID ${request.id}: ${user.name}`
              );
            } else {
              console.warn(`No applicant found for user ID: ${request.userId}`);
            }
          },
          (error) => {
            console.error('Error fetching applicant name:', error);
          }
        );
      } else {
        console.warn(
          `Invalid userId for request ID ${request.id}:`,
          request.userId
        );
      }
    }
  }

  acceptOrRejectRentalRequest(requestId: number, isAccepted: boolean): void {
    if (this.currentUserId !== undefined && this.currentUserId !== null) {
      this.rentalRequestService
        .acceptOrRejectRentalRequest(requestId, isAccepted, this.currentUserId)
        .subscribe(
          (response) => {
            console.log('Rental request updated:', response);
            if (
              this.currentUserId !== undefined &&
              this.currentUserId !== null
            ) {
              this.loadRentalRequests(this.currentUserId);
            }
          },
          (error) => {
            console.error('Error updating rental request:', error);
          }
        );
    }
  }

  goToPayment(requestId: number): void {
    console.log(`Redirecting to payment page for request ID: ${requestId}`);
    this.router.navigate([`/payments/pay/${requestId}`]);
  }

  rateProperty(userId: number, requestId: number): void {
    this.router.navigate(['/rating', userId, requestId, 'TENANT_TO_PROPERTY']);
  }

  rateHost(userId: number, requestId: number): void {
    this.router.navigate(['/rating', userId, requestId, 'LANDLORD_TO_TENANT']);
  }

  rateTenant(userId: number, requestId: number): void {
    this.router.navigate(['/rating', userId, requestId, 'TENANT_TO_LANDLORD']);
  }
}
