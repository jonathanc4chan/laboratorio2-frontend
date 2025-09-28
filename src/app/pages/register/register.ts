import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,   // 👈 importante para standalone
  imports: [CommonModule, FormsModule],  // 👈 habilita ngIf y ngModel
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  role = 'User';
  error = '';
  success = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  register(): void {
    this.error = '';
    this.success = '';
    this.loading = true;

    this.auth.register(this.username, this.password, this.role).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.success = res.message;
          setTimeout(() => this.router.navigate(['/login']), 2000);
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
