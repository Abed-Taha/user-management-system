import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ControllBar } from "../controll-bar/controll-bar";
import { Panel } from "primeng/panel";
import { PaginatedResponse, PaginatedTable } from '../paginated-table/paginated-table';
import { User, UserService } from '../services/user-service';

@Component({
  selector: 'app-main',
  imports: [ControllBar, Panel,PaginatedTable ],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {

  users!: PaginatedResponse<User> ;
  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef)

  handleUsers(value:any){
    this.users = value;
  }

  paginatedChanged(event: string){
    this.userService.getUsers(event).subscribe({
      next: res => {

        this.users = res
        this.cdr.detectChanges();
      },
      error: err =>console.error(err)
    })
  }
}
