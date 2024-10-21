import { Routes } from '@angular/router';
import { PropertyCreateComponent } from './components/property/property-create/property-create.component';
import { PropertyEditComponent } from './components/property/property-edit/property-edit.component';
import { RequestCreateComponent } from './components/rental-request/request-create/request-create.component';

export const routes: Routes = [
  { path: 'editar-propiedad', component: PropertyEditComponent },
  { path: 'crear-propiedad', component: PropertyCreateComponent },
  { path: 'crear-solicitud', component: RequestCreateComponent },
];
