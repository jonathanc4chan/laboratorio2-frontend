import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-lista-ordenes',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatListModule],
  templateUrl: './lista-ordenes.html',
  styleUrls: ['./lista-ordenes.css']
})
export class ListaOrdenesComponent implements OnInit {
  orders: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadOrders();

    // 🔔 Refrescar cuando se cree nueva orden
    this.api.orderCreated$.subscribe(() => {
      this.loadOrders();
    });
  }

  loadOrders(): void {
    this.api.getOrders().subscribe({
      next: (data: any[]) => {
        console.log('📦 Órdenes recibidas:', data);
        // 👇 Ya vienen con personName, itemName, etc.
        this.orders = data;
      },
      error: (err) => {
        console.error('❌ Error cargando órdenes:', err);
      }
    });
  }
}
