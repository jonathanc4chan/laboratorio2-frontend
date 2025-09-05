import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-nueva-orden',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './nueva-orden.html',
  styleUrls: ['./nueva-orden.css']
})
export class NuevaOrdenComponent implements OnInit {
  persons: any[] = [];
  items: any[] = [];
  selectedPerson: number | null = null;
  selectedItem: number | null = null;
  quantity: number = 1;
  orderDetails: any[] = [];
  editingOrderId: number | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    // Personas
    this.api.getPersons().subscribe((data: any) => {
      this.persons = data;
    });

    // Items
    this.api.getItems().subscribe((data: any) => {
      this.items = data;
    });

    // Si hay orden pendiente para editar
    const orderToEdit = localStorage.getItem('orderToEdit');
    if (orderToEdit) {
      const order = JSON.parse(orderToEdit);
      this.editingOrderId = order.id;
      this.selectedPerson = order.personId;
      this.orderDetails = order.orderDetails.map((d: any) => ({
        itemId: d.itemId,
        quantity: d.quantity,
        price: d.price
      }));
      localStorage.removeItem('orderToEdit');
    }
  }

  addItem() {
    if (!this.selectedItem || this.quantity <= 0) return;

    const item = this.items.find(i => i.id === this.selectedItem);
    if (item) {
      this.orderDetails.push({
        itemId: item.id,
        quantity: this.quantity,
        price: item.price
      });
      this.selectedItem = null; // reset item
      this.quantity = 1;        // reset cantidad
    }
  }

  getItemName(itemId: number): string {
    const item = this.items.find(i => i.id === itemId);
    return item ? item.name : '';
  }

  saveOrder() {
    if (!this.selectedPerson || this.orderDetails.length === 0) {
      alert('Selecciona persona y al menos un item');
      return;
    }

    const order = {
      personId: this.selectedPerson,
      createdAt: new Date(),
      orderDetails: this.orderDetails
    };

    if (this.editingOrderId) {
      this.api.updateOrder(this.editingOrderId, order).subscribe({
        next: () => {
          alert('Orden actualizada con éxito ✅');
          this.resetForm();
          this.api.notifyOrderCreated();
        },
        error: (err) => console.error('❌ Error editando orden:', err)
      });
    } else {
      this.api.createOrder(order).subscribe({
        next: () => {
          alert('Orden creada con éxito ✅');
          this.resetForm();
          this.api.notifyOrderCreated();
        },
        error: (err) => console.error('❌ Error creando orden:', err)
      });
    }
  }

  resetForm() {
    this.selectedPerson = null;
    this.selectedItem = null;
    this.quantity = 1;
    this.orderDetails = [];
    this.editingOrderId = null;
  }
}
