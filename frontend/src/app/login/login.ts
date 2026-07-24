import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CenterContainer } from "../center-container/center-container";

@Component({
  selector: 'app-login',
  imports: [CardModule, CenterContainer],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
