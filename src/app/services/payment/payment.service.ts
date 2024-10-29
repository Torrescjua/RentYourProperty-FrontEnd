import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../../models/payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:8080/api/payments';
  constructor(private http: HttpClient) {}

  payRent(rentalRequestId: number, payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(
      `${this.apiUrl}/pay/${rentalRequestId}`,
      payment
    );
  }
}
