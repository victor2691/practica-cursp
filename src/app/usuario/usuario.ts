import { Component, computed, Input, signal,input, Output, EventEmitter } from '@angular/core';
//const indicerandom = Math.floor(Math.random() * USUARIOS_FALSOS.length);

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
  @Input({required: true}) id!: string;
  avatar= input.required<string>();
  nombre= input.required<string>();
  @Output() seleccion = new EventEmitter();
 // get rutaimg() {
   // return this.avatar;
 // }
 rutaimg = computed(() => {
 return this.avatar();
 });

  alSeleccionarUsuarios() {
    this.seleccion.emit(this.id);
  }


}
