import { Component, computed, Input, signal, input, Output, EventEmitter } from '@angular/core';
//const indicerandom = Math.floor(Math.random() * USUARIOS_FALSOS.length);
interface UsuariosFalsos {
  id: string;
  avatar: string;
  nombre: string;
}


@Component({
  selector: 'app-usuario',
  imports: [],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})



export class Usuario {
  //OPCIONES DE CONFIGURACION PARA EL DECORADOR
  //@Input({required: true}) avatar!: string; /// LE INDICO QUE VOY A RECIBIR UN VALOR !ESTO ES PARA INDICAR QUE EL VALOR VA A VENIR DEL EXTENERIOR
  //@Input({required: true}) nombre!: string;
  /// OTRA FORMA QUE PODEMOS USAR LOS Input son como signals seria con la funcion generica input
  @Input({ required: true }) Usuarios!: UsuariosFalsos;
  @Input({ required: true }) seleccionado!: boolean;
  //avatar = input.required<string>();
  //nombre = input.required<string>();
  @Output() seleccion = new EventEmitter();
  get rutaimg() {
    return this.Usuarios.avatar;
  }

  alSeleccionarUsuarios() {
    this.seleccion.emit(this.Usuarios.id);
  }


}
