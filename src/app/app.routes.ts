import { Routes } from '@angular/router';
import { ListaOrdenesComponent } from './pages/lista-ordenes/lista-ordenes';
import { NuevaOrdenComponent } from './pages/nueva-orden/nueva-orden';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';  
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 🟢 Login y Registro públicos
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 🔒 Rutas protegidas con JWT
  { path: 'lista-ordenes', component: ListaOrdenesComponent, canActivate: [authGuard] },
  { path: 'nueva-orden', component: NuevaOrdenComponent, canActivate: [authGuard] }
];
