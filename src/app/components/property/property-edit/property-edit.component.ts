import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../../services/property/property.service';
import { Property } from '../../../models/property.model';
import { Income } from '../../../models/income.enum';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-property-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './property-edit.component.html',
  styleUrls: ['./property-edit.component.css']
})
export class PropertyEditComponent implements OnInit {
  property: Property = {
    id: 0,
    name: '',
    location: '',
    description: '',
    photoUrl: '',
    department: '',
    municipality: '',
    incomeType: Income.MUNICIPIO,
    rooms: 1,
    bathrooms: 1,
    allowsPets: false,
    hasPool: false,
    hasBBQ: false,
    nightlyRate: 0,
    ownerId: 0
  };
  users: User[] = [];
  Income = Income;
  message: string = '';
  searchQuery: string = '';

  constructor(
    private propertyService: PropertyService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const propertyName = this.route.snapshot.paramMap.get('name');
    if (propertyName) {
      this.loadPropertyByName(propertyName);
    }

    this.userService.getUsersByRole('ARRENDADOR').subscribe(data => {
      this.users = data;
    }, error => {
      console.error('Error al cargar los arrendadores', error);
    });
  }

  loadPropertyByName(name: string): void {
    this.propertyService.getPropertyByName(name).subscribe(data => {
      if (data.length > 0) {
        this.property = data[0]; 
      } else {
        console.error('Propiedad no encontrada');
        this.router.navigate(['/error']);
      }
    }, error => {
      console.error('Error al cargar la propiedad', error);
    });
  }

  onSubmit(): void {
    if (this.property.id) {
      this.propertyService.updateProperty(this.property.id, this.property).subscribe(
        response => {
          console.log('Propiedad actualizada correctamente.');
          this.message = 'Se actualizó la propiedad.';
        },
        error => {
          this.message = 'Error al actualizar la propiedad.';
          console.error('Error al actualizar la propiedad', error);
        }
      );
    } else {
      console.error('ID de la propiedad no encontrado');
    }
  }

  searchProperties(): void {
    this.propertyService.getPropertyByName(this.searchQuery).subscribe(data => {
      if (data.length > 0) {
        this.property = data[0]; // Asigna la primera coincidencia al objeto property
      } else {
        this.message = 'Propiedad no encontrada';
      }
    }, error => {
      console.error('Error al buscar la propiedad', error);
    });
  }
  


  deactivateProperty(): void {
    if (this.property.id) {
        this.propertyService.deactivateProperty(this.property.id).subscribe(
            response => {
                this.message = 'Propiedad desactivada correctamente.';
                // Reinicia el formulario después de desactivar
                this.property = {
                    name: '',
                    location: '',
                    description: '',
                    photoUrl: '',
                    department: '',
                    municipality: '',
                    incomeType: Income.MUNICIPIO,
                    rooms: 1,
                    bathrooms: 1,
                    allowsPets: false,
                    hasPool: false,
                    hasBBQ: false,
                    nightlyRate: 0,
                    ownerId: 0
                };
            },
            error => {
                console.error('Error al desactivar la propiedad', error);
                this.message = 'Error al desactivar la propiedad.';
            }
        );
    }
}

}
