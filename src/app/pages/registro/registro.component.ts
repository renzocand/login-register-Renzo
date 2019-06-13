import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.models';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import  Swal  from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario:UsuarioModel
  error:string

  constructor(private _as:AuthService, private router:Router) { }

  ngOnInit() { 
    this.usuario = new UsuarioModel();
  }

  enviarDatos(form:NgForm){
    if(form.invalid){
      return ;
    }
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor'
    })
    Swal.showLoading();

    this._as.nuevoUsuario(this.usuario).subscribe((data:any)=>{
      localStorage.setItem('email', this.usuario.email)
      Swal.close();
      this.router.navigateByUrl('/home')
    }, (error:any)=>{
      this.error = error.error.error.message;
      Swal.fire({
        allowOutsideClick: false,
        type: 'error',
        text: error.error.error.message
      })
    })
    // console.log(this.usuario);
    // console.log(form);
  }


}
