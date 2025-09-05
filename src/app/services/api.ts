import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5115/api'; // ⚠️ cambia el puerto si tu backend usa otro

  private orderCreatedSource = new Subject<void>();
  orderCreated$ = this.orderCreatedSource.asObservable();

  constructor(private http: HttpClient) {}

  // Personas
  getPersons(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/persons`);
  }

  // Items
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/items`);
  }

  // Orders
  createOrder(order: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/orders`, order);
  }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/orders`);
  }

  // 🗑️ Eliminar orden
  deleteOrder(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/orders/${id}`);
  }
updateOrder(id: number, order: any): Observable<any> {
  return this.http.put<any>(`${this.baseUrl}/orders/${id}`, order);
}
  // Notificación cuando se crea una orden
  notifyOrderCreated() {
    this.orderCreatedSource.next();
  }
}
