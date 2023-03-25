import { AuthGuard } from './guardia/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'entrada',
    pathMatch: 'full'
  },
  {
    path: 'entrada',
    loadChildren: () => import('./paginas/entrada/entrada.module').then( m => m.EntradaPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./paginas/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tablero',
    loadChildren: () => import('./paginas/tablero/tablero.module').then( m => m.TableroPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'vincular-dispositivo',
    loadChildren: () => import('./paginas/vincular-dispositivo/vincular-dispositivo.module').then( m => m.VincularDispositivoPageModule)
  },
  {
    path: 'actualizar-dispositivo',
    loadChildren: () => import('./paginas/actualizar-dispositivo/actualizar-dispositivo.module').then( m => m.ActualizarDispositivoPageModule)
  },
  {
    path: 'modificar-usuario',
    loadChildren: () => import('./paginas/modificar-usuario/modificar-usuario.module').then( m => m.ModificarUsuarioPageModule)
  },
  {
    path: 'reporte',
    loadChildren: () => import('./paginas/reporte/reporte.module').then( m => m.ReportePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
