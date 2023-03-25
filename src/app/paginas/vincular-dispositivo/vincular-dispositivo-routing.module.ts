import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VincularDispositivoPage } from './vincular-dispositivo.page';

const routes: Routes = [
  {
    path: '',
    component: VincularDispositivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VincularDispositivoPageRoutingModule {}
