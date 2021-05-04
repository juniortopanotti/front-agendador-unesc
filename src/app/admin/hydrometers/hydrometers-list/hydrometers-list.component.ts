import { HydrometersDialogComponent } from '../hydrometers-dialog/hydrometers-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HydrometersService } from '../../../services/hydrometers/hydrometers.service';
import {
  Hydrometers,
  HydrometersList
} from '../../../models/hydrometers.model';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hydrometers-list',
  templateUrl: './hydrometers-list.component.html',
  styleUrls: ['./hydrometers-list.component.scss']
})
export class HydrometersListComponent implements AfterViewInit {
  displayedColumns: string[] = ['ccid', 'name', 'status', 'actions'];
  data: HydrometersList[] = [];

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private hydrometersService: HydrometersService,
    private dialog: MatDialog
  ) {}

  saveUpdateDialog(hydrometers): void {
    const dialogRef = this.dialog.open(HydrometersDialogComponent, {
      width: '800px',
      data: {
        hydrometers,
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
          return this.hydrometersService.index(
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
