import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BookappointmentPage } from './bookappointment.page';
//import { Calendar } from '@ionic-native/calendar/ngx';
import { NgCalendarModule } from 'ionic2-calendar';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: BookappointmentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCalendarModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BookappointmentPage]
})
export class BookappointmentPageModule {}
