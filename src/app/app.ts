import { Component, signal } from '@angular/core';
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
  nombreusuario = signal("");

  alSeleccionarUsuario(id: string) {
    console.log('Usuario seleccionado con el id ' + id);
    const nombre = this.usuarios.find(u => u.id === id)?.nombre;
    //this.nombreusuario.set(nombre ?? '');
    //ALTERNATIVA
    if (nombre) {
      this.nombreusuario.set(nombre);
    }
  }

}
