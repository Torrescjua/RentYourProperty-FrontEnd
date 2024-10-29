import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../services/payment/payment.service';
import { Payment } from '../../models/payment.model';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  payment: Payment = {
    amount: 0,
    bank: '',
    accountNumber: '',
    rentalRequestId: 0,
  };
  banks: string[] = ['Bank A', 'Bank B', 'Bank C']; // Replace with actual bank list
  message: string = '';

  constructor(private paymentService: PaymentService) {}

  submitPayment(): void {
    if (
      this.payment.amount &&
      this.payment.bank &&
      this.payment.accountNumber
    ) {
      this.paymentService
        .payRent(this.payment.rentalRequestId, this.payment)
        .subscribe({
          next: (response) => {
            this.message = 'Payment successful!';
            console.log('Payment Response:', response);
          },
          error: (error) => {
            this.message = 'Payment failed. Please try again.';
            console.error('Payment Error:', error);
          },
        });
    } else {
      this.message = 'Please fill in all payment details.';
    }
  }
}
