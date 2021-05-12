import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { HydrometersComponent } from './hydrometers/hydrometers.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HydrometersDialogComponent } from './hydrometers-dialog/hydrometers-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HydrometersRoutingModule } from './hydrometers-routing.module';
import { HydrometersListComponent } from './hydrometers-list/hydrometers-list.component';
import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatList,
  MatSlideToggle,
  MatSlideToggleModule
} from '@angular/material';

import { ChartsModule as Ng2Charts } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    HydrometersRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatCardModule,
    MatSortModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatTabsModule,
    MatDatepickerModule,
    MatListModule,
    Ng2Charts
  ],
  declarations: [
    HydrometersListComponent,
    HydrometersDialogComponent,
    HydrometersComponent
  ],
  entryComponents: [HydrometersDialogComponent],
  providers: []
})
export class HydrometersModule {}
