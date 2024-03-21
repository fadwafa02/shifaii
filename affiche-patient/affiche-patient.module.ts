import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AffichePatientPageRoutingModule } from './affiche-patient-routing.module';

import { AffichePatientPage } from './affiche-patient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AffichePatientPageRoutingModule
  ],
  declarations: [AffichePatientPage]
})
export class AffichePatientPageModule {}
