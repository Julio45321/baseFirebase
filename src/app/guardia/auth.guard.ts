import { AuthService } from './../servicios/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private servicio:AuthService,
    private ruta:Router
  )
  {}

  canActivate():boolean{
    if(this.servicio.autenticado()){
      return true
    }else{
      this.ruta.navigateByUrl('/entrada')
      return false
    }
  }

}
