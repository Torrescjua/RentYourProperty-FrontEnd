import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivePropertiesComponent } from './components/property/active-properties/active-properties.component';
import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ActivePropertiesComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rentyourproperty-frontend';
  isHomeRoute = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Escucha los eventos del router para actualizar la variable `isHomeRoute`
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.isHomeRoute = this.router.url === '/'; // Verifica si la ruta es la página principal
      }
    });
  }

  redirectToRegister() {
    // Método para redirigir al registro
    this.router.navigate(['/register']);
  }
}
