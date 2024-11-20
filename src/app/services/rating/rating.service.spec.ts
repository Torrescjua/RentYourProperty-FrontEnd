// src/app/services/rating/rating.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RatingService } from './rating.service';
import { Calification } from '../../models/calification.model'; // Update the path as needed

describe('RatingService', () => {
  let service: RatingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RatingService]
    });
    service = TestBed.inject(RatingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve pending ratings for a user', () => {
    const mockPendingRatings: Calification[] = [
      {
        id: 1,
        score: 0,
        comment: '',
        date: new Date().toISOString().split('T')[0],
        userId: 123,
        targetUserId: 456, // The user being rated
        ratingType: 'TENANT_TO_LANDLORD' // Specify the rating type
      },
      {
        id: 2,
        score: 0,
        comment: '',
        date: new Date().toISOString().split('T')[0],
        userId: 123,
        targetUserId: 789, // The user being rated
        ratingType: 'LANDLORD_TO_TENANT' // Specify the rating type
      },
    ];
    const userId = 123;

    service.getPendingRatings(userId).subscribe((ratings) => {
      expect(ratings.length).toBe(2);
      expect(ratings).toEqual(mockPendingRatings);
    });

    const req = httpMock.expectOne(`/api/califications/awaiting/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPendingRatings);
  });

  it('should submit a rating', () => {
    const calification: Calification = {
      id: 1,
      score: 5,
      comment: 'Great!',
      date: new Date().toISOString().split('T')[0],
      userId: 123,
      targetUserId: 456, // The user being rated
      propertyId: 1, // Optionally specify property ID if applicable
      ratingType: 'TENANT_TO_PROPERTY' // Specify the rating type
    };
    const userId = 123;

    service.submitRating(calification, userId).subscribe((response) => {
      expect(response).toBe('Calificación registrada con éxito');
    });

    const req = httpMock.expectOne(`/api/califications/rate?userId=${userId}`);
    expect(req.request.method).toBe('POST');
    req.flush('Calificación registrada con éxito');
  });
});
