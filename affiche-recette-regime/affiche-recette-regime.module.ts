import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AfficheRecetteRegimePageRoutingModule } from './affiche-recette-regime-routing.module';

import { AfficheRecetteRegimePage } from './affiche-recette-regime.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AfficheRecetteRegimePageRoutingModule
  ],
  declarations: [AfficheRecetteRegimePage]
})
export class AfficheRecetteRegimePageModule {}
