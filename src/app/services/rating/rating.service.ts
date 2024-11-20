// src/app/services/rating/rating.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Calification } from '../../models/calification.model'; // Update the path as needed

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiUrl = '/api/califications';

  constructor(private http: HttpClient) {}

  // Get pending ratings for a user
  getPendingRatings(userId: number): Observable<Calification[]> {
    return this.http.get<Calification[]>(`${this.apiUrl}/awaiting/${userId}`);
  }

  // Submit a rating for a user or property
  submitRating(calification: Calification, userId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/rate`, calification, {
      params: { userId: userId.toString() }
    });
  }
}
