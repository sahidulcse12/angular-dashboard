import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../shared/models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './user-details.html',
  styleUrl: './user-details.css',
})
export class UserDetails implements OnInit {
  user = signal<User | null>(null);
  editUser: User = {}; // Object for form binding
  isLoading = signal<boolean>(true);
  isEditMode = signal<boolean>(false);

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

  toggleEdit() {
    if (!this.isEditMode()) {
      // Clone user data into edit object
      this.editUser = { ...this.user() };
    }
    this.isEditMode.set(!this.isEditMode());
  }

  saveChanges() {
    const id = (this.editUser.id || this.editUser.userId)?.toString();
    if (id) {
      this.userService.updateUser(id, this.editUser).subscribe({
        next: (updated) => {
          this.user.set(updated);
          this.isEditMode.set(false);
          alert('User updated successfully!');
        },
        error: (err) => alert('Error updating user. Is your API running?')
      });
    }
  }
}
