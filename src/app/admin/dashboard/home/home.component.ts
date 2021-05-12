import { StatsService } from './../../../services/stats/stats.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  date = new Date();
  y = this.date.getFullYear();
  m = this.date.getMonth();
  consumoGeralMensal = 0;
  hidrometrosAtivos = 0;
  hidrometrosInativos = 0;
  usuarios = 0;
  meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];

  lineChartData: Array<any> = [{ data: [], label: 'Consumo/mL' }];

  lineChartLabels: Array<any> = [];
  lineChartOptions: any = {
    responsive: true
  };
  lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  lineChartLegend = true;
  lineChartType = 'line';

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    const startDate = new Date(this.y, this.m, 1)
      .toISOString()
      .substring(0, 10);
    const endDate = new Date(this.y, this.m + 1, 0)
      .toISOString()
      .substring(0, 10);

    console.log(startDate, endDate);

    this.statsService.counter().subscribe((res: any) => {
      this.hidrometrosAtivos = res.hidrometrosAtivos;
      this.hidrometrosInativos = res.hidrometrosInativos;
      this.usuarios = res.usuarios;
    });

    this.statsService.consumptionDay(startDate, endDate).subscribe(res => {
      console.log(res);
      res.forEach(it => {
        this.lineChartData[0].data.push(it.totalConsumption);
        this.lineChartLabels.push(it._id.day);
        this.consumoGeralMensal += it.totalConsumption;
      });
    });
  }
}
