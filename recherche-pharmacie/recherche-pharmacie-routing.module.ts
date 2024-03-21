import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecherchePharmaciePage } from './recherche-pharmacie.page';

const routes: Routes = [
  {
    path: '',
    component: RecherchePharmaciePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecherchePharmaciePageRoutingModule {}
