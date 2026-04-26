import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  title = signal('Welcome to Home Page');
  allUsers = signal<User[]>([]);
  searchQuery = signal('');
  showAll = signal(false);
  isLoading = signal(true);

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
