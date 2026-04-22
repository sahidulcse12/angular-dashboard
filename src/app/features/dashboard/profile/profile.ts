import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  userName: string = 'Sahidul Islam';
  email: string = 'sahidul@example.com';
  role: string = 'Full Stack Developer';
  joinDate: string = 'January 2024';
}
