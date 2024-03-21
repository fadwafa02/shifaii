import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientsPageRoutingModule } from './patients-routing.module';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { PatientsPage } from './patients.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientsPageRoutingModule,
    AngularFirestoreModule
  ],
  declarations: [PatientsPage]
})
export class PatientsPageModule {}
