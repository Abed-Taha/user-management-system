import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CenterContainer } from "../center-container/center-container";
import { Router, RouterLink } from "@angular/router";
import { UserService } from '../services/user-service';
import { AlertService, msgType } from '../services/alert-service';

@Component({
  selector: 'app-login',
  imports: [
    CardModule,
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    CenterContainer,
    RouterLink,
    ReactiveFormsModule
],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  constructor(
    private userService : UserService,
    private alertService: AlertService,
    private router : Router
  ){}

  loginForm = this.fb.group({
    email: ['', [ Validators.required, Validators.email ]],
    password:['', [ Validators.required ]],
  })
   login() {
    if(this.loginForm.invalid){
      this.loginForm.markAsTouched();
      this.alertService.showToast(msgType.WARN , 'Recheck Your info!' , 'Incorrect prompt!')
      return
    }
    this.userService.login(this.loginForm.value)
      .subscribe({
        next : (response: any) => {
          this.alertService.showToast(msgType.SUCCESS , response.message, 'LoggedIn success!');
          sessionStorage.setItem('user' , response.data.id);
          this.router.navigate(['/main']);
        },
        error: (err:any) => {
          this.alertService.showToast(msgType.ERROR , err.error.message, 'Error');
        }
      })

}

get email() {
  return this.loginForm.get('email');
}

get password(){
  return this.loginForm.get('password');
}

}
