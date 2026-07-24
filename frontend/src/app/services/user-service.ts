import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env/env';
import { FormGroup } from '@angular/forms';

interface User {
  id: number,
  fullName: string,
  email: string,
  createAt: Date,
  deletedAt: Date | null ,
}

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private http = inject(HttpClient)


 register(userData: any) {
  const response =
    this.http.post(
      `${environment.apiUrl}/user/create`,
      userData
    )
  return response;

}
getUsers(): Observable<object>{
  return this.http.get(`${environment.apiUrl}/user/find/all?page=1&limit=10`);
}

login(form: any): Observable<User | null>{
  return this.http.post<User>(`${environment.apiUrl}/user/login`,
    { email: form.email , password: form.password}
  );
}


}
