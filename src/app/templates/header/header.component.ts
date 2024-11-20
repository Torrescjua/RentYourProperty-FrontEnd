import { Component, OnInit, OnDestroy, Input } from '@angular/core'; // Make sure to import Input
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service'; // Import the UserService
import { Subscription } from 'rxjs'; // Subscription for handling observable
import { User } from '../../models/user.model'; // Import User model
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() isHomeRoute: boolean = true; // Indica si estamos en la ruta inicial
  isLoggedIn: boolean = false; // Determina si el usuario está autenticado
  userName: string = ''; // Nombre del usuario autenticado
  userSubscription: Subscription | null = null;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    // Subscribe to the user state from UserService
    this.userSubscription = this.userService.userState$.subscribe(
      (user: User | null) => {
        this.isLoggedIn = !!user; // Check if user is logged in
        this.userName = user ? user.name : ''; // Get user name if logged in
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe from the userState observable to prevent memory leaks
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  // Redirect to registration page
  redirectToRegister(): void {
    this.router.navigate(['/register']);
  }

  // Redirect to login page
  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  // Log the user out and redirect to home
  logout(): void {
    this.userService.logout(); // Log out using the UserService
    this.router.navigate(['/']); // Redirect to the home page
  }
}
