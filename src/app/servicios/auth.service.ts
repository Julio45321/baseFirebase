import { Usuario } from './../Models/Usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
  private database ="https://login2023-55979-default-rtdb.firebaseio.com/" // variable para la base de datos
  private apikey="AIzaSyBPlzyLyAvfFhWaateBVUKJeeerbCRUnKA"  // api de uso firebase

  private auth="https://identitytoolkit.googleapis.com/v1/accounts:"
  userToken:string=""
  constructor(
   private http:HttpClient
  ) { }

  // metodo login
  login(usuario:Usuario){
      const authDatos={
        ...usuario,
        returnSecureToken:true
      }
    return this.http.post(`${this.auth}signInWithPassword?key=${this.apikey}`,
    authDatos
    ).pipe(map(
      (resp:any)=>{
          console.log(resp);
          this.almacenarToken(resp['idToken'])
          localStorage.setItem('uid',resp['localId'])
          return resp
      }
    ))


  }

  registrar(usuario:Usuario){
    const authDatos={
      ...usuario,
      returnSecureToken:true
    }
  return this.http.post(`${this.auth}signUp?key=${this.apikey}`,
  authDatos
  ).pipe(map(
    (resp:any)=>{
        console.log(resp);
        this.almacenarToken(resp['idToken'])
        localStorage.setItem('uid',resp['localId'])

        const datos={
          ...usuario,
          tipo:"normal",
          uid:resp['localId']
        }
        this.http.post(`${this.database}usuarios.json`,datos)
        .subscribe(resp2=>{
          console.log(resp2);
        })
        return resp
    }
  ))
  }

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('uid')
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken=localStorage.getItem('token') || ""
    }else{
      this.userToken=""
    }
  }

  autenticado():boolean{
    if(this.userToken.length < 2){
      return false
    }
    let expira = Number (localStorage.getItem('expira'))
    let expiraDate = new Date()
    expiraDate.setTime(expira)

    if(expiraDate > new Date()){
      return true
    }else{
    return false
    }
  }



  private almacenarToken(idToken:string){
    this.userToken=idToken
    localStorage.setItem('token',idToken)

    let hoy = new Date()
    hoy.setSeconds(3600)
    console.log(hoy);

    localStorage.setItem('expira',hoy.getTime().toString())


  }

}
