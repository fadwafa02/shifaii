import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlimentationPage } from './alimentation.page';

const routes: Routes = [
  {
    path: '',
    component: AlimentationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlimentationPageRoutingModule {}
