import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PsychiatristPage } from './psychiatrist.page';

const routes: Routes = [
  {
    path: '',
    component: PsychiatristPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PsychiatristPageRoutingModule {}
