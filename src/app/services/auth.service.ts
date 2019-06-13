import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
  apikey = "AIzaSyCNveWJWCxndROVKPD1lQXPNy9Xb_xf2FI"

  constructor(private http:HttpClient) { }

  crearUsuario(usuario:UsuarioModel){
    let body = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    }
    return this.http.post(`${this.url}/signupNewUser?key=${this.apikey}`,body)
  }

  loginUsuario(usuario:UsuarioModel){
    let body = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    }
    return this.http.post(`${this.url}/verifyPassword?key=${this.apikey}`,body)
  }
  
}
