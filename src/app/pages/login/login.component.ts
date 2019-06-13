import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.models';
import { AuthService } from '../../services/auth.service';
import  Swal  from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:UsuarioModel
  recordarme:boolean;

  constructor(private _as:AuthService, private router:Router) {
    this.recordarme = false;
   }

  ngOnInit() {
    this.usuario = new UsuarioModel()
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
    }
  }

  ingresar(form:NgForm){
    if(form.invalid){
      return ;
    }
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor'
    })
    Swal.showLoading();

    this._as.loginUsuario(this.usuario).subscribe(data=>{
      Swal.close();
      if(this.recordarme){
        localStorage.setItem('email', this.usuario.email)
      }
      this.router.navigateByUrl('/home')
      console.log(data);
    }, (error:any)=>{
      console.log(error.error.error.message);
      Swal.fire({
        type: 'error',
        text: error.error.error.message 
      })
    })
  }


}
