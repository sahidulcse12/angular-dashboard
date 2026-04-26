import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://contentapi.bdjobs.com/api/SourcePerson';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: string): Observable<User | undefined> {
    return this.getUsers().pipe(
      map(users => users.find(u => (u.userId?.toString() === id) || (u.id?.toString() === id)))
    );
  }
}
