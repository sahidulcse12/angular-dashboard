import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Login } from './features/login/login';
import { NotFound } from './shared/components/not-found/not-found';
import { authGuard } from './core/guards/auth.guard';
import { UserDetails } from './features/user/user-details/user-details';
import { Products } from './features/products/products';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'products', component: Products },
  { path: 'user/:id', component: UserDetails },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then(m => m.dashboardRoutes)
  },
  { path: '**', component: NotFound }
];
