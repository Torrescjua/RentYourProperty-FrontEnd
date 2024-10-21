import { Routes } from '@angular/router';
import { PropertyCreateComponent } from './components/property/property-create/property-create.component';
import { PropertyEditComponent } from './components/property/property-edit/property-edit.component';
import { ActivePropertiesComponent } from './components/property/active-properties/active-properties.component';
import { LandlordPropertiesComponent } from './components/property/landlord-properties/landlord-properties.component';


export const routes: Routes = [
  { path: 'editar-propiedad', component: PropertyEditComponent },
  { path: 'crear-propiedad', component: PropertyCreateComponent },
  { path: 'active-propiedad', component:ActivePropertiesComponent },
  { path: 'cargar-propiedades', component:LandlordPropertiesComponent },
  { path: 'editar-propiedad/:name', component: PropertyEditComponent }

];
