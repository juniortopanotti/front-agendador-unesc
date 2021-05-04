import { UsersDialogComponent } from '../users-dialog/users-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../../services/users/users.service';
import { Users, UsersList } from '../../../models/users.model';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'document',
    'name',
    'role',
    'addres',
    'actions'
  ];
  data: UsersList[] = [];

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private usersService: UsersService, private dialog: MatDialog) {}

  saveUpdateDialog(users): void {
    const dialogRef = this.dialog.open(UsersDialogComponent, {
      width: '800px',
      data: {
        users,
        action: 'PERSIST'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngAfterViewInit();
      }
    });
  }

  ngAfterViewInit() {
    merge(this.paginator.page)
      .pipe(
        startWith({}), // Faz a execucao ser chamada assim que eh carregado o observabe
        switchMap(() => {
          // switch map sempre mantem apenas a ultima requisicao independede de quantas forem feita
          this.isLoadingResults = true;
          return this.usersService.index(
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        })
      )
      .subscribe(
        (data: any) => {
          this.isLoadingResults = false;
          this.resultsLength = data.count;
          this.data = data.rows;
        },
        () => (this.isLoadingResults = false)
      );
  }
}
