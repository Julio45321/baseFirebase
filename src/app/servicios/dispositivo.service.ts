import { Dispositivo } from './../Models/Dispositivo';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  constructor(
    private db:AngularFireDatabase
  ) { }

  getDispositivo(){
    let uid=localStorage.getItem('uid')
    return this.db.list('dispositivo',
    ref => ref.orderByChild('usuario/uid').equalTo(uid)).valueChanges()
  }

  getDatos(dispositivo:string){
     return this.db.list(`dispositivo/${dispositivo}/datos`,
     ref=>ref.orderByChild('fecha').limitToLast(30)).valueChanges()
  }

  getUbicacion(dispositivo:string){
     return this.db.object(`dispositivo/${dispositivo}/direccion`).valueChanges()
  }

  asignarUsuario(dispositivo:any){
      let uid = localStorage.getItem('uid')
      return this.db.list(`dispositivo/${dispositivo}`).set('usuario',{uid:uid})
  }

  asignarNombre(dispositivo:any){
    return this.db.list(`dispositivos`).set(dispositivo,{nombre:dispositivo})
  }
  asignarUbicacion(dispositivo:any, disp:Dispositivo){
    return this.db.list(`dispositivo/${dispositivo}`).set('direccion',disp)
  }
}
