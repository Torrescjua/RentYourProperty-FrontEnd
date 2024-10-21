import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../../services/property/property.service';
import { Property } from '../../../models/property.model';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landlord-properties',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './landlord-properties.component.html',
  styleUrls: ['./landlord-properties.component.css']
})
export class LandlordPropertiesComponent implements OnInit {
  properties: Property[] = [];
  users: User[] = [];
  selectedLandlordId: number | null = null;
  searchQuery: string = '';

  constructor(
    private propertyService: PropertyService,
    private userService: UserService,
    private router: Router // Inyección del router para redirigir
  ) {}

  ngOnInit(): void {
    this.loadLandlords(); // Cargar los arrendadores
  }

  // Cargar los arrendadores
  loadLandlords(): void {
    this.userService.getUsersByRole('ARRENDADOR').subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error al cargar los arrendadores', error);
      }
    );
  }

  // Cargar propiedades del arrendador seleccionado
  loadProperties(): void {
    if (this.selectedLandlordId) {
      this.propertyService.getPropertiesByOwnerId(this.selectedLandlordId).subscribe(
        (data: Property[]) => {
          this.properties = data;
        },
        (error) => {
          console.error('Error al cargar las propiedades', error);
        }
      );
    }
  }

  onLandlordSelected(): void {
    this.loadProperties();
  }

  // Redirigir a la página de edición de la propiedad utilizando el nombre
  goToEditProperty(propertyName: string): void {
    this.router.navigate(['/editar-propiedad', propertyName]);
  }
}
