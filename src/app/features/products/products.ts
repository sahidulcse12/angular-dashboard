import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PRODUCTS, PRODUCT_CATEGORIES } from './products.data';

@Component({
  selector: 'app-products',
  imports: [NgFor, NgIf, FormsModule, CurrencyPipe],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  readonly categories = PRODUCT_CATEGORIES;
  readonly products = PRODUCTS;

  searchQuery = signal('');
  selectedCategory = signal('');

  filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const category = this.selectedCategory();

    return this.products.filter(p =>
      (!query || p.name.toLowerCase().includes(query)) &&
      (!category || p.category === category)
    );
  });

  constructor(private route: ActivatedRoute, private router: Router) {
    effect(() => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          search: this.searchQuery() || null,
          category: this.selectedCategory() || null,
        },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    });
  }

  ngOnInit(): void {
    const { search, category } = this.route.snapshot.queryParams;
    if (search) this.searchQuery.set(search);
    if (category) this.selectedCategory.set(category);
  }

  onSearchInput(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  onCategoryChange(event: Event): void {
    this.selectedCategory.set((event.target as HTMLSelectElement).value);
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.selectedCategory.set('');
  }
}

