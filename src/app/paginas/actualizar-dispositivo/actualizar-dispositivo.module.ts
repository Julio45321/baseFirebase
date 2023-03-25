import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarDispositivoPageRoutingModule } from './actualizar-dispositivo-routing.module';

import { ActualizarDispositivoPage } from './actualizar-dispositivo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarDispositivoPageRoutingModule
  ],
  declarations: [ActualizarDispositivoPage]
})
export class ActualizarDispositivoPageModule {}
