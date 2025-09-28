import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderDetail {
  itemName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: number;
  personName: string;     // 👈 lo usas en la tabla
  createdAt: string;
  orderDetails: OrderDetail[];
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = 'http://localhost:5115/api/orders'; // 👈 asegúrate que tu backend use esta ruta

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
