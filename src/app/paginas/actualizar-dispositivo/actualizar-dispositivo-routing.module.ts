import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarDispositivoPage } from './actualizar-dispositivo.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarDispositivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarDispositivoPageRoutingModule {}
