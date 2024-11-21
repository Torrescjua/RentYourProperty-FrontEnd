import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule ,CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  properties = [
    {
      image: 'assets/img/casauno.jpg',
      title: 'Moderno apartamento en el centro',
      description: '2 habitaciones, 2 baños, cerca de parques y transporte público.',
      price: '$1,200,000 COP/mes',
    },
    {
      image: 'assets/img/casa2.jpg',
      title: 'Casa con jardín en las afueras',
      description: 'Amplia casa familiar con piscina y garaje para 2 autos.',
      price: '$2,800,000 COP/mes',
    },
    {
      image: 'assets/img/casa3.jpg',
      title: 'Oficina en zona empresarial',
      description: 'Espacio de trabajo completamente equipado.',
      price: '$3,500,000 COP/mes',
    },
  ];

  infoCards = [
    {
      icon: 'assets/icons/easy-search.svg',
      title: 'Búsqueda fácil',
      description: 'Filtra y encuentra tu inmueble ideal en pocos clics.',
    },
    {
      icon: 'assets/icons/secure-payments.svg',
      title: 'Pagos seguros',
      description: 'Realiza transacciones confiables y protegidas.',
    },
    {
      icon: 'assets/icons/best-deals.svg',
      title: 'Mejores precios',
      description: 'Accede a propiedades con precios competitivos.',
    },
  ];
}
