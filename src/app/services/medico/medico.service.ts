import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos(){

    let url = URL_SERVICIOS + '/medico';

    return this.http.get( url )
                    .map( (resp: any) => {

                      this.totalMedicos = resp.total;
                      return resp.medicos;
                    });
  }

  buscarMedicos( termino: string ){

    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get( url )
                    .map( (resp: any) => resp.medicos );

  }

  borrarMedico( id: string ){

    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
                    .map( resp => {
                      swal('Medico borrado', 'Medico borrado correctamente', 'success');
                      return resp;
                    });
  }

}
