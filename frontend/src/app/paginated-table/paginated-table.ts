import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { User, UserService } from '../services/user-service';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { Button } from "primeng/button";
import { PaginatorModule } from 'primeng/paginator';
import { AlertService, msgType } from '../services/alert-service';

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: [string, string][];
  };
  links: {
    current: string;
  };
}

@Component({
  selector: 'app-paginated-table',
  imports: [TableModule, CommonModule, TagModule, Button , PaginatorModule],
  templateUrl: './paginated-table.html',
  styleUrl: './paginated-table.css',
})
export class PaginatedTable  {
@Input() users!: PaginatedResponse<User> ;
@Output() pageChanged = new EventEmitter<string>()
  private userService= inject(UserService);
  private alertService = inject(AlertService)

  rows: number = 10
  first: number = 0


  disableUser(id: number) {
    this.userService.disableUser(id).subscribe({
      next: (res : any) => {
         const query = new URLSearchParams({
          page: this.first.toString(),
          limit: this.rows.toString()
  });
        this.pageChanged.emit(query.toString())
          this.alertService.showToast(msgType.SUCCESS , res.message , 'Disabled')

      },
      error: (err :any) => {

        this.alertService.showToast(msgType.ERROR , err.message);
      }
    })
}

restoreUser(id: number) {
 this.userService.restoreUser(id).subscribe({
      next: (res : any) => {
         const query = new URLSearchParams({
          page: this.first.toString(),
          limit: this.rows.toString()
  });
        this.pageChanged.emit(query.toString())
          this.alertService.showToast(msgType.SUCCESS , res.message , 'Restored')

      },
      error: (err :any) => {
        this.alertService.showToast(msgType.ERROR , err.message);
      }
    })
}

deleteUser(id: number) {
   this.userService.deleteUser(id).subscribe({
      next: (res : any) => {
         const query = new URLSearchParams({
          page: this.first.toString(),
          limit: this.rows.toString()
  });
        this.pageChanged.emit(query.toString())
          this.alertService.showToast(msgType.SUCCESS , res.message , 'Deleted!')

      },
      error: (err :any) => {
        this.alertService.showToast(msgType.ERROR , err.message);
      }
    })
}
changePage(event: TableLazyLoadEvent) {

  this.first = event.first ?? 0;
  this.rows = event.rows ?? 10;

  const page = Math.floor(this.first / this.rows) + 1;

  const query = new URLSearchParams({
    page: page.toString(),
    limit: this.rows.toString()
  });

  this.pageChanged.emit(query.toString());
} 
}



