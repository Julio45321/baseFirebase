import { Router } from '@angular/router';
import { map } from 'rxjs';
import { NgForm } from '@angular/forms';
import { UsuarioService } from './../../servicios/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../Models/Usuario';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.page.html',
  styleUrls: ['./modificar-usuario.page.scss'],
})
export class ModificarUsuarioPage implements OnInit {
  usuario:Usuario={
  nombre:"",
  apellidos:"",
  email:"",
  password:""
  };
  constructor(
    private dbUser:UsuarioService,
    private ruta:Router
  ) { }

  ngOnInit() {
    var uid=localStorage.getItem('uid') || "";
    //localizamos los datos del usuario
    this.dbUser.getUsuario(uid)
    .pipe(
      map((res:Usuario[])=>{
        console.log(res);
        this.usuario=res[0];
      })
    ).subscribe();
  }

  actualizar(form:NgForm){
    if(form.invalid){
      return;
    }
      //console.log(this.usuario);

    var uid=localStorage.getItem('uid') || "";
    //buscamos la key del usuario
    this.dbUser.getKey(uid).subscribe(key=>{
      //console.log(key);
      //actualizamos los datos
      this.dbUser.actualizar(key,this.usuario).then(
        res=>{
          //console.log(res);
          this.ruta.navigateByUrl('/tablero');
        });
    })


  }
}
