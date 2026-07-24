import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  IsLoggedIn() : boolean {
    const id = sessionStorage.getItem('user');
    return !!id;
  }

}
