import { Component, computed, signal } from '@angular/core';
import { Encabezado } from "./encabezado/encabezado";
import { Usuario } from "./usuario/usuario";
import { USUARIOS_FALSOS } from './usuario/usuarios-falsos';
import { Tareas } from './tareas/tareas';


@Component({
  selector: 'app-root',
  imports: [Encabezado, Usuario, Tareas],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  usuarios = USUARIOS_FALSOS;
  //nombreusuario = signal("");
  iduser = signal("");
  ///SOLO HACEMOS SIGNAL EL ID DEL USUARIO Y CON COMPUTE RECALCULAMOS EL VALOR 
  // DEL NOMBRE CADA QUE VEZ QUE EL ID CAMBIA
  nombreusuario = computed(() => {
    return this.usuarios.find(u => u.id === this.iduser())?.nombre ?? '';
  });

  alSeleccionarUsuario(id: string) {
    console.log('Usuario seleccionado con el id ' + id);
    //const nombre = this.usuarios.find(u => u.id === id)?.nombre;
    //this.nombreusuario.set(nombre ?? '');
    //ALTERNATIVA
    this.iduser.set(id);
  }


}