import { inject, Injectable } from '@angular/core';
import { User } from './user-service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env/env';
import { BehaviorSubject, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient)

  private userSubject = new BehaviorSubject<User |null>(null);
  user$ = this.userSubject.asObservable();


  IsLoggedIn() : boolean {
    const id = sessionStorage.getItem('user');
    return !!id;
  }

  getUserInfo(id: number): Observable<User | null>{
    if (!id) {
      return of(null);
    }
    return this.http.get<User>(`${environment.apiUrl}/user/${id}`);
  }

  getCurrentUser(): Observable<User | null> {
    const id = Number(sessionStorage.getItem('user'));
    return id ? this.getUserInfo(id) : of(null);
  }

}
