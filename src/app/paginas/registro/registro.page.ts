import { Router } from '@angular/router';
import { AuthService } from './../../servicios/auth.service';
import { Usuario } from './../../Models/Usuario';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  usuario:Usuario={
    nombre:'',
    apellidos:'',
    email:'',
    password:''
  };

  constructor(
    private servicio:AuthService,
    private ruta:Router
  ) { }

  ngOnInit() {
  }

  registrar(form:NgForm){
    if(form.invalid){
      return
    }

    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      width:600,
      heightAuto:false,
      text:"Espere por favor..."
    })
    Swal.showLoading()

    this.servicio.registrar(this.usuario)
    .subscribe(resp=>{
      console.log(resp);
      Swal.close()

      this.ruta.navigateByUrl('/tablero')
    },err=>{
      console.log(err.error.error.message);
      Swal.fire({
        icon:'error',
        title:"Error al registrar",
        text:err.error.error.message,
        heightAuto:false
      })
    })
  }


}
