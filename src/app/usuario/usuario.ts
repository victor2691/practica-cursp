import { Component } from '@angular/core';
import {USUARIOS_FALSOS} from './usuarios-falsos';
const indicerandom = Math.floor(Math.random() * USUARIOS_FALSOS.length);

@Component({
  selector: 'app-usuario',
  imports: [],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class Usuario {
usuarioSeleccionado = USUARIOS_FALSOS[indicerandom];

get rutaimg(){
return this.usuarioSeleccionado.avatar;
}

alSeleccionarUsuario(){
console.log(`Usuario seleccionado: ${this.usuarioSeleccionado.nombre}`);
}

actualizarUsuario(){
 //como puedo recargar la pagina en esta funcion
 const indicerandom = Math.floor(Math.random() * USUARIOS_FALSOS.length);
 this.usuarioSeleccionado =  USUARIOS_FALSOS[indicerandom];
}

}
