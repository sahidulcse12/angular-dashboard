import { Product } from '../../shared/models/product.model';

export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Kitchen',
  'Sports',
];

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 79.99, image: '🎧', rating: 4.5 },
  { id: 2, name: 'Running Shoes', category: 'Sports', price: 129.99, image: '👟', rating: 4.8 },
  { id: 3, name: 'Cotton T-Shirt', category: 'Clothing', price: 24.99, image: '👕', rating: 4.2 },
  { id: 4, name: 'JavaScript: The Good Parts', category: 'Books', price: 34.99, image: '📘', rating: 4.7 },
  { id: 5, name: 'Smart Watch', category: 'Electronics', price: 199.99, image: '⌚', rating: 4.6 },
  { id: 6, name: 'Yoga Mat', category: 'Sports', price: 39.99, image: '🧘', rating: 4.3 },
  { id: 7, name: 'Coffee Maker', category: 'Home & Kitchen', price: 89.99, image: '☕', rating: 4.4 },
  { id: 8, name: 'Winter Jacket', category: 'Clothing', price: 149.99, image: '🧥', rating: 4.1 },
  { id: 9, name: 'Bluetooth Speaker', category: 'Electronics', price: 59.99, image: '🔊', rating: 4.3 },
  { id: 10, name: 'Clean Code', category: 'Books', price: 42.99, image: '📗', rating: 4.9 },
  { id: 11, name: 'Blender', category: 'Home & Kitchen', price: 69.99, image: '🍹', rating: 4.0 },
  { id: 12, name: 'Basketball', category: 'Sports', price: 29.99, image: '🏀', rating: 4.5 },
];
