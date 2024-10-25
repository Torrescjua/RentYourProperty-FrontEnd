import { Routes } from '@angular/router';
import { PropertyCreateComponent } from './components/property/property-create/property-create.component';
import { PropertyEditComponent } from './components/property/property-edit/property-edit.component';
import { ActivePropertiesComponent } from './components/property/active-properties/active-properties.component';
import { LandlordPropertiesComponent } from './components/property/landlord-properties/landlord-properties.component';
import { RequestCreateComponent } from './components/rental-request/request-create/request-create.component';
import { RentalRequestListComponent } from './components/rental-request/rental-request-list/rental-request-list.component';

export const routes: Routes = [
  // Property
  { path: 'editar-propiedad', component: PropertyEditComponent },
  { path: 'crear-propiedad', component: PropertyCreateComponent },
  { path: 'active-propiedad', component: ActivePropertiesComponent },
  { path: 'cargar-propiedades', component: LandlordPropertiesComponent },
  { path: 'editar-propiedad/:name', component: PropertyEditComponent },
  // Rental Request
  { path: 'crear-solicitud', component: RequestCreateComponent },
  {
    path: 'solicitudes/:userId',
    component: RentalRequestListComponent,
    // canActivate: [AuthGuard]
  },
];
