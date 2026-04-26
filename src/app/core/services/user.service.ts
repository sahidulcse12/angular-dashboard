import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Use local json-server URL for File-based CRUD
  private apiUrl = 'http://localhost:3000/users'; 
  
  // External API (Read-only)
  private externalApiUrl = 'https://contentapi.bdjobs.com/api/SourcePerson';

  constructor(private http: HttpClient) {}

  // READ ALL
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // READ ONE (Enhanced for robustness)
  getUserById(id: string): Observable<User | undefined> {
    // Try direct ID lookup first
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => {
        // If direct lookup fails, search the whole list by any ID field
        return this.getUsers().pipe(
          map(users => users.find(u => 
            u.id?.toString() === id || 
            u.userId?.toString() === id
          ))
        );
      })
    );
  }

  // CREATE
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // UPDATE
  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  // DELETE
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
