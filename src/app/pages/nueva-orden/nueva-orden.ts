import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// 👉 Importar Angular Material
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
    // 👇 Material
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

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    // 👇 Adaptamos nombres correctos desde el backend
    this.api.getPersons().subscribe((data: any) => {
      this.persons = data.map((p: any) => ({
        id: p.id,
        name: p.fullName   // backend → "FullName"
      }));
    });

    this.api.getItems().subscribe((data: any) => {
      this.items = data.map((i: any) => ({
        id: i.id,
        name: i.name,      // backend → "Name"
        price: i.price     // backend → "Price"
      }));
    });
  }

  addItem() {
    if (this.selectedItem && this.quantity > 0) {
      const item = this.items.find((i) => i.id === this.selectedItem);
      if (item) {
        this.orderDetails.push({
          itemId: item.id,
          quantity: this.quantity,
          price: item.price
        });
      }
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

    this.api.createOrder(order).subscribe({
      next: () => {
        alert('Orden creada con éxito!');
        this.orderDetails = [];
        this.api.notifyOrderCreated();
      },
      error: (err: any) => console.error(err)
    });
  }
}
