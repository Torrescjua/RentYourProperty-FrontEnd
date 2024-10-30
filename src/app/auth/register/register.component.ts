import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User();
  errorMessage: string = ''; // Variable para mostrar mensaje de error

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    console.log('Formulario enviado con datos:', JSON.stringify(this.user));

    // Llama al método de registro del servicio de usuario
    this.userService.register(this.user).subscribe(
      (response: any) => {
        console.log('Usuario registrado:', response);
        // Redirigir a la página de confirmación
        this.router.navigate(['/verify-email']);
      },
      (error: any) => {
        console.error('Error al registrar el usuario:', error);
        
        // Mostrar mensaje de error si el correo ya está en uso
        if (error.status === 409) { // Verifica si el error es un conflicto (email ya en uso)
          this.errorMessage = 'El correo ya está en uso. Por favor, verifica el correo ingresado.';
        } else {
          this.errorMessage = 'Error al registrar el usuario. Intente nuevamente más tarde.';
        }
      }
    );
  }
}
