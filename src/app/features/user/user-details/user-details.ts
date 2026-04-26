import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-user-details',
  imports: [CommonModule],
  templateUrl: './user-details.html',
  styleUrl: './user-details.css',
})
export class UserDetails implements OnInit {
  user = signal<User | null>(null);
  isLoading = signal<boolean>(true);

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchUserDetails(id);
      }
    });
  }

  fetchUserDetails(id: string): void {
    this.isLoading.set(true);
    this.userService.getUserById(id).subscribe({
      next: (userData) => {
        this.user.set(userData || null);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching user:', err);
        this.isLoading.set(false);
      }
    });
  }
}
