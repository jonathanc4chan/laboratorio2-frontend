import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // 👈 para ngModel
import { CommonModule } from '@angular/common'; // 👈 para *ngIf
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true, // 👈 importante
  imports: [FormsModule, CommonModule], // 👈 agrega lo que falta
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  loading = false; // 👈 ahora sí existe

  constructor(private auth: AuthService, private router: Router) {}

  login(): void {
    this.error = '';
    this.loading = true;

    this.auth.login(this.username, this.password).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res.success && res.token) {
          this.auth.setToken(res.token);
          this.router.navigate(['/lista-ordenes']);
        } else {
          this.error = res.message;
        }
      },
      error: () => {
        this.loading = false;
        this.error = 'Error al conectar con el servidor';
      }
    });
  }
}
