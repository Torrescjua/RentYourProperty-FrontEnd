import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RentalRequest } from '../../models/rental-request.model';

@Injectable({
  providedIn: 'root',
})
export class RentalRequestService {
  private apiUrl = 'http://localhost:8080/api/rental-requests';

  constructor(private http: HttpClient) {}

  createRentalRequest(rentalRequest: RentalRequest): Observable<RentalRequest> {
    return this.http.post<RentalRequest>(
      `${this.apiUrl}/create`,
      rentalRequest
    );
  }

  getRentalRequestsByUserId(userId: number): Observable<RentalRequest[]> {
    return this.http.get<RentalRequest[]>(`${this.apiUrl}/get/${userId}`);
  }

  acceptOrRejectRentalRequest(
    requestId: number,
    isAccepted: boolean,
    userId: number
  ): Observable<RentalRequest> {
    return this.http.post<RentalRequest>(
      `${this.apiUrl}/decision/${requestId}`,
      { isAccepted, userId }
    );
  }
}
