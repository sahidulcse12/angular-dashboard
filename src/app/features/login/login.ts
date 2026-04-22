import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLogin(): void {
   if (this.username === 'admin' && this.password === '1234') {
      
    localStorage.setItem('isLoggedIn', 'true');

    console.log('Login success');

    this.router.navigate(['/dashboard']);
  }
  }
}
