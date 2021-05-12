import { StatsService } from './../../../services/stats/stats.service';
import { map } from 'rxjs/operators';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';
import * as moment from 'moment';

@Component({
  selector: 'app-hydrometers',
  templateUrl: './hydrometers.component.html',
  styleUrls: ['./hydrometers.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'LL'
        },
        display: {
          dateInput: 'MMMM YYYY', // this is the format showing on the input element
          monthYearLabel: 'MMMM YYYY' // this is showing on the calendar
        }
      }
    }
  ]
})
export class HydrometersComponent implements AfterViewInit {
  @ViewChild('dayPicker', { static: false }) datePickerElement = MatDatepicker;
  @ViewChild('yearPicker', { static: false })
  dateYearPickerElement = MatDatepicker;

  hydrometer: string = '';

  month = new FormControl('');
  year = new FormControl('');

  consumoMensalData: any = [];
  consumoMensalTotal: any = 0;

  consumoDiarioData: any = [];
  consumoDiarioTotal: any = 0;

  consumoAnualData: any = [];
  consumoAnualTotal: any = 0;

  dayChartData: Array<any> = [{ data: [], label: 'Consumo/mL' }];
  dayChartLabels: Array<any> = [];

  monthChartData: Array<any> = [{ data: [], label: 'Consumo/mL' }];
  monthChartLabels: Array<any> = [];

  yearChartData: Array<any> = [{ data: [], label: 'Consumo/mL' }];
  yearChartLabels: Array<any> = [];

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

  constructor(
    private route: ActivatedRoute,
    public statsService: StatsService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.datePickerElement['_datepickerInput']._dateFormats = {
        parse: {
          dateInput: 'LL'
        },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'DD/MM/YYYY'
        }
      };

      this.dateYearPickerElement['_datepickerInput']._dateFormats = {
        parse: {
          dateInput: 'LL'
        },
        display: {
          dateInput: 'YYYY',
          monthYearLabel: 'YYYY'
        }
      };
    }, 1000);
  }

  ngAfterViewInit() {
    this.route.paramMap.subscribe(params => {
      this.hydrometer = params.get('hydrometer');
    });
  }

  consumptionDayDpChange(event: any): void {
    const data = event.value;
    const parsedDate = data.format('YYYY-MM-DD');
    console.log(this.hydrometer);

    this.statsService
      .consumptionDayHour(parsedDate, parsedDate, this.hydrometer)
      .subscribe(res => {
        this.consumoDiarioTotal = 0;
        this.dayChartData[0].data = [];
        this.dayChartLabels = [];
        this.consumoDiarioData = res;
        res.forEach(res => {
          this.consumoDiarioTotal += res.totalConsumption;
          this.dayChartData[0].data.push(res.totalConsumption);
          this.dayChartLabels.push(res._id.hour);
        });
      });
  }

  consumptionMonthDpChange(month: any): void {
    const data = month;
    const startDate = data.startOf('month').format('YYYY-MM-DD');
    const endDate = data.endOf('month').format('YYYY-MM-DD');

    this.statsService
      .consumptionDay(startDate, endDate, this.hydrometer)
      .subscribe(res => {
        this.consumoMensalTotal = 0;
        this.monthChartData[0].data = [];
        this.monthChartLabels = [];
        this.consumoMensalData = res;
        res.forEach(res => {
          this.consumoMensalTotal += res.totalConsumption;
          this.monthChartData[0].data.push(res.totalConsumption);
          this.monthChartLabels.push(res._id.day);
        });
      });
  }

  consumptionYearDpChange(year: any): void {
    const data = year;
    const startDate = data.startOf('year').format('YYYY-MM-DD');
    const endDate = data.endOf('year').format('YYYY-MM-DD');

    console.log(startDate, endDate);
    this.statsService
      .consumptionMonth(startDate, endDate, this.hydrometer)
      .subscribe(res => {
        this.consumoAnualTotal = 0;
        this.yearChartData[0].data = [];
        this.yearChartLabels = [];
        this.consumoAnualData = res;
        res.forEach(res => {
          this.consumoAnualTotal += res.totalConsumption;
          this.yearChartData[0].data.push(res.totalConsumption);
          this.yearChartLabels.push(this.meses[res._id.month - 1]);
        });
      });
  }

  chosenYearPickerHandler(
    normalizedYear: moment.Moment,
    datepicker: MatDatepicker<moment.Moment>
  ) {
    const ctrlValue = moment();
    ctrlValue.year(normalizedYear.year());
    this.year.setValue(ctrlValue);
    this.consumptionYearDpChange(ctrlValue);
    datepicker.close();
  }

  chosenYearHandler(normalizedYear: moment.Moment) {
    const ctrlValue = moment();
    ctrlValue.year(normalizedYear.year());
    this.month.setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonth: moment.Moment,
    datepicker: MatDatepicker<moment.Moment>
  ) {
    const ctrlValue = this.month.value;
    ctrlValue.month(normalizedMonth.month());
    this.month.setValue(ctrlValue);
    this.consumptionMonthDpChange(ctrlValue);
    datepicker.close();
  }
}
