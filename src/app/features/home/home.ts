import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../core/services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  title = signal('Welcome to Home Page');
  allUsers = signal<User[]>([]);
  searchQuery = signal('');
  showAll = signal(false);
  isLoading = signal(true);

  // Modal State
  showModal = signal(false);
  newUser: User = { fullName: '', role: '', depSerial: 0 };

  filteredUsers = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.allUsers();
    return this.allUsers().filter(u => 
      u.fullName?.toLowerCase().includes(query) || 
      u.name?.toLowerCase().includes(query) ||
      u.userId?.toString().includes(query) ||
      u.id?.toString().includes(query)
    );
  });

  displayedUsers = computed(() => {
    return this.showAll() || this.searchQuery() ? this.filteredUsers() : this.filteredUsers().slice(0, 12);
  });

  hasMore = computed(() => {
    return this.filteredUsers().length > 12 && !this.showAll() && !this.searchQuery();
  });

  constructor(private userService: UserService) {}

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  deleteUser(event: Event, id: any): void {
    event.preventDefault();
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id.toString()).subscribe({
        next: () => {
          this.allUsers.set(this.allUsers().filter(u => u.id !== id && u.userId !== id));
        },
        error: (err) => alert('Failed to delete user.')
      });
    }
  }

  // Create Modal Methods
  openModal() {
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.newUser = { fullName: '', role: '', depSerial: 0 };
  }

  submitUser() {
    console.log('Attempting to save user:', this.newUser);
    if (this.newUser.fullName && this.newUser.role) {
      const tempId = Math.floor(Math.random() * 100000);
      const userToSave = { ...this.newUser, id: tempId, userId: tempId };

      this.userService.createUser(userToSave).subscribe({
        next: (savedUser) => {
          console.log('User saved successfully:', savedUser);
          this.allUsers.set([...this.allUsers(), savedUser]);
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

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.allUsers.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('API Error:', err);
        this.isLoading.set(false);
      }
    });
  }

  loadMore(): void {
    this.showAll.set(true);
  }

  message(): string {
    return 'This is Angular Routing Demo Application';
  }
}
