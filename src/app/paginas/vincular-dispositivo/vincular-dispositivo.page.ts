import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Dispositivo } from 'src/app/Models/Dispositivo';
import { DispositivoService } from 'src/app/servicios/dispositivo.service';

@Component({
  selector: 'app-vincular-dispositivo',
  templateUrl: './vincular-dispositivo.page.html',
  styleUrls: ['./vincular-dispositivo.page.scss'],
})
export class VincularDispositivoPage implements OnInit {

  dispositivo:Dispositivo={
    nombre:"",
    calle:"",
    ciudad:"",
    colonia:"",
    cp:0,
    estado:""
  };
  constructor(
    private db:DispositivoService,
    private ruta:Router
  ) { }

  ngOnInit() {
  }

  vincular(form:NgForm){
    if(form.invalid){
      return;
    }
    this.db.asignarNombre(this.dispositivo.nombre)
    .then(res=>{
      this.db.asignarUsuario(this.dispositivo.nombre)
            .then(resp=>{
              const ubicacion={
                ...this.dispositivo
              };
              delete ubicacion.nombre;
              delete ubicacion.uid;

              this.db.asignarUbicacion(this.dispositivo.nombre, ubicacion)
                  .then(res=>{
                    this.ruta.navigateByUrl('/tablero');
                  });
            });
    });
  }
}
