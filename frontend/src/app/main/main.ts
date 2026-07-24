import { Component } from '@angular/core';
import { ControllBar } from "../controll-bar/controll-bar";

@Component({
  selector: 'app-main',
  imports: [ControllBar],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {}
