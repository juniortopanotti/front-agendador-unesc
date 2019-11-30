import { CursoDialogComponent } from './../curso-dialog/curso-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CursoService } from './../../../services/curso/curso.service';
import { Curso, CursoList } from './../../../models/curso.model';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.scss']
})
export class CursoListComponent implements AfterViewInit {
  displayedColumns: string[] = ['nome', 'actions'];
  data: CursoList[] = [];

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private cursoService: CursoService, private dialog: MatDialog) {}

  saveUpdateDialog(curso): void {
    const dialogRef = this.dialog.open(CursoDialogComponent, {
      width: '500px',
      data: {
        curso,
        action: 'PERSIST'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngAfterViewInit();
      }
    });
  }

  deleteDialog(curso): void {
    const dialogRef = this.dialog.open(CursoDialogComponent, {
      width: '500px',
      data: {
        curso,
        action: 'DELETE'
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
          return this.cursoService.index(
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
