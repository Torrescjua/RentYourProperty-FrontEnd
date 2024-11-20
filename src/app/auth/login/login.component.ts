import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: User = new User();
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    console.log('Formulario de inicio de sesión enviado:', this.user);
  
    this.userService.login(this.user).subscribe(
      (response: any) => {
        console.log('Usuario autenticado:', response);
  
        // Verificar si estamos en un entorno del navegador
        if (typeof window !== 'undefined' && localStorage) {
          // Guardar usuario en localStorage
          localStorage.setItem('user', JSON.stringify(response));
        }
  
        // Redirigir según el rol
        if (response.role === 'ARRENDADOR') {
          this.router.navigate(['/Arrendador']);
        } else if (response.role === 'ARRENDATARIO') {
          this.router.navigate(['/']);
        }
      },
      (error: any) => {
        console.error('Error al iniciar sesión:', error);
        this.errorMessage = 'Correo o contraseña incorrectos.';
      }
    );
  }
}
