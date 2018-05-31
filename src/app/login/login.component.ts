import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  // auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
   ) { }

   ngOnInit() {
     init_plugins();
     this.attachSignin();

     this.email = localStorage.getItem('email') || '';
     if( this.email.length > 1 ){
       this.recuerdame = true;
     }
   }

   googleInit() {
     return new Promise((resolve, reject) => {
       gapi.load('auth2', () => {
         let auth2 = gapi.auth2.init({
           client_id: '341266573551-p9pgik6h95q1fqe27u2sm4oe62d9lran.apps.googleusercontent.com',
           cookiepolicy: 'single_host_origin',
           scope: 'profile email'
         });

         resolve(auth2);

       });
     });
   }

   attachSignin() {
     this.googleInit().then( (auth2: any) => {
       let element = document.getElementById('btnGoogle');
       auth2.attachClickHandler( element, {}, (googleUser) => {
         let token = googleUser.getAuthResponse().id_token;

         this._usuarioService.loginGoogle( token )
                //  Usando href con vanila js
                // .subscribe( () => window.location.href = '#/dashboard' );
                // usar router navigate
                .subscribe( () => this.router.navigate(['/dashboard']) );
        //  console.log(token);
       });
     });
   }

  ingresar( forma: NgForm ) {

    if( forma.invalid ){
      return;
    }

    let usuario = new Usuario( null, forma.value.email, forma.value.password );

    this._usuarioService.login( usuario, forma.value.recuerdame )
                        .subscribe( correcto => this.router.navigate(['/dashboard']) );

  }

}
