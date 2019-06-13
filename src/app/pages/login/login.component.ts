import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.models';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario:UsuarioModel
  recordar = false;

  constructor(private _as:AuthService, private router:Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email')
    }
  }

  onSubmit(form:NgForm){
    if(form.invalid){
      return false;
    }
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text: 'Espere por favor...'
    })
    Swal.showLoading()

    this._as.loginUsuario(this.usuario).subscribe(data=>{
      Swal.close()
      if(this.recordar){
        localStorage.setItem('email', this.usuario.email)
      }
      this.router.navigateByUrl('/home')
      console.log(data);
    }, error=>{
      Swal.fire({
        type:'error',
        title: 'Error al autenticar',
        text: error.error.error.message
      })
    })

    // console.log(form);
    // console.log(this.usuario);
  }

}
