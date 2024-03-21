import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecherchePharmaciePageRoutingModule } from './recherche-pharmacie-routing.module';

import { RecherchePharmaciePage } from './recherche-pharmacie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecherchePharmaciePageRoutingModule
  ],
  declarations: [RecherchePharmaciePage]
})
export class RecherchePharmaciePageModule {}
