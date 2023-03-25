import { Usuario } from './../Models/Usuario';
import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private db:AngularFireDatabase
  ) { }

  getUsuario(uid:string){
    return this.db.list('usuarios',ref=>ref.orderByChild('uid').equalTo(uid)).valueChanges()
  }

  getKey(uid:string){
    return this.db.list('usuarios',ref=>ref.orderByChild('uid').equalTo(uid))
    .snapshotChanges().pipe(map(res=>{
      return res[0].key;
    }))
  }

  actualizar(key:string, usuario:Usuario){
    console.log(key)
    const datos = this.db.list('usuarios')
    return datos.set(key,usuario)
  }

  
}
