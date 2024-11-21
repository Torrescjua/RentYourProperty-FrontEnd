import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/user';

  // BehaviorSubject to hold the user state (initially null)
  private userSubject = new BehaviorSubject<User | null>(null);

  // Observable to allow other components to subscribe to the user state
  userState$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined' && localStorage) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.userSubject.next(JSON.parse(storedUser)); // Emit stored user on initialization
      }
    }
  }

  // Method to get users by role
  getUsersByRole(role: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/role/${role}`);
  }

  // Register a new user
  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  // Get a user by ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  // Update a user
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, user);
  }

  // Delete a user
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  // Check if a user is a landlord
  isUserLandlord(userId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${userId}/is-landlord`);
  }

  isUserRoleLandlord(role: String): boolean {
    return role === 'ARRENDADOR';
  }

  // Log in the user and update the user state
  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user).pipe(
      tap((response: any) => {
        // Store the user data in localStorage and update the user state
        localStorage.setItem('user', JSON.stringify(response));
        this.userSubject.next(response); // Emit the logged-in user
        this.redirectBasedOnRole(response.role);
      })
    );
  }

  getCurrentUser(): User | null {
    return this.userSubject.value; // Returns the current value of the user from BehaviorSubject
  }
  // Log out the user and clear the user state
  logout(): void {
    localStorage.removeItem('user'); // Remove from localStorage
    this.userSubject.next(null); // Emit null to clear the user state
  }

  private redirectBasedOnRole(role: string): void {
    if (this.isUserRoleLandlord(role)) {
      this.router.navigate(['/arrendador']);
    } else {
      this.router.navigate(['/arrendatario']);
    }
  }
}
