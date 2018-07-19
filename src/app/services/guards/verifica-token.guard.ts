import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from '@angular/router';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ){

  }

  canActivate(): Promise<boolean> | boolean {

    // console.log('Token guard');

    let token = this._usuarioService.token;
    let payload = JSON.parse( atob( token.split('.')[1] ));

    let expirado = this.expirado( payload.exp );

    if( expirado ){
      this.router.navigate(['/login']);
      return false;
    }

    // console.log(payload);

    return this.verificaRenueva( payload.exp );
  }

  verificaRenueva( fechaExp: number): Promise<boolean>{

    return new Promise( (resolve, reject) => {
      // multiplicar por 1000 puesto que esta en milisegundos y se necesita en segundos
      let tokenExp = new Date( fechaExp + 1000);
      let ahora = new Date();

      // tiempo para renovar el token
      ahora.setTime( ahora.getTime() + (4 * 60 * 60 * 1000));

      // console.log( tokenExp );
      // console.log( ahora );
      if( tokenExp.getTime() > ahora.getTime() ){
        resolve( true )
      }else{
        this._usuarioService.renuevaToken()
                            .subscribe( () => {
                              resolve( true );
                            }, () => {
                              this.router.navigate(['/login']);
                              reject( false );
                            });
      }

    });
  }

  expirado( fechaExp: number ){

    // obtener la fecha de hoy y dividirla entre mil puesto que esta en milisegundos
    let ahora = new Date().getTime() / 1000;

    if( fechaExp < ahora ){ // token expirado
      return true;
    }else{ // token au;n no a expirado
      return false;
    }

  }

}
