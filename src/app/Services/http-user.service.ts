import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from 'models/User';

@Injectable({
  providedIn: 'root'
})
export class HttpUserService {
  private REST_API_SERVER = 'https://96lxj2-8080.csb.app/';
  // private REST_API_SERVER = 'https://localhost:7075/api';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public register(user: User): Observable<any> {
    const url = `${this.REST_API_SERVER}/users`;

    // Step 1: Get current users to find the max id
    return this.httpClient.get<User[]>(url).pipe(
      switchMap(users => {
        // Step 2: Calculate the new id
        let maxId = 0;
        if (users && users.length > 0) {
          maxId = Math.max(...users.map(u => u.id));
        }
        const newId = maxId + 1;
        
        // Assign the new id to the user object
        user.id = newId;

        // Step 3: POST request to register the user
        return this.httpClient.post<any>(url, user, this.httpOptions).pipe(
          catchError((error) => {
            console.error('Error registering user:', error);
            throw error;
          })
        );
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('https://96lxj2-8080.csb.app/users');
  }

  login(username: string, password: string): Observable<any> {
    return this.getUsers().pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          return { success: true, msg: 'Successfully logged in' };
        } else {
          return { success: false, msg: 'Invalid username or password' };
        }
      })
    );
  }
}
