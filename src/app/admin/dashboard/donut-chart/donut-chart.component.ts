import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit {
  doughnutChartLabels: string[] = [
    'Cancelado',
    'Atendido',
    'Não atendido'
  ];
  doughnutChartData = [350, 450, 100];
  doughnutChartType = 'doughnut';

  constructor() {}

  ngOnInit() {}
  chartClicked(e: any): void {
    console.log(e.active);
    console.log(e.event);
  }

  chartHovered(e: any): void {
    console.log(e);
  }
}
