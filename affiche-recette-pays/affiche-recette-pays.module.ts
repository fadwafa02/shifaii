import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AfficheRecettePaysPageRoutingModule } from './affiche-recette-pays-routing.module';

import { AfficheRecettePaysPage } from './affiche-recette-pays.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    AfficheRecettePaysPageRoutingModule
  ],
  declarations: [AfficheRecettePaysPage]
})
export class AfficheRecettePaysPageModule {}
