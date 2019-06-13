import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UsuarioModel } from "../models/usuario.models";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
  apikey = "AIzaSyCNveWJWCxndROVKPD1lQXPNy9Xb_xf2FI";
  token: string;

  constructor(private http: HttpClient) {
    this.leerToken();
  }

  crearUsuario(usuario: UsuarioModel) {
    let body = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };
    return this.http
      .post(`${this.url}/signupNewUser?key=${this.apikey}`, body)
      .pipe(
        map(data => {
          this.guardarToken(data["idToken"]);
          return data;
        })
      );
  }

  loginUsuario(usuario: UsuarioModel) {
    let body = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };
    return this.http
      .post(`${this.url}/verifyPassword?key=${this.apikey}`, body)
      .pipe(
        map(data => {
          this.guardarToken(data["idToken"]);
          return data;
        })
      );
  }

  private guardarToken(token: string) {
    this.token = token;
    localStorage.setItem("token", this.token);

    let expira = new Date();
    expira.setSeconds(3600);
    
    localStorage.setItem("expira", expira.getTime().toString())
  }

  leerToken() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
    } else {
      this.token = "";
    }
  }

  validarToken():boolean {
    if (this.token.length < 2) {
      return false;
    }
    
    let expiracion = Number(localStorage.getItem('expira'))
    let caducidad = new Date()
    caducidad.setTime(expiracion)

    if(new Date() > caducidad){
      return false
    }

    return true
  }

  logout(){
    localStorage.removeItem('token')
  }
}
