import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../../services/property/property.service';
import { UserService } from '../../../services/user/user.service';
import { Property } from '../../../models/property.model';
import { User } from '../../../models/user.model';
import { Income } from '../../../models/income.enum';

@Component({
  selector: 'app-property-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './property-create.component.html',
  styleUrls: ['./property-create.component.css']
})
export class PropertyCreateComponent implements OnInit {
  property: Property = {
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
    ownerId: 0 // Inicialmente vacío, se seleccionará en el formulario
  };
  users: User[] = [];
  message: string = '';
  Income = Income;

  constructor(
    private propertyService: PropertyService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.userService.getUsersByRole('ARRENDADOR').subscribe(
        (data) => {
            this.users = data;
        },
        (error) => {
            console.error('Error al cargar los arrendadores', error);
        }
    );
}


  onSubmit(): void {
    this.propertyService.createProperty(this.property).subscribe(
      response => {
        this.message = 'Propiedad creada exitosamente!';
      },
      error => {
        this.message = 'Error al crear la propiedad.';
        console.error(error);
      }
    );
  }
}
