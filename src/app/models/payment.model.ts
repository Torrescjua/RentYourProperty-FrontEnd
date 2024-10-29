export interface Payment {
  id?: number;
  amount: number;
  bank: string;
  accountNumber: string;
  rentalRequestId: number;
}
