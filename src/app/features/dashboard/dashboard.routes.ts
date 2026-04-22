import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard';
import { Profile } from './profile/profile';
import { Settings } from './settings/settings';
import { LeaveGuard } from '../../core/guards/leave.guard';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: Dashboard,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { 
        path: 'profile', 
        component: Profile,
        canDeactivate:[LeaveGuard]
       },
      { path: 'settings', component: Settings }
    ]
  }
];
