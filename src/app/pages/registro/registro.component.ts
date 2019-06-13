import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.models';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario:UsuarioModel
  recordar = false;

  constructor(private _as:AuthService, private router:Router) {
   }

  ngOnInit() { 
    this.usuario = new UsuarioModel()
  }

  onSubmit(form:NgForm){
    if(form.invalid){
      return false;
    }
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    })
    Swal.showLoading()

    this._as.crearUsuario(this.usuario).subscribe(data=>{
      if(this.recordar){
        localStorage.setItem('email', this.usuario.email)
      }
      Swal.close()
      this.router.navigateByUrl('/home')
      console.log(data);
    }, error=>{
      Swal.fire({
        title:'Error de autenticación',
        type:'error',
        text:error.error.error.message
      })
    })
    // console.log(form);
    // console.log(this.usuario);
  }

}
