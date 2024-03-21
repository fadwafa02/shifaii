import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfficheRecettePaysPage } from './affiche-recette-pays.page';

const routes: Routes = [
  {
    path: '',
    component: AfficheRecettePaysPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AfficheRecettePaysPageRoutingModule {}
