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
  private cdr = inject(ChangeDetectorRef)
  private userSer= inject(UserService);

  rows: number = 10
  first: number = 0


  disableUser(id: number) {
  console.log('Disable user:', id);
  // call API
}

restoreUser(id: number) {
  console.log('Restore user:', id);
  // call API
}

deleteUser(id: number) {
  console.log('Delete user:', id);
  // call API
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



