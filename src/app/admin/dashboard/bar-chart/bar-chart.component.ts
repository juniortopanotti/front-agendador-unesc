import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels: string[] = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012'
  ];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Atendido' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Cancelado' }
  ];
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
