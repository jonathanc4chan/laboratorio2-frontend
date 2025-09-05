import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router'; // 👈 importar

@Component({
  selector: 'app-lista-ordenes',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatListModule],
  templateUrl: './lista-ordenes.html',
  styleUrls: ['./lista-ordenes.css']
})
export class ListaOrdenesComponent implements OnInit {
  orders: any[] = [];

  constructor(private api: ApiService, private router: Router) {} // 👈 inyectar router

  ngOnInit(): void {
    this.loadOrders();

    this.api.orderCreated$.subscribe(() => {
      this.loadOrders();
    });
  }

  loadOrders(): void {
    this.api.getOrders().subscribe({
      next: (data: any[]) => {
        this.orders = data;
      },
      error: (err) => {
        console.error('❌ Error cargando órdenes:', err);
      }
    });
  }

  // ✏️ Editar orden
  editOrder(order: any): void {
    localStorage.setItem('orderToEdit', JSON.stringify(order));
    this.router.navigate(['/nueva-orden']); // 👈 redirigir al formulario
  }

  // ➕ Nueva orden
  goToNewOrder(): void {
    this.router.navigate(['/nueva-orden']); // 👈 redirigir a nueva orden
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
