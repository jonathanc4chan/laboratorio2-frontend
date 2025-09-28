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
  details: OrderDetail[];   // 👈 aquí está la clave
}
