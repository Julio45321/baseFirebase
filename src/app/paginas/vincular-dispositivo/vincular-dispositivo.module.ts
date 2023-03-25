import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VincularDispositivoPageRoutingModule } from './vincular-dispositivo-routing.module';

import { VincularDispositivoPage } from './vincular-dispositivo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VincularDispositivoPageRoutingModule
  ],
  declarations: [VincularDispositivoPage]
})
export class VincularDispositivoPageModule {}
