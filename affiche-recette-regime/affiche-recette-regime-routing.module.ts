import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfficheRecetteRegimePage } from './affiche-recette-regime.page';

const routes: Routes = [
  {
    path: '',
    component: AfficheRecetteRegimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AfficheRecetteRegimePageRoutingModule {}
