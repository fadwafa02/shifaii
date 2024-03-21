import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AffichePatientPage } from './affiche-patient.page';

const routes: Routes = [
  {
    path: '',
    component: AffichePatientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AffichePatientPageRoutingModule {}
