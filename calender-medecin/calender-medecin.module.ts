import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { IonicModule } from '@ionic/angular';
import { CalenderMedecinPageRoutingModule } from './calender-medecin-routing.module';
import { CalenderMedecinPage } from './calender-medecin.page';








@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalenderMedecinPageRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  declarations: [CalenderMedecinPage]
})
export class CalenderMedecinPageModule {}
