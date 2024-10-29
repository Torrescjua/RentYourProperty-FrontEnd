import { Component, OnInit } from '@angular/core';
import { RentalRequestService } from '../../../services/rental-request/rental-request.service';
import { PropertyService } from '../../../services/property/property.service';
import { UserService } from '../../../services/user/user.service'; // Import UserService
import { RentalRequest } from '../../../models/rental-request.model';
import { Property } from '../../../models/property.model';
import { User } from '../../../models/user.model'; // Import User model
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(
    private rentalRequestService: RentalRequestService,
    private propertyService: PropertyService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('userId')); // Get userId from route
    this.checkUserType(userId);
    this.loadRentalRequests(userId);
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
    this.rentalRequestService.getRentalRequestsByUserId(userId).subscribe(
      (requests) => {
        this.rentalRequests = requests;
        this.fetchPropertyNames();
        if (this.isLandlord) {
          this.fetchApplicantNames(); // Fetch applicant names if the user is a landlord
        }
      },
      (error) => {
        console.error('Error loading rental requests:', error);
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
    const userId = Number(this.route.snapshot.paramMap.get('userId')); // Get userId from route
    this.rentalRequestService
      .acceptOrRejectRentalRequest(requestId, isAccepted, userId)
      .subscribe(
        (response) => {
          console.log('Rental request updated:', response);
          this.loadRentalRequests(userId);
        },
        (error) => {
          console.error('Error updating rental request:', error);
        }
      );
  }

  goToPayment(requestId: number): void {
    console.log(`Redirecting to payment page for request ID: ${requestId}`);
    this.router.navigate([`/payments/pay/${requestId}`]);
  }

  rateProperty(requestId: number): void {
    console.log(`Rating the property for request ID: ${requestId}`);
  }

  rateHost(requestId: number): void {
    console.log(`Rating the host for request ID: ${requestId}`);
  }
}
