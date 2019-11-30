import { AtividadeService } from './../../../services/atividade/atividade.service';
import { AtividadeList } from './../../../models/atividade.model';
import { MatDialog } from '@angular/material/dialog';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { MatSort } from '@angular/material/sort';

import { merge } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-atividade-list',
  templateUrl: './atividade-list.component.html',
  styleUrls: ['./atividade-list.component.scss']
})
export class AtividadeListComponent implements AfterViewInit {
  displayedColumns: string[] = ['nome', 'actions'];
  data: AtividadeList;

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private atividadeService: AtividadeService,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.atividadeService.index(
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
