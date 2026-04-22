import { Component } from '@angular/core';
import { CanLeave } from '../../../shared/models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone:true,
  imports:[FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements CanLeave {
  userName: string = 'Sahidul Islam';
  email: string = 'sahidul@example.com';
  role: string = 'Full Stack Developer';
  joinDate: string = 'January 2024';

  isDirty : boolean =false;

  onChange() : void{
    this.isDirty=true;
  }

   onSave(): void {
    this.isDirty = false;
    alert("Profile saved!");
  }

  canLeave(): boolean{
    if(!this.isDirty){
      return true;
    }
    return confirm("You have unsaved changes. Leave?");
  }
}
