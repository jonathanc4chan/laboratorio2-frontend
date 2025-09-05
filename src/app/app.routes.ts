import { Routes } from '@angular/router';
import { ListaOrdenesComponent } from './pages/lista-ordenes/lista-ordenes';
import { NuevaOrdenComponent } from './pages/nueva-orden/nueva-orden';

export const routes: Routes = [
  { path: '', redirectTo: 'lista-ordenes', pathMatch: 'full' },
  { path: 'lista-ordenes', component: ListaOrdenesComponent },
  { path: 'nueva-orden', component: NuevaOrdenComponent }
];
