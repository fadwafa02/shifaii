import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RechercheMedicamentPageRoutingModule } from './recherche-medicament-routing.module';

import { RechercheMedicamentPage } from './recherche-medicament.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RechercheMedicamentPageRoutingModule
  ],
  declarations: [RechercheMedicamentPage]
})
export class RechercheMedicamentPageModule {}
