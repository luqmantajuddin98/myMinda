import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PsychiatristPageRoutingModule } from './psychiatrist-routing.module';

import { PsychiatristPage } from './psychiatrist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PsychiatristPageRoutingModule
  ],
  declarations: [PsychiatristPage]
})
export class PsychiatristPageModule {}
