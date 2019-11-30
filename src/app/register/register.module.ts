import { TextMaskModule } from 'angular2-text-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register/register.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    RegisterRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    TextMaskModule
  ],
  declarations: [RegisterComponent],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class RegisterModule {}
