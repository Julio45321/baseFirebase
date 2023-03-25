import { DispositivoService } from './../../servicios/dispositivo.service';
import { NgForm } from '@angular/forms';
import { Dispositivo } from './../../Models/Dispositivo';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-dispositivo',
  templateUrl: './actualizar-dispositivo.page.html',
  styleUrls: ['./actualizar-dispositivo.page.scss'],
})
export class ActualizarDispositivoPage implements OnInit {

  dispositivo:Dispositivo={
    calle:"",
    ciudad:"",
    colonia:"",
    cp:0,
    estado:""
  };

  nombreDis:string="";

  constructor(
    private db:DispositivoService,
    private rutaAct:ActivatedRoute,
    private ruta:Router
  ) { }

  ngOnInit() {
    this.rutaAct.params.subscribe(disp=>{
      this.nombreDis=disp['dispositivo'];
    });

    this.db.getUbicacion(this.nombreDis).subscribe(
      (res:any)=>{
        this.dispositivo=res;
      }
    );
  }

  actualizar(form:NgForm){
    if(form.invalid){
      return;
    }

    const ubicacion={
      ...this.dispositivo
    }
    delete ubicacion.nombre;
    delete ubicacion.uid;
    this.db.asignarUbicacion(this.nombreDis,ubicacion)
        .then(resp=>{
          this.ruta.navigateByUrl('/tablero');
        });
  }
}
