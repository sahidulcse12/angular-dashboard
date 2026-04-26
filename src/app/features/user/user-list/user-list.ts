import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../shared/models/user.model';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList implements OnInit {
  users = signal<User[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);
  
  // Modal State
  showModal = signal(false);
  newUser: User = { fullName: '', role: '', depSerial: 0 };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.isLoading.set(true);
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load users. Please ensure your local API is running (npm run api).');
        this.isLoading.set(false);
        console.error('API Error:', err);
      }
    });
  }

  deleteUser(id: any): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id.toString()).subscribe({
        next: () => {
          this.users.set(this.users().filter(u => (u.id !== id && u.userId !== id)));
        },
        error: (err) => alert('Failed to delete user.')
      });
    }
  }

  // Create Logic
  openModal() {
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.newUser = { fullName: '', role: '', depSerial: 0 };
  }

  submitUser() {
    console.log('Attempting to save user from List:', this.newUser);
    if (this.newUser.fullName && this.newUser.role) {
      // Generate a simple ID for local use
      const tempId = Math.floor(Math.random() * 100000);
      const userToSave = { ...this.newUser, id: tempId, userId: tempId };

      this.userService.createUser(userToSave).subscribe({
        next: (savedUser) => {
          console.log('User saved successfully:', savedUser);
          this.users.set([...this.users(), savedUser]);
          this.closeModal();
        },
        error: (err) => {
          console.error('API Error:', err);
          alert('Could not save user. Is your API running? \n\nPlease run "npm run api" in a new terminal.');
        }
      });
    } else {
      alert('Please fill in both Name and Role.');
    }
  }
}
