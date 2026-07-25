import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import {  PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CenterContainer } from '../center-container/center-container';
import { UserService } from '../services/user-service';
import { Router, RouterLink } from "@angular/router";
import {  NgClass } from '@angular/common';
import { AlertService, msgType } from '../services/alert-service';


@Component({
  selector: 'app-register',
  imports: [
    CenterContainer,
    CardModule,
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
private fb = inject(FormBuilder);
  constructor(
    private userService : UserService,
    private alertService : AlertService,
    private router : Router ,
  ){}

  registerForm = this.fb.group({
    fullName: ['' , [Validators.required]],
    email: ['' ,[Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  get email(){
    return this.registerForm.get('email');
  }
   get fullName(){
    return this.registerForm.get('fullName');
  }
   get password(){
    return this.registerForm.get('password');
  }



  register() {
      if (this.registerForm.invalid) {
          this.registerForm.markAllAsTouched();
          return;
        }
      this.userService.register(this.registerForm.value)
      .subscribe({
        next: (response: any) => {
            this.alertService.showToast(msgType.SUCCESS , response.message , 'User created')
            this.router.navigate(['/main']);
            sessionStorage.setItem('user' , response.id);
        },
        error: (error) => {
          this.alertService.showToast(msgType.ERROR , error.error.message[0] , 'Error')
        }
      });
    }


}
