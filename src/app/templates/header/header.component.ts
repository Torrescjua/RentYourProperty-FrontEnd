import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() isHomeRoute: boolean = true; // Indica si estamos en la ruta inicial
  isLoggedIn: boolean = false; // Determina si el usuario está autenticado
  userName: string = ''; // Nombre del usuario autenticado

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const user = localStorage.getItem('user');
      this.isLoggedIn = !!user; // Verifica si hay un usuario autenticado
      if (this.isLoggedIn && user) {
        const userData = JSON.parse(user);
        this.userName = userData.name || ''; // Obtiene el nombre del usuario
      }
    }
  }

  redirectToRegister(): void {
    this.router.navigate(['/register']); // Redirige a la página de registro
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
  }

  logout(): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('user'); // Elimina el usuario autenticado
    }
    this.isLoggedIn = false; // Actualiza el estado
    this.router.navigate(['/']); // Redirige a la página principal
  }
}
