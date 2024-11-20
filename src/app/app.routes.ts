import { Routes } from '@angular/router';
import { PropertyCreateComponent } from './components/property/property-create/property-create.component';
import { PropertyEditComponent } from './components/property/property-edit/property-edit.component';
import { ActivePropertiesComponent } from './components/property/active-properties/active-properties.component';
import { LandlordPropertiesComponent } from './components/property/landlord-properties/landlord-properties.component';
import { RequestCreateComponent } from './components/rental-request/request-create/request-create.component';
import { RentalRequestListComponent } from './components/rental-request/rental-request-list/rental-request-list.component';
import { PaymentComponent } from './components/payment/payment.component';
import { LandlordProfileComponent } from './components/landlord-profile/landlord-profile.component';
import { RatingComponent } from './components/rating/rating.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { AuthGuard } from './guards/auth.guard'; // Suponiendo que tienes un AuthGuard implementado.

export const routes: Routes = [
  // Property Routes
  { path: 'editar-propiedad', component: PropertyEditComponent, canActivate: [AuthGuard] },
  { path: 'crear-propiedad', component: PropertyCreateComponent, canActivate: [AuthGuard] },
  { path: 'active-propiedad', component: ActivePropertiesComponent },
  { path: 'cargar-propiedades', component: LandlordPropertiesComponent, canActivate: [AuthGuard] },
  { path: 'editar-propiedad/:name', component: PropertyEditComponent, canActivate: [AuthGuard] },

  // Rental Request Routes
  { path: 'crear-solicitud', component: RequestCreateComponent, canActivate: [AuthGuard] },
  { path: 'solicitudes/:userId', component: RentalRequestListComponent, canActivate: [AuthGuard] },

  // Payment Routes
  { path: 'payments/pay/:rentalRequestId', component: PaymentComponent, canActivate: [AuthGuard] },

  // Landlord Routes
  { path: 'Arrendador', component: LandlordProfileComponent, canActivate: [AuthGuard] },

  // Rating Routes
  { path: 'rating/:userId/:requestId', component: RatingComponent, canActivate: [AuthGuard] },

  // Auth Routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify-email', component: VerifyEmailComponent },

  // Default Route
  { path: '', redirectTo: '/active-propiedad', pathMatch: 'full' },
  { path: '**', redirectTo: '/active-propiedad' } // Ruta por defecto para rutas no encontradas.
];
