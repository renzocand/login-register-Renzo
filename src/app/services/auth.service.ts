import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UsuarioModel } from "../models/usuario.models";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {
    this.leerToken();
  }

  private url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
  private apikey = "AIzaSyCNveWJWCxndROVKPD1lQXPNy9Xb_xf2FI";
  token: string;

  logout() {
    localStorage.removeItem('token')
  }

  nuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http
      .post(`${this.url}/signupNewUser?key=${this.apikey}`, authData)
      .pipe(
        map((data: any) => {
          console.log("Entro en rxjs");
          this.guardarToken(data['idToken'])
          return data;
        })
      );
  }

  loginUsuario(usuario: UsuarioModel) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}/verifyPassword?key=${this.apikey}`,
      authData)
      .pipe(
        map((data: any) => {
          console.log("Entro en rxjs");
          this.guardarToken(data["idToken"]);
          return data;
        })
      );
  }

  private guardarToken(idToken: string) {
    this.token = idToken;
    localStorage.setItem("token", this.token);

    let hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expira', hoy.getTime().toString());
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token')
    }else{
      this.token = ''
    }
    return this.token;
  }

  estaAutenticado():boolean{
    if(this.token.length<2){
      return false;
    }
    const expira = Number(localStorage.getItem('expira')) 
    const expiraDate = new Date();
    expiraDate.setTime(expira)

    if(new Date() > expiraDate){
      return false;
    }else{
      return true;
    }
  }

}
