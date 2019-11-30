import {Component, ViewChild, AfterViewInit} from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Romulo', weight: 'Assistente do Roger', symbol: 'H'},
  {position: 2, name: 'Gilberto', weight: 'Monitorando', symbol: 'He'},
  {position: 3, name: 'José', weight: 'Monitorando', symbol: 'Li'},
  {position: 4, name: 'Jackson', weight: 'Assistente do Roger', symbol: 'Be'},
  {position: 5, name: 'Ana', weight: 'Analista', symbol: 'B'},
  {position: 6, name: 'Gabriel', weight: 'Monitorando', symbol: 'C'},
  {position: 7, name: 'Bruno', weight: 'Analista', symbol: 'N'},
  {position: 8, name: 'Roger Vieira', weight: 'Administrador', symbol: 'N'},
];

/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent {


  constructor() {}

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

}
