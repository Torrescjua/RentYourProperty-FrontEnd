import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {}

  getUsersByRole(role: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/role/${role}`);
  }
  // Método para registrar un nuevo usuario
  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  // Método para obtener todos los usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  // Método para obtener un usuario por ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  // Método para actualizar un usuario
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, user);
  }

  // Método para eliminar un usuario
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  // Metodo para revisar si ususario es Arrendatario
  isUserLandlord(userId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${userId}/is-landlord`);
  }

  //logIn
  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }
}
