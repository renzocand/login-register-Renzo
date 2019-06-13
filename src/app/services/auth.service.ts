import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
  apikey = "AIzaSyCNveWJWCxndROVKPD1lQXPNy9Xb_xf2FI"
  usuario:UsuarioModel

  constructor(private http:HttpClient) { }

  crearUsuario(){
    let body = {
      email: this.usuario.email,
      password: this.usuario.password,
      returnSecureToken: true
    }
    this.http.post(`${this.url}/signupNewUser?key=${this.apikey}`,body)
  }
  
}
