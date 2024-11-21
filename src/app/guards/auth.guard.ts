import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Verificar si estamos en un entorno del navegador
    if (typeof window !== 'undefined' && localStorage) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      if (user && user.role) {
        // Usuario autenticado y con rol válido
        return true;
      }
    }

    // Si no está autenticado o localStorage no está disponible, redirigir al login
    this.router.navigate(['/login']);
    return false;
  }
}

