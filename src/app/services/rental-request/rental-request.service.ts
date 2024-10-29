import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RentalRequest } from '../../models/rental-request.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RentalRequestService {
  private apiUrl = 'http://localhost:8080/api/rental-requests';

  constructor(private http: HttpClient) {}

  createRentalRequest(
    userId: number,
    propertyId: number
  ): Observable<RentalRequest> {
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('propertyId', propertyId.toString());

    return this.http.post<RentalRequest>(`${this.apiUrl}/create`, null, {
      params,
    });
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
      `${this.apiUrl}/decision/${requestId}?isAccepted=${isAccepted}&userId=${userId}`,
      null
    );
  }
}
