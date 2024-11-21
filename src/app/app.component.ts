import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { HomeComponent } from './templates/home/home.component';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rentyourproperty-frontend';
  isHomeRoute = true;
  showHeader = true;
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Escucha los eventos de navegación
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Filtra solo eventos de finalización de navegación
    ).subscribe((event: NavigationEnd) => {
      // Verifica si la ruta actual es "/home" o "/"
      this.isHomeRoute = event.urlAfterRedirects === '/' || event.urlAfterRedirects === '/home';
      
      // Oculta el header para rutas específicas
      const hiddenHeaderRoutes = ['/arrendador', '/arrendatario'];
      this.showHeader = !hiddenHeaderRoutes.some(route => event.urlAfterRedirects.startsWith(route));
    });
  }

  redirectToRegister() {
    // Método para redirigir al registro
    this.router.navigate(['/register']);
  }
}
