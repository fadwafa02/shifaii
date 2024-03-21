import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientPageRoutingModule } from './patient-routing.module';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { PatientPage } from './patient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientPageRoutingModule,
    AngularFirestoreModule
  ],
  declarations: [PatientPage]
})
export class PatientPageModule {}
