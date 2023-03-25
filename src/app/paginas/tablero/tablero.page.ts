import { Router } from '@angular/router';
import { AuthService } from './../../servicios/auth.service';
import { Component, OnInit } from '@angular/core';
import { DispositivoService } from 'src/app/servicios/dispositivo.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.page.html',
  styleUrls: ['./tablero.page.scss'],
})
export class TableroPage implements OnInit {

  dispositivos:any []=[]

  constructor(
    private servicio:AuthService,
    private ruta:Router,
    private db:DispositivoService
  ) { }

  ngOnInit() {
    this.db.getDispositivo().subscribe(
      (disp:any[]) => {
        this.dispositivos=disp
      }
    )
  }
 salir(){
  this.servicio.logout()
  this.ruta.navigateByUrl('/entrada')
 }
}
