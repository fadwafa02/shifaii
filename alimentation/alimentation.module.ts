import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlimentationPageRoutingModule } from './alimentation-routing.module';

import { AlimentationPage } from './alimentation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlimentationPageRoutingModule
  ],
  declarations: [AlimentationPage]
})
export class AlimentationPageModule {}
