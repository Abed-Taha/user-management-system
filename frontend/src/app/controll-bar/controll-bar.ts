import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { FloatLabel } from "primeng/floatlabel";
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { Button } from "primeng/button";
import { User, UserService } from '../services/user-service';
import { AlertService, msgType } from '../services/alert-service';
import { PaginatedResponse } from '../paginated-table/paginated-table';

@Component({
  selector: 'app-controll-bar',
  imports: [PanelModule, FloatLabel, InputTextModule, SelectButtonModule, CommonModule, Button],
  templateUrl: './controll-bar.html',
  styleUrl: './controll-bar.css',
})
export class ControllBar implements OnInit{
  private userService = inject(UserService);
  private alertService = inject(AlertService)
  protected sortDirection ='ASC';
  @Output() paginatedUser = new EventEmitter<PaginatedResponse<User>>();

  searchForm = {
    status: '$null',
    orderBy: 'ASC',
    search: '',
    sortBy: 'createdAt'
  }

  userStateOptions: any[]= [
    {label : 'Disabled' , value : '$not:$null'},
    {label : 'Active' , value: '$null'},
  ]

    ngOnInit(): void {
    this.userService.getUsers("").subscribe({
      next: res => {
        console.log(res);
        this.paginatedUser.emit(res) ;
      }
    })
  }


toggleSort() {
  this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
}

fetch() {

  const params = new URLSearchParams();

  if (this.searchForm.search.trim()) {
    params.append('search', this.searchForm.search.trim());
  }

  params.append(
    'filter.deletedAt',
    this.searchForm.status
  );

  params.append(
    'sortBy',
    `${this.searchForm.sortBy}:${this.searchForm.orderBy}`
  );

  this.userService.getUsers(params.toString()).subscribe({
    next: (response) => {
      this.paginatedUser.emit(response);
    },
    error: (err) => {
      this.alertService.showToast(msgType.ERROR , 'Error while fetching Data' , 'Error')
    }
  });
}

handleSearch(e:any){
  this.searchForm.search = e.target.value;
  this.fetch();
}

handleToggleStatus(e:any) {
  this.searchForm.status = e.value;
  this.fetch();
}

handleToggleSort() {
  this.searchForm.orderBy =
    this.searchForm.orderBy === 'ASC' ? 'DESC' : 'ASC';

  this.sortDirection = this.searchForm.orderBy ;
  this.fetch();
}



}
