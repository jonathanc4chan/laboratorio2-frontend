import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevaOrdenComponent } from './pages/nueva-orden/nueva-orden';
import { ListaOrdenesComponent } from './pages/lista-ordenes/lista-ordenes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NuevaOrdenComponent, ListaOrdenesComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}
