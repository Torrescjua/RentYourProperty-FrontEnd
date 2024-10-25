export interface RentalRequest {
  id?: number;
  propertyId: number;
  userId: number;
  paymentId?: number;
  requestDate: string;
  responseDate?: string;
  requestStatus: string;
  arrivalDate?: string | null;
  departureDate?: string | null;
  value?: number | null;
}
