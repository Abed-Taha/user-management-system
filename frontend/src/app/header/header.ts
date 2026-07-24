import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { User } from '../services/user-service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router, RouterLink } from "@angular/router";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink ,ButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private authService = inject(AuthService);
  private router = inject(Router);

 user$?: Observable<User | null> ;
 ngOnInit(){
  this.user$ = this.authService.getCurrentUser();
 }

  isUser(): boolean {
    return this.authService.IsLoggedIn();
  }

  logout() {
    sessionStorage.removeItem('user');
    this.ngOnInit();
    this.router.navigate(['/login']);
  }
}
