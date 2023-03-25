import { DispositivoService } from './../../servicios/dispositivo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.page.html',
  styleUrls: ['./reporte.page.scss'],
})
export class ReportePage implements OnInit {
  dispositivo:string;
  datos:any[]=[];
  ubicacion:any={};

  constructor(
    private rutaAct:ActivatedRoute,
    private dispSer:DispositivoService
  ) { }

  ngOnInit() {
    this.rutaAct.params.subscribe(res=>{
      this.dispositivo=res['dispositivo'];
      console.log(this.dispositivo);
    });

    this.dispSer.getDatos(this.dispositivo).pipe(
      map(res=>{
        //para obtener los datos en el formato necesario para la gráfica
        return res.map(({fecha,dato})=>({name:new Date(fecha).toLocaleTimeString(),value:dato}))
      })
      ).subscribe(
      resp=>{
        console.log(resp);
        //agrego información del dispositivo y la serie de datos
        var info=[{"name": this.dispositivo,"series":resp}];
        console.log(info);
        this.datos=info;
      });

      //recuperamos de firebase la ubicación del dispositivo
      this.dispSer.getUbicacion(this.dispositivo).subscribe(
        resp=>{
          console.log(resp);
          this.ubicacion=resp;
        });

  }

}
