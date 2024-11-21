import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Role } from '../../models/role.enum';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User = new User();
  errorMessage: string = ''; // Variable para mostrar mensaje de error
  successMessage: string = ''; // Variable para mensaje de éxito
  Role = Role; // Enum de roles

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    console.log('Formulario de registro enviado con datos:', this.user);
  
    this.userService.register(this.user).subscribe(
      (response: any) => {
        console.log('Usuario registrado:', response);
  
        // Verificar si estamos en un entorno del navegador
        if (typeof window !== 'undefined' && localStorage) {
          // Guardar usuario en localStorage
          localStorage.setItem('user', JSON.stringify(response));
        }
  
        // Redirigir según el rol
        if (response.role === 'ARRENDADOR') {
          this.router.navigate(['/arrendador']);
        } else if (response.role === 'ARRENDATARIO') {
          this.router.navigate(['/arrendatario']);
        }
      },
      (error: any) => {
        console.error('Error al registrar el usuario:', error);
        this.errorMessage = 'Error durante el registro. Inténtalo de nuevo.';
      }
    );
  }
  
  
}
