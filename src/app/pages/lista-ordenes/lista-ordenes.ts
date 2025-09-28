import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';

// 👇 Interfaces para tipado fuerte
export interface OrderDetail {
  itemName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: number;
  personName: string;
  createdAt: string;
  orderDetails: OrderDetail[];   // 👈 corregido
}

@Component({
  selector: 'app-lista-ordenes',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatListModule],
  templateUrl: './lista-ordenes.html',
  styleUrls: ['./lista-ordenes.css']
})
export class ListaOrdenesComponent implements OnInit {
  orders: Order[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadOrders();

    // 🔄 Recarga la lista cuando se crea una nueva orden
    this.api.orderCreated$.subscribe(() => {
      this.loadOrders();
    });
  }

  loadOrders(): void {
    this.api.getOrders().subscribe({
      next: (data: Order[]) => {
        this.orders = data;
      },
      error: (err) => {
        console.error('❌ Error cargando órdenes:', err);
      }
    });
  }

  // ✏️ Editar orden
  editOrder(order: Order): void {
    localStorage.setItem('orderToEdit', JSON.stringify(order));
    this.router.navigate(['/nueva-orden']);
  }

  // ➕ Nueva orden
  goToNewOrder(): void {
    this.router.navigate(['/nueva-orden']);
  }

  // 🗑️ Eliminar orden
  deleteOrder(orderId: number): void {
    if (confirm('¿Seguro que quieres eliminar esta orden?')) {
      this.api.deleteOrder(orderId).subscribe({
        next: () => {
          this.orders = this.orders.filter(o => o.id !== orderId);
          alert('Orden eliminada con éxito ✅');
        },
        error: (err) => {
          console.error('❌ Error eliminando orden:', err);
          alert('No se pudo eliminar la orden');
        }
      });
    }
  }
}
