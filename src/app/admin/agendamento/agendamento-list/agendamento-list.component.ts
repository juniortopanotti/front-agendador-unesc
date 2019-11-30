import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';

@Component({
  selector: 'app-agendamento-list',
  templateUrl: './agendamento-list.component.html',
  styleUrls: ['./agendamento-list.component.scss']
})
export class AgendamentoListComponent {
  viewDate: Date = new Date();

  locale = 'pt';

  // .events <Array> = [
  //     {
  //       title: 'Increments badge total on the day cell',
  //       color: 'red',
  //       start: new Date(),
  //       meta: {
  //         incrementsBadgeTotal: true
  //       }
  //     },
  //     {
  //       title: 'Does not increment the badge total on the day cell',
  //       color:  'blue',
  //       start: new Date(),
  //       meta: {
  //         incrementsBadgeTotal: false
  //       }
  //     }
  //   ];

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      day.badgeTotal = day.events.filter(
        event => event.meta.incrementsBadgeTotal
      ).length;
    });
  }
}
