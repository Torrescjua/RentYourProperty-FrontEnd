import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RentalRequestService } from './rental-request.service';
import { RentalRequest } from '../../models/rental-request.model';

describe('RentalRequestService', () => {
  let service: RentalRequestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RentalRequestService],
    });
    service = TestBed.inject(RentalRequestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a rental request', () => {
    const mockRentalRequest: RentalRequest = {
      id: 1,
      propertyId: 2,
      userId: 3,
      requestDate: '2024-10-20',
      requestStatus: 'PENDING',
    };

    service.createRentalRequest(mockRentalRequest).subscribe((response) => {
      expect(response).toEqual(mockRentalRequest);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/create`);
    expect(req.request.method).toBe('POST');
    req.flush(mockRentalRequest);
  });

  it('should get rental requests by user ID', () => {
    const mockRentalRequests: RentalRequest[] = [
      {
        id: 1,
        propertyId: 2,
        userId: 3,
        requestDate: '2024-10-20',
        requestStatus: 'PENDING',
      },
    ];

    service.getRentalRequestsByUserId(3).subscribe((response) => {
      expect(response).toEqual(mockRentalRequests);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/get/3`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRentalRequests);
  });

  it('should accept or reject a rental request', () => {
    const mockRentalRequest: RentalRequest = {
      id: 1,
      propertyId: 2,
      userId: 3,
      requestDate: '2024-10-20',
      requestStatus: 'ACCEPTED',
    };

    service.acceptOrRejectRentalRequest(1, true, 3).subscribe((response) => {
      expect(response.requestStatus).toBe('ACCEPTED');
    });

    const req = httpMock.expectOne(
      `${service['apiUrl']}/decision/1?isAccepted=true&userId=3`
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockRentalRequest);
  });
});
