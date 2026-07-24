import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { Header } from "./header/header";
import { ControllBar } from "./controll-bar/controll-bar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, Header, ControllBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {


  protected readonly title = signal('frontend');
}
