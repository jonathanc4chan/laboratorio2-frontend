import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequestDto {
  username: string;
  password: string;
}

export interface LoginResponseDto {
  success: boolean;
  message: string;
  token?: string;
}

export interface RegisterRequestDto {
  username: string;
  password: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5115/api/auth'; // 👈 cambia si tu backend usa otro puerto

  constructor(private http: HttpClient) {}

  // 🔑 Login
  login(username: string, password: string): Observable<LoginResponseDto> {
    const body: LoginRequestDto = { username, password };
    return this.http.post<LoginResponseDto>(`${this.apiUrl}/login`, body);
  }

  // 🆕 Registro
  register(username: string, password: string, role: string = 'User'): Observable<LoginResponseDto> {
    const body: RegisterRequestDto = { username, password, role };
    return this.http.post<LoginResponseDto>(`${this.apiUrl}/register`, body);
  }

  // ✅ Guardar token
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // 🔍 Obtener token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // 🚪 Logout
  logout(): void {
    localStorage.removeItem('token');
  }

  // ✔️ Verificar si está logueado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
