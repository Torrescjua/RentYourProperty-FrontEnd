import { Component, OnInit } from '@angular/core';
import { RentalRequestService } from '../../../services/rental-request/rental-request.service';
import { PropertyService } from '../../../services/property/property.service';
import { RentalRequest } from '../../../models/rental-request.model';
import { Property } from '../../../models/property.model';
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
  propertyNames: { [key: number]: string } = {}; // Store property names by propertyId

  constructor(
    private rentalRequestService: RentalRequestService,
    private propertyService: PropertyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = 1;
    this.loadRentalRequests(userId);
  }

  loadRentalRequests(userId: number): void {
    this.rentalRequestService.getRentalRequestsByUserId(userId).subscribe(
      (requests) => {
        this.rentalRequests = requests;
        this.fetchPropertyNames(); // Fetch property names after loading rental requests
      },
      (error) => {
        console.error('Error loading rental requests:', error);
      }
    );
  }

  fetchPropertyNames(): void {
    for (const request of this.rentalRequests) {
      if (request.propertyId) {
        // Check if propertyId is valid
        this.propertyService.getPropertyById(request.propertyId).subscribe(
          (properties: Property[]) => {
            if (properties.length > 0) {
              this.propertyNames[request.propertyId] = properties[0].name;
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

  acceptOrRejectRentalRequest(
    requestId: number,
    isAccepted: boolean,
    userId: number
  ): void {
    this.rentalRequestService
      .acceptOrRejectRentalRequest(requestId, isAccepted, userId)
      .subscribe(
        (response) => {
          console.log('Rental request updated:', response);
          // Optionally, reload rental requests to reflect changes
          this.loadRentalRequests(userId);
        },
        (error) => {
          console.error('Error updating rental request:', error);
        }
      );
  }

  goToPayment(requestId: number): void {
    console.log(
      `Redirigiendo a la página de pago para la solicitud ID: ${requestId}`
    );
    this.router.navigate([`/payments/pay/${requestId}`]);
  }

  rateProperty(requestId: number): void {
    // Lógica para calificar el predio
    console.log(`Calificando el predio para la solicitud ID: ${requestId}`);
  }

  rateHost(requestId: number): void {
    // Lógica para calificar al anfitrión
    console.log(`Calificando al anfitrión para la solicitud ID: ${requestId}`);
  }
}
