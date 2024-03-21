import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RechercheMedicamentPage } from './recherche-medicament.page';

const routes: Routes = [
  {
    path: '',
    component: RechercheMedicamentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RechercheMedicamentPageRoutingModule {}
