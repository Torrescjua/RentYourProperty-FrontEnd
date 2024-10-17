import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'http://localhost:8080/api/property';

  constructor(private http: HttpClient) {}

  createProperty(property: Property): Observable<Property> {
    const params = new HttpParams().set('ownerId', property.ownerId.toString());
    return this.http.post<Property>(`${this.apiUrl}/create`, property, { params });
  }

  getPropertiesByMunicipality(municipality: string): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/municipality/${municipality}`);
  }

  getPropertyByName(name: string): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/name/${name}`);
  }

  updateProperty(id: number, property: Property): Observable<Property> {
    return this.http.put<Property>(`${this.apiUrl}/update/${id}`, property);
  }

  deactivateProperty(id: number): Observable<Property> {
    return this.http.put<Property>(`${this.apiUrl}/deactivate/${id}`, {});
  }
}
